//db 삭제
var config = require('./db.config'); 

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
