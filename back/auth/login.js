
var config = require('../config/db.config'); 
const jwt = require('jsonwebtoken');

const logger = require('winston');
const log = (msg) => logger.info(msg);
const SECRET_KEY = "SeCrEtKeY1234";

const pool = async function () {
    try {
        mongoose.connect('mongodb://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/admin',{dbName:'ojt', useNewUrlParser: true,useUnifiedTopology: true},function(err){
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

module.exports={
    login: async function (UserId,UserPW){
        try {
            let queryString = "select * from Users where UserId = '" + UserId + "' and UserPW = '" + UserPW +"'";
            let result = await pool.query(queryString);

            if(result.length == 0) {
                throw new Error("No such userId");
            }
            let user = result.shift();
            console.log(user);
            const token = jwt.sign({
                UserId : UserId,
            },SECRET_KEY,{
                expiresIn: '7d'
            })
            return {
                token,
                user
            };
            
        } catch (error) {
            console.log(`login erorr : ${error}`);
        }

    },

    checkAuth: async function (token) {
        try {
            //log('checkAuth data : ' + token);

            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                log("decoded result : " + JSON.stringify(decoded));
                return decoded;  
            } catch (error) {
                log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            log(`no token error : ${error}`);
            throw error;
        }
    }




}