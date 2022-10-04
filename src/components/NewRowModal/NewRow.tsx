import React, {ChangeEvent, FormEventHandler, useState} from "react";
import style from "./NewRow.module.css"



type NewRowTypeProps = {
    createSomeTable:(value1:string,value2:number,value3:number)=>void
    onClickBg: () => void
}
export const NewRow = ({createSomeTable,onClickBg}:NewRowTypeProps) => {
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [distance, setDistance] = useState<string>('')

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value.trim())
    }
    const onChangeHandler1=(e:ChangeEvent<HTMLInputElement>)=>{
        setQuantity(e.target.value.trim())
    }
    const onChangeHandler2=(e:ChangeEvent<HTMLInputElement>)=>{
        setDistance(e.target.value.trim())
    }

const handleSubmit=()=>{
    createSomeTable(name,JSON.parse(quantity),JSON.parse(distance))
}
    return (
        <div className={style.newRow}>
            <div>Введите данные</div>
            <div className={style.title}>
                <span>Название</span>
                <span>Количество</span>
                <span>Расстояние</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input required pattern={"[A-Za-zА-Яа-яЁё]+"} value={name} onChange={onChangeHandler}  maxLength={15}/>
                <input required pattern={"^[ 0-9]+$"}  value={quantity} onChange={onChangeHandler1} max={10}/>
                <input required pattern={"^[ 0-9]+$"} value={distance} onChange={onChangeHandler2} max={10}/>

            <div className={style.button}>
                <button type={"submit"}>Добавить</button>
                <button onClick={onClickBg}>Отмена</button>
            </div>
            </form>
        </div>
    )
}
