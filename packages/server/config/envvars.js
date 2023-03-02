require('dotenv').config();

var db_password = process.env.DB_PASSWORD 
var secret_key = process.env.SECRET_KEY 

// export {db_password, secret_key};
module.exports = {db_password, secret_key};

