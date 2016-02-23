// MOCK OBJECT FOR TODO

{ "name": "Learn React", "id": 1, "due_date": "12/12/16", "description": "self explanatory...." }

// MOCK API FOR TODO

{ "GET /todos": { "desc": "returns all todos", "response": "200 application/json", "data": [{}, {}, {}] },

"GET /todos/:id": { "desc": "returns one todo represented by id", "response": "200 application/json", "data": {} },

"POST /lions": { "desc": "create and returns a new lion uisng the posted object as the lion", "response": "201 application/json", "data": {} },

"PUT /lions/:id": { "desc": "updates and returns the matching lion with the posted update object", "response": "200 application/json", "data": {} },

"DELETE /lions/:id": { "desc": "deletes and returns the matching lion", "response": "200 application/json", "data": {} } }