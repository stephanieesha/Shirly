import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function RegisterPage(){
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector
    (state => state.auth)

    useEffect(() => {

        
        if(isSuccess || user) {
            navigate('/login')
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
        if(password !== confirmPassword){
            toast.error('Please check passwords again')
        }else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner/>
    }

  return (
    <>
      <section className='heading'>
        <h1>
            <FaUser register-login/> Register {user}
        </h1>
        <p>My Love, Please Register your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                    type='name'
                    className='form-control'
                    id = 'name'
                    name = 'name'
                    value = {name}
                    onChange={onChange}
                    placeholder='Please Enter Your Name'
                    required
                />
            </div>
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
                <input
                    type='password'
                    className='form-control'
                    id = 'confirmPassword'
                    name = 'confirmPassword'
                    value = {confirmPassword}
                    onChange={onChange}
                    placeholder='Please Confirm Your Password'
                    required
                />
            </div>
            <div className="form-group">
                <button className='btn btn-block'>Submit</button>
            </div>
        </form>

      </section>
    </>
  )
};

export default RegisterPage;
