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
      "Write a Supabase security skill",
      "Test it manually against a real database",
      "Discover an RLS view leak",
      "Iterate on the skill to catch it",
      "Automate the whole loop with Braintrust",
    ],
  },
  {
    id: "demo",
    title: "Demo",
    subtitle: "Let's write a Supabase security skill from scratch",
    bullets: ["Write", "Test", "Break", "Fix"],
  },
  {
    id: "braintrust",
    title: "Braintrust",
    subtitle: "From manual checks to automated evals",
    bullets: [
      "Track every run with structured logging",
      "Score outputs against expected results",
      "Compare runs side-by-side",
      "Catch regressions before they ship",
    ],
  },
  {
    id: "final-remarks",
    title: "Final Remarks",
    bullets: [
      "Measure everything — vibes don't scale",
      "Principles over templates",
      "Small iterations, fast feedback",
      "Tomorrow's talk: taking it further",
    ],
  },
  {
    id: "thank-you",
    title: "Thank You",
    subtitle: "Now go level up your skills.",
    bullets: ["@pedrorgz", "supabase.com"],
  },
];

export function slideToMarkdown(slide: Slide): string {
  const lines: string[] = [];

  lines.push(`# ${slide.title}`);

  if (slide.subtitle) {
    lines.push(`*${slide.subtitle}*`);
  }

  lines.push("");

  for (const bullet of slide.bullets) {
    lines.push(`- ${bullet}`);
  }

  if (slide.source) {
    lines.push("");
    lines.push(`> Source: [${slide.source.label}](${slide.source.url})`);
  }

  if (slide.notes) {
    lines.push("");
    lines.push(`<!-- Notes: ${slide.notes} -->`);
  }

  return lines.join("\n");
}

export function allSlidesToMarkdown(): string {
  const header = `# ${WORKSHOP_TITLE}\n**${WORKSHOP_EVENT}** — ${WORKSHOP_PRESENTER}, ${WORKSHOP_ORG}\n`;
  const body = slides.map(slideToMarkdown).join("\n\n---\n\n");
  return `${header}\n---\n\n${body}\n`;
}

export const STEP_BRANCHES = [
  { branch: "step/1-first-skill", description: "Write the initial Supabase security skill" },
  { branch: "step/2-manual-test", description: "Test the skill manually against a live database" },
  { branch: "step/3-break-it", description: "Discover the RLS view leak" },
  { branch: "step/4-fix-skill", description: "Iterate on the skill to catch the leak" },
  { branch: "step/5-eval-setup", description: "Automate testing with Braintrust evals" },
];
