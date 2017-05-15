var express = require('express'); //reference

var app = express(); //instance
var port = 5000;

// configure bodyParser for handling POST data
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// var movieRouter = express.Router();

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

app.get('/movies/', function (req, res) {
  console.log("GET request to /movies");
  res.send(movies);
});

app.get('/movies/:id', function (req, res) {
  console.log("GET request to /movies/:id with request params: " + req.params);
  console.log("Got Movie: " + movies[req.params.id]);
  res.send(movies[req.params.id]);
})

app.post('/movies', function(req, res){
    console.log("POST request to /movies");
    movies.push({title: req.body.title, year: req.body.year});
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('You sent:\n');
    // res.end(JSON.stringify(req.body, null, 2));
    res.send(movies);
});

app.delete('/movies/:id', function(req, res){
    console.log("DELETE request to /movies");
    var id = parseInt(req.params.id);
    if (movies.length >= (id + 1)){
        console.log("Deleting " + movies[id].title);
        movies.splice(id, 1);    
    }
    res.send(movies);
});

app.listen(port, function(err){
    console.log("Listening on port: " + port);
});