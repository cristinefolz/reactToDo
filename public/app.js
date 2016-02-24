var TodoList = React.createClass({
	render: function() {
		var todosList = this.props.allMyData.map(function(t) {  // t is the value at each index of the array
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
	// component did mount
	componentDidMount: function() {  //react component: on page load, call loadTodosFromServer.
		this.loadTodosFromServer();
	},

	render: function() {
		return (
			<div>
			    <h3> To Do List </h3>
			    <TodoList allMyData={ this.state.todos } />
		    </div>
		)
	}
});

React.render(<App/>, document.getElementById('app'));