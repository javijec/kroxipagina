/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * PROTECTED: Only authenticated admin/editor users can access this route
 */

import "@measured/puck/puck.css";
import { Client } from "./client";
import { Metadata } from "next";
import { getPage } from "../../../lib/get-page.ts";
import { auth } from "../../../lib/auth";
import { getUserRole } from "../../../lib/auth-middleware";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  return {
    title: "Puck: " + path,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  
  // Verify user is authenticated and has edit permission
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  } as any);

  if (!session?.user) {
    redirect("/auth/signin?redirect=" + encodeURIComponent(path + "/edit"));
  }

  const role = getUserRole(session.user.email);
  if (role === "viewer") {
    // User is not authorized to edit
    redirect("/");
  }

  const data = await getPage(path);

  return <Client path={path} data={data || {}} />;
}

export const dynamic = "force-dynamic";
