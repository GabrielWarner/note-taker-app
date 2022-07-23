const express = require("express");
const router = express.Router();
const fs = require("fs");
const { readFromFile, readAndAppend, readDeleteAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = require('../db/db.json')

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
            id: uuid(),
        }
        readAndAppend(newNote, './db/db.json')
        res.json("Succsesfully added")
    } else {
        res.redirect('error in adding note')
    }
})

router.delete("/:id", (req, res) => {

        const { id } = req.params
        readDeleteAppend(id, './db/db.json')
        return res.send("Success")

})



module.exports = router;