import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Home from './components/Home'
import Login from './pages/Login'
import NoteCard from './components/NoteCard'


function App() {
 

  return (
    
    <Router>
      <Routes>
        {/* <Route path="/" element={<NoteCard />} /> */}
        <Route path="" element={<Home />} />
        <Route path="/register" element={<Signup />} />
         <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
