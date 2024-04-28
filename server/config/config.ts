import dotenv from 'dotenv'

dotenv.config()


export const DB_STRING=process.env.DB_STRING!==undefined?process.env.DB_STRING:null
export const JWT_SECRET=process.env.JWT_SECRET!==undefined?process.env.JWT_SECRET:null