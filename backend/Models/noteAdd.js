const mongoose = require("mongoose");


const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const NotesDB = mongoose.model("Note", NoteSchema);
module.exports = NotesDB;