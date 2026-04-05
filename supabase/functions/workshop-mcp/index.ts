// Workshop MCP Server — Supabase Edge Function (Deno)
// Implements MCP JSON-RPC over streamable HTTP transport

// ---------------------------------------------------------------------------
// Embedded slide data (cannot import from Next.js app in Deno runtime)
// ---------------------------------------------------------------------------

const WORKSHOP_TITLE = "Level Up Your Skills";
const WORKSHOP_EVENT = "AI Engineer Europe 2026";
const WORKSHOP_PRESENTER = "Pedro Rodrigues";
const WORKSHOP_ORG = "Supabase";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  source?: { label: string; url: string };
}

const slides: Slide[] = [
  { id: "title", title: "Level Up Your Skills", subtitle: "Writing and testing agent skills, hands-on", bullets: ["Pedro Rodrigues — Supabase", "AI Engineer Europe 2026"] },
  { id: "what-are-skills", title: "What Are Skills?", bullets: ["Defined in a SKILL.md file alongside your code", "Discoverable by any agent that reads the repo", "Testable with evals, just like any other code"] },
  { id: "testing-with-evals", title: "Testing with Evals", bullets: ["Define the metrics that matter", "Create the skill under test", "Test it manually first", "Build structured test cases", "Grade outputs automatically", "Iterate until the scores hold"], source: { label: "OpenAI — Testing Agent Skills Systematically with Evals", url: "https://developers.openai.com/blog/eval-skills" } },
  { id: "what-were-doing", title: "What We're Doing", bullets: ["Write a Supabase security skill", "Test it manually against a real database", "Discover an RLS view leak", "Iterate on the skill to catch it", "Automate the whole loop with Braintrust"] },
  { id: "demo", title: "Demo", subtitle: "Let's write a Supabase security skill from scratch", bullets: ["Write", "Test", "Break", "Fix"] },
  { id: "braintrust", title: "Braintrust", subtitle: "From manual checks to automated evals", bullets: ["Track every run with structured logging", "Score outputs against expected results", "Compare runs side-by-side", "Catch regressions before they ship"] },
  { id: "final-remarks", title: "Final Remarks", bullets: ["Measure everything — vibes don't scale", "Principles over templates", "Small iterations, fast feedback", "Tomorrow's talk: taking it further"] },
  { id: "thank-you", title: "Thank You", subtitle: "Now go level up your skills.", bullets: ["@pedrorgz", "supabase.com"] },
];

const STEP_BRANCHES = [
  { branch: "step/1-first-skill", description: "Write the initial Supabase security skill" },
  { branch: "step/2-manual-test", description: "Test the skill manually against a live database" },
  { branch: "step/3-break-it", description: "Discover the RLS view leak" },
  { branch: "step/4-fix-skill", description: "Iterate on the skill to catch the leak" },
  { branch: "step/5-eval-setup", description: "Automate testing with Braintrust evals" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonRpcResult(id: string | number | null, result: unknown) {
  return Response.json(
    { jsonrpc: "2.0", id, result },
    { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
  );
}

function jsonRpcError(id: string | number | null, code: number, message: string) {
  return Response.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
  );
}

function slideToMarkdown(slide: Slide): string {
  let md = `# ${slide.title}\n`;
  if (slide.subtitle) md += `\n_${slide.subtitle}_\n`;
  if (slide.bullets.length > 0) {
    md += "\n";
    for (const b of slide.bullets) {
      md += `- ${b}\n`;
    }
  }
  if (slide.source) {
    md += `\n> Source: [${slide.source.label}](${slide.source.url})\n`;
  }
  return md;
}

// ---------------------------------------------------------------------------
// Tool definitions (MCP tool schema)
// ---------------------------------------------------------------------------

const TOOL_DEFINITIONS = [
  {
    name: "list_slides",
    description: "List all slides in the workshop presentation. Returns an array of { id, title }.",
    inputSchema: { type: "object" as const, properties: {}, required: [] as string[] },
  },
  {
    name: "get_slide",
    description: "Get the markdown content for a specific slide by its ID.",
    inputSchema: {
      type: "object" as const,
      properties: { id: { type: "string", description: "The slide ID (e.g. 'title', 'demo')" } },
      required: ["id"],
    },
  },
  {
    name: "get_all_slides",
    description: "Get the full presentation as a single markdown document.",
    inputSchema: { type: "object" as const, properties: {}, required: [] as string[] },
  },
  {
    name: "get_workshop_info",
    description: "Get workshop metadata and step branches for catching up.",
    inputSchema: { type: "object" as const, properties: {}, required: [] as string[] },
  },
];

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_slides":
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              slides.map((s) => ({ id: s.id, title: s.title })),
              null,
              2,
            ),
          },
        ],
      };

    case "get_slide": {
      const id = args.id as string | undefined;
      if (!id) {
        return { content: [{ type: "text", text: "Error: missing required parameter 'id'" }], isError: true };
      }
      const slide = slides.find((s) => s.id === id);
      if (!slide) {
        return {
          content: [{ type: "text", text: `Error: slide not found with id '${id}'. Use list_slides to see available IDs.` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: slideToMarkdown(slide) }] };
    }

    case "get_all_slides":
      return {
        content: [
          {
            type: "text",
            text: slides.map(slideToMarkdown).join("\n---\n\n"),
          },
        ],
      };

    case "get_workshop_info":
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                title: WORKSHOP_TITLE,
                event: WORKSHOP_EVENT,
                presenter: WORKSHOP_PRESENTER,
                organization: WORKSHOP_ORG,
                totalSlides: slides.length,
                stepBranches: STEP_BRANCHES,
              },
              null,
              2,
            ),
          },
        ],
      };

    default:
      return { content: [{ type: "text", text: `Error: unknown tool '${name}'` }], isError: true };
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // MCP streamable HTTP transport uses POST for JSON-RPC
  if (req.method === "GET") {
    return Response.json(
      {
        name: "workshop-mcp",
        description: "MCP server for the Level Up Your Skills workshop",
        version: "1.0.0",
      },
      { headers: CORS_HEADERS },
    );
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
  }

  let body: { jsonrpc?: string; method?: string; params?: Record<string, unknown>; id?: string | number | null };
  try {
    body = await req.json();
  } catch {
    return jsonRpcError(null, -32700, "Parse error");
  }

  const { method, params, id } = body;

  switch (method) {
    // -----------------------------------------------------------------------
    // initialize
    // -----------------------------------------------------------------------
    case "initialize":
      return jsonRpcResult(id ?? null, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: "workshop-mcp",
          version: "1.0.0",
        },
      });

    // -----------------------------------------------------------------------
    // notifications/initialized — client acknowledgement, no response needed
    // -----------------------------------------------------------------------
    case "notifications/initialized":
      return new Response(null, { status: 204, headers: CORS_HEADERS });

    // -----------------------------------------------------------------------
    // tools/list
    // -----------------------------------------------------------------------
    case "tools/list":
      return jsonRpcResult(id ?? null, { tools: TOOL_DEFINITIONS });

    // -----------------------------------------------------------------------
    // tools/call
    // -----------------------------------------------------------------------
    case "tools/call": {
      const toolName = (params?.name as string) ?? "";
      const toolArgs = (params?.arguments as Record<string, unknown>) ?? {};
      const result = handleToolCall(toolName, toolArgs);
      return jsonRpcResult(id ?? null, result);
    }

    // -----------------------------------------------------------------------
    // ping
    // -----------------------------------------------------------------------
    case "ping":
      return jsonRpcResult(id ?? null, {});

    default:
      return jsonRpcError(id ?? null, -32601, `Method not found: ${method}`);
  }
});
