// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter);

db.defaults({ todos:[] })
  .write();


app.set("views", "./views");
app.set("view engine", "pug");

app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())


app.get("/todos", (req, res) => {
  let q = req.query.q;
  
  if(q) {
    let todosMatches = db.get('todos').value().filter(item => {
    return item.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    res.render("todos", {
      todos: todosMatches
    });
  }
  else {
    res.render("todos", {
      todos:db.get('todos').value(),
    })
  }

});

app.post("/todos/create", (req, res) => {
  let todo = req.body;
  db.get('todos').push(todo).write();
  console.log(todo);
  return res.redirect('back');
});

app.get("/todos/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get('todos').remove({id}).write();
  return res.redirect('/todos');
}); 
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
