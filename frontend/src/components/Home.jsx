import React from 'react'
import Navbar from './Navbar'
import NoteModel from './NoteModel'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../Context/ContextProvider'

const Home = () => {
    const [isModelOpen, setModelOpen] = useState(false)

    const closeModel = () => {
        setModelOpen(false)
    }
    const addNote = async(title, description) => {
         try {
            const response = await axios.post("http://localhost:3000/addNote",  
                { title, description }, 
                {
                   headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`
  }
            }
            );
            if(response.data.success) {
                login(response.data.user); 
                closeModel()
            }
            alert("User Successfully Login")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bg-gray-100 min-h-screen'>
    <Navbar />
     <button 
     onClick={() => setModelOpen(true)}
     className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
        +
      </button>
      {isModelOpen && <NoteModel 
      closeModel ={closeModel}
     addNote={addNote} /> }
    </div>
  )
}

export default Home
