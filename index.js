import chalk from 'chalk';
import { validateEnv, release, developBranch } from './helpers/validator.js'
import { getBranch, createBranch } from './services/bitbucket.js'

const createReleaseBranch = async () => {
    const devBranch = await getBranch(developBranch)
    if (!devBranch) {
        throw new Error("Can't get a develop branch")
    }

    const name = `release/${release}`
    let releaseBranch = await getBranch(name)    

    if (!releaseBranch) {
        releaseBranch = await createBranch(name, developBranch)
    }
    return releaseBranch
}

if (validateEnv()) {    
    const branch = await createReleaseBranch()    
    const releaseName = branch.name;    

    console.log(`The release ${chalk.bgMagenta(releaseName)} is initialized (branch created and PRs saved to file)`);
}