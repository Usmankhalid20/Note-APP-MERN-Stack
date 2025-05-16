import React from 'react'
import { useState } from 'react'


const NoteModel = ({ closeModel, addNote }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        addNote(title, description)       
    }
  return (
    <div className='fixed inset-0 bg-gray-400 bg-opacity-75 flex justify-center items-center'>
      <div className="bg-white p-8 rounded">
       <h2 className='text-xl font-bold mb-4'> Add new Note</h2>

       <form onSubmit={handleSubmit}>
        <input type="text" value={title} placeholder='Add note Title' className='border p-2 w-full wb-4' onChange={(e) => setTitle(e.target.value)} />

        <textarea value={description} placeholder='Add note Description' className='border p-2 w-full h-32 mb-4' onChange={(e) => setDescription(e.target.value)}></textarea>

        <button type='submit' className='bg-blue-500 text-white px-4 py2 rounded cursor-pointer'>Add</button>
       </form>
       <button onClick={closeModel} className='mt-4 text-red-500 cursor-pointer'>cancel</button>
      </div>
    </div>
  )
}

export default NoteModel
