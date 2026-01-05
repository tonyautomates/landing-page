import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const cityRoute = String(data.cityRoute || "").trim();
    const date = String(data.date || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const url = process.env.N8N_WEBHOOK_URL;
    const secret = process.env.N8N_WEBHOOK_SECRET;

    if (!url || !secret) {
      return NextResponse.json({ error: "Env vars not set" }, { status: 500 });
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify({
        name,
        email,
        cityRoute,
        date,
        message,
        page: data.page ?? null,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "n8n failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}