import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useLocalStorage } from "@uidotdev/usehooks";



function HomePage(){
  const navigate = useNavigate()


  return (
    <>
      <h4>Hi Esha</h4>
      <h5>How are you today? I hope you're good. </h5>
      <h5>How are Trey and Fairy. I hope you've had enough sleep today. </h5>
      <h5>I wonder what you are up to now. Anyway, have a blast my love.</h5>
      <hr></hr>
      <h4>Click <p  onClick={() => navigate('/login')} style={{color: "white"}}>here </p>to Go to the LogIn page</h4>
    </>
  )
};

export default HomePage;

