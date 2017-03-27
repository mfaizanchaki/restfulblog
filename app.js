var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// ROUTES
app.get('/', function(req, res){
    res.redirect('/blogs');
});

// Index Route
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            throw err;
        }else{
            res.render('index', {blogs: blogs});
        }
    });
});

// Create Route
app.get('/blogs/new', function(req, res){
    res.render('newpost');
});

app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('newpost');
        }else{
            res.redirect('/blogs');
        }
    });
});

// Show Route
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('show', {blog: blog});
        }
    });
});

// title
// image
// content
// created

app.listen(3000, function(){
    console.log('Server is running');
})