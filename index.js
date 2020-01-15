const express=require('express')
const app=express()
const massive=require('massive')
require('dotenv').config()
const {CONNECTION_STRING, PORT}=process.env

massive({connectionString:CONNECTION_STRING, 
ssl:true}).then((db)=>{
app.set('db', db)
console.log('database connected')
})



app.listen(PORT, ()=>{
console.log('listening on ', PORT)

})

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/appts',async  (req, res)=>{
    let db=req.app.get('db')
    let dbRes=await db.query(`select * from employees`)

    console.log(dbRes.length, 'db data')

    res.status(200).send(dbRes)
    

})

app.get('/subs', async (req, res)=>{
  let db=req.app.get('db')
  let dbRes=await db.query("select * from pr_subscriptions where date_added between '2019-12-01' and '2019-12-31'")
console.log(dbRes.length)
  res.status(200).send(dbRes)
})