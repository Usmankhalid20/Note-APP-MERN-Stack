const express = require("express");
const router = express.Router();
const Middle = require("../middleware/middlewares");
const {addNote, getNotes, deleteNote, updateNote} = require("../controller/userNote");

router.post("/addNote", Middle, addNote);
router.get("/getNotes", Middle, getNotes);
router.delete("/deleteNote/:id",Middle, deleteNote);
router.put("/updateNote/:id", Middle, updateNote);

module.exports = router;