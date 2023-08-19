## Create release

### Build
1. npx tsc
2. npx tsc --watch

### Steps
1. npm start (createReleaseBranch, preparePullRequest)
2. npm run pre-release (updateDestinationBranch)
3. npm run next-release (createReleaseBranch, createPullRequests)