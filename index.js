const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const BlogPost = require('./models/BlogPost');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const pagesController = require('./controllers/pagesController');
const homeController = require('./controllers/home');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validateMiddleWare = require('./middleware/validationMiddleware');

//initialise express
const app = new express();

//connecting to the database
mongoose.connect('mongodb://0.0.0.0:27017/blog_db',
    { useNewUrlParser: true }
); 

//middleware functions
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());
app.use('/posts/store',validateMiddleWare);

//setting templating engine to ejs
app.set('view engine', 'ejs')

//user routes
app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController);

app.get('/', homeController);

app.get('/about', pagesController.about);

//post routes
//view post by id
app.get('/post/:id', getPostController);

//create new post
app.get('/posts/new', newPostController);

//stores post in database
//redirects us to home page
app.post('/posts/store', storePostController);

app.get('/contact', pagesController.contact);

//set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
});