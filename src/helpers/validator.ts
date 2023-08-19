import * as dotenv from 'dotenv'
dotenv.config()

const token: string | undefined = process.env['TOKEN']
const workspace: string | undefined = process.env['WORKSPACE']
const repository: string | undefined = process.env['REPOSITORY']
const release: string | undefined = process.env['RELEASE']
const developBranch: string | undefined = process.env['DEVELOP_BRANCH']

const validateEnv = (): boolean => {
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
