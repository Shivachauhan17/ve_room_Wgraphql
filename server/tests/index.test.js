"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_testing_1 = require("apollo-server-testing");
const apollo_server_1 = require("apollo-server");
const index_1 = require("../index");
const server = new apollo_server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_1.resolvers,
});
// Create test client using type assertion
const { query, mutate } = (0, apollo_server_testing_1.createTestClient)(server);
describe('Testing auth mutations', () => {
    test("createUser mutation test", () => __awaiter(void 0, void 0, void 0, function* () {
        const CREATE_USER_MUTATION = (0, apollo_server_1.gql) `
            mutation CreateUser($username:String!,$email:String!,password:String!,confirmPassword:String!){
                createUser(username:$username,email:$email,password:$password,confirmPassword:$confirmPassword){
                    id 
                    username
                    email 
                    createdAt
                }
            }
        `;
        const variables = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };
        const res = yield mutate({ mutation: CREATE_USER_MUTATION, variables });
        expect(res.data.createUser).toBeDefined();
        expect(res.data.createUser.username).toEqual('testuser');
        expect(res.data.createUser.email).toEqual('test@example.com');
        expect(res.data.createUser.createdAt).toBeDefined();
    }));
});
