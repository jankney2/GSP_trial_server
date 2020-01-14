const express=require('express')
const app=express()
const massive=require('massive')



massive(CONNECTION_STRING).then((db)=>{
app.set('db', db)
console.log('database connected')
})



app.listen(7909, ()=>{
console.log('listening on 7909')
})
