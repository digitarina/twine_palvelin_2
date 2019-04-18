
(function(){
	
	'user strict';

	const fs = require('fs');

	const cheerio = require('cheerio');
	const escape = require('escape-html'); //escape module for saving to db

	const models = require('./models');

	exports.parseAndSave = (req, res)=>{

		// find tw-storydata html element
		let $ = cheerio.load(req.text, { decodeEntities: false })
		let storyElement = $.html('tw-storydata')

                var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let fileId = Array.apply(null, Array(8)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
//		let fileId =  Math.random().toString(36).substring(10);
		let fileName = './story_files/' + fileId + '.html';

		let script =`<script>
						localStorage.setItem('new-story','` + fileId + `')
						window.location.replace('http://195.110.58.110')
					</script>`;
					
		let htmlString = storyElement.concat(script);

		//save as html file and send link in response
		fs.writeFile(fileName, req.text, (err) => {
				if (err) throw err;
				console.log('The file has been saved!');
				res.send('http://31.220.111.30/story/' + fileId);
		});

	}

	exports.sendStory = (req, res)=>{
		if(!req.params.storyId){
			return res.sendStatus(400);
		}
		res.sendFile(req.params.storyId + '.html', {root: __dirname + /story_files/});

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
