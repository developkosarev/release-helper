import * as dotenv from 'dotenv'
dotenv.config()

const envValue = (value: 'TOKEN' | 'WORKSPACE' | 'REPOSITORY'): string => {
  const envValue: string | undefined = process.env[value]

  if (!envValue) {
    throw new Error(`${value} is not specified`)
  }

  return envValue;
}

const getToken = (): string => {
  return envValue('TOKEN');  
}

const getWorkspace = (): string => {
  return envValue('WORKSPACE');  
}

const getRepository = (): string => {
  return envValue('REPOSITORY');  
}

export { getToken, getWorkspace, getRepository}