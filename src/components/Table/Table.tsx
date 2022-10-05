import React from 'react';

import { DataType } from '../../utils/types';

import style from './Table.module.css';

type TablePropsType = {
  data: DataType;
  onClick:(id:string)=>void
};

export const Table=React.memo(function ({ data,onClick }: TablePropsType) {
  const date = JSON.stringify(data.date).slice(1,11);
  const time = JSON.stringify(data.date).slice(13,18);
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
    <div className={style.table} title={"Нажмите для удаления"} onClick={()=>onClick(data.id)}>
            <div className={style.tableItem}>
                {date}
                <div className={style.tableItem_under}>{time}</div>
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

       {/* <button*/}
       {/*   type="button"*/}
       {/*   onClick={()=>onClick(data.id)}*/}
       {/*   className={style.button}*/}
       {/*>*/}
       {/* </button>*/}


    </div>
  );
})


