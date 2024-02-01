import chalk from 'chalk';
import inquirer from 'inquirer';
import { createBranchesArray } from './config/branch.js'
import { getNameReleaseBranch, getNameInitialReleaseBranch } from './config/release.js'
import { getDevelopBranch } from './config/bitbucket.js'
import { validateEnv } from './helpers/validator.js'
import { getBranch, createBranch, getPullRequestByBranch, getPullRequestUrl, updatePullRequestDestination, createPullRequest, mergePullRequest } from './services/bitbucket.js'

const createReleaseBranch = async (): Promise<string> => {
	const developBranch = getDevelopBranch()
	const devBranch = await getBranch(developBranch)
	if (!devBranch) {
		throw new Error("Can't get a develop branch")
	}

	const name = getNameReleaseBranch()
	let releaseBranch = await getBranch(name)    

	if (!releaseBranch) {
		releaseBranch = await createBranch(name, developBranch)
	}

	console.log(`The release ${chalk.blue.bold(releaseBranch.name)} is initialized (branch created)`);

	return releaseBranch
}

const preparePullRequest = async (): Promise<void> => {
	const developBranch = getDevelopBranch()
	const branches = createBranchesArray()

	for (const item of branches) {
		const result = await getPullRequestByBranch(item.branch, developBranch);		
		if (result.size == 1 ) {
			const url = getPullRequestUrl(result.values[0].id)		
			console.log(`The pull request ${chalk.blue.bold(url)} exists`);
		}	else {
			console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch was not found`);
		}	
	}
}

const updateDestinationBranch = async (): Promise<void> => {
	const developBranch = getDevelopBranch()
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

const createPullRequests = async (): Promise<void> => {
    const branches = createBranchesArray();

    for (const item of branches) {        
        const releaseBranch = getNameInitialReleaseBranch()
        const previousPullRequest = await getPullRequestByBranch(item.branch, releaseBranch, "MERGED");
        
        if (previousPullRequest.size == 1 ) {
            const title = previousPullRequest.values[0].title
            const destination = getNameReleaseBranch()
            
            const result = await createPullRequest(item.branch, title, destination);
            if (result) {
                const url = getPullRequestUrl(result.id)
                console.log(`Pull request created for the ${chalk.bgGreen(item.branch)} branch ${chalk.blue.bold(url)}`)
            }
        } else {
            console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch was not found`);
        }        
    }    
}

const mergePullRequests = async (): Promise<void> => {	
	const releaseBranch = getNameReleaseBranch()
	const branches = createBranchesArray()

	for (const item of branches) {
		const result = await getPullRequestByBranch(item.branch, releaseBranch);
		if (result.size == 1 ) {			
			const url = await mergePullRequest(result.values[0].id)
			console.log(`The pull request ${chalk.blue.bold(url)} was merged`);
		} else {
			console.error(`The pull request for the ${chalk.red.bold(item.branch)} branch and release ${chalk.red.bold(releaseBranch)} was not found`);
		}	
	}
}

enum Commands {
	init = "init",
	preRelease = "pre-release",
	nextRelease = "next-release",
	mergeRelease = "merge-release",
	quit = "quit"
}

const promptUser = async (): Promise<void> => {
	inquirer.prompt([
		{
			type: "list",
			name: "command",
			message: "Choose option",
			choices: Object.values(Commands)
		}
	])
	.then( async (answers: any): Promise<void> => {
		switch ( answers["command"] ) {
			case Commands.init:
				await createReleaseBranch()
				await preparePullRequest()
				break;
			case Commands.preRelease:
				await updateDestinationBranch()
				break;
			case Commands.nextRelease:
				await createReleaseBranch();
    			await createPullRequests();
				break;
			case Commands.mergeRelease:
				await mergePullRequests();
				break;
			default: 
				break;
		 }

	});
}

if (validateEnv()) {
	await promptUser()	
}