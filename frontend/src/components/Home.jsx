// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import NoteModel from "./NoteModel";
// import { useState } from "react";
// import axios from "axios";
// // import { useAuth } from "../Context/ContextProvider";
// import NoteCard from "./NoteCard";

// const Home = () => {
//   const [isModelOpen, setModelOpen] = useState(false);
//   const [filterNote, setFilterNote] = useState(false)
//   const [notes, setNotes] = useState([]);
//   const [currentNote, setCurrentNote] = useState(null)
//   const [query, setQuery] = useState('')



// //   get data from database
//   const fetchNote = async () => {
//   try {
//     const res = await axios.get('http://localhost:3000/getNotes', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const data = Array.isArray(res.data.Notes) ? res.data.Notes : [];
//     setNotes(data);
//     // login(data.data.User);
//     console.log(data, 'Fetched Notes');
//   } catch (err) {
//     console.error('Error fetching notes:', err);
//   }
// };
//     useEffect(() => {
//     fetchNote();
//     }, {})

//     // search notes
//     useEffect(() => {
//       setFilterNote(
//       notes.filter((note) => 
//       note.title.toLowerCase().includes(query.toLowerCase()) ||
//       note.description.toLowerCase().includes(query.toLowerCase())
    
//      )
      
//     )}, [query, notes])
    
//   const closeModel = () => {
//     setModelOpen(false);
//   };

//     // edit note to database
//     const onEdit = (note) => {
//         setCurrentNote(note);
//         setModelOpen(true);
//     }

//     const editNote = async (id, title, description) => {
//         try {
//       const response = await axios.put(`http://localhost:3000/updateNote/${id}`,

//         { title, description },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log( "edited");
//       if (response.data.success) {
//         fetchNote();
//         closeModel();
//       }
//       console.log(editNote, "hello");
//       alert("Note Successfully Updated");
//     } catch (error) {
//       console.log(error);
//     }
//     }

//     // delete note from database
//     const deleteNote = async (id) => {
//       try {
//       const response = await axios.delete(
//         `http://localhost:3000/deleteNote/${id}`,

        
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//     //    console.log(response.data, "hello");
//         fetchNote();
//         closeModel();
//       }
//       alert("Note Successfully Deleted");
//     } catch (error) {
//       console.log(error);
//     }
//     }

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
//         // login(response.data.User);
//         fetchNote();
//         closeModel();
//       }
//       alert("Note Successfully Added");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar setQuery={setQuery} />

      
//         <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         { filterNote.length > 0 ?  filterNote.map((note, item) => (
//          <NoteCard key={item._id} note={note} onEdit={onEdit} deleteNote={deleteNote}
//          />
//         )) : <p>Add Notes</p> }
//       </div>
//       <button
//         onClick={() => setModelOpen(true)}
//         className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
//       >
//         +
//       </button>
//       {isModelOpen && <NoteModel
//        closeModel={closeModel}
//         addNote={addNote}
//         currentNote={currentNote}
//         editNote={editNote}
//         deleteNote={deleteNote}
//          />}
       
//     </div>
//   );
// };

// export default Home;

//  chat GPT code 

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NoteModel from "./NoteModel";
import NoteCard from "./NoteCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filterNote, setFilterNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Check authentication on initial render
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login first");
      navigate("/login");
    } else {
      fetchNote();
    }
  }, [navigate]);

  // Get data from the database
  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.get('http://localhost:3000/getNotes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(res.data?.Notes) ? res.data.Notes : [];
      setNotes(data);
      setFilterNote(data); // Initialize filtered notes with all notes
      console.log(data, 'Fetched Notes');
    } catch (err) {
      console.error('Error fetching notes:', err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Search notes
  useEffect(() => {
    const filtered = notes.filter((note) => 
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilterNote(filtered);
  }, [query, notes]);

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null);
  };

  // Edit note
  const onEdit = (note) => {
    if (!localStorage.getItem("token")) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    setCurrentNote(note);
    setModelOpen(true);
  };

  const editNote = async (id, title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/updateNote/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchNote();
        closeModel();
        alert("Note Successfully Updated");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/deleteNote/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchNote();
        alert("Note Successfully Deleted");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Add note
  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/addNote",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchNote();
        closeModel();
        alert("Note Successfully Added");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  if (!localStorage.getItem("token")) {
    return (
      <div className="flex items-center justify-center h-screen">
         <Navbar setQuery={setQuery} />
        <p className="text-xl">Please login to view your notes</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterNote.length > 0 ? (
          filterNote.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            {notes.length === 0 ? (
              <p className="text-gray-500">No notes found. Add your first note!</p>
            ) : (
              <p className="text-gray-500">No notes match your search.</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (!localStorage.getItem("token")) {
            alert("Please login first");
            navigate("/login");
          } else {
            setModelOpen(true);
          }
        }}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full hover:bg-teal-600 transition-colors"
      >
        +
      </button>

      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;