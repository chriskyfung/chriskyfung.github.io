# Development Guide

This guide provides detailed instructions for setting up and running this project locally.

## Prerequisites

This project requires a specific combination of Ruby and Node.js versions.

- **Ruby:** Version `3.3.6` (as specified in the GitHub Actions workflow).
- **Node.js:** A recent LTS version (e.g., 18.x or 20.x).
- **Bundler:** A modern version of Bundler for managing Ruby gems.

It is highly recommended to use a version manager like `rbenv` or `asdf` for Ruby and `nvm` or `asdf` for Node.js to avoid conflicts with system-wide installations.

## 1. Initial Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/chriskyfung/chriskyfung.github.io.git
    cd chriskyfung.github.io
    ```

2. **Install Ruby Dependencies:**
    Install the correct Ruby version and then use Bundler to install the required gems.

    ```bash
    # Using rbenv (example)
    rbenv install 3.3.6
    rbenv local 3.3.6

    # Install gems
    bundle install
    ```

3. **Install Node.js Dependencies:**
    Install the correct Node.js version and then use npm to install the packages.

    ```bash
    # Using nvm (example)
    nvm install
    nvm use

    # Install packages
    npm install
    ```

## 2. Local Development Server

To preview the site locally, you need to run the Jekyll server.

```bash
bundle exec jekyll serve --livereload
```

This will start a local server at `http://localhost:4000`. The `--livereload` flag automatically refreshes the browser when you make changes to content and source files.

**Note:** The local server runs the site _before_ the Gulp-based AMP optimization and minification. The output will be functional but not identical to the final production build.

## 3. Content Management with Front Matter CMS

This project is configured for use with the **[Front Matter CMS](https://frontmatter.codes/)** extension for Visual Studio Code.

1. Install the [Front Matter CMS extension](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter) from the VS Code Marketplace.
2. Open the project folder in VS Code.
3. Open the Front Matter dashboard by clicking the icon in the activity bar.

From the dashboard, you can create, edit, and manage all posts and pages. The CMS uses the configurations in `frontmatter.json` and the `.frontmatter` directory to provide a tailored editing experience with custom fields and snippets.

Using the built-in snippets is the **recommended way** to add complex elements like AMP components or Jekyll includes.

## 4. Building for Production

To replicate the production build process locally, you must run the same sequence of commands used in the GitHub Actions workflow.

1. **Build the Jekyll site:**

    ```bash
    bundle exec jekyll build
    ```

    This generates the site into the `./_site` directory.

2. **Run Gulp Post-Processing:**

    ```bash
    npx gulp build
    ```

    This runs the AMP optimizer and HTML minifier on the files in `./_site`.

After these steps, the `./_site` directory will contain the final, optimized files that are deployed to GitHub Pages.

## 5. Linting

To ensure content quality and consistency, run the Markdown linter:

```bash
npm run lint
```

_(Note: You may need to add a `lint` script to `package.json` like `"lint": "markdownlint-cli2 \"**/*.md\""` if it doesn't exist.)_
