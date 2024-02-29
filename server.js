const express = require('express');
const app = express();
const collection=require('./mongodb')
const path = require('path')
const PORT = process.env.PORT || 4000;
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const templatePath=path.join(__dirname,'src','pages')
const publicPath=path.join(__dirname, 'public')

// VISITOR COUNT

let visitorCount = 0;

const updateVisitorCount = () => {
    visitorCount += 1;
    return visitorCount;
};


app.use(express.static(publicPath))
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

// Routy :D       , { visitorCount: count }
app.get("/",(req, res)=>{
    res.render("login");
})
app.get("/home", { visitorCount: count },(req, res)=>{
    res.render("login");
})
app.get("/signup",(req, res)=>{
    res.render("signup");
})
app.get("/aktulity",(req, res)=>{
    res.render("aktuality");
})
app.get("/kontakty",(req, res)=>{
    res.render("kontakty");
})
app.get("/swa",(req, res)=>{
    res.render("swa");
})
app.get("/home",(req, res)=>{
    res.render("home");
})
app.get("/prg",(req, res)=>{
    res.render("prg");
})
app.get("/pos",(req, res)=>{
    res.render("pos");
})
app.get("/pog",(req, res)=>{
    res.render("pog");
})
app.get("/forum",(req, res)=>{
    res.render("forum");
})
app.post("/signup",async (req,res)=>{

    const data={
        name:req.body.name,
        password: await bcrypt.hash(req.body.password, 10)
    }

    await collection.insertMany([data])
    const count = updateVisitorCount();
    res.render("home", { visitorCount: count });

})
app.post("/login",async (req,res)=>{

    try{
        const user=await collection.findOne({name:req.body.name})

        if(user && await bcrypt.compare(req.body.password, user.password)){
            const count = updateVisitorCount();
            res.render("home", { visitorCount: count });
        }
        else{
            res.status(400).render("login",{ errorMessage: "Špatné heslo" })
        }
    }
    catch{
        res.status(400).render("login", { errorMessage: "Špatné údaje" })
    }

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});