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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.resolvers = exports.typeDefs = void 0;
const server_1 = require("@apollo/server");
const graphql_1 = require("graphql");
const standalone_1 = require("@apollo/server/standalone");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_db_1 = __importDefault(require("./utils/connect_db"));
const user_1 = __importDefault(require("./models/user"));
(0, connect_db_1.default)();
exports.typeDefs = `

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

`;
exports.resolvers = {
    Mutation: {
        createUser: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, email, password, confirmPassword } = args;
            if (password === confirmPassword) {
                throw new graphql_1.GraphQLError('Password confirmation failed', null, null, null, null, null, {
                    code: 'BAD_USER_INPUT',
                });
            }
            const findUser = yield user_1.default.findOne({ username: username });
            if (findUser) {
                throw new graphql_1.GraphQLError("user already exists", null, null, null, null, null, {
                    code: "USERNAME_ALREADY_TAKEN"
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const dateTime = new Date();
            const user = new user_1.default({
                username: username,
                email: email,
                password: hashedPassword,
                createdAt: dateTime.toISOString()
            });
            return user.save();
        }),
        login: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, password } = args;
            const findUser = yield user_1.default.findOne({ username: username });
            if (!findUser) {
                throw new graphql_1.GraphQLError("no such user exists", null, null, null, null, null, {
                    code: "NO_USER_EXIST_WITH_THIS_USERNAME"
                });
            }
            if (findUser && findUser.password !== undefined) {
                const passwordMatch = yield bcrypt_1.default.compare(password, findUser.password);
                if (!passwordMatch) {
                    throw new graphql_1.GraphQLError("provided password is incorrect", null, null, null, null, null, {
                        code: "WRONG_CREDS"
                    });
                }
                const userForToken = {
                    username: findUser.username,
                    id: findUser._id,
                };
                if (process.env.JWT_SECRET !== undefined)
                    return jsonwebtoken_1.default.sign(userForToken, process.env.JWT_SECRET);
            }
        })
    }
};
exports.server = new server_1.ApolloServer({
    typeDefs: exports.typeDefs,
    resolvers: exports.resolvers,
});
(0, standalone_1.startStandaloneServer)(exports.server, {
    listen: { port: 8000 }
}).then(({ url }) => console.log(`server is running at ${url}`));
