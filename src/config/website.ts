import * as dotenv from 'dotenv'
dotenv.config()

const envValue = (value: 'WEBSITE_BASE_URL' ): string => {
  const envValue: string | undefined = process.env[value]

  if (!envValue) {
    throw new Error(`${value} is not specified`)
  }

  return envValue;
}

const getBaseUrl = (): string => {
  return envValue('WEBSITE_BASE_URL');
}

export { getBaseUrl }