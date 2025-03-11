---
layout: post
title: "Fixing Old Emails in Your Git History: A Beginner's Guide"
date: 2025-03-11 20:03 +0800
permalink: /blog/devtools/fixing-old-emails-in-your-git-history/
redirect_from:
  - /blog/fixing-old-emails-in-your-git-history/
author: chris
image:
  path: /images/posts/devtools/robots-rewriting-git-history_cover.jpg
  width: "730"
  height: "417"
categories:
  - Developer tools
tags:
  - Git
  - Command-line
  - User tips
css:
  syntax: true
excerpt: Learn how to update old emails in your Git history with this beginner's guide, ensuring a professional and accurate coding portfolio.
---

Git is a powerful version control system that acts like a diary for your code. Every change you make gets recorded in what’s called a commit history. But what if you realize some of your commits are tied to an outdated email address? Maybe you used a school email that’s no longer active, or your personal email for work projects and want to tidy up your digital footprint. Let’s learn how to fix that! In this guide, you’ll learn how to update your email address across all commits, using the mighty `git filter-branch` command.

---

## Understanding Git Identity

When you make a commit, Git records two key pieces of identity information:

- **Author**: The person who originally wrote the code.
- **Committer**: The person who added the code to the repository (often the same as the author).

If either of these fields uses an out-of-date email address, it can lead to confusion—especially if you want your work to reflect who you are today.

---

## The Problem: Ghosts of Emails Past

Imagine your coding journey is like a scrapbook. Each commit is a snapshot of your progress. You set up Git with your shiny new GitHub email, but when you push code, your commits are still linked to `old_school_email@university.edu`—an account you can’t even access anymore!
It might confuse future readers (or even recruiters) checking your portfolio. Updating your commit history helps you:

- Present a Professional Image: Your Git history becomes a polished record of your growth.
- Improve Traceability: Linking commits to your current email makes it easier to track contributions.

This happened to me when I tried to share code from my postgraduate projects. My commits were tied to an ancient email, making my contributions invisible on GitHub. Worse, collaborators couldn't recognize my work.

The solution? Rewriting Git history to update old emails. Let’s break down how to do this safely.

---

## The Magic Command: `git filter-branch`

To magically update your old commits, we use a shell script with `git filter-branch`—Git’s built-in "history editor." Think of it as a "find and replace" feature for your entire Git history that has the old email with your updated details.

While powerful, it’s not beginner-friendly—so follow closely! Here’s the script to update emails and names in all commits:

```bash  
git filter-branch --env-filter '  
WRONG_EMAIL="old.email@example.com"
NEW_NAME="Your New Name"
NEW_EMAIL="new.email@newdomain.com"

if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]; then  
    export GIT_AUTHOR_NAME="$NEW_NAME"  
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"  
fi

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]; then  
    export GIT_COMMITTER_NAME="$NEW_NAME"  
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"  
fi
' --tag-name-filter cat -- --branches --tags  
```  

Let’s break it down:

1. ### Variables (Your "Before" and "After")

   At the start of the script, you assign your details:

   - `WRONG_EMAIL`: The email you want to replace (e.g., an old school address).
   - `NEW_NAME` and `NEW_EMAIL`: Your current name and email (like your GitHub credentials).

   Replace these placeholders with your actual values.

2. ### The "Find and Replace" Logic

   The script checks whether the commit’s author or committer email matches your old email. If it does, it replaces the name and email with your new ones. In plain terms:

   - **If this commit was made with the wrong email, update it.**

3. ### Scope (Where to Fix)

   Finally, the options `--tag-name-filter cat -- --branches --tags` ensure that every branch and tag in your repository is checked and updated if needed.

---

## Step-by-Step: Safely Rewriting History

### ⚠️ **Step 0**: Backup Your Repository

Rewriting history is a big change! Make sure you have a backup (or clone) of your repository before running the script.

You can clone a copy of your repo:

```bash
git clone --mirror your-repo-url backup-folder
```

### **Step 1**: Run the Script

1. Open Git Bash or Terminal.
2. Navigate to your repository (`cd your-repo`).
   **Note:** Replace `your-repo` with your actual repository name.
3. Paste the script, replacing `WRONG_EMAIL`, `NEW_NAME`, and `NEW_EMAIL` with your details.

### **Step 2**: Force-Push the Changes

Since history has been rewritten, you need to force-push the changes to your remote repository:

```bash
git push origin --force --all
git push origin --force --tags
```

**Note**: If you work on a team, coordinate with your teammates before force-pushing, as this can disrupt others’ work.

---

## Caveats and Helpful Tips

- **Working in a Team**: Rewriting history changes commit IDs (hashes). Make sure everyone on your project is aware and ready to adjust their local copies.

- **Large Repositories**: The `git filter-branch` command can be slow on big projects. For faster results, consider using [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/).

- **Modern Alternatives**: The Git community now often recommends using `git filter-repo` for such tasks. While this guide focuses on `filter-branch` (because of its wide use and educational value), it’s worth exploring newer tools as you advance.

- **Prevent Future Headaches**: Configure Git to use your correct email globally.

  ```bash
  git config --global user.name "Your Name"  
  git config --global user.email "your@email.com"  
  ```

- **Check Your Work**: After running the script, verify a commit’s details with

  ```bash
  git log --format="%an <%ae>, %cn <%ce>" 
  ```

---

## Why Bother? A Lesson Beyond the Code

Fixing your Git history isn’t just a technical task—it’s a lesson in attention to detail, responsibility, and self-improvement. Your Git history is like your academic portfolio; keeping it accurate reflects your growth as a programmer. Plus, you’re learning a technique that could prove useful when dealing with sensitive data or accidental mistakes in the future.

---

## Final Thoughts

Rewriting Git history isn’t something you’ll need to do every day. It might seem intimidating at first, but with careful steps and a clear understanding, it’s a powerful skill. By updating your commit emails, you’re not only tidying up your past work but also setting up a professional foundation for your future projects.

So, take a deep breath, back up your work, and give it a try. With each commit, you are fine-tuning your development story—a story that is uniquely yours!

Happy coding!

---

## References

1. [How to Change Git Commit Author Information for All Commits: A Complete Guide \| by Gokul \| Medium](https://gklsan.medium.com/how-to-change-git-commit-author-information-for-all-commits-a-complete-guide-29c954e8319d)

2. [command line - Git commits are not getting linked with my GitHub account - Stack Overflow](https://stackoverflow.com/a/67308161)

3. [Git Official Documentation on `filter-branch`](https://git-scm.com/docs/git-filter-branch)  
   The official Git documentation explaining the `filter-branch` command.

4. [Git commits are not getting linked with my GitHub account](https://exchangetuts.com/index.php/git-commits-are-not-getting-linked-with-my-github-account-1639701252030376)

5. [Protecting Your Code: How to Prevent and Fix Sensitive Data Exposure on GitHub \| by ALameer Ashraf \| Medium](https://medium.com/@alameerashraf/protecting-your-code-how-to-prevent-and-fix-sensitive-data-exposure-on-github-e1934611847f)
