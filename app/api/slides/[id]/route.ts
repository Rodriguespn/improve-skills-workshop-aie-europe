import { slides, slideToMarkdown } from "@/lib/slides";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const slide = slides.find((s) => s.id === id);

  if (!slide) {
    const available = slides.map((s) => s.id).join(", ");
    return new Response(
      `# Not Found\n\nNo slide with id "${id}".\n\nAvailable slides: ${available}\n`,
      { status: 404, headers: { "Content-Type": "text/markdown; charset=utf-8" } }
    );
  }

  return new Response(slideToMarkdown(slide), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
