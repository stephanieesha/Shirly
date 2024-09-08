import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLists } from "../features/lists/listSlice";
import Spinner from "./Spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";


function ShoppingList({ShoppingListItem}){

   
  return (
    <div className='shoppingList shoppingList-items'>
      <div>{ShoppingListItem.name}</div>
      <div>{ShoppingListItem.quantity}</div>
      <div>{ShoppingListItem.price}</div>
      <div></div>
    </div>
  )
};

export default ShoppingList;
