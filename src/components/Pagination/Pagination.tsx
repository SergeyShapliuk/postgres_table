import React from "react";
import style from "./Pagination.module.css";


export const Pagination = React.memo(function ({page, totalPages, prevPage, setPage, nextPage, perPages}: any) {
    return (
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
    )
})
