var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Fareed021")
var app = express();
var flash = require('connect-flash');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var Bear = require('./bear.js')
var port = process.env.PORT || 8081;
var router = express.Router();
 
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
router.use(function (req, res, next) {
    // do logging

    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
router.route('/bears')
    .post(function (req, res) {

        var bear = new Bear();

        console.log("This request body", req.body.data);
//var assign  = req.body.data;
        bear.data =req.body.data

        console.log("here is ",  req.body.data)
        bear.save(function (err,bear) { 
            if (err)
                res.send(err)
                res.json(bear);
            res.json({ message: 'Bear created!' });
            // Bear.find(function (err, bears) {
            //     if (err)
            //         res.send(err);
            //     console.log(bears);
            //     res.json(bears);
            // })
            //res.json({ message: 'Bear created!' });
        })
    })
    router.route('/get')
    .get(function (req, res) {
        console.log("request");
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);
            console.log(bears);
            res.json(bears);
        
        });
    });

router.route('/bears/:bear_id')
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            console.log('bear', bear)
            res.json(bear);
        })
    })
    .put(function (req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function (err, bear) {

            if (err)
                res.send(err);

            bear.text = req.body.text;  // update the bears info

            // save the bear
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    .delete(function (req, res) {
         console.log('id here',req.body)
        Bear.remove({
            _id: req.params.bear_id
           
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


//  app.get('/user', function(req,res){
//       console.log('get is ',req.body);

//    res.json({message : 'horaiiiiiiiiiiii  bhai cha gia '} );
//  });

// app.delete('/delete', function(req, res, next) {
//   console.log("delete: req.body: " +  req.body.fareed);
//   res.json({"data": req.body.fareed});
// })


app.use('/api', router);

app.listen(port, function (req, res) {
    console.log('the magic is here on ' + port)
})





  //some other code

//app.use(passport.session());
//app.use(flash());

// router.get('/', function(req,res){
//     res.json({message : 'horaiiiiiiiiiiii agaui bhai cha gia '} );
// });


// app.use('/api' ,router);

// app.listen(port, function(req,res){
//     console.log('the magic is here on '+ port)
// })          // get an instance of the express Router
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
// router.route('/users')
// .post(function (req, res) {
//     console.log(req.body)
//      res.json({ message: req.body})

// });
// app.put('/update',function(req,res){
//     post.findById(req.param.)
// })
//  app.put('/update',function(req, res) {
//             post.findById(req.params.post_id, function(err, post) {
//                 if (err)
//                     res.send(err);

//                 post.postTitle = req.body.postTitle;

//                 // save the post
//                 post.save(function(err) {
//                     if (err)
//                         res.send(err);

//                     res.json({ message: 'post updated!' });
//                 });
//             });
//         })
