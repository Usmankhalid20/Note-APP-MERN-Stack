import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
       <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
       </div>
       <input type="text"
       className='bg-grey-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
       placeholder='Search Notes'
        />

        <div>
            <span className="mr-4">User Name</span>
            <Link to="/Login" className='bg-blue-500 px-4 py-2 rounded mr-4'>Login</Link>
            <Link to="/register" className='bg-green-500 px-4 py-2 rounded mr-2'>Sign up</Link>

            <button className="bg-red-500 px-4 py-2 rounded ">Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
