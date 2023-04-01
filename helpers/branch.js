import * as dotenv from 'dotenv'
dotenv.config()

const getNameReleaseBranch = () => {
    const release = process.env.RELEASE
    const version = process.env.RELEASE_VERSION

    if (!release) {
        throw new Error('Release is not specified')
    }
    if (!version) {
        throw new Error('Version is not specified')
    }

    let result = release
    if (version) {
        result = `${result}-v${version}`
    }

    return result
}

const createBranchesArray = () => {
    const data = [];

    for (let i = 1; i <= 10; i++) {
        const suffix = String(i).padStart(2, '0');
        const branch = process.env[`BRANCH_${suffix}`];
        const title = process.env[`BRANCH_TITLE_${suffix}`];

        if (branch) {
            data.push({branch: branch, title: title});
        }
    }    

    return data;
}

export { getNameReleaseBranch, createBranchesArray }