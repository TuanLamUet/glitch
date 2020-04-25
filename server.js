// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bookRouter = require("./router/book.router");
const userRouter = require("./router/user.router");
const transactionRouter = require('./router/transaction.router');

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/', (request, response) => {
  response.send('I love CodersX'+'<br><a href="/books">My List book</a><br><a href="/users">List User</a><br><a href="/transactions/create>transactions</a>');
});

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT );
});
