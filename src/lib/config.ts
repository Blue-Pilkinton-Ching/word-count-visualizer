// Log a firebase event when the word count changes after this delay to capture the final value the user entered
export const WORD_COUNT_EVENT_SUBMISSION_DELAY = 3000;

// The maximum word count that can generated. (Words generated is clamped to this)
export const MAX_WORD_COUNT = 50000;

// Prerender /words/[count] pages for these word counts
export const RENDER_PAGES_WITH_WORD_COUNT = [
	50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 2500,
	3000, 4000, 5000
];
