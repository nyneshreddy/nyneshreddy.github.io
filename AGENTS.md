# Agent Guidelines & Project Overview

This repository powers the personal website of Nynesh Reddy Gujjula. It is built with Next.js 14 App Router, Contentlayer, React 18, and Tailwind CSS. The site exports as a static web application (`output: 'export'`) and deploys to both GitHub Pages and a Raspberry Pi web server running Nginx via Tailscale Funnel. Vercel is used as a build and preview deployment tool.

---

## Agent Skills & Git Flow

All AI agents interacting with this repository must follow the structured Git Flow defined in [`.agents/skills/git-flow/SKILL.md`](.agents/skills/git-flow/SKILL.md).

### Core Principles

1. **Git Identity & Credentials**:
   - Ensure repository `user.name` and `user.email` match the verified GitHub profile (`Nynesh Reddy Gujjula <nyneshreddy@gmail.com>`).
   - Use `gh auth git-credential` as the credential helper.
2. **Branching**:
   - Never commit directly to `main`.
   - Always create and switch to a dedicated branch (`feature/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`).
3. **Language and Tone**:
   - Write all UI copy, documentation, code comments, commit messages, and PR descriptions in **simple and assertive English**.
   - Use direct, active voice. Eliminate hedging, tentative words, and apologies.
4. **Commit Messages**:
   - Write clear, imperative, high-signal commit messages explaining why the change was made.
5. **Pre-PR User Confirmation**:
   - Always ask the user if they want to add more changes to the branch before creating a pull request.
6. **Pre-Merge Verification**:
   - Once confirmed, push the branch and open a pull request using `gh pr create`.
   - Verify that **both** GitHub Actions and Vercel build checks pass (`gh pr checks <pr> --watch`).
   - Do not merge until all automated checks are green.
7. **Merging & Post-Merge Deployment**:
   - Squash-merge into `main` and delete the feature branch.
   - Monitor the post-merge production deployment (`gh run list --branch main --limit 1` and `gh run watch <run-id>`) until completion.
   - Pull the updated `main` branch locally.

---

## Commands & Tooling

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the local Next.js development server |
| `pnpm lint` | Run Biome linter checks |
| `pnpm lint:fix` | Automatically apply safe Biome lint fixes |
| `pnpm format` | Format repository code using Biome |
| `pnpm typecheck` | Run TypeScript compiler type checking without emitting files |
| `pnpm check` | Run Biome checks and TypeScript type checking |
| `pnpm build` | Compile Contentlayer and generate static export to `out/` |
| `bash build.sh` | Clean build script using nvm and pnpm |
| `bash deploy.sh` | Deploy to Raspberry Pi container environment |

---

## Architectural Conventions

- **Static Export**: The application outputs static files (`out/`). Avoid server-side route handlers or request-time APIs.
- **Content Source**: Contentlayer manages content from `content/about/`, `content/articles/`, and `content/projects/`.
- **Path Aliases**: Follow existing import patterns defined in `tsconfig.json`.
