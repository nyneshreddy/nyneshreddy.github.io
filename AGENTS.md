# Agent Guidelines & Project Overview

This repository powers the personal website of Nynesh Reddy Gujjula. It is built with Next.js 14 App Router, Contentlayer, React 18, and Tailwind CSS. The site exports as a static web application (`output: 'export'`) and deploys to both GitHub Pages and a Raspberry Pi web server running Nginx via Tailscale Funnel. Vercel is used as a build and preview deployment tool.

---

## Agent Skills & Git Flow

All AI agents interacting with this repository must follow the structured Git Flow defined in [`.agents/skills/git-flow/SKILL.md`](.agents/skills/git-flow/SKILL.md).

### Core Principles

1. **Branching**:
   - Never commit directly to `main`.
   - Always create and switch to a dedicated branch (`feature/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`).
2. **Language and Tone**:
   - Write all UI copy, documentation, code comments, commit messages, and PR descriptions in **simple and assertive English**.
   - Use direct, active voice. Eliminate hedging, tentative words, and apologies.
3. **Commit Messages**:
   - Write clear, imperative, high-signal commit messages explaining why the change was made.
4. **Verification**:
   - Run local checks (`npm run lint`, `npm run build`) before pushing.
   - Open a pull request using `gh pr create`.
   - Verify that **both** GitHub Actions and Vercel build checks pass (`gh pr checks --watch`).
   - Do not merge until all automated checks are green.
5. **Merging**:
   - Squash-merge into `main` and delete the feature branch.
   - Pull the updated `main` branch locally.

---

## Commands & Tooling

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Compile Contentlayer and generate static export to `out/` |
| `bash build.sh` | Clean build script using nvm and `npm ci` |
| `bash deploy.sh` | Deploy to Raspberry Pi container environment |

---

## Architectural Conventions

- **Static Export**: The application outputs static files (`out/`). Avoid server-side route handlers or request-time APIs.
- **Content Source**: Contentlayer manages content from `content/about/`, `content/articles/`, and `content/projects/`.
- **Path Aliases**: Follow existing import patterns defined in `tsconfig.json`.
