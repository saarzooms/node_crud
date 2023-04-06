const blog = require("../controllers/blog.controller")
const express = require('express')
const router = express.Router();


router.post("/", blog.create);

router.get("/", blog.findAll);

router.get("/title/", blog.findAllByTitle);

router.get("/:id", blog.findOne);

router.put("/:id", blog.update);

router.delete("/:id", blog.delete);

module.exports = router;