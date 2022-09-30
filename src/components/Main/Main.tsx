import React, {ChangeEvent, useCallback, useEffect, useState} from "react";


import style from "./Main.module.css"


import usePagination from "../../hook/usePagination";



import {deleteTable, getSomeTable} from "../../store/tableReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {Pagination} from "../Pagination/Pagination";
import {Table} from "../Table/Table";
import {Filter} from "../../Filter/Filter";
import {TableHeader} from "../Table/TableHeader";


export const Main=React.memo(function () {
    console.log("main")

const table=useAppSelector(state => state.tableReducer.table)
    const dispatch=useAppDispatch()
    const [perPage, setPerPage] = useState(10);
console.log("table",table)
    const perPages = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const v = e.currentTarget.value;
        setPerPage(parseInt(v, 10));
        setPage(1);
    },[table]);

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
        if(!table.length){
            dispatch(getSomeTable())
        }
    }, []);


    const deleteSomeTable = (id: string | null) => {
       let choose = window.confirm("Вы хотите удалить данные?")
        if(choose){
            dispatch(deleteTable(id))
            dispatch(getSomeTable())
        }
    }


    return (
        <div className={style.mainBlock}>
        <div className={style.main}>
            <div className={style.mainContainer}>
                <Filter/>
                <TableHeader/>
                {table.length && table.slice(firstContentIndex, lastContentIndex).map(
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
        </div>

    )
})

