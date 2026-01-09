const { MongoClient } = require("mongodb");
// Load .env.local for local development if present
try {
  require("dotenv").config({ path: ".env.local" });
} catch (e) {}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set. Please export it or add it to .env.local');
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const coll = db.collection("pages");

    console.log("Creating index on pages.path (asc)");
    const res = await coll.createIndex({ path: 1 }, { unique: true, background: true });
    console.log("Index created:", res);
  } catch (err) {
    console.error("Index creation failed:", err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
