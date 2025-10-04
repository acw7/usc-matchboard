import { NextResponse } from "next/server";
export const json = (data: any, init?: number | ResponseInit) => NextResponse.json(data, init);
export const badRequest = (m: string) => NextResponse.json({ error: m }, { status: 400 });
export const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
