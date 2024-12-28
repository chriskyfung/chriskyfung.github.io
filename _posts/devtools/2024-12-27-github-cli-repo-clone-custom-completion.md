---
layout: post
title: "Speed Up GitHub CLI: Custom Completion for 'gh repo clone' Command"
author: chris
date: 2024-12-27 15:12 +0800
permalink: /blog/devtools/github-cli-repo-clone-custom-completion/
redirect_from:
   - /github-cli-repo-clone-custom-completion/
image:
   width: "730"
   height: "431"
   path: /images/posts/devtools/gh-repo-clone-custom-completion-cover.jpg
fmContentType: post
keywords: github cli, gh repo clone, bash completion, zsh completion, git automation
categories:
   - Developer tools
tags:
   - Bash
   - Command-line
   - GitHub CLI
   - Autocompletions
excerpt: Learn how to supercharge your GitHub CLI experience with custom bash completion for the 'gh repo clone' command. Includes step-by-step setup and practical examples.
css:
   syntax: true
---

Ever found yourself typing `gh repo clone` and struggling to remember repository names? I've been there. As a developer who works with dozens of repositories daily, I needed a better solution. That's why I created a custom completion script that makes the GitHub CLI's clone command more powerful and user-friendly.

## Why Custom Completion Matters

While the standard `gh repo clone` is incredibly useful, it lacks intelligent autocompletion. Here's what you're missing:

```bash
$ gh repo clone my<tab>
my-awesome-project    my-docker-images     my-python-scripts
```

I struggled to recall exact repository names, some of which are a mouthful. Then there were the flags that I could never remember. These tiny hurdles added up, hindering productivity, especially for those who constantly work with multiple repositories.

Driven by the desire for seamless interaction, I embarked on a quest to enhance my command-line experience. Instead of wrestling with repository names and flags, I decided to create a custom completion script for the `gh repo clone` command. The script enables:

- **Smart Repository Suggestions**: Instantly see matching repositories as you type.
- **Flag Completion**: Access additional `git clone` options for `gh repo clone` by pressing `tab` twice after the `--` flag.

The completion script automatically populates suggestions, enabling faster interaction and execution with the GitHub CLI.

### Common Use Cases

```bash
# Clone to a custom directory
gh repo clone username/repo

# Clone with a specific branch
gh repo clone username/repo -- --branch feature-branch

# Clone with depth limit
gh repo clone username/repo -- --depth 1
```

## Quick Setup Guide

1. **Install the completion script**:

   ```bash
   curl -o ~/.gh-repo-clone-completion.bash https://gist.github.com/chriskyfung/50039cb2a9b586047adc2726085c6280/raw/.bash_profile
   ```

   You can view the source code on **[GitHub Gist](https://gist.github.com/chriskyfung/50039cb2a9b586047adc2726085c6280)**.

2. **Add to your shell**:

   ```bash
   echo 'source ~/.gh-repo-clone-completion.bash' >> ~/.bashrc  # for bash
   # OR
   echo 'source ~/.gh-repo-clone-completion.bash' >> ~/.zshrc   # for zsh
   ```

3. **Verify the Setup**:

   Type `gh repo clone <tab>` in your terminal. If set up correctly, you should see repository suggestions as you type.

   Type `gh repo clone -- <tab>` in your terminal. You should see additional `git clone` flags by listing them after `--`.

## Wrapping Up

Adding this custom completion function can really level up your GitHub CLI game, making it smoother and more user-friendly without the little frustrations. Give it a try and see how much faster your GitHub workflow becomes.

Got questions or suggestions?
Feel free to contribute to the script on GitHub!  \
Happy coding! 🚀
