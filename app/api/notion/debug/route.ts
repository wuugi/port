import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "NOTION_TOKEN not set" });
  }

  const pageId = "1418937a33b180a0be91dd0c447a1c8a";

  try {
    const response = await fetch(
      `https://api.notion.com/v1/blocks/${pageId}/children?page_size=20`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );

    const status = response.status;
    const body = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        tokenPrefix: token.slice(0, 12) + "...",
        status,
        error: body,
      });
    }

    const blocks = body.results ?? [];
    const imageBlocks = blocks
      .filter((b: { type: string }) => b.type === "image")
      .map((b: { image?: { file?: { url?: string }; external?: { url?: string } } }) => ({
        url: b.image?.file?.url ?? b.image?.external?.url ?? null,
      }));

    return NextResponse.json({
      tokenPrefix: token.slice(0, 12) + "...",
      status,
      totalBlocks: blocks.length,
      imageBlocks,
      blockTypes: blocks.map((b: { type: string }) => b.type),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
