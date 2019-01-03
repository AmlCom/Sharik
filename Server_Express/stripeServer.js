const express = require('express');
const stripe = require('stripe')('sk_test_iFyGDZqf7x6o9lNuSsR6irNZ');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();




//handlebars middleware
//the layout that rap all our views is called main
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars')


//bodyparser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static folder for saving the pic
app.use(express.static(`${__dirname}/public`));

//index route
app.get('/',(req,res) => {
    res.render('index')
})


//this is for huroku 
const port = process.env.PORT || 5000;

//to start on the post when we start our server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})