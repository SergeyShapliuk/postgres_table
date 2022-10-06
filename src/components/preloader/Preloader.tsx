import React from "react";
import s from "./Preloader.module.css"
import {RequestStatusType} from "../../utils/types";


type PreloaderType = {
    // status: RequestStatusType
    children:any
}

export const Preloader = ({ children}: PreloaderType) => {
    return (
        <div className={s.preloader}>
            {
                // status === "loading" &&
                <img
                    src={require("../../assets/preloader.gif")}
                    alt='preloader'
                />
            }{children}
        </div>
    )
}

