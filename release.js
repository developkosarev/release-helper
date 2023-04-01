import chalk from 'chalk';
import { getPullRequestUrl, createPullRequest } from './services/bitbucket.js';
import { getNameReleaseBranch, createBranchesArray } from './helpers/branch.js'
import { validateEnv } from './helpers/validator.js'

const createReleaseBranch = async () => {
    const name = getNameReleaseBranch();
    //const result = await createReleaseBranch(name);

    return name
}

const createPullRequests = async () => {
    const branches = createBranchesArray();

    for (const item of branches) {
        const result = await createPullRequest(item.branch, item.title);
        if (result) {
            const url = getPullRequestUrl(result.id)
            console.log(`Pull request created for the ${chalk.bgGreen(item.branch)} branch ${chalk.blue.bold(url)}`)
        }        
    }    
}

if (validateEnv()) {
    createPullRequests();
}