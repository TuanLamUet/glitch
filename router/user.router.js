const router = require('express').Router();
const uuid = require('uuid/v4');

const db = require("../db.js");


//router user 
router.get("/", (req, res) => {
  return res.render("users/users.pug", {
    users: db.get("users").value()
  });
})
router.post("/create", (req, res) => {
  let name = req.body.name;
  db.get("users").push({userId: uuid(), name: name}).write();
  return res.redirect("/users")
});
router.get("/:userId/delete", (req, res) => {
  let userId = req.params.userId;
  db.get("users").remove({userId}).write();
  return res.redirect("/users");
});

router.get("/:userId/update", (req, res) => {
  let userId = req.params.userId;
  return res.render("users/change-name.pug",{
    userId
  })
});
router.post("/:userId/update", (req, res) => {
  let userId = req.params.userId;
  let name = req.body.name;
  db.get("users").find({userId}).assign({name}).write();
  return res.redirect("/users");
});

module.exports = router;