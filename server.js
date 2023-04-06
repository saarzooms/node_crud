const express = require('express')
const app = express();
const port = 5000;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const dbConfig = require('./app/config/db.config')

const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection done with database');
}).catch((err)=>{
    console.log("error in db connection ",err);
    process.exit()
})

const blogRouter = require('./app/routes/blog.routes')

app.use('/api/blog', blogRouter)
app.get('/',(req,res)=>{
    console.log('welcome to server');
    res.send({message:"Welcome to server"})
})

//create server on port
app.listen(port,()=>{
    console.log(`server started on ${port}`);
})