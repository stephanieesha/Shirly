import { useLocalStorage } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { useParams,useNavigate } from "react-router-dom";
import { createList, getLists,getList, reset } from "../features/lists/listSlice";
import { createListName, getListNames, resetListName , getListName} from "../features/listName/listNameSlice";
import ListItem from "../components/ListItem";
import ListNameItem from "../components/ListNameItem";
import BackButton from "../components/BackButton";
import Moment from 'moment'
import Spinner from "../components/Spinner";
import ObjectTable from 'react-object-table'
import HomePage from "./ListNamePage";
import { Link } from "react-router-dom";
import ListItemPage from "./ListItemPage";
import { BarChartList} from "../components/graphs/BarChartList"
import { createShoppingList, getShoppingHistories } from "../features/auth/authSlice";
import { Container, Row, Col } from "react-bootstrap";


function NewList(){
    const { listNames } = useSelector((state) => state.listNames)
    const { lists } = useSelector((state) => state.lists)
    const { isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.lists
    )
    const [ItemName, setItemName] = useState('')
    const [ItemNameHeading, setItemNameHeading] = useLocalStorage('listname')
    const { listNameId } = useParams()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unitPrice, setUnitPrice] = useState('')
    const [frequency, setFrequency] = useState('')
    const [comment, setComment] = useState('')
    const [c, setc] = useState(false)
    const [showBarChart, setShowBarChart] = useState(false)
    const [filteredDate, setFilteredDate] = useLocalStorage('filteredBy', 1)
    const clearEntry = ""
    const [statuses, setStasuses] = useState('1')

    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    const onChangeName = (e) =>{
        setName(e.target.value)
    }
    const onChangeBrand = (e) =>{
        setBrand(e.target.value)
    }
    const onQuantityChange = (e) =>{
        setQuantity(e.target.value)
    }
    const onChangeUnitPrice = (e) =>{
        setUnitPrice(e.target.value)
    }
    const onChangeFrequency = (e) =>{
        setFrequency(e.target.value)
    }
    const onChangeComment = (e) =>{
        setComment(e.target.value)
    }
    const onChangeItemName = (e) =>{
        setItemName(e.target.value)
    }

    useEffect(() => {
        dispatch(getListName(listNameId))
        dispatch(getLists(listNameId))

    }, [listNameId,dispatch, isError, isSuccess, navigate, message])

    const dateRange = (e) =>{
        if (e.target.value == '1') {
            setStasuses(e.target.value)
            setFilteredDate(e.target.value)
        }
        if (e.target.value == '2') {
            setStasuses(e.target.value)
            setFilteredDate(e.target.value)
        }
        if (e.target.value == '3') {
            setStasuses(e.target.value)
            setFilteredDate(e.target.value)
        }
    }

    if(isLoading){
        return<Spinner/>
    }
    const onSubmitItemName = (e) =>{
        e.preventDefault()
        dispatch(createListName({  ItemName }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        let listData = { name, brand, quantity, unitPrice, frequency, comment }
        dispatch(createList({ listNameId, listData }))
        dispatch(getLists())
            setQuantity(clearEntry)
            setUnitPrice(clearEntry)
            setName(clearEntry)
            setComment(clearEntry)
            setItemName(clearEntry)
            setBrand(clearEntry)
    }

    const addShoppingListItem = () => {
        setc(!c)
    }
   
    const clearQuantityEntry = () => {
        setQuantity(clearEntry)
    }
    const clearUnitPriceEntry = () => {
        setUnitPrice(clearEntry)
    }
    const clearNameEntry = () => {
        setName(clearEntry)
    }
    const clearCommentEntry = () => {
        setComment(clearEntry)
    }
    const clearFrequencyEntry = () => {
        setItemName(clearEntry)
    }
    const clearBrandEntry = () => {
        setBrand(clearEntry)
    }

    const showChart = () => {
        setShowBarChart(!showBarChart)
    }

  return (
    <Container className="wholeBody">
        <Row>
            <BackButton/>
        </Row>

        <Row>
            {
                listNames.map((x) => {
                    if( x._id === listNameId){
                        setItemNameHeading(x.ItemName)
                    }
                })
            }
            <h2 className="item-name-heading"> {ItemNameHeading} </h2>
        </Row>
        <Row>
            <button style={{ alignItems:"right", maxWidth: '200px'}} onClick={showChart}  className='btn'>Display Chart</button>
        </Row>
        <Row>
            {
            showBarChart ? 
                <div  className="statuses-style" style={{ margin: " 10px 0 0 0"}}>
                    <label className="label-text">
                        Status
                        <form action="#">
                            <select value={statuses} style={{backgroundColor: "#EFF5E8"}} className="statuses" name="selectedFruit" id="s" onChange={dateRange}>
                                <option value="1">Default</option>
                                <option value="2">Month</option>
                                <option value="3">Year</option>
                            </select>
                        </form>
                    </label>
                </div>
            : 
            null
            }
        </Row>
        <Row>
            { 
            showBarChart ? 
                lists ?
                <BarChartList/>
                :
                null
            : null
            }
        </Row>
        <Row>
            {
            c == true ? 
                <section > 
                    <form className="list-input" onSubmit={onSubmit}>
                        <Row>
                            <Col xs={12} md={4} sm={6} lg={4}>
                                <section className='form-list'>
                                    <label className="list-label">Name</label>
                                    <div className="form-group form-line ">
                                        <input
                                            type='text'
                                            className='form-control'
                                            id = 'name'
                                            name = 'name'
                                            value = {name}
                                            onChange={onChangeName}
                                            placeholder='Name'
                                        />
                                        <button type="button" className='btn btn-span' onClick={clearNameEntry}>x</button>
                                    </div>
                                </section>
                            </Col>
                            <Col xs={12} md={4} sm={6} lg={4}>
                                <section className='form-list'>
                                    <label className="list-label">Brand</label>
                                    <div className="form-group form-line ">
                                        <input
                                            type='text'
                                            className='form-control'
                                            id = 'brand'
                                            name = 'brand'
                                            value = {brand}
                                            onChange={onChangeBrand}
                                            placeholder='Brand'
                                        />
                                        <button type="button"className='btn btn-span' onClick={clearBrandEntry}>x</button>
                                    </div>
                                </section>
                            </Col>
                            <Col xs={12} md={4} sm={6} lg={4}>
                                <section className='form-list'>
                                        <label className="list-label">Quantity</label>
                                        <div className="form-group form-line ">
                                            <input
                                                type='number'
                                                className='form-control'
                                                id = 'quantity'
                                                name = 'quantity'
                                                value = {quantity}
                                                onChange={onQuantityChange}
                                                placeholder='Quantity'
                                            />
                                            <button type="button" className='btn btn-span' onClick={clearQuantityEntry}>x</button>
                                        </div>
                                </section>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={4}>
                                <section className='form-list'>
                                    <label className="list-label">Unit Price</label>
                                    <div className="form-group form-line ">
                                        <input
                                            type='number'
                                            className='form-control'
                                            id = 'unitPrice'
                                            name = 'unitPrice'
                                            value = {unitPrice}
                                            onChange={onChangeUnitPrice}
                                            placeholder='Unit Price'
                                        />
                                        <button type="button" className='btn btn-span' onClick={clearUnitPriceEntry}>x</button>
                                    </div>
                                </section>
                            </Col>
                            <Col xs={12} md={4} sm={6} lg={4}>
                                <section className='form-list'>
                                    <label className="list-label">Frequency</label>
                                    <div className="form-group form-line ">
                                        <select
                                            type='text'
                                            className='form-control'
                                            id = 'frequency'
                                            name = 'frequency'
                                            value = {frequency}
                                            onChange={onChangeFrequency}
                                            placeholder='Frequency'
                                        >   
                                            <option value="" disabled selected>Select Item</option>
                                            <option value="Everyday">Everyday</option>
                                            <option value="Every 2 days">Every 2 days</option>
                                            <option value="Every 3 days">Every 3 days</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Every 2 weeks">Every 2 weeks</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Every 2 months">Every 2 months</option>
                                            <option value="Every 3 months">Every 3 months</option>
                                            <option value="Every 6 months">Every 6 months</option>
                                            <option value="Yearly">Yearly</option>
                                            <option value="Nill">Nill</option>
                                        </select>
                                        <button type="button" className='btn btn-span' onClick={clearFrequencyEntry}>x</button>
                                    </div>
                                </section>
                            </Col>
                            <Col xs={12} md={4} sm={6} lg={4}>
                                <section className='form-list'>
                                    <label className="list-label">Comment</label>
                                    <div className="form-group form-line ">
                                        <input
                                            type='text'
                                            className='form-control'
                                            id = 'comment'
                                            name = 'comment'
                                            value = {comment}
                                            onChange={onChangeComment}
                                            placeholder='Comment'
                                        />
                                        <button type="button" className='btn btn-span' onClick={clearCommentEntry}>x</button>
                                    </div>                    
                                </section>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <button type= 'submit' className='btn-listName listName-elements'>Enter</button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </section>
                :
                null
            }
        </Row>
        <Row>
            <div className="btn-generate" style={{marginBottom: '10px'}}>
                <button type="button" className='btn' onClick={addShoppingListItem}>Add Item</button>
            </div>
        </Row>
        <Row className='ticket-headings'>
            <Col xs={4} sm={3} md={1} lg={1}><div>Name</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Brand</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Unit Price</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Quantity</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Price</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Frequency</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div>Comment</div></Col>
            <Col xs={4} sm={3} md={2} lg={2}><div>Last Bought</div></Col>
            <Col xs={4} sm={3} md={1} lg={1}><div></div></Col>
        </Row>
        <Row>
        {lists.map((x) => (
            <ListItem key={x._id} list={x} />                    
        ))}
        </Row>
    </Container>
  )
};

export default NewList;
