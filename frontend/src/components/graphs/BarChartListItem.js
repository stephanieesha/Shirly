import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import BarChartListItemData from "./BarChartListItemData"
import ListItemPage from "../../pages/ListItemPage"

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChartListItem = () =>{
    const {BarChartDatas} = BarChartListItemData();

    const options = {}

    //const data = {}
    return(
        <Bar 
        options={options} 
        data={BarChartDatas}        
/>
    )
}