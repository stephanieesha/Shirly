import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLists, getList } from "../features/lists/listSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState , useEffect} from "react";
import BackButton from "../components/BackButton";
import ListItem from "../components/ListItem";
import { useLocalStorage } from "@uidotdev/usehooks";




function ListItemLastBought(){
    const { listNameId, listItemId } = useParams()
    const { lists } = useSelector((state) => state.lists)
    const { list } = useSelector((state) => state.lists)
    const { isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.lists
    )
    const [ItemNameHeading, setItemNameHeading] = useLocalStorage('name')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getList({listNameId, listItemId}))

        console.log(listItemId)
        console.log(listNameId)

    }, [listNameId, listItemId, dispatch, isError, isSuccess, message])


  return (
    <>
        <div>
            <BackButton/>
        </div>
                {
                    <div style={{gridTemplateColumns: "repeat(8, 1fr)"}} className='shoppingList tickets'>
                                <div>{
                                    list.boughtAt.map((x) => (
                                        <>
                                        <div>{x.name}</div>
                                        <div>{x.brand}</div>
                                        <div>{x.unitPrice}</div>
                                        <div>{x.quantity}</div>
                                        <div>{x.price}</div>
                                        <div>{x.frequency}</div>
                                        <div>{x.comment}</div>
                                        <div>{x.updatedAt}</div>
                                        </>
                                    ))
                                }</div>
                            </div>
                      
                }
    </>
  )
};




export default ListItemLastBought;
