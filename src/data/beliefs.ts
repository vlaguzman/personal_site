import type { Belief } from "./types";

export const BELIEFS_INTRO = {
  statement: "Build with ambition. Act with integrity. Stay human.",
  text: "I believe entrepreneurship can create freedom and opportunity, but it should never become an excuse to lose sight of what matters.",
} as const;

export const BELIEFS: Belief[] = [
  {
    title: "Success should mean more than money.",
    text: "Profit matters. Financial sustainability matters. But neither is a complete definition of a successful life or a meaningful business.",
  },
  {
    title: "Nobody builds anything meaningful alone.",
    text: "Entrepreneurship may begin with individual initiative, but lasting progress depends on relationships, collaboration and generosity.",
  },
  {
    title: "Technology should expand human potential, not replace human purpose.",
    text: "AI and automation are powerful tools, but adopting technology without asking what it improves is not innovation.",
  },
  {
    title: "Integrity is tested when it becomes inconvenient.",
    text: "Courage sometimes means challenging the consensus, admitting uncertainty, turning down an opportunity or starting again.",
  },
  {
    title: "Build a life worth living, not just a business worth selling.",
    text: "Professional achievement should not automatically outrank relationships, personal growth and the things that give life meaning.",
  },
];
