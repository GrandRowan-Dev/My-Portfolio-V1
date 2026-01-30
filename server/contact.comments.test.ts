import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getDb } from "./db";
import { portfolioComments } from "../drizzle/schema";

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.send", () => {
  it("accepts valid contact form submission", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.send({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.send({
        name: "Test User",
        email: "invalid-email",
        message: "This is a test message",
      })
    ).rejects.toThrow();
  });

  it("rejects empty name", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.send({
        name: "",
        email: "test@example.com",
        message: "This is a test message",
      })
    ).rejects.toThrow();
  });
});

describe("comments", () => {
  beforeEach(async () => {
    // Clean up test comments
    const db = await getDb();
    if (db) {
      await db.execute(`DELETE FROM portfolio_comments`);
    }
  });

  it("creates a comment successfully", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.create({
      userName: "Test User",
      content: "This is a test comment",
    });

    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();
  });

  it("lists comments in descending order", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Create two comments
    await caller.comments.create({
      userName: "User 1",
      content: "First comment",
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    await caller.comments.create({
      userName: "User 2",
      content: "Second comment",
    });

    const comments = await caller.comments.list();

    expect(comments.length).toBeGreaterThanOrEqual(2);
    expect(comments[0]?.userName).toBe("User 2"); // Most recent first
    expect(comments[1]?.userName).toBe("User 1");
  });

  it("rejects comment with empty content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.create({
        userName: "Test User",
        content: "",
      })
    ).rejects.toThrow();
  });

  it("rejects comment with empty username", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.create({
        userName: "",
        content: "Test comment",
      })
    ).rejects.toThrow();
  });
});
