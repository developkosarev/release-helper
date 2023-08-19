import * as dotenv from 'dotenv'
dotenv.config()

const getNameInitialReleaseBranch = (): string => {
  const release: string | undefined = process.env['RELEASE']

  if (!release) {
      throw new Error('Release is not specified')
  }    

  return `release/${release}`
}

const getNameReleaseBranch = () => {  
  const version: string | undefined = process.env['RELEASE_VERSION']
  
  let result = getNameInitialReleaseBranch()
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

        if (branch) {
            data.push({branch: branch});
        }
    }    

    return data;
}

export { getNameInitialReleaseBranch, getNameReleaseBranch, createBranchesArray }
