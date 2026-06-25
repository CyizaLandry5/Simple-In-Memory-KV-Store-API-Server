import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();

// Simple in-memory storage (no KV needed!)
const store = new Map();

// Set a value
app.post("/kv/set/:key", async (c) => {
  const token = c.req.query("token");
