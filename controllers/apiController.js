const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile("../db/db.json", "utf8", (err, data) => {
        if(err){
            throw err;
        } else {
            const db = JSON.parse(data)
            res.json(db)
        }
    })
})

router.post("/", (req, res) {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
    }
    fs.readFile("../db/db.json", "utf8", (err, data) => {
        if(err){
            throw err;
        } else {
            const db = JSON.parse(data)
            db.push(newNote)
            JSON.stringify(db, null, 4),
            (err, data) => {
                if(err){
                    throw err
                } 
                res.JSON ({ data: req.body, message: "success!"})
            }
        }
    })
})


module.exports = router;