import mongoose, { mongo } from 'mongoose'
import { DB_STRING } from '../config/config'
import path from 'path'
import { CustomError } from './customError'


const connectMongo=()=>{
    if(DB_STRING){
        mongoose.connect(DB_STRING)
            .then(()=>{
                console.log("database is connected")
            })
            .catch(()=>{
                throw new CustomError("Error in databse connection Function",path.basename(__filename),20)
            })
    }
    else{
        throw new CustomError("string given for database connection is null",path.basename(__filename),2)
    }
}

export default connectMongo
