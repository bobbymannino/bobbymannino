---
title: "GitHub Actions"
tagline: "Save your time and automate it!"
publishedOn: 2025-07-27
tags: ["github", "ci/cd"]
thumbnailSrc: "github-actions.jpg"
thumbnailAlt: "GitHub Actions"
---

# GitHub Actions

## What are GitHub Actions?

GitHub Actions is a CI/CD (Continuous Integration/Continuous Deployment) service
provided by GitHub that allows you to automate workflows. It enables you to
build, test, deploy and much more directly from your GitHub repository. With
GitHub Actions, you can create custom workflows that respond to various events
in your repository, such as pushes, pull requests, or issues.

## Why use GitHub Actions?

GitHub actions is often the first choice for CI/CD because it is tightly
integrated with GitHub making it incredible easy and low friction to use.

## Create a Workflow?

A workflow is a configurable automated process made up of one or more jobs. A
workflow is defined in a specific directory `/.github/workflows` and each
workflow is defined in a separate YAML file. The workflow file contains the
following sections:

```yaml
name: My Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Test project
        run: npm test

      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
```

## How to make a Workflow

Workflows are comprised of one or more jobs. Each job is a sequence of steps
that are executed in a specific order. Jobs can run on different operating
systems and can be configured to run on different events in your repository.

```yaml
# Trigger(s) here

# List all of the jobs here
jobs:
  # Job name
  test:
    # What OS to run the job on
    runs-on: ubuntu-latest

    # List each step in the job
    steps:
        # The name for the step, this will appear in the GUI on GitHub
      - name: Checkout code
        # The action to use, which refers to a GH repository
        # actions/checkout is a GitHub own action that is used to checkout the
        # code from the repository into the runner (current GH action)
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        # Some actions can take in variables that alter the behavior/version
        with:
          node-version: '20'

      - name: Install dependencies
        # Steps can also take a `run` argument which will run a command on the
        # runner
        run: npm run install

      - name: Run tests
        run: npm run test
```

## How to Trigger a Workflow

Workflows can be triggered (ran) by many events such as manually, on a schedule,
or when a specific condition is met (pull request, tag, etc). Here is a couple
examples of different triggers:

```yaml
# List the trigger events here
on:
  push:
    branches:
      - main
    tags:
      - v*.*.*
  pull_request:
    branches:
      - main
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'

# Job(s) here
```

---

## Resources

[GitHub Actions Page](https://github.com/features/actions)

[GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

[GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
