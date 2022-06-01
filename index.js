const mysql= require('mysql2') ;
const express = require('express') ;
var app = express() ;
const bodyparser = require('body-parser');
const encoder = bodyparser.urlencoded() ;

app.use(bodyparser.json());




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sampat123',
    database: 'login',
    multipleStatements : true
  
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DataBase connection succeded.');
    else
        console.log('DataBase connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+"/index.html") ;
})
app.get('/register',(req,res)=>
{
    res.sendFile(__dirname+"/register.html") ;
})
app.post('/register',(req,res)=>
{
    let email1=req.body.email1 ;
    let password1=req.body.password1;
    console.log(email1) ;
    let sql ="INSERT INTO login_data(User_name,User_pass) VALUES(?,?)"  ;
    mysqlConnection.query(sql,[email1,password1],function(err,result) 
   
    {
        if (err) throw err  ;
        res.send("Registration successful")
    })


})

app.post('/',encoder,(req,res)=>
{
    var username=req.body.username ;
    var password=req.body.password ;
    mysqlConnection.query("select * from login_data where User_name=? and User_pass=?",[username,password],function(error,results,fields)
    {
        if(results.length>0)
        {
            res.redirect("/welcome") ;
        }
        else{
            res.redirect("/invalid") ;
        }
        res.end() ;
    })
})
app.get('/welcome',(req,res)=>
{
    res.sendFile(__dirname+'/welcome.html') ;
})
app.get('/invalid',(req,res)=>
{
    res.sendFile(__dirname+'/notfound.html') ;
})
{

}
app.listen(4000) ;
