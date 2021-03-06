const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/:dishId')
.get((req,res,next) => {
    // processed after app.all
    res.end('Will send details of the dish: '
    + req.params.dishId + ' to you!');
})
.post((req,res,next) => {
    // processed after app.all
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put((req,res,next) => {
    // processed after app.all
    res.write('Updating the dish: ' 
    + req.params.dishId + '\n');
    res.end('Will update the dish: '+req.body.name 
    + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    // processed after app.all
    res.end('Deleting dish: '+req.params.dishId);
});

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    // processed after app.all
    res.end('Will send all the dishes to you!');
})
.post((req,res,next) => {
    // processed after app.all
    res.end('Will add the dish: '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next) => {
    // processed after app.all
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    // processed after app.all
    res.end('Deleting all the dishes!');
});

module.exports = dishRouter;
