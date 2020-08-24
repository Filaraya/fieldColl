// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/incidents");

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Incident = mongoose.model('incident', {
    title: String,
    description: String,
    rating: Number
});

// Routes

    // Get incidents
    app.get('/api/incidents', function(req, res) {

        console.log("fetching incident . . .");

        // use mongoose to get all incidents in the database
        incident.find(function(err, incidents) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(incidents); // return all incidents in JSON format
        });
    });

    // create incident and send back all incidents after creation
    app.post('/api/incidents', function(req, res) {

        console.log("creating incident . . .");

        // create a incident, information comes from request from Ionic
        Incident.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the incidents after you create another
            Incident.find(function(err, incidents) {
                if (err)
                    res.send(err)
                res.json(incidents);
            });
        });

    });

    // Update a incidents 
app.put('/api/incidents/:id', function (req, res) {
    const incident = {
        title : req.body.title,
        description : req.body.description,
        rating: req.body.rating,
            
    };
    console.log("Updating incident - ", req.params.id);
    Grocery.update({_id: req.params.id}, grocery, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});

    // delete a incident
    app.delete('/api/incidents/:id', function(req, res) {
        Incident.remove({
            _id : req.params.id
        }, function(err, incident) {
            if (err) {
                console.error("Error deleting incident ", err);
            }
            else {
                Grocery.find(function (err, incidents) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json(incidents);
                    }
                });
            }

        });
    });


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 8000);
console.log("Incident server listening on port  - ", (process.env.PORT || 8000));