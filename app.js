let express         = require('express');
let app             = express();
let bodyPaser       = require('body-parser');
let expressSession  = require('express-session');
const bcrypt = require('bcrypt');
let jwt = require("./helpers/jsontoken.js")
let { check, validationResult }  = require('express-validator');
let { renderCustom } = require('./helpers');
app.set('view engine', 'ejs');
app.set('views', './views/');


app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'MERN2410',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 // milli
    }
}))
let gbDemo = 1;

app.get('/mua-ve', (req, res) => {

    req.session.isLogin = true;
    res.json({ message: 'mua_ve_thanh_cong' });
});

app.get('/home', async(req, res) => {
    let infoUser = req.session.user;

    if (!infoUser) {
        res.json({ message: 'vui long dang nhap' });
    } else {
        let info = await jwt.verify(infoUser.token);
        console.log(info)
        res.json({ message: `xin chao ${infoUser.username}` })
    }
});
app.get('/login', (req, res) => {
    res.render('register')
});

app.post('/login', async(req, res) => {
    // let username = '', email = '', pwd = '';
    let  { username, pwd } = req.body;
    let token = await jwt.sign({ username, pwd });

    req.session.user = {
        username, pwd, role : 1, token
    }
    res.json({message :'dang nhap thanh con'})

    // let { errors, infoUser } = req.session;
    // if (infoUser) {
    //     username    = infoUser.username;
    //     email       = infoUser.email;
    //     pwd         = infoUser.pwd;
    // }
    // req.session.errors = [];
    // res.render('register', {
    //     errors,
    //     username, 
    //     email, 
    //     pwd
    // });
});



app.listen(3000, () => console.log(`server start at port 3000`));