const express = require("express");
const bookController = require("../src/controller/book");


const router = express.Router();

// ------------------book routes----------------------------
router.get(`/books`, bookController.list);
router.post(`/books`, bookController.post);
router.get(`/books/:id`, bookController.get);

module.exports = router;
