import React from "react";
import s from "./Preloader.module.css"
import {RequestStatusType} from "../../utils/types";


type PreloaderType = {
    status: RequestStatusType
}

export const Preloader = ({status}: PreloaderType) => {
    return (
        <div className={s.preloader}>
            {
                status === "loading" &&
                <img
                    src={require("../../assets/preloader.gif")}
                    alt='preloader'
                />
            }
        </div>
    )
}

