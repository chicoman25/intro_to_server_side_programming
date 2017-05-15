
var express = require('express'); //reference
var mongodb = require('mongodb').MongoClient;
var app = express(); //instance
var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// configure bodyParser for handling POST data
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

var methodOverride = require('method-override')
app.use(methodOverride('_method'));

var nav = [
    {
        link: '/movies',
        title: "Movies"
    }
]

// set our "nav" object globally.
app.use(function(req, res, next){
    res.locals.nav = nav;
    next();
});

var movies = [
    {
        title: 'Rogue One: A Star Wars Story',
        year: '2016'
    },
    {
        title: 'Sing',
        year: '2016'
    },
    {
        title: 'Jurassic World',
        year: '2015'
    }
];

//index
app.get('/', function(req, res){
    res.render('index', {title: 'Hello from EJS'});
});


var url = 'mongodb://localhost:27017/movieApp';
app.get('/movies', function(req, res){

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('movies');

        collection.find({}).toArray(
            function (err, results) {
                res.render('movieListView', {
                    title: 'Movies',
                    movies: results
                });
            }
        );
    });
});

app.get("/addMovies", function (req, res) {

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('movies');
            collection.insertMany(movies,
                function (err, results) {
                    res.send(results);
                    db.close();
                }
            );

        });
    });


app.post('/movies', function(req, res){
    // console.log("POST request to /movies");
    // movies.push({title: req.body.title, year: req.body.year});
    // res.redirect('/movies');

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('movies');
        var movie = {
            title: req.body.title,
            year: req.body.year
        };

        collection.insertOne(movie,
            function (err, results) {
                res.redirect('/movies');
                // req.login(results.ops[0], function () {
                //     res.redirect('/auth/profile');
                // });
            });
    });
});

app.delete('/movies/:id', function(req, res){
    console.log("DELETE request to /movies");
    var id = parseInt(req.params.id);
    if (movies.length >= (id + 1)){
        console.log("Deleting " + movies[id].title);
        movies.splice(id, 1);    
    }
    res.redirect('/movies');
});

app.listen(port, function(err){
    console.log("Listening on port: " + port);
});
