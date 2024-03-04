const { Router } = require("express");
const users = require("../data/users");

const router = Router();

router.get("/", (req, res) => {
  return res.json(users);
});

module.exports = router;
