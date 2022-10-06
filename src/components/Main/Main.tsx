import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import style from "./Main.module.css"
import usePagination from "../../hook/usePagination";
import {useAppSelector} from "../../store/store";
import {Pagination} from "../Pagination/Pagination";
import {Filter} from "../../Filter/Filter";
import {TableHeader} from "../Table/TableHeader";
import Modal from "../modal/Modal";
import {NewRow} from "../NewRowModal/NewRow";
import {Table, tableActions} from "../Table";
import {useActions} from "../../utils/redux-utils";
import {Preloader} from "../preloader/Preloader";


export const Main = () => {
    console.log("main")
    const [showModal, setShowModal] = useState<boolean>(false)
    const table = useAppSelector(state => state.tableReducer.table)
    const status = useAppSelector(state => state.tableReducer.status)
    const newRowModalHandler = () => {
        setShowModal(!showModal)
    }
    const {getTable, createTable, deleteTable} = useActions(tableActions)
    const [perPage, setPerPage] = useState(10);

    const perPages = (e: ChangeEvent<HTMLSelectElement>) => {
        const v = e.currentTarget.value;
        setPerPage(parseInt(v, 10));
        setPage(1);
    }
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
        if (!table.length) {
            getTable()
        }
    }, []);

    const createSomeTable = useCallback(async (name: string, quantity: number, distance: number) => {
        let date = new Date().toLocaleString();
        createTable({date, name, quantity, distance})
        setShowModal(!showModal)
    }, [])
    const deleteSomeTable = (id: string) => {
        let choose = window.confirm("Вы хотите удалить данные?")
        if (choose) {
            deleteTable(id)
        }
    }
    const updateSomeTable = (id: string) => {
        let choose = window.confirm("Вы хотите удалить данные?")
        if (choose) {
            deleteTable(id)
        }
    }
    return (
        <div className={style.mainBlock}>
            <div className={style.main}>
                <Filter onClickBg={newRowModalHandler}/>
                <div className={style.mainContainer}>

                    <TableHeader/>
                    {table.length && table.slice(firstContentIndex, lastContentIndex).map(
                        data => <Table key={data.id} data={data} onClick={deleteSomeTable}/>
                    )}
                    <Modal onClickBg={newRowModalHandler} showModal={showModal}>
                        <NewRow createSomeTable={createSomeTable} onClickBg={newRowModalHandler}/>
                    </Modal>
                </div>
                <Pagination
                    setPage={setPage}
                    page={page}
                    nextPage={nextPage}
                    perPages={perPages}
                    prevPage={prevPage}
                    totalPages={totalPages}/>
                <Preloader status={status}/>
            </div>
        </div>
    )
}

