const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection=require('./mongodb')
const bcrypt = require('bcrypt')
const templatePath=path.join(__dirname,'templates')
const publicPath=path.join(__dirname, 'public')

app.use(express.static(publicPath))
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req, res)=>{
    res.render("login");
})

app.get("/signup",(req, res)=>{
    res.render("signup");
})

app.post("/signup",async (req,res)=>{

    const data={
        name:req.body.name,
        password: await bcrypt.hash(req.body.password, 10)
    }

    await collection.insertMany([data])

    res.render("home")

})

app.post("/login",async (req,res)=>{

    try{
        const user=await collection.findOne({name:req.body.name})

        if(user && await bcrypt.compare(req.body.password, user.password)){
            res.render("home")
        }
        else{
            res.status(400).render("login",{ errorMessage: "Špatné heslo" })
        }
    }
    catch{
        res.status(400).render("login", { errorMessage: "Špatné údaje" })
    }

})

app.listen(3000,() => {
    console.log('WEB IS LIVE!');
})