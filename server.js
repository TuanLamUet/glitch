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

db.defaults({ books:[] })
  .write();


app.set("views", "./views");
app.set("view engine", "pug");

app.get('/', (request, response) => {
  response.send('I love CodersX'+'<br><a href="/listbook">My listbook</a>');
});

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())


app.get('/listbook', (req, res) => {
  res.render("listbook", {
    books: db.get("books").value()
  })
});

app.post("/add-new-book", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  db.get('books').push({title, description}).write()
  return res.redirect('/listbook');
});

app.get("/listbook/:title/delete", (req, res) => {
  let title = req.params.title;
  db.get('books').remove({title}).write()
  return res.redirect('/listbook');
});

app.get("/listbook/:title/update-title", (req, res) => {
  let title = req.params.title;
  return res.render("update-title.pug", {
    title: title
  })
});

app.post("/listbook/:title/update", (req, res) => {
  let oldTitle = req.params.title;
  let newTitle = req.body.title;
  db.get('books').find({title: oldTitle}).assign({title: newTitle}).write();
  return res.redirect("/listbook");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
