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
            log("dbinsert.createPosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbinsert.createPosts: " + err);
            throw err;
        }
    }
   
}
