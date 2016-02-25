var TodoList = React.createClass({
	render: function() {
		var self = this;
		var todosList = this.props.allMyData.map(function(t) { // t is the value at each index of the array 
			return (
			<div className="panel panel-default">
			  <div className="panel-header">
			    <h3> { t.name } </h3>
			  </div>
			  <div className="panel-body">
			  	<p> { t.description } </p>
		  	  </div>
		  	  <div className="panel-footer">
		  	    <p> { t.dueDate } </p>
		  	    <button className="btn btn-info" 
		  	      onClick={ self.props.ableToDelete.bind(this, t._id) } >
		  	      delete 
		  	    </button>
			  </div>
		    </div>
			)
		});
	return (
		<div>
		  <p> { todosList } </p>
		</div>
		)
		
	}
});

var TodoForm = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			dueDate: '',
			description: '',
		}
	},
	handleNameChange: function(e) {
		this.setState({
			name: e.target.value
		})
	},
	handleDueDateChange: function(e) {
		this.setState({
			dueDate: e.target.value
		})
	},
	handleDescriptionChange: function(e) {
		this.setState({
			description: e.target.value
		})
	},
	handleForm: function(e) {
		e.preventDefault();
		var name = this.state.name;
		var dueDate = this.state.dueDate;
		var description = this.state.description;
		this.props.ableToSubmit({
			name: name,
			dueDate: dueDate,
			description: description,
		});
		this.setState({
			name: '',
			dueDate: '',
			description: '',
		})
	},

	render: function() {
		return (
			<div>
				<form onSubmit={this.handleForm} method="" role="form">
					<legend>Make a New To Do</legend>
				
					<div className="form-group">
						<label for="">name</label>
						<input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="" placeholder="name"/>
					</div>
				
					<div className="form-group">
						<label for="">due date</label>
						<input onChange={this.handleDueDateChange} value={this.state.dueDate} type="date" className="form-control" id="" placeholder="due date"/>
					</div>

					<div className="form-group">
						<label for="">description</label>
						<input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="" placeholder="description"/>
					</div>
					
				
					<button type="submit" className="btn btn-primary">Create</button>

				</form>
			</div>
		)
	}
});

var App = React.createClass({
	// set initial state
	getInitialState: function() {  //react component
		return {
			todos: []
		}
	},
	// ajax togo get ToDos
	loadTodosFromServer: function() {
		var self = this;  // we want the state of done to bind to the loadTodosFromServer scope (vs the scope of done)
		$.ajax({
			url: '/api/todos',
			method: 'GET',
		}).done(function(data){
			self.setState({
				todos: data
			})
		});
	},

	handleDelete: function(id) {    // getting the value for 'id' from the binding method in the delete button above
		var id = id;
		var self = this;
		$.ajax({
			url: '/api/todos/' + id,
			method: 'DELETE',
		}).done(function() {
			console.log('deleted todo');
			self.loadTodosFromServer();
		})
	},

	handleSubmit: function(todo) {
		var self = this;
		$.ajax({
			url: '/api/todos/',
			method: 'POST',
			data: todo
		}).done(function() {
			self.loadTodosFromServer();
      		console.log('posted todo to server!')
		})
	},

	// component did mount
	componentDidMount: function() {  //react component: on page load, call loadTodosFromServer.
		this.loadTodosFromServer();
	},

	render: function() {
		return (
			<div>
			    <h3> To Do List </h3>
			    <TodoList ableToDelete={ this.handleDelete } allMyData={ this.state.todos } />
			    <TodoForm ableToSubmit={ this.handleSubmit } />
		    </div>
		)
	}
});

React.render(<App/>, document.getElementById('app'));


