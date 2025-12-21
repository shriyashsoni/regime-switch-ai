import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Market Data
    market_data: defineTable({
      symbol: v.string(),
      timestamp: v.number(),
      price: v.number(),
      volume: v.number(),
      change: v.number(),
    }).index("by_symbol_time", ["symbol", "timestamp"]),

    // Market Regimes
    regimes: defineTable({
      timestamp: v.number(),
      regime: v.string(), // "BULL", "BEAR", "SIDEWAYS", "VOLATILE"
      confidence: v.number(),
      description: v.string(),
    }).index("by_time", ["timestamp"]),

    // Trading Signals
    signals: defineTable({
      timestamp: v.number(),
      symbol: v.string(),
      type: v.string(), // "BUY", "SELL", "HOLD"
      strategy: v.string(),
      confidence: v.number(),
      status: v.string(), // "PENDING", "EXECUTED"
    }).index("by_time", ["timestamp"]),

    // Executed Trades
    trades: defineTable({
      timestamp: v.number(),
      symbol: v.string(),
      side: v.string(), // "BUY", "SELL"
      price: v.number(),
      amount: v.number(),
      pnl: v.optional(v.number()),
      status: v.string(), // "OPEN", "CLOSED"
    }).index("by_time", ["timestamp"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;