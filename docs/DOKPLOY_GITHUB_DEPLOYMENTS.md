# Setting Up GitHub Deployment Statuses from Dokploy

This guide explains how to configure Dokploy to send deployment status updates to GitHub, so your commits and pull requests show deployment status checks.

## Overview

GitHub deployment statuses allow external services like Dokploy to report the status of deployments directly on your commits and pull requests. This provides visibility into your deployment pipeline without needing to visit external dashboards.

## Prerequisites

- A Dokploy instance with your application deployed
- A GitHub repository with admin access
- A GitHub Personal Access Token (PAT) or GitHub App

## Step 1: Create a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Dokploy Deployment Status"
4. Select the following scopes:
   - `repo:status` - Allows updating commit statuses
   - `repo_deployment` - Allows creating and updating deployment statuses
5. Click "Generate token" and copy the token (you won't be able to see it again)

## Step 2: Configure Dokploy to Send GitHub Statuses

Dokploy supports GitHub deployment statuses through webhooks and environment variables. Here's how to set it up:

### Option A: Using Dokploy's Built-in GitHub Integration

1. In your Dokploy dashboard, navigate to your application
2. Go to Settings → Git Integration
3. Look for "GitHub Deployment Status" or "Webhooks" section
4. Enable "Send deployment status to GitHub"
5. Enter your GitHub Personal Access Token
6. Configure the following settings:
   - Repository owner: `bobbymannino`
   - Repository name: `bobbymannino`
   - Environment: `production` (or your preferred environment name)

### Option B: Using Dokploy Webhooks with GitHub API

If Dokploy doesn't have built-in GitHub integration, you can use webhooks to trigger a custom script:

1. Create a webhook endpoint that receives Dokploy deployment events
2. The webhook should call the GitHub Deployments API

Here's an example webhook handler (Node.js):

```javascript
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function handleDokployWebhook(req, res) {
  const { status, commit_sha, environment } = req.body;

  // Create deployment
  const deployment = await octokit.repos.createDeployment({
    owner: "bobbymannino",
    repo: "bobbymannino",
    ref: commit_sha,
    environment: environment || "production",
    auto_merge: false,
    required_contexts: [],
  });

  // Update deployment status
  await octokit.repos.createDeploymentStatus({
    owner: "bobbymannino",
    repo: "bobbymannino",
    deployment_id: deployment.data.id,
    state: mapDokployStatusToGitHub(status),
    description: `Deployment ${status}`,
    environment_url: "https://bobman.dev",
  });

  res.status(200).send("OK");
}

function mapDokployStatusToGitHub(dokployStatus) {
  const statusMap = {
    pending: "pending",
    building: "in_progress",
    success: "success",
    failed: "failure",
    error: "error",
  };
  return statusMap[dokployStatus] || "pending";
}
```

### Option C: Using GitHub Actions with Dokploy API

Create a GitHub Actions workflow that checks Dokploy deployment status:

```yaml
name: Dokploy Deployment Status

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deployment-status:
    runs-on: ubuntu-latest
    steps:
      - name: Create deployment
        uses: chrnorm/deployment-action@v2
        id: deployment
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          environment: production

      - name: Trigger Dokploy deployment
        run: |
          # Trigger your Dokploy deployment here
          # This depends on your Dokploy setup

      - name: Wait for Dokploy and update status
        run: |
          # Poll Dokploy API for deployment status
          STATUS=$(curl -s "${{ secrets.DOKPLOY_URL }}/api/application.one?applicationId=${{ secrets.DOKPLOY_APP_ID }}" | jq -r '.buildStatus')

          if [ "$STATUS" == "done" ]; then
            echo "STATE=success" >> $GITHUB_ENV
          elif [ "$STATUS" == "error" ]; then
            echo "STATE=failure" >> $GITHUB_ENV
          else
            echo "STATE=in_progress" >> $GITHUB_ENV
          fi

      - name: Update deployment status
        uses: chrnorm/deployment-status@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          deployment-id: ${{ steps.deployment.outputs.deployment_id }}
          state: ${{ env.STATE }}
          environment-url: https://bobman.dev
```

## Step 3: Configure Required Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `DOKPLOY_URL` - Your Dokploy instance URL
- `DOKPLOY_APP_ID` - Your application ID in Dokploy
- `DOKPLOY_PROJECT_ID` - Your project ID in Dokploy
- `DOKPLOY_API_TOKEN` - API token for Dokploy (if required)

## Step 4: Test the Integration

1. Make a commit to your repository
2. Check the commit on GitHub - you should see a deployment status check
3. The status should update as your Dokploy deployment progresses:
   - ⏳ Pending - Deployment queued
   - 🔄 In Progress - Deployment building
   - ✅ Success - Deployment completed
   - ❌ Failure - Deployment failed

## Troubleshooting

### Deployment statuses not appearing

- Verify your GitHub token has the correct scopes (`repo:status` and `repo_deployment`)
- Check that the commit SHA in Dokploy matches the commit SHA in GitHub
- Ensure the repository owner and name are correct

### Statuses showing but not updating

- Check Dokploy webhook logs for errors
- Verify the webhook endpoint is accessible from Dokploy
- Ensure the API token hasn't expired

### Permission errors

- Make sure the GitHub token belongs to a user with write access to the repository
- For organization repositories, ensure the token has organization access

## Additional Resources

- [GitHub Deployments API Documentation](https://docs.github.com/en/rest/deployments/deployments)
- [GitHub Deployment Status API](https://docs.github.com/en/rest/deployments/statuses)
- [Dokploy Documentation](https://dokploy.com/docs)

## Notes

- Deployment statuses are different from commit statuses - they appear in a separate "Deployments" section
- You can have multiple deployment environments (staging, production, etc.)
- Deployment statuses persist in GitHub's deployment history
