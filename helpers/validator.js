import * as dotenv from 'dotenv'
dotenv.config()

const token = process.env.TOKEN
const workspace = process.env.WORKSPACE
const repository = process.env.REPOSITORY
const release = process.env.RELEASE
const developBranch = process.env.DEVELOP_BRANCH

const validateEnv = () => {	
	if (!token) {
		throw new Error('Token is not specified')
	}    
	if (!workspace) {
		throw new Error('Workspace is not specified')
	}
	if (!repository) {
		throw new Error('Repository is not specified')
	}
	if (!release) {
		throw new Error('Release is not specified')
	}
	if (!developBranch) {
		throw new Error('Develop branch is not specified')
	}

	return true
}

export { validateEnv, release, developBranch }