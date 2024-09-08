import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ListNameItem from "../components/ListNameItem";
import { createListName, getListNames, reset } from "../features/listName/listNameSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createShoppingList } from "../features/auth/authSlice";
import ShoppingList from "../components/ShoppingList";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoReloadCircle } from "react-icons/io5";
import {getShoppingHistories} from "../features/auth/authSlice"
import BackButton from "../components/BackButton";



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


function ShoppingHistory(){
    const { shoppingHistories } = useSelector((state) => state.shoppingHistories)
    const { lists } = useSelector((state) => state.lists)

    var shoppingList = localStorage.getItem('shoppingList')
    var shoppingListObject = JSON.parse(shoppingList);

   const navigate = useNavigate()
   const dispatch = useDispatch()


   useEffect(() => {

})

const y = shoppingHistories.flat()
    const {  isError, isSuccess, message} = useSelector(
        (state) => state.listNames
    )

  return (
    <>
        <div>
            <BackButton/>
        </div>
        <div className='tickets-listname'>
            {y.map((x) => (
                <Link to={`/listName/${x._id}/`} >{x.createdAt}</Link>
            ))}
        </div>
    </>
  )
};

export default ShoppingHistory;
