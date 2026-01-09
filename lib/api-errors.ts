/**
 * Utility for consistent API error handling
 */
import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message, "FORBIDDEN");
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(404, message, "NOT_FOUND");
  }
}

export class ValidationError extends ApiError {
  constructor(
    message = "Validation error",
    public errors?: Record<string, string[]>
  ) {
    super(400, message, "VALIDATION_ERROR");
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown) {
  console.error("[API Error]", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error instanceof ValidationError && error.errors && { details: error.errors }),
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    },
    { status: 500 }
  );
}
