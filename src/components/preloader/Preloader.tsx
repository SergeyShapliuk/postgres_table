import React from "react";
import s from "./Preloader.module.css"
import {useAppSelector} from "../../store/store";



type PreloaderType = {
    children:any
}

export const Preloader = ({ children}: PreloaderType) => {
    const status = useAppSelector(state => state.tableReducer.status)
    return (
        <div className={s.preloader}>
            {
                status === "loading" &&
                <img
                    src={require("../../assets/preloader.gif")}
                    alt='preloader'
                />
            }{children}
        </div>
    )
}

