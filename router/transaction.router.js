const router = require('express').Router();

const db = require('../db.js');

router.get('/', (req, res) => {
  return res.render("transactions/index", {
    transactions: db.get("transactions").value()
  })
});

router.get('/create', (req, res) => {
  return res.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value(),
  });
});

router.post('/create', (req, res) => {
  db.get('transactions').push({transId: uuid(),bookId: req.body.bookId, userId: req.body.userId  }).write();
  return res.redirect("/transactions/create");  
});


module.exports = router;