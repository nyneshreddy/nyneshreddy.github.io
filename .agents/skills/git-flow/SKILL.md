---
name: git-flow
description: Enforces structured Git Flow for feature branches, repository identity and credential setup, simple and assertive English copy, high-signal commit messages, verification of GitHub Actions and Vercel build checks, and post-merge deployment monitoring.
---

# Git Flow & Deployment Verification

## Overview

Use this workflow for every codebase modification. Never commit directly to `main`. Work strictly in feature branches, ensure correct author credentials, enforce simple and assertive English across all copy, verify all CI and Vercel checks before merging, and monitor post-merge production deployments until completion.

---

## 1. Git Identity & Credential Setup

Before creating commits, verify and configure repository-level identity and credential helpers:

1. **Verify author identity**:
   Check that repository `user.name` and `user.email` match the verified GitHub profile to avoid fallback to local machine hostnames:
   ```bash
   git config user.name "Nynesh Reddy Gujjula"
   git config user.email "nyneshreddy@gmail.com"
   ```
2. **Configure GitHub CLI credential helper**:
   Ensure Git routes authentication through the authenticated `gh` CLI session:
   ```bash
   git config credential.helper '!gh auth git-credential'
   ```
3. **Handle sandboxed environment overrides**:
   Certain IDE or container environments inject empty Git credential overrides (such as `GIT_CONFIG_COUNT`, `GIT_CONFIG_KEY_0=credential.helper`, and `GIT_CONFIG_VALUE_0=`). When running `git push`, unmask these variables if prompts fail:
   ```bash
   env -u GIT_CONFIG_COUNT -u GIT_CONFIG_KEY_0 -u GIT_CONFIG_VALUE_0 git push -u origin <branch-name>
   ```

---

## 2. Branching Strategy

1. **Synchronize `main`**:
   Always branch from an up-to-date `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a dedicated branch**:
   Use lowercase kebab-case prefixed with a task category:
   - `feature/<description>` — New features or functionality.
   - `fix/<description>` — Bug fixes and corrections.
   - `docs/<description>` — Documentation or agent skill updates.
   - `chore/<description>` — Tooling, dependency, or configuration updates.
   ```bash
   git checkout -b feature/<descriptive-name>
   ```
3. **Isolate scope**:
   Confine changes to the branch objective. Do not bundle unrelated modifications.

---

## 3. Language and Tone Standards

All UI text, documentation, commit messages, and PR descriptions must use **simple, assertive English**:

- **Active and direct**: State actions and system behavior confidently using active voice.
  - *Good*: "Enables dark mode across all pages."
  - *Avoid*: "This change might help with enabling dark mode."
- **Concise phrasing**: Keep sentences short, clear, and unambiguous. Avoid filler and excessive technical jargon.
- **Zero hedging**: Eliminate speculative or tentative phrasing (e.g., "maybe", "probably", "could possibly", "attempted fix").
- **Imperative commit titles**: State the commit action directly (e.g., "Add...", "Fix...", "Update...").

---

## 4. Local Verification

Validate modifications locally before staging:

1. **Linting and formatting**:
   ```bash
   pnpm check
   ```
2. **Type checking**:
   ```bash
   pnpm typecheck
   ```
3. **Build verification**:
   ```bash
   pnpm build
   ```
4. **Review diff**:
   Confirm that only intended files are changed:
   ```bash
   git status
   git diff
   ```

---

## 5. Committing Changes

1. **Stage specific files**:
   Stage only the relevant files. Never use `git add .` or stage temporary scratch files:
   ```bash
   git add <path/to/changed/files>
   ```
2. **Write high-signal commit messages**:
   Follow conventional commits format. Provide an imperative title and concise bullet points explaining why the change was made:
   ```bash
   git commit -m "<Type>: <Assertive summary>

   - Explain key modification and rationale.
   - Document any configuration or workflow updates."
   ```
   *Types*: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

---

## 6. Remote Push & Pull Request

1. **Push to origin**:
   Push the feature branch to the remote repository:
   ```bash
   git push -u origin <branch-name>
   ```
2. **Open Pull Request via GitHub CLI**:
   Provide a concise, assertive title and a clear summary:
   ```bash
   gh pr create --title "<Type>: <Assertive summary>" --body "## Summary
   - Itemize concrete changes.
   - Note verification steps."
   ```

---

## 7. Pre-Merge Check Verification (GitHub Actions & Vercel)

Every pull request triggers automated checks. Both GitHub Actions CI workflows and Vercel preview deployments must pass before merging:

1. **Monitor status checks**:
   Watch checks until completion:
   ```bash
   gh pr checks <pr-number> --watch
   ```
2. **Verify requirements**:
   - **Vercel**: Deployment status must report `Deployment has completed` (`pass` / `success`).
   - **GitHub Actions**: All CI jobs must pass with `pass` / `success`.
3. **Remediate failures**:
   If any check fails, inspect logs (`gh run view --log-failed`), apply fixes on the local branch, re-test locally, commit, and push.

---

## 8. Merging & Branch Cleanup

1. **Squash-merge and delete remote branch**:
   Once all checks pass, merge using GitHub CLI:
   ```bash
   gh pr merge <pr-number> --squash --delete-branch
   ```
2. **Switch to local `main`**:
   ```bash
   git checkout main
   git pull origin main
   ```
3. **Remove local branch**:
   ```bash
   git branch -d <branch-name>
   ```

---

## 9. Post-Merge Deployment Monitoring

Merging into `main` automatically triggers production deployments across platforms:

1. **GitHub Actions Production Deployment**:
   GitHub Pages deployment workflow (`Deploy Next.js site to Pages`) runs on pushes to `main`.
2. **Vercel Production Deployment**:
   Vercel builds and publishes the production deployment from `main`.
3. **Watch deployment to completion**:
   Retrieve the latest workflow run on `main` and watch until successful completion:
   ```bash
   gh run list --branch main --limit 1
   gh run watch <run-id>
   ```
4. **Confirm live stability**:
   Verify that the production deployment completed with `success` before closing the task.
