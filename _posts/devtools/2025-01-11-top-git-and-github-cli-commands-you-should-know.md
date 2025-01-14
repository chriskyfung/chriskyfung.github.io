---
layout: post
title: "Mastering Git & GitHub CLI: Essential Commands You Should Know"
author: chris
date: 2025-01-14 16:01 +0800
permalink: /blog/devtools/mastering-git-github-cli-essential-commands/
redirect_from:
   - /blog/mastering-git-github-cli-essential-commands/
image:
   path: /images/posts/devtools/git-github-cli-cover.jpg
   width: "730"
   height: "417"
css:
   syntax: true
keywords:
   - Git
   - GitHub CLI
categories:
   - Developer tools
tags:
   - Git
   - GitHub CLI
   - User tips
   - Command-line
excerpt: Unlock the power of Git and GitHub CLI in your projects. Our detailed guide covers essential commands for researchers and developers, designed to streamline workflows, improve collaboration, and boost productivity.
---

Hello, future developers, engineers, researchers and scientists!

Whether you're studying computer science, conducting scientific research, working with data, or diving into AI and machine learning, mastering Git and GitHub can significantly enhance your workflow.

These tools are not just for traditional software developers; they play a crucial role in managing code, datasets, and collaborative projects across various scientific disciplines.

In this post, we’ll explore essential **[Git](https://git-scm.com)** and **[GitHub CLI](https://cli.github.com)** commands that will help you streamline your projects. _Let's get started!_

{% include toc.md %}

## 1. Essential Git Commands

### 1.1 Enable Git Tab Completion in Linux Bash

Imagine you're in the middle of an intense coding session, <kbd>Tab</kbd> completion speeds up command entry and minimizing errors, so you can focus more on what's important—your research.

**Command**:

```bash
source /usr/share/bash-completion/completions/git
```

### 1.2 Viewing Git History at a Glance

Picture this: You’re tracking the evolution of a complex code project. Viewing your Git history in a simplified one-line format helps you quickly review changes and ensure that your latest modifications align with your project's goals.

**Command**:

```bash
git log --oneline
```

### 1.3 Amend the Last Git Commit

When working with Git, you might need to amend the last commit for various reasons. This command is useful if you made a mistake in your commit message or forgot to include some changes.

**Command**:

```bash
git commit --amend
```

After running this command, your text editor will open with the commit message. You can edit the message and save the changes. The last commit will be updated with the new message.

**Command with `--date` option**:

```bash
git commit --amend --date="YYYY-MM-DDTHH:MM:SS"
```

By adding the `--date` flag, you can set a new date and time for the commit. For instance, if you made a commit but forgot to set the correct date, running this command will update the date of your last commit.

### 1.4 Undoing Changes: Soft Reset

When you realize there's an issue with your last commit, but you don't want to lose any of the changes, a soft reset can come to the rescue.

**Command**:

```bash
git reset --soft HEAD^
```

Unlike a hard reset, a soft reset doesn't discard changes. Your files remain exactly as they were, ready to be modified or recommitted. This is particularly useful when you've committed too soon or need to tweak something in your latest changes.

### 1.5 Interactive Rebase: Organize Your Commits

Interactive rebase lets you reorganize commit sequences for clarity, ensuring that every team member can easily track the project’s progress. You can reorder, squash, edit, or drop commits to clean up your commit history.

**Command**:

```bash
git rebase -i <base>
```

**Interactive Rebase With `--root` Option**:

The `--root` option extends interactive rebase to include the very first commit in your repository. This can be useful if you need to make changes that affect the entire history of the project, such as updating a license file in the initial commit.

**Command**:

```bash
git rebase -i --root
```

### 1.6 Cleaning Up: Remove Unwanted Files

During long research projects, clutter can quickly accumulate. Regularly cleaning up your repository by removing outdated files ensures your work remains tidy and efficient, much like a well-organized lab.

**Command**:

```bash
git rm -r dir1/ dir2/
git commit -m "Remove obsolete files"
```

### 1.7 Efficient Branch Management

Managing branches effectively in Git is crucial for maintaining a clean and organized project history. Here are some common commands and use cases for efficient branch management.

#### 1.7.1 Creating New Branches

Creating a new branch allows you to work on separate features or fixes without affecting the main branch. This command creates a new branch from the current branch and checks it out.

**Command**:

```bash
git checkout -b <new-branch-name>
```

#### 1.7.2 Cherry-Picking Commits

The `cherry-pick` command allows you to copy and apply changes from a specific commit in another branch to your current branch.

**Command**:

```bash
git cherry-pick <commit-ref>
```

#### 1.7.3 Rebasing Branches

Rebasing allows you to move or combine a sequence of commits on top of an upstream branch, which can help keep your project history linear and clean.

**Command**:

```bash
git rebase <upstream> <branch>
```

**Example**:

```bash
git rebase main feature-branch
```

This command takes the commits from `feature-branch` and applies them onto the `main` branch.

**Use cases**: If you’re developing different models for data analysis, creating separate branches lets you explore various methodologies concurrently. Once validated, you can merge the successful approaches into your main branch.

### 1.8 Pushing Commits to a Remote Repository

When it's time to share your hard work or back up your local changes to a remote repository, you'll need to push your commits. This command pushes all the commits from your specified local branch to the remote branch, ensuring your remote branch is in sync with your local changes.

**Command**:

```bash
git push origin <branch-name>
```

#### 1.8.1 Force Pushing

Force pushing lets you take control and overwrite the remote branch with your local branch, which is particularly useful after rewriting commit history, such as after a rebase or an amended commit, giving you a clean slate to work with.

**Command**:

```bash
git push --force
```

However, force pushing can be risky in a collaborative environment, as it may overwrite others' work, leading to conflicts or lost commits.

To reduce these risks, use `--force-with-lease` instead, which only pushes if no one else has updated the remote branch since your last fetch, adding a layer of safety.

**Command**:

```bash
git push --force-with-lease
```

Responsible use of force pushing helps maintain a clean and accurate project history while minimizing risks.

#### 1.8.2 Partial Push

Sometimes, you may need to push only specific commits to a remote repository rather than the entire branch. You can use the following command to achieve this:

**Command**:

```bash
git push origin <commit-ref>:<remote-branch>
```

This command pushes a specific commit along with all its predecessors to the specified remote branch.

**Example**:

```bash
git push origin abc1234:main
```

Using these commands effectively helps maintain a well-organized and efficient workflow, allowing you to control which commits are pushed to the remote repository.

## 2. Useful GitHub CLI Commands

The **GitHub CLI** provides a powerful set of tools for managing your repositories and streamlining your workflow. While this guide covers some of the most essential commands, we encourage you to explore the full list of commands available in the official manual to take full advantage of everything the GitHub CLI has to offer.

For more detailed information, refer to the official manual: 📄 [GitHub CLI Manual](https://cli.github.com/manual/)

### 2.1 Securely Authenticate with GitHub

In an era where data security is paramount, the [`gh auth login`](https://cli.github.com/manual/gh_auth_login) command allows you to authenticate with GitHub from the command line. You can use either a web browser or a token, ensuring a secure and efficient login process that securely connects your GitHub account.

**Command**:

```bash
gh auth login
```

### 2.2 List Repositories

Managing multiple repositories can be challenging, but with the [`gh repo list`](https://cli.github.com/manual/gh_repo_list) command, you can easily view all repositories for a specified owner. This command supports various flags that allow you to filter the list, providing a streamlined way to manage and navigate your projects efficiently.

**Command**:

```bash
gh repo list [<owner>] [flags]
```

### 2.3 Cloning Repositories

Cloning a repository is a fundamental operation when working with GitHub. The [`gh repo clone`](https://cli.GitHub.com/manual/gh_repo_clone) command simplifies this process by allowing you to quickly clone a repository to your local machine, ensuring you have the latest version of the codebase for development or review.

**Command**:

```bash
gh repo clone <repository> [<directory>]
```

While the basic cloning command is sufficient for many use cases, there are advanced techniques available to optimize the cloning process for specific scenarios. These techniques can save time and space, particularly when dealing with large repositories or limited storage.

#### 2.3.1 Perform a Shallow Clone

A shallow clone allows you to clone a repository with a limited history, which can significantly reduce the time and storage required.

**Command**:

```bash
gh repo clone <repository> -- --depth 1
```

#### 2.3.2 Perform a Partial Clone

A partial clone enables you to clone a repository without downloading all the history and large binary files, further optimizing time and space.

**Command**:

```bash
gh repo clone <repository> -- --filter=blob:none
```

#### 2.3.3 Perform a Sparse Checkout

Sparse checkout allows you to check out only a subset of files from the repository, which can be especially useful when working with large projects containing many files you do not need.

1. Clone the repository without checking out files:

   **Command**:

   ```bash
   gh repo clone <repository> -- --no-checkout
   ```

2. Enable sparse checkout mode:

   **Command**:

   ```bash
   git sparse-checkout init --cone
   ```

3. Define the specific directories or files you want to include in the checkout:

   **Command**:

   ```bash
   git sparse-checkout set <directory-or-file>
   ```

#### 2.3.4 Combined Usage

To efficiently clone a large repository with many binary files, you can combine shallow clone, partial clone, and sparse checkout techniques:

**Commands**:

```bash
gh repo clone <repository> -- \
  --depth 1 \
  --filter=blob:none \
  --no-checkout \
  --sparse

cd <repository>
git sparse-checkout set <directory-or-file>
git checkout <branch>
```

This approach minimizes the amount of data transferred and stored locally by including only the necessary files and excluding large binary files.

**Benefit**:
When dealing with large datasets or extensive codebases, these advanced cloning techniques help minimize storage use and download times, enabling you to focus on development and analysis more quickly. This efficiency is crucial for any data-driven research project, ensuring that resources are utilized effectively and processes remain streamlined.

### 2.4 Creating Repositories on GitHub

With the GitHub CLI, you can create new repositories directly from the command line, simplifying the workflow and integrating seamlessly into your development process.

#### 2.4.1 Create a Repository with Custom Settings

Using the [`gh repo create`](https://cli.github.com/manual/gh_repo_create) command, you can set various custom settings for your new repository, such as visibility (public or private), initialization options (like adding a README, .gitignore, or license), and choosing the default branch.

**Command**:

```bash
gh repo create <owner>/<new-name> [flags]
```

**Key Flags**:

- `--public` or `--private`: Sets the visibility of the repository.
- `--readme`: Initializes with a README file.
- `--gitignore`: Adds a .gitignore file based on common templates.
- `--license`: Adds a license file.
- `--default-branch <branch-name>`: Sets the default branch.

**Example**:

```bash
gh repo create my-org/new-project --private \
  --readme \
  --gitignore Node \
  --license MIT \
  --default-branch main
```

#### 2.4.2 Create a Repository Based on a Template

Using a template repository can save time and ensure consistency across your projects. The `gh repo create` command allows you to create a new repository on GitHub based on a specified template repository.

**Command**:

```bash
gh repo create <owner>/<new-name> --template=<repository>
```

### 2.5 Accessing Repository Details

Navigating and managing your repositories efficiently can be a game changer. The GitHub CLI offers some nifty commands to help you view various details about your repositories. Whether you need to open a repository in the browser, retrieve metadata, or monitor disk usage.

#### 2.5.1 View Repository Details

Want to see what's under the hood of a repository? Use the [`gh repo view`](https://cli.github.com/manual/gh_repo_view) command to display essential information, like the description and README, right in your terminal.

**Command**:

```bash
gh repo view [<repository>]
```

#### 2.5.2 Open a Repository in the Browser

Need to dive deeper? Use the `--web` flag with the `gh repo view` command to open the repository in your default web browser.

**Command**:

```bash
gh repo view [<repository>] --web
```

#### 2.5.3 Retrieve Description and Topics in JSON

Get the nitty-gritty details in a structured format. Fetch the description and topics of a repository in JSON format for integration or analysis, particularly useful for tagging and categorizing repositories programmatically.

**Command**:

```bash
gh repo view [<repository>] --json description,repositoryTopics
```

#### 2.5.4 Retrieve Projects in JSON

Need an overview of ongoing work? Access a list of projects associated with a repository in JSON. It's super handy for managing and analyzing project boards, especially in bigger projects with multiple tracking boards.

**Command**:

```bash
gh repo view [<repository>] --json projects
```

#### 2.5.5 Monitor Disk Usage in JSON

Keep an eye on your storage. Monitor the disk usage of a repository to manage space efficiently, especially for those with large files or extensive histories.

**Command**:

```bash
gh repo view [<repository>] --json diskUsage
```

By leveraging these commands, you can efficiently manage repository details, enhancing your workflow and keeping your projects running smoothly.

### 2.6 Enhance and Edit Repositories

Effective management of repositories goes beyond viewing details. It involves enhancing and editing repository information to ensure they are well-categorized and easily discoverable. The [`gh repo edit`](https://cli.github.com/manual/gh_repo_edit) command allows you to seamlessly edit various attributes of your repositories.

#### 2.6.1 Add Topics to a Remote Repository

Enhance your repository's discoverability by adding relevant topics. This not only makes it easier for others to find but also helps it stand out.

**Command**:

```bash
gh repo edit [<repository>] --add-topic <strings>
```

**Example**:

```bash
gh repo edit my-repo --add-topic machine-learning,data-science
```

#### 2.6.2 Update Repository Description

Provide a clear and concise summary of your repository's purpose by updating its description.

**Command**:

```bash
gh repo edit [<repository>] --description <string>
```

#### 2.6.3 Change Repository Visibility

Adjust the visibility of your repository to make it public, private, or internal, depending on your needs.

**Command**:

```bash
gh repo edit [<repository>] --visibility <public|private|internal>
```

By leveraging these commands, you can efficiently manage and enhance your repositories, making them more accessible and tailored to your project's requirements.

## Wrapping Up

Unlocking the power of Git and GitHub CLI commands not only streamlines your workflow but also elevates your collaboration skills, paving the way for success in both academic and professional arenas.

As you explore these tools, you'll find that they offer endless possibilities for innovation and efficiency. Experiment, integrate them into your research toolkit, and watch your productivity soar. The more you practice, the more proficient you'll become.

Embrace this journey of discovery. Happy coding!

## Additional Resources

- [Git Guides \| GitHub](https://github.com/git-guides)
- [A Complete Beginners Guide to Git \| DEV Community](https://dev.to/exwhyzed/how-to-git-a-complete-beginners-guide-1h85)
- [Learn Version Control with Git \| Git Tower](https://www.git-tower.com/learn/)
- [Everything you need to know about GIT \| DEV Community](https://dev.to/basementdevs/everything-that-you-need-to-know-about-git-2440)
- [How Git Partial Clone lets you fetch only the large file you need \| GitLab](https://about.gitlab.com/blog/2020/03/13/partial-clone-for-massive-repositories/)
- [Bring your monorepo down to size with sparse-checkout \| The GitHub Blog](https://github.blog/open-source/git/bring-your-monorepo-down-to-size-with-sparse-checkout/)

Unleash the full potential of Git and GitHub, and watch your research endeavors reach new heights! 🌟
