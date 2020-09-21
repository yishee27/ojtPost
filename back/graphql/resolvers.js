const dbRead = require('../config/db.read');
const dbInsert = require('../config/db.insert');
const login = require('../auth/login');

const logger = require('winston');
const log = (msg) => logger.info(msg);

const resolvers = {
    Query: {
        login: async function (_, {UserId, UserPW}) {
            try {
                let result = await login.login(UserId, UserPW);
            
                log("User Logined with this result : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such user");
                }
                return result;
            } catch (error) {
                log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },
        getPosts: async function(_, {Company})  {
            try {
                let result = await dbRead.getPosts(Company);
                log("getPosts : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such post");
                }
                return result;
            } catch (error) {
                log(`post list is failed because of this error : ${error}`);
                throw error;
            }
        },
        getMyposts: async function(_, {UserId})  {
            try {
                let result = await dbRead.getMyposts(UserId);
                log("getMyposts : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such Mypost");
                }
                return result;
            } catch (error) {
                log(`Mypost list is failed because of this error : ${error}`);
                throw error;
            }
        },
        readPost: async function(_, {No})  {
            try {
                let result = await dbRead.readPost(No);
                log("getPosts : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such readpost");
                }
                return result;
            } catch (error) {
                log(`readpost : ${error}`);
                throw error;
            }
        }
    },
    Mutation: {
        createPosts: async (_, {
            Title = null,
            Contents = null,
            UserId = null,
            Company = null,
            CreatedDate = null,
        }) => {
            try {
                let data = {
                    "Title": Title,
                    "Contents": Contents,
                    "UserId": UserId,
                    "Company": Company,
                    "CreatedDate": CreatedDate,
                };
                const result = await dbInsert.createPosts(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createPosts error: ${error}`);
                throw error;
            }
        },
    
    }

}

module.exports = resolvers
