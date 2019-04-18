
(function(){
	
	'use srict';

	const port = 80;

	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser')

	app.use(bodyParser.urlencoded({extended:false}));
	app.use(express.static(__dirname + '/public'));
	
	// Add headers
	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);
	    // Pass to next layer of middleware
	    next();
	});

	app.use(function(req, res, next){
	  if (req.is('text/*')) {
	    req.text = '';
	    req.setEncoding('utf8');
	    req.on('data', function(chunk){req.text += chunk});
	    req.on('end', next);
	  } else {
	    next();
	  }
	});

  	const routes = require('./routes');
  	routes(app)

	app.listen(port, ()=>{

		console.log('Palvelin käynnistetty porttiin ' + port);

	});

	module.exports = app;

})();
