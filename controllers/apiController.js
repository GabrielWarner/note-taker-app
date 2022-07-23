const express = require("express");
const router = express.Router();
const fs = require("fs");
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if(err){
            throw err;
        } else {
            const db = JSON.parse(data)
            res.json(db)
        }
    })
})

router.post("/", (req, res) => {
    if(req.body) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            note_id: uuid(),
        }
        readAndAppend(newNote, './db/db.json')
        res.json("Succsesfully added")
    } else {
        res.redirect('error in adding note')
    }
})


module.exports = router;