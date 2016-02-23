var express = require('express');
var router = express.Router();  // get an instance of router
var Bear = require('../models/todo');

router.route('/index')  
	.post(function(req, res){

		var todo = new ToDo();

		todo.name = req.body.name; 
		todo.due_date = req.body.due_date;
		todo.description = req.body.description;

		todo.save(function(err, todo){
			if(err){
				console.log(err);
			} else {
				res.json(todo);
			}
		})
	})

    .get(function(req, res){
  	    ToDo.find(function(err, todo){ 
	  		if(err){
	  			console.log(err);
	  		} else {
	  			res.json(todo);
	  		}
	  	})
  	});

module.exports = router;