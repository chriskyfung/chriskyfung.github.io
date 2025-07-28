# Gemini Project Context: chriskyfung.github.io

This document provides essential context for the Gemini AI assistant to work effectively with this repository.

## Project Overview

- **Project Name:** Chris KY FUNG's Personal Blog
- **Owner:** Chris KY FUNG
- **Core Purpose:** A personal blog and project showcase.
- **Copyright:** © 2014-2025 Chris KY FUNG, All Rights Reserved.

## Core Technologies & Architecture

- **Static Site Generator:** Jekyll (`~> 4.3.4`)
- **Hosting:** GitHub Pages
- **Primary Architectural Constraint:** **AMP-first**. All content, layouts, and components are designed to be AMP-compliant.
- **Jekyll Theme:** `amp-affiliately-jekyll-theme` used as a `remote_theme`. This means most theme layout files are not present in this repository directly.
- **Package Management:**
  - **Ruby:** `bundler` (`Gemfile`) for Jekyll and its plugins.
  - **Node.js:** `npm` (`package.json`) for build-time tooling.

## Build & Deployment Workflow

The site is built and deployed automatically via a GitHub Actions workflow defined in `.github/workflows/jekyll-build.yml`. The process is as follows:

1. **Trigger:** A `push` to the `remote-theme` branch or a manual `workflow_dispatch`.
2. **Install Dependencies:** `bundle install` (Ruby gems) and `npm install` (Node.js packages) are run.
3. **Jekyll Build:** `bundle exec jekyll build` generates the site into the `./_site` directory.
4. **Post-Processing (Gulp):** `npx gulp build` is executed. This is a **critical step** defined in `gulpfile.mjs` that:
    - Runs the `@ampproject/toolbox-optimizer` on all generated HTML files.
    - Minifies the final HTML.
5. **AMP Validation:** The workflow includes steps (`test`, `validate` in Gulp) to validate the final output for AMP compliance.
6. **Deploy:** The processed `./_site` directory is deployed to GitHub Pages.

## Development & Content Management

### Developer Documentation

A detailed guide for setting up the local development environment is available in **[_docs/development.md](./_docs/development.md)**. This is the primary source of truth for onboarding and local builds.

### Content Management System (CMS)

- **Tool:** [Front Matter CMS](https://frontmatter.codes/) for VS Code. This is the primary tool for managing content.
- **Configuration:**
  - Main config: `frontmatter.json`
  - Content Types (`post`, `page`): `.frontmatter/config/taxonomy/contentTypes/`
  - **Snippets:** An extensive library of snippets exists in `.frontmatter/config/content/snippets/`. These are the **preferred way** to insert complex elements like AMP components, Jekyll includes, and kramdown syntax to ensure consistency and correctness.
- **Custom UI:** `.frontmatter/ui/external.js` adds a custom preview image to the Front Matter content dashboard.

### Linting

- **Tool:** `markdownlint-cli2`
- **Configuration:** `.markdownlint-cli2.yaml`
- **Key Rules (Intentional):**
  - `MD033: false`: **Inline HTML is allowed and necessary.** This is to support custom AMP components (e.g., `<amp-img>`, `<amp-gist>`) and other HTML required by the theme. Do not attempt to "fix" posts by removing HTML.
  - `MD013: false`: Line length is not enforced.
  - `MD034: false`: Bare URLs are allowed.

### Commit Message Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification, with the addition of Gitmojis. The format is:

`emoji type(scope): subject`

- **Emoji:** A relevant Gitmoji character (e.g., ✨, 🐛, 📝).
- **Type:** A standard conventional commit type (e.g., `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`).
- **Scope (Optional):** The part of the codebase affected (e.g., `post`, `config`, `workflow`, `deps`).
- **Subject:** A short, imperative-tense description of the change.

**Examples from Git History:**
- `✨ feat(contact): enhance contact form with validation`
- `✏️ fix(matlab): fix formatting for Plotly link`
- `📝 docs(posts): add guide on fixing old emails in Git history`
- `💚 build(workflow): update Ruby version to 3.3.6 in Jekyll build workflow`
- `🚨 style(comments): update markdown comments for improved linting compliance`

### Key Configuration Files

- `_config.yml`: Main Jekyll configuration (site settings, plugins, analytics, etc.).
- `Gemfile`: Defines Jekyll version and all Jekyll plugins.
- `package.json`: Defines Node.js development dependencies (Gulp, AMP Optimizer, etc.).
- `gulpfile.mjs`: Contains the essential post-processing logic for AMP optimization and validation.
- `frontmatter.json`: The central configuration for the Front Matter CMS.
- `.markdownlint-cli2.yaml`: Defines the Markdown linting rules.
- `.github/workflows/jekyll-build.yml`: Defines the CI/CD and deployment pipeline.

## Development Constraints

- **`bigdecimal` Gem Build Failure:** The `bigdecimal` Ruby gem (a dependency of `google-protobuf` -> `sass-embedded`) fails to build on the Windows host environment. Do not attempt to update `bigdecimal`, `google-protobuf`, or `sass-embedded` until the underlying build issue on Windows is resolved.