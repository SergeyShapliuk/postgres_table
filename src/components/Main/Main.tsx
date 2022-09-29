import React, {ChangeEvent, useEffect, useState} from "react";

import {api} from "../../api/api";
import style from "./Main.module.css"
import TableHeader from "../Table/TableHeader";
import Table from "../Table/Table";
import usePagination from "../../hook/usePagination";
import Select from "../Select/Select";
import Pagination from "../Pagination/Pagination";


import {createTable, deleteTable, getSomeTable} from "../../store/tableReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";


type ArrType = {}

const arr1 = ["выберите условие", "равно", "содержит", "больше", "меньше"]
const arr2 = ["выберите колонку", "название", "количество", "расстояние"]

function Main() {
    console.log("main")
    const [value1, onChangeOption1] = useState(arr1[0])
    const [value2, onChangeOption2] = useState(arr2[0])
    const [value, setValue] = useState<string>("")
const table=useAppSelector(state => state.tableReducer.table)
    const dispatch=useAppDispatch()
    const [perPage, setPerPage] = useState(10);
console.log("table",table)
    const perPages = (e: ChangeEvent<HTMLSelectElement>) => {
        const v = e.currentTarget.value;
        setPerPage(parseInt(v, 10));
        setPage(1);
    };

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: perPage,
        count: table.length,
    });

    useEffect(() => {
    dispatch(getSomeTable())
    }, []);

    const createSomeTable = () => {
        let date: any = new Date().toLocaleString();
        let name: any = prompt('Enter table name');
        let quantity: any = prompt('Enter table quantity');
        let distance: any = prompt('Enter table distance');

        dispatch(createTable({date, name, quantity, distance}))
    }

    const deleteSomeTable = (id: string | null) => {
        // let id = prompt('Enter merchant id');
        dispatch(deleteTable(id))
    }
    const filtered = (value1: string, value2: string, value: string) => {
        // console.log('start')
        // console.log("value1", value1)
        // console.log("value2", value2)
        // console.log("value", value)
        if (value === '' || !value1 || !value2) {
            return;
        }
        if (value2 === "название") {
            value2 = "name"
        } else if (value2 === "количество") {
            value2 = "quantity"
        } else if (value2 === "расстояние") {
            value2 = "distance"
        }
        let filteredItems;
        if (value1 === 'равно') {
            filteredItems = table.filter((item: { [key: string]: any }) => item[value2].toString() === value);
        } else if (value1 === 'содержит') {
            filteredItems = table.filter((item: { [key: string]: any; }) => item[value2].toString().toLowerCase().includes(value.toLowerCase()));
        } else if (value1 === 'больше') {
            filteredItems = table.filter((item: { [key: string]: any; }) => (value2 === 'quantity' || value2 === 'distance') ? +item[value2] > +value : item[value2] > value);
        } else if (value1 === 'меньше') {
            filteredItems = table.filter((item: { [key: string]: any; }) => (value2 === 'quantity' || value2 === 'distance') ? +item[value2] < +value : item[value2] < value);
        } else {
            alert("Неопознанное значение в поле условия");
        }
        console.log("end", filteredItems)
        // dispatch(filteredItems)
    }

    return (
        <div className={style.main}>
            <div className={style.mainContainer}>
               <span>
                   <Select options={arr2}
                           value={value2}
                           onChangeOption={onChangeOption2}/>
               <Select options={arr1}
                       value={value1}
                       onChangeOption={onChangeOption1}/>
                   <input value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                   <button onClick={(e) => filtered(value1, value2, value)}>Фильтр</button>
                   <button onClick={createSomeTable}>Добавить</button>
               </span>
                <TableHeader/>
                {table.slice(firstContentIndex, lastContentIndex).map(
                    (data: any) => (<div key={data.id}>
                            <Table data={data} onClick={deleteSomeTable}/></div>
                    )
                )}


            </div>
            <Pagination
                setPage={setPage}
                page={page}
                nextPage={nextPage}
                perPages={perPages}
                prevPage={prevPage}
                totalPages={totalPages}/>

        </div>

    )
}

export default Main