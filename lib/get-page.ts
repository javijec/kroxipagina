import { Data } from "@measured/puck";
import clientPromise from "./mongodb.ts";

export const getPage = async (path: string) => {
  const client = await clientPromise;
  const db = client.db(); // Usa el nombre de la DB de la URI
  const collection = db.collection("pages");

  const start = Date.now();
  const page = await collection.findOne({ path });
  const duration = Date.now() - start;
  if (page) {
    console.log(`getPage: found ${path} in ${duration}ms`);
  } else {
    console.log(`getPage: no page for ${path} (query ${duration}ms)`);
  }

  return page ? (page.data as Data) : null;
};
