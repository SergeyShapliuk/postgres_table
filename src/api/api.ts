import {instance} from "./instance";


export const api = {
    getTable() {
        return instance.get("/some_table")
    },
    createTable(param: { date: string, name: string, quantity: number, distance: number }) {
        console.log("create", param)
        return instance.post("/some_table", param)
    },
    deleteTable(id: string | null) {
        return instance.delete(`/some_table/${id}`)
    },
    updateTable() {
        return instance.put("/some_table/update")
    }
}
