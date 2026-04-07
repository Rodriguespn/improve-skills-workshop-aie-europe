export interface SlideSource {
  label: string;
  url: string;
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  notes?: string;
  source?: SlideSource;
}

export const WORKSHOP_TITLE = "Level Up Your Skills";
export const WORKSHOP_EVENT = "AI Engineer Europe 2026";
export const WORKSHOP_PRESENTER = "Pedro Rodrigues";
export const WORKSHOP_ORG = "Supabase";

export const slides: Slide[] = [
  {
    id: "title",
    title: "Level Up Your Skills",
    subtitle: "Writing and testing agent skills, hands-on",
    bullets: [
      `${WORKSHOP_PRESENTER} — ${WORKSHOP_ORG}`,
      WORKSHOP_EVENT,
    ],
  },
  {
    id: "what-are-skills",
    title: "What Are Skills?",
    bullets: [
      "Defined in a SKILL.md file alongside your code",
      "Discoverable by any agent that reads the repo",
      "Testable with evals, just like any other code",
    ],
  },
  {
    id: "testing-with-evals",
    title: "Testing with Evals",
    bullets: [
      "Define the metrics that matter",
      "Create the skill under test",
      "Test it manually first",
      "Build structured test cases",
      "Grade outputs automatically",
      "Iterate until the scores hold",
    ],
    source: {
      label: "OpenAI — Testing Agent Skills Systematically with Evals",
      url: "https://developers.openai.com/blog/eval-skills",
    },
  },
  {
    id: "what-were-doing",
    title: "What We're Doing",
    bullets: [
      "Write a product-aware skill (using Supabase as our example)",
      "Test it manually against a real database",
      "Discover an RLS view leak",
      "Iterate on the skill to catch it",
      "Validate with the eval harness",
    ],
  },
  {
    id: "demo",
    title: "Demo",
    subtitle: "From zero to a skill that knows your product",
    bullets: ["Write", "Test", "Break", "Fix"],
  },
  {
    id: "eval-harness",
    title: "Eval Harness",
    bullets: [
      "Prompts and assertions defined in evals.json",
      "Run with_skill vs without_skill in isolated sessions",
      "Grade assertions, capture timing",
      "Benchmark delta shows the skill's value",
    ],
  },
  {
    id: "final-remarks",
    title: "Final Remarks",
    bullets: [
      "Measure everything — vibes don't scale",
      "Principles over templates",
      "Small iterations, fast feedback",
      "Combine Skills and MCP to Close the Context Gap — April 9, 3:10-3:30pm, St. James",
    ],
  },
];


export const STEP_BRANCHES = [
  { branch: "step/1-first-skill", description: "Write the initial Supabase security skill" },
  { branch: "step/2-manual-test", description: "Test the skill manually against a live database" },
  { branch: "step/3-break-it", description: "Discover the RLS view leak" },
  { branch: "step/4-fix-skill", description: "Iterate on the skill to catch the leak" },
  { branch: "step/5-eval-setup", description: "Run the eval harness against the fixed skill" },
];
