import axios from 'axios'
import  {useState}  from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
     const [email, setEmail] = useState(' ')
      const [password, setPassword] = useState(' ')
      const navigate = useNavigate()
    

      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/register",  {
                name, email, password
            });
            if(response.data.success) {
                navigate('/Login');
            }
            alert("User Created Successfully")
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <div className='flex justify-center items-center min-h-screen bg-green-100'>
        <div className='broder shadow p-6 w-80 bg-white rounded-2xl'>
      <h2 className='text-2xl font-bold mb-4'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="name">Name:</label>
            <input type="text" className='w-full px-3 py-2 border' placeholder='Enter a Name' onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="email">Email:</label>
            <input type="email" className='w-full px-3 py-2 border' placeholder='Enter a Email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password:</label>
            <input type="password" className='w-full px-3 py-2 border' placeholder='Enter a Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
       <div className="mb-4">
        <button type='submit' className="w-full bg-teal-600 text-white py-2 rounded-2xl cursor-pointer hover:bg-teal-700">
            Signup
        </button>
        <p className="text-center">
            Already Have Account <Link to="/Login">Login</Link>
        </p>
       </div>
      </form>
    </div>
    </div>
  )
}

export default Signup
