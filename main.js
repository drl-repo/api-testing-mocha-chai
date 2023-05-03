import * as dotenv from 'dotenv'
dotenv.config()
import request from 'supertest'

const request 	= request(process.env.BASE_URL)

export default request