const ALLOWED_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "chore",
];

const SUBJECT_MAX_LENGTH = 72;

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ALLOWED_TYPES],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", SUBJECT_MAX_LENGTH],
  },
};
