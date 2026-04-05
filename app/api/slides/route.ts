import { allSlidesToMarkdown } from "@/lib/slides";

export async function GET() {
  return new Response(allSlidesToMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
