import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Portfolio comments table
export const portfolioComments = mysqlTable("portfolio_comments", {
  id: int("id").autoincrement().primaryKey(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  content: text("content").notNull(),
  profileImage: text("profile_image"),
  isPinned: int("is_pinned").default(0).notNull(), // 0 = false, 1 = true
  parentId: int("parent_id"), // For replies, null for top-level comments
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PortfolioComment = typeof portfolioComments.$inferSelect;
export type InsertPortfolioComment = typeof portfolioComments.$inferInsert;