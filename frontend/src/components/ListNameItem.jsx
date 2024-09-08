import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLists } from "../features/lists/listSlice";
import Spinner from "./Spinner";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {  getShoppingHistories } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import { updateListName, deleteListName } from "../features/listName/listNameSlice"
import { Container, Row, Col } from "react-bootstrap";




function ListNameItem({listName}){
  const { listNameId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateNewListName, setUpdateNewListName] = useState('')

  const getListItem = () =>{
    let listNameId = listName._id
    dispatch(getLists(listNameId))
    console.log(listNameId)
  }


  const deleteClickedListItem = (i) => {
      let listNameId = i
  
     dispatch(deleteListName(listNameId))
     window.location.reload()
  }
   const setNewListName = (e) => {
    setUpdateNewListName(e.currentTarget.textContent)
}


const addItemToEdit = ( listName) =>{
  let addNewItem = {
    user: listName.user,
    _id: listName._id,
    AmountSpent: listName.AmountSpent,
    ...(updateNewListName == '' ? {ItemName: listName.ItemName} : {ItemName: updateNewListName}),
  }
  localStorage.setItem('editItems', JSON.stringify(addNewItem ));

}

   const saveChanges = (x) =>{

    let listNameId = x
    let listDat = localStorage.getItem('editItems')
    var shoppingListObject = JSON.parse(listDat)
    let listNameData = shoppingListObject
    
    dispatch(updateListName( {listNameData, listNameId}))
    window.location.reload()


   }

  return (
    <Container>
      <Row style={{ margin: "20px 0", backgroundColor: "#F4F4F4", borderRadius: "5px",}}>
          <Col xs={8} md={8} sm={9} lg={9} style={{}} onKeyUp={() =>addItemToEdit( listName)} className='listName'>
            <div contenteditable="true"  onInput={setNewListName} className="listName-heading" >{listName.ItemName}</div>
          </Col>
          <Col xs={4} md={4} sm={3} lg={3} style={{}}>
            <div style={{}}>
              <Row>
                <Col xs={12} md={4} sm={8} lg={8}>
                  <Link  to={`/listName/${listName._id}/`}  onClick={() =>getListItem()}><button className='vew-button'>Details</button></Link>
                </Col>
                <Col xs={6} md={4} sm={2} lg={2}>
                  <AiFillDelete style={{cursor:'pointer', marginTop: "15px"}} onClick={() =>deleteClickedListItem(listName._id)} />
                </Col>
                <Col xs={6} md={4} sm={2} lg={2}>
                  <CiSaveUp1 style={{cursor:'pointer', marginTop: "15px" }} onClick={() =>saveChanges(listName._id)}/>
                </Col>
              </Row>
            </div>
          </Col>
      </Row>
    </Container>
  )
};

export default ListNameItem;
