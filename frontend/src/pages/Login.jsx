import axios from 'axios'
import  {useState}  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/ContextProvider'

const Login = () => {
    
     const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
     const navigate = useNavigate()
     const { login } = useAuth()
    

      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/login",  {
                email, password
            });
            console.log(response, "Login response")
            console.log(response.data)
            if(response.data.success) {
                login(response.data.User); 
                localStorage.setItem('token', response.data.token)
                navigate('/');
            }
            alert("User Successfully Login")
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <div className='flex justify-center items-center min-h-screen bg-green-100'>
        <div className='broder shadow p-6 w-80 bg-white rounded-2xl'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        
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
            Login
        </button>
        <p className="text-center">
            Don't Have Account <Link to="/register">Signup</Link>
        </p>
       </div>
      </form>
    </div>
    </div>
  )
}

export default Login
