import { ApolloServer } from '@apollo/server'
import {GraphQLError} from 'graphql'
import { startStandaloneServer } from '@apollo/server/standalone'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db_connection from './utils/connect_db'
import User from './models/user'
import { CustomError } from './utils/customError'



db_connection()

interface ICreateUserArgs{
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}

interface ILoginArgs{
    username:string,
    password:string,

}

export const typeDefs=`

    type Query{
        hello:String!
    }

    type User{
        id:ID!
        username:String!
        email:String!
        createdAt:String!
    }

    type Mutation{
        createUser(username:String!,email:String!,password:String!,confirmPassword:String!):User
        login(username:String!,password:String!):String
    }

`

export const resolvers={
    Mutation:{
        createUser:async(root:any,args:ICreateUserArgs)=>{
            const {username,email,password,confirmPassword}=args
            if(password===confirmPassword){
                throw new GraphQLError('Password confirmation failed', null, null, null, null, null, {
                    code: 'BAD_USER_INPUT',
                  });
            }
            const findUser=await User.findOne({username:username})
            if(findUser){
                throw new GraphQLError("user already exists",null,null,null,null,null,{
                    code:"USERNAME_ALREADY_TAKEN"
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const dateTime=new Date()
            const user=new User({
                username:username,
                email:email,
                password:hashedPassword,
                createdAt:dateTime.toISOString()
            })

            return user.save()
        },
        login:async (root:any,args:ILoginArgs)=>{
            const {username,password}=args
            const findUser=await User.findOne({username:username})
            if(!findUser){
                throw new GraphQLError("no such user exists",null,null,null,null,null,{
                    code:"NO_USER_EXIST_WITH_THIS_USERNAME"
                })
            }
            if(findUser && findUser.password!==undefined){
                const passwordMatch=await bcrypt.compare(password,findUser.password)
                if(!passwordMatch){
                    throw new GraphQLError("provided password is incorrect",null,null,null,null,null,{
                        code:"WRONG_CREDS"
                    })
                }
                const userForToken = {
                    username: findUser.username,
                    id: findUser._id,
                } 
                if(process.env.JWT_SECRET!==undefined)
                return  jwt.sign(userForToken, process.env.JWT_SECRET) 
            }

        }

    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

startStandaloneServer(server,{
    listen:{port:8000}
}).then(({url})=>console.log(`server is running at ${url}`))
