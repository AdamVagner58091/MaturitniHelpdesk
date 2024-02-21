/*const express = require('express');
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
});*/
const express = require('express');
const app = express();
const collection = require('./mongodb');
const path = require('path');
const session = require('express-session'); // Import express-session
const bcrypt = require('bcrypt');
const templatePath = path.join(__dirname, 'src', 'pages');
const publicPath = path.join(__dirname, 'public');

// Middleware to update visitor count
let visitorCount = 0;
const updateVisitorCount = () => {
    visitorCount += 1;
    return visitorCount;
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
};

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
    };

    await collection.insertMany([data]);
    const count = updateVisitorCount();
    res.render('home', { visitorCount: count });
});

app.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.isAuthenticated = true; // Set authentication status in session
            const count = updateVisitorCount();
            res.render('home', { visitorCount: count });
        } else {
            res.status(400).render('login', { errorMessage: 'Špatné heslo' });
        }
    } catch {
        res.status(400).render('login', { errorMessage: 'Špatné údaje' });
    }
});

app.get('/home', isAuthenticated, (req, res) => {
    const count = updateVisitorCount();
    res.render('home', { visitorCount: count });
});

app.get('/kontakty', isAuthenticated, (req, res) => {
    res.render('kontakty');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
