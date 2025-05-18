const NotesDB = require("../Models/noteAdd");

const addNote = async(req, res) => {
    try {
        const {title, description} = req.body;
        console.log(title, description);
        if(!title || !description) {
            return res.status(400).json({message: "Please fill all the fields"});
        } 
        console.log(req.user);
        const newNote = await NotesDB.create({
            title, description
       
        });

        console.log("hi");
        await newNote.save();
        console.log(newNote);

        return res.status(201).json({success: true,user, message: "Note created successfully"});
        
    } catch (error) {
        return res.status(201).json({success: true, message: "Error in Adding Note"});
    }
}

const  getNotes = async(req, res) => {
    try {
        const Notes = await NotesDB.find();
        if(!Notes) {
            return res.status(400).json({message: "No Notes Found"});
        }
        console.log("hello world");
        return res.status(200).json({success: true, Notes});

    } catch (error) {
        return res.status(500).json({success: false, message: "Error in Getting Notes"});
    }
}

const deleteNote =async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await NotesDB.findByIdAndDelete(id);
        if(!deleteNote) {
            return res.status(400).json({message: "No Notes Found"});
        }
        return res.status(200).json({success: true, message: "Note Deleted Successfully"});

    } catch (error) {
        return res.status(500).json({success: false, message: "Error in Getting Notes"});
    }
}

const updateNote = async(req, res) => {
    try { 
        const {id} = req.params;
        const updateNote = await NotesDB.findByIdAndUpdate(id, req.body, {new: true});

        if(!updateNote) {
            return res.status(400).json({message: "No Notes Found"});
        }
        console.log(updateNote);
        console.log("hello world");
        return res.status(200).json({success: true, updateNote});


    } catch (error) {
        return res.status(500).json({success: false, message: "Error in Getting Notes"});
    }
}

module.exports = {addNote, getNotes, deleteNote, updateNote}