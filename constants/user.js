import * as dotenv from 'dotenv'
dotenv.config()

export const admin = {
    username : process.env.USERNAME,
    password : process.env.PASSWORD
}

