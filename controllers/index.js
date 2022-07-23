const express = require("express");
const router = express.Router();


const apiRoute = require('./apiController');
router.use("/api/notes", apiRoute)

module.exports = router;