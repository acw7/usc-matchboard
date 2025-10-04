import { NextResponse } from "next/server";

// Send JSON with either a status number or a full ResponseInit.
export function json<T>(data: T, init?: number | ResponseInit) {
  const normalized: ResponseInit | undefined =
    typeof init === "number" ? { status: init } : init;
  return NextResponse.json<T>(data, normalized);
}

export function badRequest(message: string) {
  return json({ error: message }, 400);
}

export function unauthorized() {
  return json({ error: "Unauthorized" }, 401);
}
