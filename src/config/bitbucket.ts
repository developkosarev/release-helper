import * as dotenv from 'dotenv'
dotenv.config()

const getToken = (): string => {
    const token: string | undefined = process.env['TOKEN']
  
    if (!token) {
		throw new Error('Token is not specified')
	}
  
    return token;
  }

export { getToken }