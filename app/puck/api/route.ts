import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import {
  handleApiError,
  UnauthorizedError,
  ValidationError,
} from "../../../lib/api-errors";

export async function POST(request: NextRequest) {
  try {
    // Check for valid session
    const sessionToken = request.cookies.get("better-auth.session_token")
      ?.value;
    if (!sessionToken) {
      throw new UnauthorizedError("Session token required");
    }

    // Parse request body
    let payload: { path?: string; data?: unknown };
    try {
      payload = await request.json();
    } catch {
      throw new ValidationError("Invalid JSON in request body");
    }

    // Validate required fields
    if (!payload.path || typeof payload.path !== "string") {
      throw new ValidationError("Missing or invalid 'path' field", {
        path: ["path is required and must be a string"],
      });
    }

    if (payload.data === undefined) {
      throw new ValidationError("Missing 'data' field", {
        data: ["data field is required"],
      });
    }

    // Save to database
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("pages");

    const result = await collection.updateOne(
      { path: payload.path },
      { $set: { data: payload.data, updatedAt: new Date() } },
      { upsert: true }
    );

    if (!result.acknowledged) {
      throw new Error("Failed to update database");
    }

    // Purge Next.js cache
    revalidatePath(payload.path);

    return NextResponse.json({
      status: "ok",
      message: "Page updated successfully",
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
