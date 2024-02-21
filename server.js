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
const PORT = process.env.PORT || 4000;
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// VISITOR COUNT
let visitorCount = 0;

const updateVisitorCount = () => {
    visitorCount += 1;
    return visitorCount;
};

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'pages'));
app.use(express.urlencoded({ extended: false }));

// Express session setup
app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for user authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await collection.findOne({ name: username });

            if (user && await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect username or password' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await collection.findOne({ _id: id });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('login', { user: req.user });
});

app.get('/signup', (req, res) => {
    res.render('signup', { user: req.user });
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10)
    };

    await collection.insertMany([data]);
    const count = updateVisitorCount();
    res.render('home', { visitorCount: count, user: req.user });
});

// Login route with manual authentication
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', { errorMessage: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const count = updateVisitorCount();
            return res.render('home', { visitorCount: count, user: req.user });
        });
    })(req, res, next);
});

// Custom middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

app.get('/home', isAuthenticated, (req, res) => {
    const count = updateVisitorCount();
    res.render('home', { visitorCount: count, user: req.user });
});

app.get('/kontakty', isAuthenticated, (req, res) => {
    const count = updateVisitorCount();
    res.render('kontakty', { visitorCount: count, user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
