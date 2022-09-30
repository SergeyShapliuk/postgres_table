import axios, {AxiosRequestConfig} from "axios";
import {instance} from "./instance";
import {DataType} from "../utils/types";


export const api = {
    getTable() {
        return instance.get<any,any>("/some_table")
    },
    createTable(param:{date: string, name: string, quantity: number, distance: number}) {
        console.log("create",param)
        return instance.post<any,any>("/some_table", param)
    },
    deleteTable(id:string|null){
        return instance.delete(`/some_table/${id}`)
    },
    updateTable(){
        return instance.put("/some_table/update")
    }
}
// export const getTable={
//     request(){
//         return axios.get("http://localhost:3001/some_table")
//             .then(response=> response.data)
//
//             .catch(error=>alert(error.response?error.response.data.errorText:error.message))
//     },
// }
// export const createTable={
//     request(date:string,name:string,quantity:number,distance:number){
//         return axios.post("http://localhost:3001/some_table",{date:date,name:name,quantity:quantity,distance:distance})
//             .then(response=> alert(response.data))
//
//             .catch(error=>alert(error.response?error.response.data.errorText:error.message))
//     },
// }
// export const deleteTable = {
//     request(id: string | null) {
//         alert(`id ${id}`)
//         return axios.delete(`http://localhost:3001/some_table/${id}`)
//             .then(response => alert(response.data))
//
//             .catch(error => alert(error.response ? error.response.data.errorText : error.message))
//     },
// }
