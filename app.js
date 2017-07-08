var express = require('express');
var bodyParser = require('body-parser');
var mongoose  =  require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017")
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var Bear = require('./bear.js')
var port = process.env.PORT || 8081 ; 
var router  = express.Router();

// router.get('/', function(req,res){
//     res.json({message : 'horaiiiiiiiiiiii agaui bhai cha gia '} );
// });


// app.use('/api' ,router);

// app.listen(port, function(req,res){
//     console.log('the magic is here on '+ port)
// })          // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.'); 
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});






// router.route('/bears')

//     // create a bear (accessed at POST http://localhost:8080/api/bears)
//     .post(function(req, res) {

//         var bear = new Bear();      // create a new instance of the Bear model
//         bear.name = req.body.name;  // set the bears name (comes from the request)

//         // save the bear and check for errors
//         bear.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'Bear created!' });
//         });

//     });

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);
router.route('/users')
.post(function (req, res) {
    console.log(req.body)
     res.json({ message: req.body})
     
});



app.use('/api', router);

app.listen(port, function(req,res){
    console.log('the magic is here on '+ port)
 })       