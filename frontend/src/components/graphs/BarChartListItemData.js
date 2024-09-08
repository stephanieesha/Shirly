import { useSelector, useDispatch } from "react-redux";
import { BarChartListItem } from "./BarChartListItem";
import React from 'react';
import Moment from 'react-moment';
import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate, useParams } from "react-router-dom";
const _ = require("lodash");



const BarChartListItemData = () =>{
    const { list } = useSelector((state) => state.lists)

    if (list){}
    const y = list.boughtAt.map((x) => x.updatedAt.slice(0, 10).split('-').reverse().join('-'))

    const January = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "01").reduce((n, {price}) => n+ price, 0)
    const February = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "02").reduce((n, {price}) => n+ price, 0)
    const March = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "03").reduce((n, {price}) => n+ price, 0)
    const April = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "04").reduce((n, {price}) => n+ price, 0)
    const May = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "05").reduce((n, {price}) => n+ price, 0)
    const June = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "06").reduce((n, {price}) => n+ price, 0)
    const July = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "07").reduce((n, {price}) => n+ price, 0)
    const August = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "08").reduce((n, {price}) => n+ price, 0)
    const September = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "09").reduce((n, {price}) => n+ price, 0)
    const October = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "10").reduce((n, {price}) => n+ price, 0)
    const November = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "11").reduce((n, {price}) => n+ price, 0)
    const December = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(5,3) == "12").reduce((n, {price}) => n+ price, 0)

    const twenty4 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2024").reduce((n, {price}) => n+ price, 0)
    const twenty5 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2025").reduce((n, {price}) => n+ price, 0)
    const twenty6 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2026").reduce((n, {price}) => n+ price, 0)
    const twenty7 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2027").reduce((n, {price}) => n+ price, 0)
    const twenty8 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2028").reduce((n, {price}) => n+ price, 0)
    const twenty9 = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2029").reduce((n, {price}) => n+ price, 0)
    const thirty = list.boughtAt.filter(x => x.updatedAt.slice(0, 10).split('-').reverse().join('-').substring(10,6) == "2030").reduce((n, {price}) => n+ price, 0)

    const hk = [January, February, March, April, May, June, July, August, September, October, November, December]
    const yk = [twenty4, twenty5, twenty6, twenty7, twenty8, twenty9, thirty]


    const year = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const z = list.boughtAt.map((x) => x.price)

        const [v, setV] = useState(y)
        const [comment, setComment] = useState(z)

            const [ItemNameHeading, setItemNameHeading] = useLocalStorage('name')

            let filterBy = localStorage.getItem("filteredBy");
            var doneFilterBy = JSON.parse(filterBy)


    useEffect(() => {

        if(doneFilterBy == '1'){
            setV(y)
            setComment(z)
         }
         else if(doneFilterBy == '2'){
            setV( month)
            setComment(hk)
         }
         else{
            setV(year)
            setComment(yk)
         }

    },[doneFilterBy] )   

    const BarChartDatas = {
        
        labels: v,
        datasets: [
            {
                label: 'Total Spent',
                data: comment,
                backgroundColor: '#B0BA8B'
            }
        ]
    }
return {BarChartDatas}
}

export default BarChartListItemData;

