import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { resolvers,typeDefs } from '../index'; 

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

  
  // Create test client using type assertion
  const { query, mutate } = createTestClient(server as any);


describe('Testing auth mutations',()=>{
    test("createUser mutation test",async()=>{
        const CREATE_USER_MUTATION=gql`
            mutation CreateUser($username:String!,$email:String!,password:String!,confirmPassword:String!){
                createUser(username:$username,email:$email,password:$password,confirmPassword:$confirmPassword){
                    id 
                    username
                    email 
                    createdAt
                }
            }
        `
        const variables = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };

        const res=await mutate({mutation:CREATE_USER_MUTATION,variables})

        expect(res.data.createUser).toBeDefined();
        expect(res.data.createUser.username).toEqual('testuser');
        expect(res.data.createUser.email).toEqual('test@example.com');
        expect(res.data.createUser.createdAt).toBeDefined();
    })

    test("login mutation test",async()=>{
        const LOGIN_MUTATION=gql`
            mutation CreateUser($username:String!,password:String!){
                login(username:$username,password:$password)
            }
        `
        const variables = {
            username: 'testuser',
            
            password: 'password123',
        };

        const res=await mutate({mutation:LOGIN_MUTATION,variables})

        expect(typeof res).toBe('string');
       
    })
})