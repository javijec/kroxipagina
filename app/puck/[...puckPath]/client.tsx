"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";
import Link from "next/link";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  // Get the original path by removing /edit from the current URL
  const originalPath = path;

  return (
    <>
      <Link
        href={originalPath}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium shadow-md hover:bg-gray-50 transition-colors duration-200 z-40"
        title="Go back to preview"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Preview
      </Link>
      <Puck
        config={config}
        data={data}
        onPublish={async (data) => {
          await fetch("/puck/api", {
            method: "post",
            body: JSON.stringify({ data, path }),
          });
        }}
      />
    </>
  );
}
