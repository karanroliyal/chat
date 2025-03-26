const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat'
})

connection.connect((err)=>{
    if(err){
        console.log("This error occured = ",err.message);
    }else{
        console.log("Connection to database was successfull :",connection.threadId)
    }
})

module.exports = connection;