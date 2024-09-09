import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLists } from "../features/lists/listSlice";
import Spinner from "./Spinner";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import {deleteList, getList, updateList} from "../features/lists/listSlice"
import { CiSaveUp1 } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap";



function ListItem({list}){
  const { listNameId, listItemId } = useParams()
  //const { list } = useSelector((state) => state.list)
  const { isLoading, isError, isSuccess, message} = useSelector(
      (state) => state.lists
  )

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [frequency, setFrequency] = useState('Everyday')
  const [comment, setComment] = useState('')
  const [updateNewUnitPrice, setUpdateNewUnitPrice] = useState('')
  const [updatNewPrice, setUpdateNewPrice] = useState('')
  const [updateNewQuantity, setUpdateNewQuantity] = useState('')
  const [updateNewComment, setUpdateNewComment] = useState('')
  const [updateNewBrand, setUpdateNewBrand] = useState('')
  const [updateNewFrequency, setUpdateNewFrequency] = useState('')

  const dispatch = useDispatch()

const getClickedListItem = () => {
  let listItemId = list._id
  let listNameId = list.listName
  dispatch(getList({listNameId, listItemId}))
  localStorage.setItem("filteredBy", 1);
}

  const deleteClickedListItem = () => {
    let listId = list._id
    let listNameId = list.listName

   dispatch(deleteList({listNameId, listId}))
   window.location.reload()
  }
  const setNewUnitPrice = (e) => {
    setUpdateNewUnitPrice(e.currentTarget.textContent)
}
const setNewPrice = (e) => {
    setUpdateNewPrice(e.currentTarget.textContent)
}
const setNewQuantity = (e) => {
    setUpdateNewQuantity(e.currentTarget.textContent)
}
const setNewComment = (e) => {
    setUpdateNewComment(e.currentTarget.textContent)
}
const setNewBrand = (e) => {
    setUpdateNewBrand(e.currentTarget.textContent)
}
const setNewFrequency = (e) => {
  setUpdateNewFrequency(e.currentTarget.textContent)
}

const addItemToEdit = ( list) =>{
  let addNewItem = {
      createdAt: list.createdAt,
      itemDisabled: list.itemDisabled,
      listName: list.listName,
      name: list.name,
      shoppingInProgress: list.shoppingInProgress,
      totalSpent: list.totalSpent,
      updatedAt: list.updatedAt,
      user: list.user,
      _id: list._id,
      boughtAt: list.boughtAt,
      ...(updateNewBrand == '' ? {brand: list.brand} : {brand: updateNewBrand}),
      ...(updateNewComment == '' ? {comment: list.comment} : {comment: updateNewComment}),
      ...(updatNewPrice == '' ? {price: list.price} : {price: Number(updatNewPrice)}),
      ...(updateNewQuantity == '' ? {quantity: list.quantity} : {quantity: Number(updateNewQuantity)}),
      ...(updateNewUnitPrice == '' ? {unitPrice: list.unitPrice} : {unitPrice: Number(updateNewUnitPrice)}),
      ...(updateNewFrequency == '' ? {frequency: list.frequency} : {frequency: updateNewFrequency}),
  }
  localStorage.setItem('editItems', JSON.stringify(addNewItem ));

}

const saveChangesCompleted = (list, x) =>{
  let listId = list
  let listDat = localStorage.getItem('editItems')
  var shoppingListObject = JSON.parse(listDat)
  let listData = shoppingListObject

  let listItemId = x

  dispatch(updateList( {listData, listItemId, listId}))
  window.location.reload()
}

  
  return (
    <Container onKeyUp={() =>addItemToEdit( list)} className='ticket'>
      <Row className='ticket'>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div >{list.name}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editBrand' onInput={setNewBrand}>{list.brand}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editQuantity' onInput={setNewUnitPrice}>{list.unitPrice}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editQuantity' onInput={setNewQuantity}>{list.quantity}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editPrice' onInput={setNewPrice}>{list.price}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editFrequency' onInput={setNewFrequency}>{list.frequency}</div>
        </Col>
        <Col xs={4} sm={3} md={1} lg={1}>
          <div contenteditable="true" name='editComment' onInput={setNewComment}>{list.comment}</div>
        </Col>
        <Col xs={4} sm={3} md={2} lg={2}>
          <div name='lastBought'>
            {
              list.boughtAt[0] ?
              list.boughtAt[0].updatedAt.slice(0, 10).split('-').reverse().join('-')
              :
              "Not Bought Yet"
            }
          </div>
        </Col>
        <Col xs={12} sm={3} md={1} lg={1}>
          <div>
            <Row>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Link to={`/${list.listName}/lists/${list._id}/`} onClick={() =>getClickedListItem()}><MdOutlineMoreHoriz style={{marginRight: "10px"}}/></Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <AiFillDelete style={{cursor:'pointer'}} onClick={() =>deleteClickedListItem(list._id)} />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <CiSaveUp1 style={{cursor:'pointer'}} onClick={() =>saveChangesCompleted(list._id, list.listName)} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default ListItem;
