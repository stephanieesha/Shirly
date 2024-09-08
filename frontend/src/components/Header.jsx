import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Container, Row, Col } from "react-bootstrap";


function Header(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
    }
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div className='header'>
                        <div >
                            <Link to='/'>Shirley</Link>
                        </div>
                        <ul>
                            {user ? 
                            (
                                <li>
                                    <Link to={`/`} onClick={onLogout}><button className='btn'><FaSignOutAlt/></button></Link>   
                                </li>
                            )
                            : (
                                <>
                                <li>
                                <Link to="/login">
                                    <FaSignInAlt/> Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <FaUser/> Register
                                </Link>
                            </li> 
                            </> 
                            )  
                        }
                            
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    )
  };
  
  export default Header;