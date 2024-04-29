import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import db_connection from './utils/connect_db'



db_connection()

interface ICreateUserArgs{
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}


const typeDefs=`
    type User{
        id:ID!
        username:String!
        createdAt:String!
    }

    type Mutation{
        createUser(username:String!,email:String!,password:String!,confirmPassword:String):User
    }

`

const resolvers={
    Mutation:{
        createUser:async(root,args:ICreateUserArgs)=>{
            const {username,email,password,confirmPassword}=args

        }
    }
}