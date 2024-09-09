import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useLocalStorage } from "@uidotdev/usehooks";


function LoginPage(){
    const [formData, setFormData] = useState({
        email: '', 
        password: '', 
    })
    const [userId, setUserId] = useLocalStorage('defaultId', )

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector
    (state => state.auth)

    useEffect(() => {

        if(isSuccess || user) {
            navigate('/listName')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const userData = {
            email,
            password
        }
    
        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner/>
    }


  return (
    <>
      <section className='heading'>
        <h1>
            <FaSignInAlt className='register-login'/> Login
        </h1>
        <p style={{color: "white"}}>My Love, Please Login to your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                    type='email'
                    className='form-control'
                    id = 'email'
                    name = 'email'
                    value = {email}
                    onChange={onChange}
                    placeholder='Please Enter Your Email'
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type='password'
                    className='form-control'
                    id = 'password'
                    name = 'password'
                    value = {password}
                    onChange={onChange}
                    placeholder='Please Enter Your Password'
                    required
                />
            </div>
            <div className="form-group">
                <button className='btn btn-block'>Login</button>
            </div>
        </form>

      </section>
    </>
  )
};

export default LoginPage;

