const router = require('express').Router();
const uuid = require('uuid/v4');
const db = require("../db.js");

router.get('/', (req, res) => {
  res.render("book/books", {
    books: db.get("books").value()
  })
});

router.post("/", (req, res) => {
  let title = req.body.title;
  let bookId = uuid();
  let description = req.body.description;
  db.get('books').push({bookId, title, description}).write()
  return res.redirect('/books');
});

router.get("/:bookId/delete", (req, res) => {
  let bookId = req.params.bookId;
  db.get('books').remove({bookId}).write()
  return res.redirect('/books');
});

router.get("/:bookId/update-title", (req, res) => {
  let bookId = req.params.bookId;
  return res.render("book/book-title.pug", {
    bookId: bookId
  })
});

router.post("/:bookId/update", (req, res) => {
  let bookId = req.params.bookId;
  let newTitle = req.body.title;
  db.get('books').find({ bookId}).assign({title: newTitle}).write();
  return res.redirect("/books");
})

module.exports = router;