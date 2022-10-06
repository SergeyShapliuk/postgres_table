import React from 'react';
import style from './TableHeader.module.css';



export const TableHeader=()=> {
  return (
    <div className={style.table_header}>
      <div>
        <span className={style.tableHeader__item}>Дата</span>
      </div>
      <div>
        <span className={style.tableHeader__item}>Название</span>
      </div>
      <div>
        <span className={style.tableHeader__item}>Количество</span>
      </div>
      <div>
        <span className={style.tableHeader__item}>Расстояние</span>
      </div>
    </div>
  );
}


