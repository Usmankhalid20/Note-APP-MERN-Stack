import React, { useEffect } from "react";
import Navbar from "./Navbar";
import NoteModel from "./NoteModel";
import { useState } from "react";
import axios from "axios";
// import { useAuth } from "../Context/ContextProvider";
import NoteCard from "./NoteCard";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null)

//    const { login } = useAuth()

//   get data from database
  const fetchNote = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getNotes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = Array.isArray(res.data.Notes) ? res.data.Notes : [];
    setNotes(data);
    // login(data.data.User);
    console.log(data, 'Fetched Notes');
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};
    useEffect(() => {
    fetchNote();
    }, {})

  const closeModel = () => {
    setModelOpen(false);
  };

    // edit note to database
    const onEdit = (note) => {
        setCurrentNote(note);
        setModelOpen(true);
    }

    const editNote = async (id, title, description) => {
        try {
      const response = await axios.put(`http://localhost:3000/updateNote/${id}`,

        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log( "edited");
      if (response.data.success) {
        fetchNote();
        closeModel();
      }
      console.log(editNote, "hello");
      alert("Note Successfully Updated");
    } catch (error) {
      console.log(error);
    }
    }

    // delete note from database
    const deleteNote = async (id) => {
      try {
      const response = await axios.delete(
        `http://localhost:3000/deleteNote/${id}`,

        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
    //    console.log(response.data, "hello");
      }
      alert("Note Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
    }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/addNote",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        // login(response.data.User);
        fetchNote();
        closeModel();
      }
      alert("Note Successfully Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, item) => (
         <NoteCard key={item._id} note={note} onEdit={onEdit} deleteNote={deleteNote}
         />
        ))}
      </div>
      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModelOpen && <NoteModel
       closeModel={closeModel}
        addNote={addNote}
        currentNote={currentNote}
        editNote={editNote}
        deleteNote={deleteNote}
         />}
       
    </div>
  );
};

export default Home;

//  chat GPT code 

// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import NoteModel from "./NoteModel";
// import NoteCard from "./NoteCard";
// import axios from "axios";

// const Home = () => {
//   const [isModelOpen, setModelOpen] = useState(false);
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetchNote();
//   }, []);

//   const fetchNote = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/getNotes", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(res, "hello usman");
//       const data = Array.isArray(res.data.Notes) ? res.data.Notes : [];
//       setNotes(data);
//       console.log(data, "Fetched Notes");
//     } catch (err) {
//       console.error("Error fetching notes:", err);
//     }
//   };

//   const closeModel = () => {
//     setModelOpen(false);
//   };

//   const addNote = async (title, description) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/addNote",
//         { title, description },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         closeModel();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />

//       <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {notes.map((note, index) => (
//           <NoteCard key={index} note={note} />
//         ))}
//       </div>

//       <button
//         onClick={() => setModelOpen(true)}
//         className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
//       >
//         +
//       </button>

//       {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
//     </div>
//   );
// };

// export default Home;

