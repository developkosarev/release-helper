import * as dotenv from 'dotenv'
dotenv.config()

const envValue = (value: 'DB_HOST' | 'DB_USER' | 'DB_PASSWORD' | 'DB_DATABASE' | 'SSH_HOST' | 'SSH_USER' | 'SSH_PRIVATE_KEY'): string => {
  const envValue: string | undefined = process.env[value]

  if (!envValue) {
    throw new Error(`${value} is not specified`)
  }

  return envValue;
}

const getHost = (): string => {
  return envValue('DB_HOST');  
}

const getUser = (): string => {
  return envValue('DB_USER');  
}

const getPassword = (): string => {
  return envValue('DB_PASSWORD');  
}

const getDatabase = (): string => {
  return envValue('DB_DATABASE');  
}

const getSshHost = (): string => {
  return envValue('SSH_HOST');  
}

const getSshUser = (): string => {
  return envValue('SSH_USER');  
}

const getSshPrivateKey = (): string => {
  return envValue('SSH_PRIVATE_KEY');  
}

export { getHost, getUser, getPassword, getDatabase, getSshHost, getSshUser, getSshPrivateKey }