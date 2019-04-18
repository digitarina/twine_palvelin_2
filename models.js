(function(){

	'use strict';

	const pool = require("./db");

	exports.saveStory = (parsedStory, callback) =>{

		let queryString = 'INSERT INTO stories (story) VALUES (?)';

		pool.query(queryString, parsedStory, (err, savedStory)=>{

			if(err){
				console.log(err)
				callback(err, null);
				return;
			}

			callback(null, savedStory);
		})

	}
	exports.fetchStory = (storyId, callback) =>{

		let queryString = 'SELECT story FROM stories WHERE ind = ?';

		pool.query(queryString, storyId, (err, story)=>{

			if(err){
				console.log(err)
				callback(err, null);
				return;
			}
			console.log(story[0].story)
			callback(null, story[0].story);
		})

	}

})();