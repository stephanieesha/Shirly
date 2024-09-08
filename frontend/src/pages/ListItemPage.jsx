import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLists, getList, reset } from "../features/lists/listSlice";
import { getListName } from "../features/listName/listNameSlice"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState , useEffect} from "react";
import BackButton from "../components/BackButton";
import ListItem from "../components/ListItem";
import { useLocalStorage } from "@uidotdev/usehooks";
import { BarChartListItem } from "../components/graphs/BarChartListItem";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";



function ListItemPage(){
    const { listNameId } = useParams()
    const { listItemId } = useParams()
    const { lists } = useSelector((state) => state.lists)
    const { list } = useSelector((state) => state.lists)
    const { isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.lists
    )
    const [ItemNameHeading, setItemNameHeading] = useLocalStorage('name')
    const [showBarChart, setShowBarChart] = useState(false)

    const [filteredDate, setFilteredDate] = useLocalStorage('filteredBy', 1)

    const [statuses, setStasuses] = useState('1')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getList({listNameId, listItemId}))

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

const setFiltered = () => {
    localStorage.setItem("filteredBy", 1);
}

const showChart = () => {
    setShowBarChart(!showBarChart)
}

  return (
    <Container className="wholeBody">
    {/* <div className="wholeBody">     */}
        <Row onClick ={() =>setFiltered() }>
            <BackButton />
        </Row>
        <Row>
            {
                list  ?
                lists.map((x) => {
                    if( x._id === listItemId){
                        setItemNameHeading(x.name)
                    }
                })
                :
                null
            }
            <h2 className="item-name-heading"> {ItemNameHeading} </h2>
        </Row>
        <Row>
            {
                list && lists ? 
                    <div className='list-details'>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Name: {list.name}</h5></div></Col>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Brand: {list.brand}</h5></div></Col>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Unit Price: {list.unitPrice}</h5></div></Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Quantity: {list.quantity}</h5></div></Col>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Price: {list.price}</h5></div></Col>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Frequency: {list.frequency}</h5></div></Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Comment: {list.comment}</h5></div></Col>
                            <Col xs={12} sm={6} md={6} lg={4}><div><h5>Total spent: {list.totalSpent}</h5></div></Col>
                        </Row>
                    </div>
                : 
                null
            }
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
                : null
            }
        </Row>
        <Row>
            {
                showBarChart ?
                    list ?
                    <BarChartListItem/>
                    :
                    null
                : null
            }
        </Row>

        <button style={{ alignItems:"right", maxWidth: '300px'}} onClick={showChart}  className='btn'>Display Chart</button>

        <h4 style={{ margin: " 20px 0 0 0"}}>Shopping History</h4>
            { 
            list && lists ?
                <Row className='shoppingLists' style={{backgroundColor:"#f4f4f4"}}>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Name</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Brand</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Unit Price</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Quantity</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Price</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Frequency</div></Col>
                    <Col xs={4} sm={3} md={1} lg={1}><div>Comment</div></Col>
                    <Col xs={4} sm={3} md={2} lg={2}><div>Last Bought</div></Col>
                </Row>
            : null
            }
            { 
            list.boughtAt ?
                list.boughtAt.map((x) => (
                    <Row className='shoppingList'>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.name}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.brand}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.unitPrice}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.quantity}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.price}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.frequency}</div></Col>
                        <Col xs={4} sm={3} md={1} lg={1}><div>{x.comment}</div></Col>
                        <Col xs={4} sm={3} md={2} lg={2}>
                            <div>{x.updatedAt.slice(0, 10).split('-').reverse().join('-')}</div>
                        </Col>
                    </Row>
                ))
            :
            null
            }  

                    
 
    {/* </div> */}
    </Container>
)
};

export default ListItemPage;
