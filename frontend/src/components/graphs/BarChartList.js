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
import BarChartListData from "./BarChartListData"

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChartList = () =>{
    const {BarChartDatas} = BarChartListData();

    const options = {}

    const data = {}
    return(
        <Bar options={options} data={BarChartDatas}/>
    )
}