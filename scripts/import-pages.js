const { MongoClient } = require("mongodb");
const { readFileSync } = require("fs");

// NOTE: This script uses a hardcoded URI for local debugging — it matches .env.local
const uri = "mongodb+srv://javijec:javi1990@cluster0.mpzgu.mongodb.net/kroximatuz?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB for import");
    const db = client.db();
    const coll = db.collection("pages");

    const raw = readFileSync("./database.json", "utf8");
    const pages = JSON.parse(raw);

    const entries = Object.entries(pages);
    for (const [path, payload] of entries) {
      const data = payload;
      const doc = { path, data };
      const res = await coll.updateOne({ path }, { $set: doc }, { upsert: true });
      if (res.upsertedId) {
        console.log(`Inserted page ${path}`);
      } else {
        console.log(`Upserted/updated page ${path}`);
      }
    }

    console.log("Import finished");
  } catch (err) {
    console.error("Import error:", err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
