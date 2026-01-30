import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { portfolioComments } from "../drizzle/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { storagePut } from "./storage";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form router
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100),
        email: z.string().email().max(320),
        message: z.string().min(1).max(5000),
      }))
      .mutation(async ({ input }) => {
        try {
          // Send notification to owner
          await notifyOwner({
            title: `New Contact Form Message from ${input.name}`,
            content: `**From:** ${input.name} (${input.email})\n\n**Message:**\n${input.message}`,
          });

          return { success: true };
        } catch (error) {
          console.error('Error sending contact form:', error);
          throw new Error('Failed to send message. Please try again.');
        }
      }),
  }),

  // Comments router
  comments: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');

      // Get all comments
      const allComments = await db
        .select()
        .from(portfolioComments)
        .orderBy(desc(portfolioComments.createdAt));

      // Separate top-level comments and replies
      const topLevelComments = allComments.filter(c => !c.parentId);
      const replies = allComments.filter(c => c.parentId);

      // Attach replies to their parent comments
      const commentsWithReplies = topLevelComments.map(comment => ({
        ...comment,
        isPinned: comment.isPinned === 1,
        replies: replies
          .filter(r => r.parentId === comment.id)
          .map(r => ({ ...r, isPinned: r.isPinned === 1 })),
      }));

      return commentsWithReplies;
    }),

    create: publicProcedure
      .input(z.object({
        userName: z.string().min(1).max(100),
        content: z.string().min(1).max(500),
        profileImageBase64: z.string().optional(),
        parentId: z.number().optional(), // For replies
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');

        let profileImageUrl: string | null = null;

        // Upload profile image if provided
        if (input.profileImageBase64) {
          try {
            const base64Data = input.profileImageBase64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const fileKey = `profile-images/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
            
            const { url } = await storagePut(fileKey, buffer, 'image/jpeg');
            profileImageUrl = url;
          } catch (error) {
            console.error('Error uploading profile image:', error);
            // Continue without image if upload fails
          }
        }

        const [result] = await db.insert(portfolioComments).values({
          userName: input.userName,
          content: input.content,
          profileImage: profileImageUrl,
          isPinned: 0,
          parentId: input.parentId || null,
        });

        return { success: true, id: result.insertId };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only allow owner to delete comments
        if (ctx.user.openId !== ENV.ownerOpenId) {
          throw new Error('Only admin can delete comments');
        }

        const db = await getDb();
        if (!db) throw new Error('Database not available');

        // Delete the comment and its replies
        await db.delete(portfolioComments).where(eq(portfolioComments.id, input.id));
        await db.delete(portfolioComments).where(eq(portfolioComments.parentId, input.id));

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
