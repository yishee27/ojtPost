//db를 읽기만 하는 함수 모음
const mariadb = require('mariadb'); 
var config = require('./db.config'); 

const logger = require('winston');
const log = (msg) => logger.info(msg);

const pool = mariadb.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port:3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports ={
    getPosts : async function(Company) {
        try {
            let queryString = "select * from Posts where Company = '" + Company + "' and ParentPost is null order by No desc";

            let result = await pool.query(queryString);
            //log("dbread.getPosts : " + queryString);
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
    }
   
}

