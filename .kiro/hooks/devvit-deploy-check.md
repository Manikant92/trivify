---
name: "Devvit Deploy Check"
description: "Pre-deployment validation for Devvit apps"
trigger: "manual"
---

# Devvit Deploy Check Hook

Manual hook to validate your Devvit app before deployment.

## Validation Steps:
1. Check devvit.yaml configuration
2. Validate TypeScript compilation
3. Run linting checks
4. Verify all required files exist
5. Test Redis operations
6. Check for proper error handling

Run this before uploading to ensure your app meets Reddit's standards.