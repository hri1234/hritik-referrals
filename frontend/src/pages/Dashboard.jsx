import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Referral from '../components/Referral'
import Productes from '../components/Productes'
import { Link } from 'react-router-dom'
import { incrementPoints } from '../features/points/pointsSlice'

function Dashboard(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const points =useSelector((state) => state.points.value);

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p> Dashboard</p>
        <h3>Total Points = {points}</h3>
      </section>
      
      <h1>
      <Link to="/Productes"> Go to Products
      </Link>
      </h1>
     
    </>
  )
}

export default Dashboard
