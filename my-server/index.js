const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
//create default API
app.get("/",(req,res)=>{
    res.send("Hello Restful API");
})
app.use(morgan('dev'));
app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`);
});