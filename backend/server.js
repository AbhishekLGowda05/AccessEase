const express = require('express');
const dotenv=require('dotenv');
const routes = require('./routes');
const User= require('./UserModel/Model');
const path = require('path');

const ConnectDB= require('./Database');
dotenv.config();
ConnectDB();

const app = express();
app.use(express.json());
app.use('/extensions',express.static(path.join(__dirname,'frontend')));

app.use('/extensions',express.static(path.join(__dirname,'Extensions')));
app.use("/api/users",routes);

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','index.html')
});

app.listen(5000,()=>{

    console.log('server started listening at port 5000');
})