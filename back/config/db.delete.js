//db 삭제
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
    deletePosts : async function(No) {
        try {
            let queryString = "delete from Posts where No = " + No ;
            let result = await pool.query(queryString);
            //log("dbdelete.deletePosts : " + queryString);
            return result;
        }
        catch (err) {
            console.error("dbdelete.deletePosts: " + err);
            throw err;
        }
    }
   
}
