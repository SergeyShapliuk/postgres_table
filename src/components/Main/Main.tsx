import React, {ChangeEvent, useEffect, useState} from "react";
import {DataType} from "../../types/types";
import {getTable, createTable, deleteTable} from "../../api/api";
import style from "./Main.module.css"
import TableHeader from "../Table/TableHeader";
import Table from "../Table/Table";
import usePagination from "../../hook/usePagination";
import Select from "../Select/Select";

const arr1 = ["равно", "содержит", "больше", "меньше"]
const arr2 = ["Название", "Количество", "Расстояние"]

function Main() {
    const [table, setTable] = useState<DataType[]>([]);
    const [value1, onChangeOption1] = useState(arr1[0])
    const [value2, onChangeOption2] = useState(arr2[0])
    const [value, setValue] = useState(null)
    const [perPage, setPerPage] = useState(10);
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
    console.log("value",value1)
    const perPages = (e: ChangeEvent<HTMLSelectElement>) => {
        const v = e.currentTarget.value;
        setPerPage(parseInt(v, 10));
        setPage(1);
    };

    console.log("table", table)
    useEffect(() => {
        getSomeTable();
    }, []);

    const getSomeTable = () => {
        getTable.request().then(res => setTable(res))
    }
    const createSomeTable = () => {
        let date: any = prompt('Enter table date');
        let name: any = prompt('Enter table name');
        let quantity: any = prompt('Enter table quantity');
        let distance: any = prompt('Enter table distance');

        createTable.request(date, name, quantity, distance).then(res => console.log("res", res))
    }

    const deleteSomeTable = () => {
        let id = prompt('Enter merchant id');
        deleteTable.request(id).then(res => console.log('ressss', res))
    }
const filtered=()=>{

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
                   <input onChange={()=>setValue(value)}/>
                   <button onClick={filtered}>Фильтр</button>
                   <button>Добавить</button>
               </span>
                <TableHeader/>
                {table.slice(firstContentIndex, lastContentIndex).map(
                    data => (<div key={data.id}>
                            <Table data={data}/></div>
                    )
                )}
            </div>
            <div className={style.pagination}>
                <p className={style.text}>
                    записи {page}/{totalPages}
                </p>

                <button type="button" onClick={prevPage} className={style.page}>
                    &larr;
                </button>
                {/* @ts-ignore */}
                {[...Array(totalPages).keys()].map(el => (
                    <button
                        type="button"
                        onClick={() => setPage(el + 1)}
                        key={el}
                        className={`${style.page} ${page === el + 1 ? style.active : ''}`}
                    >
                        {el + 1}
                    </button>
                ))}
                <button type="button" onClick={nextPage} className={style.page}>
                    &rarr;
                </button>
                <p className={style.text}>по</p>
                <select className={style.select} onChange={perPages}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <p className={style.text}>записей</p>
            </div>
        </div>

    )
}

export default Main