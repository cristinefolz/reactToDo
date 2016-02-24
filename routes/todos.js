var express = require('express');
var router = express.Router();  // get an instance of router
var ToDo = require('../models/todo');

router.route('/todos')  
	.post(function(req, res){

		var todo = new ToDo();

		todo.name = req.body.name; 
		todo.dueDate = req.body.dueDate;
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

router.route('/todos/:todo_id') 
    .get(function(req, res){
 	    ToDo.findById(req.params.todo_id, function(err, todo){  //req.params because the bear_id is coming in from the URL; findById comes with Mongoose
			if(err){
				console.log(err);
			} else {
				res.json(todo);
			}
 		})
 	})

 	.put(function(req, res){
 	    ToDo.findById(req.params.todo_id, function(err, todo){
	 	 	if(err){
	 	 		console.log(err);
	 	 	} else {

	 	 		todo.name = req.body.name ? req.body.name : todo.name;  //ternary expression (always returns a value)
	 	 		todo.dueDate = req.body.dueDate ? req.body.dueDate : todo.dueDate;
	 	 		todo.description = req.body.description ? req.body.description : todo.description;

	 	 		todo.save(function(err, updateToDo){
	 	 			if(err){
	 	 				console.log(err);
	 	 			} else {
	 	 				res.json({title: 'todo updated'});
	 	 			}
	 	 		})
 	 		}
 	 	})
 	})

 	.delete(function(req, res){
 	    ToDo.remove({_id: req.params.todo_id}, function(err, todo){
	 	 	if(err){
				console.log(err);
	 	 	} else{
	 	 		res.json({title: 'todo was successfully deleted'});
	 	 	}
 	 	})
 	});

module.exports = router;