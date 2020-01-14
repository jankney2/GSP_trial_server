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


app.get('/appts',async  (req, res)=>{
    let db=req.app.get('db')
    let dbRes=await db.query(`select * from pestroutes_appts
    where date_completed between '2019-12-01' and '2019-12-31'
    and appt_status=1
    and office_id=1
    or office_id=2
    or office_id=3`)

    console.log(dbRes.length, 'db data')

    res.status(200).send(dbRes)
    

})