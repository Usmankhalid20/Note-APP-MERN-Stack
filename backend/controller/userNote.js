const Note = require("../Models/noteAdd");

const addNote = async(req, res) => {
    try {
        const {title, description} = req.body;
        console.log(title, description);
        if(!title || !description) {
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const newNote = await Note.create({
            title, description, user: req.user._id
       
        });
        await newNote.save();
        console.log(newNote);
        return res.status(201).json({success: true,user, message: "Note created successfully"});
        
    } catch (error) {
        return res.status(201).json({success: true, message: "Error in Adding Note"});
    }
}

const  getNotes = async(req, res) => {
    try {
        const Notes = await Note.find({user: req.user._id});
        if(!Notes) {
            return res.status(400).json({message: "No Notes Found"});
        }
        return res.status(200).json({success: true, Notes});

    } catch (error) {
        return res.status(201).json({success: true, message: "Error in Getting Notes"});
    }
}

const deleteNote =async(req, res) => {
   
}

const updateNote = async(req, res) => {

}

module.exports = {addNote, getNotes, deleteNote, updateNote}