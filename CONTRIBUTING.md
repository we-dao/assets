# Contributing to weDAO

This module supply a simplified, up-to-date collection of information about several thousands (!) of crypto tokens, We value your contribution to our repositories. To help contributions get merged as soon as possible, please take 5' to review the items below.

## Creating Pull Requests (PRs)

Fork this repository, work on your own fork and submit pull requests. The pull requests will be reviewed and eventually merged into the main repo. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/).

---

## Getting Started

### 1. Make sure your fork is up to date with the main repository:

```
cd assets
git remote add upstream https://github.com/we-dao/assets.git
git fetch upstream
git pull --rebase upstream main
```

NOTE: The directory `assets` represents your fork's local copy.

### 2. Branch out from `main` into `fix/some-bug-#123` or `feat/new-feature-#123`:

(Postfixing #123 will associate your PR with the issue #123)

```
git checkout -b fix/some-bug-#123
or
git checkout -b feat/new-feature-#123
```

NOTE:

- we recommend to use [commit convention](https://www.conventionalcommits.org/en/v1.0.0/#summary) to make commit easy to understand what is about.
- In case you branch is Work In Progress: add [WIP] as prefix in your PR title.

### 3. Make your changes, add your files, commit, and push to your fork.

```
git add file.js
git commit "fix: resolve bug"
git push origin fix/some-bug-#123
```

### 4. Go to [github.com/we-dao/assets](https://github.com/we-dao/assets) in your web browser and issue a new pull request.

### 5. Verify your local build succeeds.

### 6. Maintainers will review your code and possibly ask for changes before your code is pulled in to the main repository. We'll check that all tests pass, review the coding style, and check for general code correctness. If everything is OK, we'll merge your pull request and your code will be part of weDAO

_IMPORTANT_ Please pay attention to the maintainer's feedback, since its a necessary step to keep up with the standards weDAO attains to.

## All set!

If you have any questions, feel free to post them to [github.com/we-dao/assets/issues](https://github.com/we-dao/assets/issues).

## Contributor rewards

weDAO wants to be a self-sustainable community. A portion of the fees that come from running DAOs at [weDAO](https://wedao.network) goes into a community managed treasury. The treasury is used to pay for marketing, community managers, developers, etc. We are learning together how to do this in a fair and effective way.

Thanks for your time and code!
