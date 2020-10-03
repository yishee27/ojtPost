const dbRead = require('../config/db.read');
const dbInsert = require('../config/db.insert');
const dbDelete = require('../config/db.delete');
const login = require('../auth/login');

const config = require("../config/db.config");

const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const Corps = require('../models/Corps.js');

const logger = require('winston');
const log = (msg) => logger.info(msg);

const pool = async function () {
    try {
        mongoose.connect('mongodb://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/admin',{dbName:'post', useNewUrlParser: true,useUnifiedTopology: true},function(err){
            if(err){
                console.error('mongodb connection err',err);
            }else {
                console.log('mongodb connected');
            };
        });
    } catch (err) {
        console.log("Connection error : " + err);
        throw err;
    }
}

const resolvers = {
    Query: {

        login: async function (_, {UserId, UserPW}) {
            try {
                let result = await login.login(UserId, UserPW);
                log("User Logined with this result : " + JSON.stringify(result));
                return result;
                
            } catch (error) {
                log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },

        getPosts: async function(_,{Company})  {
            try {
                let result = await dbRead.getPosts(Company);
                log("getposts : " + JSON.stringify(result));
                return result;
            } catch (error) {
                //log(`Mypost list is failed because of this error : ${error}`);
                throw error;
            }
        },
        


        getMyposts: async function(_, {UserId})  {
            try {
                let result = await dbRead.getMyposts(UserId);
                //log("getMyposts : " + JSON.stringify(result));
                return result;
            } catch (error) {
                //log(`Mypost list is failed because of this error : ${error}`);
                throw error;
            }
        },

        readPosts: async function(_, {No})  {
            try {
                let result = await dbRead.readPosts(No);
                //log("readPosts : " + JSON.stringify(result));
                return result;
            } catch (error) {
                log(`readpost : ${error}`);
                throw error;
            }
        },

        IdDuplCheck: async function(_, {UserId})  {
            try {
                let result = await dbRead.IdDuplCheck(UserId);
                //log("getPosts : " + JSON.stringify(result));
                return result;
            } catch (error) {
                log(`IdDuplCheck is failed because of this error : ${error}`);
                throw error;
            }
        },
        getReply: async function(_, {No})  {
            try {
                let result = await dbRead.getReply(No);
                //log("getReply : " + JSON.stringify(result));
                return result;
            } catch (error) {
                log(`getReply is failed because of this error : ${error}`);
                throw error;
            }
        }
    },
    Mutation: {

        createUsers: async (_, {
            UserId = null,
            UserPW = null,
            Company = null,
            UserName = null,
            UserEmail = null,
            UserMobile = null,
            CreatedDate = null
        }) => {
            try {
                let data = {
                    "UserId" : UserId,
                    "UserPW" : UserPW,
                    "Company" : Company,
                    "UserName" : UserName,
                    "UserEmail" : UserEmail,
                    "UserMobile" : UserMobile,
                    "CreatedDate" : CreatedDate
                };
                const result = await dbInsert.createUsers(data);
                log("createUsers : " + JSON.stringify(result));
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createUsers error: ${error}`);
                throw error;
            }
        },        
        
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
                log("createPosts : " + JSON.stringify(result));
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createPosts error: ${error}`);
                throw error;
            }
        },

        editPosts: async (_, {
            No = null,
            Title = null,
            Contents = null,
            ModifiedDate = null,
        }) => {
            try {
                let data = {
                    "No" : No,
                    "Title": Title,
                    "Contents": Contents,
                    "ModifiedDate": ModifiedDate,
                };
                const result = await dbInsert.editPosts(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`editPosts error: ${error}`);
                throw error;
            }
        },

        deletePosts: async function(_, {No})  {
            try {
                let result = await dbDelete.deletePosts(No);
                log("deletePost : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("not delete post");
                }
                return result;
            } catch (error) {
                log(`deletepost : ${error}`);
                throw error;
            }
        },

        createReply: async (_, {
            Contents = null,
            UserId = null,
            Company = null,
            ParentPost = null,
            CreatedDate = null,
        }) => {
            try {
                let data = {
                    "Contents": Contents,
                    "UserId": UserId,
                    "Company": Company,
                    "ParentPost": ParentPost,
                    "CreatedDate": CreatedDate,
                };
                const result = await dbInsert.createReply(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createReply error: ${error}`);
                throw error;
            }
        },
    
    }

}

module.exports = resolvers
