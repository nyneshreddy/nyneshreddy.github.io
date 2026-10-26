# Project Instructions & Workflow

## Git Flow Protocol

1. **Branch Isolation**: Never commit directly to `main`. Always work on dedicated feature/fix branches.
2. **Language Tone**: Use simple, assertive, and active English across all code comments, documentation, and commit messages.
3. **Local Validation**: Run `pnpm check` (Biome checks + TypeScript compilation) and `pnpm build` before committing.
4. **Pre-PR User Confirmation**: Always ask the user if they want to add more changes to the branch before creating a pull request.
5. **CI & Vercel Verification**: Watch status checks on pull requests with `gh pr checks <pr> --watch`. Verify both GitHub Actions and Vercel build previews pass before merging.
6. **Post-Merge Deployment**: Watch the production deployment run on `main` to completion (`gh run watch <run-id>`) before concluding any task.
