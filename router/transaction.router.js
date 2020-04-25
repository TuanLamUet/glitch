const router = require('express').Router();

const transactionController = require('../controller/transactions.controller');

router.get('/', transactionController.getAllTransactions);

router.get('/create',transactionController.createNewTransactionPage);

router.get('/:transId/complete', transactionController.Complete);

router.post('/create', transactionController.createNewTransaction);

module.exports = router;