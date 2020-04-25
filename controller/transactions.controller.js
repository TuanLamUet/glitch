const uuid = require('uuid/v4');
const db = require('../db.js');

let getAllTransactions= (req, res) => {
  return res.render("transactions/index", {
    transactions: db.get("transactions").value()
  })
};

let createNewTransactionPage =(req, res) => {
  return res.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value(),
  });
};

let createNewTransaction = (req, res) => {
  db.get('transactions').push({transId: uuid(),bookId: req.body.bookId, userId: req.body.userId, isComplete: false }).write();
  return res.redirect("/transactions/create");  
};

let Complete = (req, res) => {
  db.get("transactions").find({transId}).assign({isComplete: true}).write();
  return res.redirect("/transactions/create");
}
module.exports = {
  getAllTransactions,
  createNewTransactionPage,
  createNewTransaction
}