---
name: git-flow
description: Enforces structured Git Flow for feature branches, simple and assertive English copy, high-signal commit messages, and verification of GitHub Actions and Vercel build checks before merging.
---

# Git Flow & Build Verification

## Overview

Use this workflow for every codebase modification. Never commit directly to `main`. Work strictly in feature branches, enforce simple and assertive English across all copy, and ensure all CI checks (GitHub Actions and Vercel) succeed before merging.

---

## 1. Branching Strategy

1. **Synchronize `main`**:
   Before starting any work, switch to `main` and pull the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a dedicated branch**:
   Branch off `main` using lowercase kebab-case with an explicit category prefix:
   - `feature/<description>` — New features or capabilities.
   - `fix/<description>` — Bug fixes or corrections.
   - `docs/<description>` — Documentation and knowledge base updates.
   - `chore/<description>` — Tooling, dependency, or configuration updates.
   ```bash
   git checkout -b feature/<descriptive-name>
   ```
3. **Keep branches focused**:
   Limit each branch to a single logical objective.

---

## 2. Language and Tone Standards

All UI copy, documentation, commit messages, and PR descriptions must use **simple, assertive English**:

- **Assertive and direct**: Use active voice and clear statements. State what the system does or what the change achieves.
  - *Good*: "Enables dark mode across all pages."
  - *Avoid*: "This PR tries to implement dark mode which might help users."
- **Simple vocabulary**: Prefer plain, concise words over convoluted phrasing. Keep sentences short and unambiguous.
- **Zero hedging**: Remove apologetic or tentative words such as "maybe", "probably", "could possibly", "seems to", "attempted fix".
- **Imperative commit titles**: State actions as direct instructions (e.g., "Add...", "Fix...", "Update...").

---

## 3. Local Verification

Before committing changes, execute project verification steps locally:

1. **Lint and formatting**:
   ```bash
   npm run lint
   ```
2. **Build and type checking**:
   ```bash
   npm run build
   ```
3. **Verify Git state**:
   Inspect status and diff to confirm only intended files are modified:
   ```bash
   git status
   git diff
   ```

---

## 4. Committing Changes

1. **Stage specific files**:
   Stage only the files related to the task. Avoid `git add .` or staging untracked scratch files.
   ```bash
   git add <path/to/changed/files>
   ```
2. **Write high-signal commit messages**:
   Structure messages with an imperative title and a concise summary of the rationale:
   ```bash
   git commit -m "<Type>: <Assertive summary>

   - Detail key change and rationale.
   - Note any configuration or dependency updates."
   ```
   *Types*: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

---

## 5. Remote Push & Pull Request

1. **Push branch to origin**:
   ```bash
   git push -u origin <branch-name>
   ```
2. **Open Pull Request via GitHub CLI**:
   Create the pull request with a concise title and clear description:
   ```bash
   gh pr create --title "<Type>: <Assertive summary>" --body "<Clear summary of changes and verification steps>"
   ```

---

## 6. GitHub Actions & Vercel Verification

Both GitHub Actions and Vercel build/deploy previews run on pull requests. Never merge without verifying both:

1. **Monitor checks**:
   Watch all status checks until completion:
   ```bash
   gh pr checks <pr-number> --watch
   ```
2. **Verify check requirements**:
   - **GitHub Actions**: Workflows (such as build, lint, and test jobs) must pass with `pass` / `success`.
   - **Vercel**: Preview deployment and build check must report `pass` / `success`.
3. **Resolve failures promptly**:
   If any check fails:
   - Inspect failure logs:
     ```bash
     gh run view --log-failed
     ```
   - Diagnose the root cause locally, apply fixes, re-test locally (`npm run build`).
   - Commit fixes and push to the branch. The checks will automatically re-run.

---

## 7. Merging & Cleanup

1. **Merge the pull request**:
   Once all checks pass, squash-merge into `main` and delete the remote branch:
   ```bash
   gh pr merge <pr-number> --squash --delete-branch
   ```
   Or enable auto-merge if checks are currently pending:
   ```bash
   gh pr merge <pr-number> --auto --squash --delete-branch
   ```
2. **Return to local `main` and synchronize**:
   ```bash
   git checkout main
   git pull origin main
   ```
3. **Delete local branch**:
   ```bash
   git branch -d <branch-name>
   ```
