const express = require("express")
const app = express();
const path = require('path')
const User = require('./models/db')
const bodyParser = require('body-parser')
const router = require('./routes')
const staticAsset = require('static-asset')


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);


app.use('/api/auth', router)

app.get('/', function(request, response) { 
    response.render('index', {
    title: 'TITLE'
    })
})

app.get('/home', function(request, response){
    response.render('home',{
        title:'Test_title'
    })
}) 
app.get('/create', function(request, response){
    response.render('create',{
        title:'Test_title'
    })
}) 

module.exports = app
