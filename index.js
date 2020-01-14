const express=require('express')
const app=express()
const massive=require('massive')
require('dotenv').config()
const {CONNECTION_STRING, PORT}=process.env

massive({connectionString:CONNECTION_STRING, 
ssl:true}).then((db)=>{
app.set(db, 'db')
console.log('database connected')
})



app.listen(PORT, ()=>{
console.log('listening on ', PORT)

})
