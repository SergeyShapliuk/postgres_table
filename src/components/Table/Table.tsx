import React from 'react';

import { DataType } from '../../types/types';

import style from './Table.module.css';

type TablePropsType = {
  data: DataType;
  onClick:(id:string|null)=>void
};

function Table({ data,onClick }: TablePropsType) {
  // const date = data.date.toString().slice(0,17);
  // const colors: { [key: string]: string } = {
  //   new: 'red',
  //   started: 'blue',
  //   assigned_to: 'orange',
  //   completed: 'green',
  //   declined: 'black',
  // };
  // const words: { [key: string]: string } = {
  //   new: 'новое',
  //   started: 'начато',
  //   assigned_to: 'назначено',
  //   completed: 'выполнено',
  //   declined: 'отменено',
  // };
  return (
    <div className={style.table}>
      <div className={style.tableItem}>
        {data.date}
      </div>
      <div className={style.tableItem}>
        {data.name}
      </div>
      <div className={style.tableItem}>
        {data.quantity}
      </div>
        <div className={style.tableItem}>
        {data.distance}
      </div>
      <div className={style.tableItem}>
        <button
          type="button"
          className={style.status}
          onClick={()=>onClick(data.id)}
        >
         удалить
        </button>

      </div>
    </div>
  );
}

export default Table;
