import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ListNameItem from "../components/ListNameItem";
import { createListName, getListNames, getListName, reset } from "../features/listName/listNameSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { geAlltListNames } from "../features/lists/listSlice";
import { createShoppingList, getShoppingHistories } from "../features/auth/authSlice";
import ShoppingList from "../components/ShoppingList";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoReloadCircle } from "react-icons/io5";
import { Container, Row, Col } from "react-bootstrap";





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'




function ListNamePage(){
    const { listNames } = useSelector((state) => state.listNames)
    const { lists } = useSelector((state) => state.lists)

    var shoppingList = localStorage.getItem('shoppingList', [])

    if(shoppingList){
        var shoppingListObject = JSON.parse(shoppingList);
    }
    console.log(shoppingListObject)

    const clearEntry = ""
    const {  isError, isSuccess, message} = useSelector(
        (state) => state.listNames
    )
    const [ItemName, setItemName] = useState('')
    const [c, setc] = useState(false)

    const { listNameId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const clearListNameEntry = () => {
        setItemName(clearEntry)
    }

    const onSubmitItemName = (e) =>{
        e.preventDefault()
        dispatch(createListName({  ItemName }))
        dispatch(getListNames())
        clearListNameEntry()
    }
    const onChangeItemName = (e) =>{
        setItemName(e.target.value)
    }
    useEffect(() => {
        if(isSuccess){
            dispatch(reset())
        }

        let e = listNames.map( x =>  dispatch(geAlltListNames(x._id)))
        setc(false)
        dispatch(reset())
        dispatch(getListNames())
    }, [dispatch, isError, isSuccess, navigate, message])

    const generateShoppingList = () => {
        setc(true)
        var val = localStorage.getItem('user')
        var object = JSON.parse(val);
        var user_id =  object._id
        dispatch(reset())
        dispatch(createShoppingList(user_id))
        localStorage.setItem('items', [])
        localStorage.setItem('color', [])
        localStorage.setItem('status', [])
    }

    const showOrHideList = () => {
        setc(!c)
    }

    const editShoppingList = () => {
        navigate('/shoppingListDetails')

    }

    const viewShoppingHistory = () => {
        navigate('/shoppingHistory')
        dispatch(getShoppingHistories())
    }

    const saveRecords = () => {
        
    }


  return (
    <Container>
            <Row>
                <Col >
                    { c == true ? 
                    <div className="shoppingList-border" onClick={editShoppingList}>
                        <Link to="shoppingListDetails">

                        <div className='shoppingList-headings'>
                            <div>Name</div>
                            <div>Quantity</div>
                            <div>Price</div>
                            <div></div>
                        </div>
                        {
                        shoppingListObject ?
                            shoppingListObject.map((x) => (  
                            <ShoppingList key={x._id} ShoppingListItem={x }></ShoppingList>
                            ))
                        :
                        null
                        }
                        
                        <h4>Total:{
                            shoppingListObject ?
                                shoppingListObject.reduce((n, {price}) => n + price, 0).toLocaleString()
                            :
                            null
                        }</h4>
                        </Link>
                    </div>
                    :
                    null
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="ListnameInput"> 
                        {
                        c == true ?
                        <Row>
                            <Col xs={2}>
                                <IoReloadCircle className="reload" size={40} onClick={generateShoppingList}/>
                            </Col>
                            <Col xs={3} md={7} sm={7} lg={7}></Col>
                            <Col xs={7} md={3} sm={3} lg={3}>
                                <button type="button" className='btn' onClick={showOrHideList}>Hide Shopping List</button>
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col xs={2}>
                                <IoReloadCircle className="reload" size={40} onClick={generateShoppingList}/>
                            </Col>
                            <Col xs={2} md={7} sm={7} lg={7}></Col>
                            <Col xs={8} md={3} sm={3} lg={3}>
                                <div >
                                    <button type="button" className='btn' onClick={showOrHideList}>Show Shopping List</button>
                                </div>
                            </Col>
                        </Row>
                        }
                    </div>
                </Col>
            </Row>
            <Row >
                    <section className=''>
                        <form onSubmit={onSubmitItemName}>
                            <Row className="listName-element">
                                <Col xs={12} md={10} sm={11} lg={11}>
                                    <input
                                        type='text'
                                        className="list-name"
                                        id = 'list-name'
                                        name = 'text'
                                        value = {ItemName}
                                        onChange={onChangeItemName}
                                        placeholder='Untitled List'
                                    />
                                </Col>
                                <Col xs={4} md={1} sm={1} lg={1}>
                                    <button type="submit" className='btn-listName listName-elements' >Enter</button>
                                </Col>
                            </Row>
                        </form>
                    </section>
            </Row>
            <Row>
                <Col>
                    <div className='tickets-listname'>
                        {
                        listNames ?
                            listNames.map((x) => (
                            <ListNameItem key={x._id} listName={x } />
                        ))
                        :
                        null
                        }
                    </div>
                </Col>
            </Row>
    </Container>
  )
};

export default ListNamePage;
