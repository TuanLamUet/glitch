const router = require('express').Router();
const bookController = require('../controller/book.controller');
router.get('/', bookController.getAllBooks);

router.post("/", bookController.addNewBook);

router.get("/:bookId/delete",bookController.deleteBook);

router.get("/:bookId/update-title", bookController.changeTitlePage);

router.post("/:bookId/update", bookController.updateTitle);

module.exports = router;