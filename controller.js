
(function(){
	
	'user strict';

	const fs = require('fs');

	const cheerio = require('cheerio');
	const escape = require('escape-html'); //escape module for saving to db

	const models = require('./models');

	module.exports.parseAndSave = (req, res)=>{

		// find tw-storydata html element
		let $ = cheerio.load(req.text, { decodeEntities: false })
		let storyElement = $.html('tw-storydata')

		var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let fileId = Array.apply(null, Array(8)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');

		let fileName = './story_files/' + fileId + '.html';

		let script =`<script>
						localStorage.setItem('new-story','` + fileId + `');
						window.location.replace('http://localhost');
					</script>`;
					
		let htmlString = storyElement.concat(script);
		//save as html file and send link in response
//		fs.writeFile(fileName, htmlString, (err) => {
		fs.writeFile(fileName, req.text, (err) => {
				if (err) throw err;
				console.log('The file has been saved!');
				res.send('http://localhost/story/' + fileId);
		});

	}

	module.exports.sendStory = (req, res)=>{
		console.log('Get story!');
		var path = require('path');
		if(!req.params.storyId){
			return res.sendStatus(400);
		}
		res.sendFile(req.params.storyId + '.html', { root: path.join(__dirname, '/story_files') });
//		res.sendFile(req.params.storyId + '.html', {root: __dirname + /story_files/});

	}

})();


//		models.saveStory(escaped, (err, savedStory)=>{
//
//			if(err){
//				res.sendStatus(400)
//				return
//			}

//		});

//		models.fetchStory(req.params.storyId, (err, story)=>{
//
//			if(err){
//				res.sendStatus(400)	
//				return
//			}
//

//
//		});
