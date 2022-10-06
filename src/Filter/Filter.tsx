import React, {useState} from "react";
import Select from "../components/Select/Select";
import style from "./Filter.module.css"
import {tableActions} from "../components/Table";
import {useActions} from "../utils/redux-utils";
import {useAppSelector} from "../store/store";

type FilterPropsType = {
    onClickBg: () => void
}
const arr1 = ["выберите колонку", "название", "количество", "расстояние"]
const arr2 = ["выберите условие", "равно", "содержит", "больше", "меньше"]

export const Filter = ({onClickBg}: FilterPropsType) => {

    const table = useAppSelector(state => state.tableReducer.table)
    const {getTable, filteredTable} = useActions(tableActions)

    const [columns, setColumns] = useState<string>(arr1[0])
    const [conditions, setConditions] = useState<string>(arr2[0])
    const [value, setValue] = useState<string>("")


    const filtered = (columns: string, conditions: string, value: string) => {
        if (value.trim() === '' || columns === "выберите колонку" || conditions === "выберите условие") {
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
            filteredTable(filteredItems)
            setValue("")
        } else {
            alert("Некорректное значение в поле условия");
        }
    }
    const reload = () => {
        getTable()
        setColumns(arr1[0])
        setConditions(arr2[0])
        setValue("")
    }
    return (
        <div className={style.filter}>

            <Select options={arr1}
                    value={columns}
                    onChangeOption={setColumns}/>
            <Select options={arr2}
                    value={conditions}
                    onChangeOption={setConditions}/>
            <input value={value} pattern={".{1,}"} required onChange={(e) => setValue(e.currentTarget.value)}/>

            <button onClick={reload}>Обновить</button>
            <button onClick={onClickBg}>Добавить</button>
            <button onClick={() => filtered(columns, conditions, value)}>Фильтр</button>


        </div>
    )
}
