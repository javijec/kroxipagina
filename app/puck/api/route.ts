import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: Request) {
  const payload = await request.json();

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("pages");

  await collection.updateOne(
    { path: payload.path },
    { $set: { data: payload.data } },
    { upsert: true }
  );

  // Purge Next.js cache
  revalidatePath(payload.path);

  return NextResponse.json({ status: "ok" });
}
