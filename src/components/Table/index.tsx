import {mainSlice, tableAsyncActions} from "../../store/tableReducer";
import {Table} from "./Table";


const tableActions = {
    ...tableAsyncActions,
    ...mainSlice.actions
}

const tableReducer=mainSlice.reducer

export {
    tableActions,
    Table,
    tableReducer

}
