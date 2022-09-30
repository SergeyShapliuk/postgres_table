import React, {useState} from "react";
import Select from "../components/Select/Select";
import {createTable, filteredTable, getSomeTable} from "../store/tableReducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import style from "./Filter.module.css"
import * as net from "net";

const arr1 = ["выберите колонку", "название", "количество", "расстояние"]
const arr2 = ["выберите условие", "равно", "содержит", "больше", "меньше"]


export const Filter = ()=> {
    const dispatch = useAppDispatch()
    const table = useAppSelector(state => state.tableReducer.table)

    const [columns, setColumns] = useState(arr1[0])
    const [conditions, setConditions] = useState(arr2[0])
    const [value, setValue] = useState<string>("")

    const createSomeTable = () => {
        let date = new Date().toLocaleString();
        let name = prompt('Введите имя');
        let quantity = prompt('Введите количество');
        let distance = prompt('Введите расстояние');
        if (name?.trim() && typeof Number(quantity)==="number" && typeof Number(distance) === "number") {
            dispatch(createTable({date, name, quantity, distance}))
            dispatch(getSomeTable())
        } else {
            alert("Поля должны быть заполнены корректно")
        }
    }
    const filtered = (columns: string, conditions: string, value: string) => {
        console.log('start')
        console.log("columns", columns)
        console.log("conditions", conditions)
        console.log("value", value)
        if (value === '' || !columns || !conditions) {
            return alert("Выберите и введите данные")
        }
        if (columns === "название") {
            columns = "name"
        } else if (columns === "количество") {
            columns = "quantity"
        } else if (columns === "расстояние") {
            columns = "distance"
        }
        let filteredItems;
        if (conditions === 'равно') {
            filteredItems = table.filter((item: { [key: string]: any }) => item[columns].toString() === value);
        } else if (conditions === 'содержит') {
            filteredItems = table.filter((item: { [key: string]: any; }) => item[columns].toString().toLowerCase().includes(value.toLowerCase()));
        } else if (conditions === 'больше') {
            filteredItems = table.filter((item: { [key: string]: any; }) => (columns === 'quantity' || columns === 'distance') ? +item[columns] > +value : item[columns] > value);
        } else if (conditions === 'меньше') {
            filteredItems = table.filter((item: { [key: string]: any; }) => (columns === 'quantity' || columns === 'distance') ? +item[columns] < +value : item[columns] < value);
        } else {
            return
        }
        if (filteredItems.length) {
            dispatch(filteredTable(filteredItems))
            setValue("")
        } else {
            alert("Некорректное значение в поле условия");
        }
    }
    const reload = () => {
        dispatch(getSomeTable())
    }
    return (
        <div className={style.filter}>
               <span>
                   <Select options={arr1}
                           value={columns}
                           onChangeOption={setColumns}/>
               <Select options={arr2}
                       value={conditions}
                       onChangeOption={setConditions}/>
                   <input value={value} pattern={".{1,}"} required onChange={(e) => setValue(e.currentTarget.value)}/>
                   <button onClick={(e) => filtered(columns, conditions, value)}>Фильтр</button>
                   <button onClick={createSomeTable}>Добавить</button>
                   <button onClick={reload}>Обновить</button>
               </span>

        </div>
    )
}
