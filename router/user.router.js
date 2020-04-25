const router = require('express').Router();

const userController = require('../controller/user.controller')
//router user 
router.get("/", userController.getAllUser)
router.post("/create", userController.createNewUser);
router.get("/:userId/delete", userController.deleteAnUser);

router.get("/:userId/update", userController.updateNameUserPage);
router.post("/:userId/update", userController.updateNameUserPage);

module.exports = router;