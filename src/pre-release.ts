import chalk from 'chalk';
import { validateEnv, developBranch } from './helpers/validator.js'
import { getNameReleaseBranch, createBranchesArray } from './helpers/branch.js'
import { getPullRequestByBranch, updatePullRequestDestination, getPullRequestUrl } from './services/bitbucket.js'

const updateDestinationBranch = async () => {
	const branches = createBranchesArray()

	for (const item of branches) {
		const result = await getPullRequestByBranch(item.branch, developBranch);
		if (result.size == 1 ) {
			const destination = getNameReleaseBranch()			
			const branch = await updatePullRequestDestination(result.values[0].id, destination)			

			const url = getPullRequestUrl(branch.id)		
			console.log(`The pull request ${chalk.blue.bold(url)} updated`);
		} else {
			console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch was not found`);
		}	
	}
}

if (validateEnv()) {
	await updateDestinationBranch()
}