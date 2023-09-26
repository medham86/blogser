const express = require("express");
const routes = require("./routes")
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser');
const cors = require('cors')


require("dotenv").config()
const app = express() ; 
const port = process.env.PORT || 5000 ;

const url = process.env.DB_URL
mongoose.connect(url,{
    useNewUrlParser : true ,
    useUnifiedTopology : true
})
.then(()=>console.log("database connected"))
.catch((err)=>{console.log(err.message)})

app.use(cors({
    origin : 'http://localhost:3000' ,
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/blog",express.static("./uploads"))
app.use("/api",routes)

app.listen(port , ()=>{
    
    console.log(`server is listening on port ${port}`)
})
