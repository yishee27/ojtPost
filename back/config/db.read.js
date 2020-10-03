//db를 읽기만 하는 함수 모음
const db = require('./db.connect');


var mongoose =require('mongoose');

const config = require("./db.config");

mongoose.Promise = global.Promise;

const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const Corps = require('../models/Corps.js');

const logger = require('winston');
const log = (msg) => logger.info(msg);


const pool = async function () {
    try {
        mongoose.connect('mongodb://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/admin',{dbName:'post', useNewUrlParser: true,useUnifiedTopology: true},function(err){
            if(err){
                log('mongodb connection err'+err);
            }else {
                log('mongodb connected');
            };
        });
    } catch (err) {
        console.log("Connection error : " + err);
        throw err;
    }
}

module.exports ={

    getUserByIdExe: async function (UserId = null) {
        try {
            let queryString =
                "select * " +
                "from Users ";

            if (UserId) {
                queryString +=
                    "where UserId = " + UserId;
            }


            let result;
            log('getUserByIdExe executed');
            result = await pool.query(queryString);
            return result;
        }
        catch (err) {
            console.error("getUserByIdExe Error: " + err);
            throw err;
        }
    },

    getPosts : async function(Company) {
        try {
            pool();
            log(pool());

            let result;

            //result = await Posts.find({Company:Company,ParentPost:null}).sort({"No":-1});
            
            //let queryString = "find({Company:" + Company + ",ParentPost:null}).sort({'No:-1})";

            result = await Posts.find({Company:Company});

            //log("dbread.getPosts : " + result);
            return result;
        }
        catch (err) {
            console.error("getPosts Error: " + err);
            throw err;
        }
    },
    getMyposts : async function(UserId) {
        try {
            let queryString = "select * from Posts where UserId = '" + UserId + "' and ParentPost is null order by No desc";

            let result = await pool.query(queryString);
            //log("dbread.getMyposts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("getMyposts Error: " + err);
            throw err;
        }
    },
    readPosts : async function(No) {
        try {
            let queryString = "select * from Posts where No = " + No ;

            let result = await pool.query(queryString);
            //log("dbread.readPosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("readPosts Error: " + err);
            throw err;
        }
    },

    IdDuplCheck : async function(UserId) {
        try {
            let queryString = "select * from Users where UserId ='" + UserId + "'" ;

            let result = await pool.query(queryString);

            let resultStr = "";
            if( result.length == 0 ){
                resultStr = "nonexist";
            }
            else{
                resultStr ="exist" //중복됨
            }

            return{
                resultStr
            }
        }
        catch (err) {
            console.error("readPosts Error: " + err);
            throw err;
        }
    },
    getReply : async function(No) {
        try {
            let queryString = "select * from Posts where ParentPost = " + No ;

            let result = await pool.query(queryString);
            //log("dbread.readPosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("getReply Error: " + err);
            throw err;
        }
    }
   
}

