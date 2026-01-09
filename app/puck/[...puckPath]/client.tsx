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
      {/* Preview button temporarily disabled - TODO: Fix navigation error */}
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
