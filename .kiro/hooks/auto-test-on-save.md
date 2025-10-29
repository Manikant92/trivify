---
name: "Auto Test on Save"
description: "Automatically run tests when TypeScript files are saved"
trigger: "file_save"
filePattern: "src/**/*.{ts,tsx}"
---

# Auto Test Hook

This hook automatically runs tests whenever you save a TypeScript file in the src directory.

## Actions:
1. Run TypeScript compilation check
2. Run ESLint for code quality
3. Run unit tests if they exist
4. Show results in terminal

This ensures code quality and catches issues early in development.