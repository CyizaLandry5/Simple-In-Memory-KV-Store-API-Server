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
  const body = await c.req.json();
  store.set(key, body);
  return c.json({ ok: true });
});

// Get a value
app.get("/kv/get/:key", async (c) => {
  const token = c.req.query("token");
  if (token !== "2609_15e4c3:9ca6a5") {
    return c.text("Missing or invalid token", 401);
  }
  const key = c.req.param("key");
  const value = store.get(key);
  return c.json({ key: key, value: value });
});

// List values with prefix
app.get("/kv/list/:prefix", async (c) => {
  const token = c.req.query("token");
  if (token !== "2609_15e4c3:9ca6a5") {
    return c.text("Missing or invalid token", 401);
  }
  const prefix = c.req.param("prefix");
  const records = [];
  for (const [key, value] of store.entries()) {
    if (key.startsWith(prefix)) {
      records.push({ key: [key], value: value });
    }
  }
  return c.json({ records: records, cursor: "" });
});

// Delete a value
app.delete("/kv/delete/:key", async (c) => {
  const token = c.req.query("token");
  if (token !== "2609_15e4c3:9ca6a5") {
    return c.text("Missing or invalid token", 401);
  }
