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

app.get('/emps',async  (req, res)=>{
    let db=req.app.get('db')
    let dbRes=await db.query(`select * from employees`)
    //Add me tomorrow for better numbers! 
    //  e join employee_joins ej on ej.proutes_id=e.proutes_id join knack_employees ke on ke.knack_identifier=ej.knack_id

    console.log(dbRes.length, 'db data')

    res.status(200).send(dbRes)
    

})

app.get('/subs', async (req, res)=>{
  let db=req.app.get('db')
  let dbRes=await db.query("select * from pr_subscriptions where date_added between '2019-12-01' and '2019-12-31' and active=1")
console.log(dbRes.length)
  res.status(200).send(dbRes)
})

app.get('/appts', async (req, res)=>{
  try {
    let db=req.app.get('db')
    let dbRes=await db.query("select * from pestroutes_appts where pr_date_added>'2020-01-08' and appt_status=1")
    console.log(dbRes.length, 'dbres')
    res.status(200).send(dbRes)
    
  } catch (error) {
    console.log(error, 'db error')
    res.status(419).send(error)
  }
})