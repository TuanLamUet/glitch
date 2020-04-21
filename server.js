// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});
app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

let todos = [
  { id: 1, todo: "Đi chợ" },
  { id: 2, todo: "Nấu cơm" },
  { id: 3, todo: "Rửa bát" },
  { id: 4, todo: "Học code ở CodersX" }
];


app.get("/todos", (req, res) => {
  let q = req.query.q;
  
  if(q) {
    let todosMatches = todos.filter(item => {
    return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    res.render("todos", {
      todos: todosMatches
    });
  }
  else {
    res.render("todos", {
      todos:todos
    })
  }

});

app.post("/todos/create", (req, res) => {
  let todo = req.body;
  todos.push(todo);
  console.log(todo);
  return res.redirect('back');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
