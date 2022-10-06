import React from 'react';
import {DataType} from '../../utils/types';
import style from './Table.module.css';

type TablePropsType = {
    data: DataType;
    onClick: (id: string) => void
};

export const Table = React.memo(function ({data, onClick}: TablePropsType) {
    const date = JSON.stringify(data.date).slice(1, 11);
    const time = JSON.stringify(data.date).slice(13, 18);
    const upperCaseName = data.name.toUpperCase()
    return (
        <div className={style.table} title={"Нажмите для удаления"} onClick={() => onClick(data.id)}>
            <div className={style.tableItem}>
                {date}
                <div className={style.tableItem_under}>{time}</div>
            </div>
            <div className={style.tableItem}>
                {upperCaseName}
            </div>
            <div className={style.tableItem}>
                {data.quantity}
            </div>
            <div className={style.tableItem}>
                {data.distance}
            </div>

        </div>
    );
})


