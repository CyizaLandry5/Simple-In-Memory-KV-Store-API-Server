import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();

// Simple in-memory storage (no KV needed!)
const store = new Map();

// Set a value
app.post("/kv/set/:key", async (c) => {
  const token = c.req.query("token");
  if (token !== "2609_15e4c3:9ca6a5") {
    return c.text("Missing or invalid token", 401);
  }
  const key = c.req.param("key");
