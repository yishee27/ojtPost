require("dotenv").config();

module.exports=(function(){
    return {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "1234123",
        database: process.env.DB_NAME || "post",
        port:process.env.DB_PORT||"27017"
    };
})();