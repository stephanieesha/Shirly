import { useSelector, useDispatch } from "react-redux";
import { BarChartList } from "./BarChartList"
import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";


const BarChartListData = () =>{
     const { lists } = useSelector((state) => state.lists)
     const { shoppingHistories } = useSelector((state) => state.shoppingHistories)
     const y = lists.map((x) => x.name)
     const year = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

     const z = lists.map((x) => (x.totalSpent))
     const [v, setV] = useState(y)
     const [comment, setComment] = useState(z)
     let filterBy = localStorage.getItem("filteredBy");
     var doneFilterBy = JSON.parse(filterBy)

     useEffect(() => {

        if(doneFilterBy == '1'){
            setV(y)
            setComment(z)
         }
         else if(doneFilterBy == '2'){
            setV( month)
            setComment(z)
         }
         else{
            setV(year)
            setComment(z)
         }

    },[doneFilterBy] ) 

    const BarChartDatas = {
        labels: y,
        datasets: [
            {
                label: 'Total Spent',
                data: z,

                backgroundColor: '#B0BA8B'
            }
        ]
    }
return {BarChartDatas}
}



export default BarChartListData;

