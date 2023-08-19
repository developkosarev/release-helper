import chalk from 'chalk';
import { validateEnv, developBranch } from './helpers/validator.js';
import { getBranch, createBranch, getPullRequestUrl, createPullRequest, getPullRequestByBranch } from './services/bitbucket.js';
import { getNameInitialReleaseBranch, getNameReleaseBranch, createBranchesArray } from './helpers/branch.js';
const createReleaseBranch = async () => {
    const devBranch = await getBranch(developBranch);
    if (!devBranch) {
        throw new Error("Can't get a develop branch");
    }
    const name = getNameReleaseBranch();
    let releaseBranch = await getBranch(name);
    if (!releaseBranch) {
        releaseBranch = await createBranch(name, developBranch);
    }
    console.log(`The release ${chalk.blue.bold(releaseBranch.name)} is initialized (branch created)`);
    return releaseBranch;
};
const createPullRequests = async () => {
    const branches = createBranchesArray();
    for (const item of branches) {
        const releaseBranch = getNameInitialReleaseBranch();
        const previousPullRequest = await getPullRequestByBranch(item.branch, releaseBranch, "MERGED");
        if (previousPullRequest.size == 1) {
            const title = previousPullRequest.values[0].title;
            const destination = getNameReleaseBranch();
            const result = await createPullRequest(item.branch, title, destination);
            if (result) {
                const url = getPullRequestUrl(result.id);
                console.log(`Pull request created for the ${chalk.bgGreen(item.branch)} branch ${chalk.blue.bold(url)}`);
            }
        }
        else {
            console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch was not found`);
        }
    }
};
if (validateEnv()) {
    await createReleaseBranch();
    await createPullRequests();
}
