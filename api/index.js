const express = require('express');
const port = 3000;
const app = express();
const user_data = require('./routes/user_data')
const user_registration = require('./routes/register_user')
const socket = require('./routes/socket')
const CORS = require('./middlewares/CORS')
const path = require('path')

app.use(CORS)
app.use(express.json())

app.use('/images' , express.static(path.join(__dirname , '/uploads')))
app.use('/user-data' , user_data);
app.use('/registartion' , user_registration);
app.use('/' , socket);

app.listen(port , (err)=>{

    if(err){
        console.log("This error occured : " , err)
    }else{
        console.log(`Server is running at ${port}`)
    }

})