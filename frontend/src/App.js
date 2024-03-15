import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductForm from './components/ProductForm'
import Milestones from './components/Milestones'
import Productes from './components/Productes'

function App() {
  return (
    <>
      <Router>
        <div className='container-fluid'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path ="/ProductForm" element={<ProductForm />} />
            <Route path ="/Productes" element={<Productes />} />
            <Route path ="/Milestones" element={<Milestones referrals={12}/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
