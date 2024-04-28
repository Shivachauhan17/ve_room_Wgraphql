import mongoose, { mongo } from 'mongoose'
import { DB_STRING } from '../config/config'
import path from 'path'

class CustomError extends Error {
    fileName: string;
    lineNumber:number;

    constructor(message:string, fileName:string,lineNumber:number) {
        super(message);
        this.fileName = fileName;
        this.lineNumber=lineNumber;
        Object.setPrototypeOf(this, CustomError.prototype);

    }
}


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
