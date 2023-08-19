import * as dotenv from 'dotenv'
dotenv.config()

const getNameInitialReleaseBranch = (): string => {
  const release: string | undefined = process.env['RELEASE']

  if (!release) {
      throw new Error('Release is not specified')
  }    

  return `release/${release}`
}

const getNameReleaseBranch = (): string => {  
  const version: string | undefined = process.env['RELEASE_VERSION']
  
  let result = getNameInitialReleaseBranch()
  if (version) {
    result = `${result}-v${version}`
  }

  return result
}

export { getNameInitialReleaseBranch, getNameReleaseBranch }
