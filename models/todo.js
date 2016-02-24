var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // constructor function

var ToDoSchema = new Schema({
	name: String,
	dueDate: Date,
	description: String,
});

module.exports = mongoose.model('ToDo', ToDoSchema); 