import chalk from 'chalk';
import { validateEnv, developBranch } from './helpers/validator.js';
import { getNameReleaseBranch, createBranchesArray } from './helpers/branch.js';
import { getBranch, createBranch, getPullRequestByBranch, getPullRequestUrl } from './services/bitbucket.js';
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
const preparePullRequest = async () => {
    const branches = createBranchesArray();
    for (const item of branches) {
        const result = await getPullRequestByBranch(item.branch, developBranch);
        if (result.size == 1) {
            const url = getPullRequestUrl(result.values[0].id);
            console.log(`The pull request ${chalk.blue.bold(url)} exists`);
        }
        else {
            console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch was not found`);
        }
    }
};
if (validateEnv()) {
    await createReleaseBranch();
    await preparePullRequest();
}
