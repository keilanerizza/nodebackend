const express = require('express');
const router = express.Router();

router.get("/", (req, res) => res.json({status: "NodeJs backend"}));

module.exports = router;