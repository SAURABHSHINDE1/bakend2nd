import express from 'express'
import dotenv from 'dotenv/config'
import mysql from 'mysql2'
const app  = express()

const db = mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    database:process.env.DBDATABASE
})

db.connect((err)=>{

    if(err){
        console.log("some err in db :-" + err)
    }
    else{
        console.log("database is connected successfully !")
    }

})

app.get('/' , (req , res)=>{

    res.send("hello")

})

app.get('/api/:id' , (req  , res)=>{

    let {id} = req.params

    let sql = 'select * from user where id = ?'

    db.query(sql, [id] ,(err , result)=>{

        if(err){
            return res.json({success : false , message: "some err" + err})
        }

        res.json({success : true , data :result})

    })

})

app.listen(process.env.PORT  , ()=>{
    console.log(`Server is runing on http://localhost${process.env.PORT}`)
})
