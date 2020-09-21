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
    createUsers : async function(data) {
        try {
            let queryString = 
              "insert into Users (UserId,UserPW,Company,UserName,UserEmail,UserMobile,CreatedDate) " +
              "values (" +
              "NULLIF(" + data['UserId'] + ", null), " +
              "NULLIF(" + data['UserPW'] + ", null), " +
              "NULLIF(" + data['Company'] + ", null), " +
              "NULLIF(" + data['UserName'] + ", null), " +
              "NULLIF(" + data['UserEmail'] + ", null), " +
              "NULLIF(" + data['UserMobile'] + ", null), " +
              "now() " +
              ")";

            let result = await pool.query(queryString);
            //log("dbinsert.createUsers : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbinsert.createUsers: " + err);
            throw err;
        }
    },    

    createPosts : async function(data) {
        try {
            let queryString = 
              "insert into Posts (Title,Contents,UserId,Company,CreatedDate) " +
              "values (" +
              "NULLIF(" + data['Title'] + ", null), " +
              "NULLIF(" + data['Contents'] + ", null), " +
              "NULLIF(" + data['UserId'] + ", null), " +
              "NULLIF(" + data['Company'] + ", null), " +
              "now() " +
              ")";

            let result = await pool.query(queryString);
            //log("dbinsert.createPosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbinsert.createPosts: " + err);
            throw err;
        }
    },
    editPosts : async function(data) {
        try {
            let queryString =
              "update Posts " +
              "set Title = nullif("+ data['Title'] + ",null), " + 
              "Contents = nullif(" + data['Contents'] + ",null), " +
              "ModifiedDate = now()" +
              " where No = "+ data['No'] ;

            let result = await pool.query(queryString);
            //log("dbinsert.editPosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbinsert.editPosts: " + err);
            throw err;
        }
    },
    createReply : async function(data) {
        try {
            let queryString = 
              "insert into Posts (Contents,UserId,Company,ParentPost,CreatedDate) " +
              "values (" +
              "NULLIF(" + data['Contents'] + ", null), " +
              "NULLIF(" + data['UserId'] + ", null), " +
              "NULLIF(" + data['Company'] + ", null), " +
              "NULLIF(" + data['ParentPost'] + ", null), " +
              "now() " +
              ")";

            let result = await pool.query(queryString);
            log("dbinsert.createReply : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbinsert.createReply: " + err);
            throw err;
        }
    },    
   
}
