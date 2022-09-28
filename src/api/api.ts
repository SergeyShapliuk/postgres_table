import axios from "axios";

export const getTable={
    request(){
        return axios.get("http://localhost:3001/some_table")
            .then(response=> response.data)

            .catch(error=>alert(error.response?error.response.data.errorText:error.message))
    },
}
export const createTable={
    request(date:number,name:string,quantity:number,distance:number){
        return axios.post("http://localhost:3001/some_table",{data:date,name:name,quantity:quantity,distance:distance})
            .then(response=> alert(response.data))

            .catch(error=>alert(error.response?error.response.data.errorText:error.message))
    },
}
export const deleteTable={
    request(id:string|null){
        alert(`id ${id}`)
        return axios.delete(`http://localhost:3001/some_table/${id}`)
            .then(response=> alert(response.data))

            .catch(error=>alert(error.response?error.response.data.errorText:error.message))
    },
}
