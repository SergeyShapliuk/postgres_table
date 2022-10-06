import {DataType, RequestStatusType} from "../utils/types";
import {api} from "../api/api";
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const getTable = createAsyncThunk<DataType[], void>
('tableReducer/getTable', async (_, {dispatch}) => {
    dispatch(setAppStatus({status: "loading"}))
    try {
        const response = await api.getTable()
        dispatch(setAppStatus({status: "succeeded"}))
        return response.data
    } catch (e) {

    }
})
export const createTable = createAsyncThunk<DataType[], { date: string, name: string, quantity: number, distance: number }>(
    "tableReducer/createTable", async (param, {dispatch}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const response = await api.createTable(param)
            if (response.data.length) {
                dispatch(setAppStatus({status: "succeeded"}))
                return response.data
            }
        } catch (e) {
        }
    }
)
export const deleteTable = createAsyncThunk<string, string>(
    "tableReducer/deleteTable", async (id, {dispatch}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const response = await api.deleteTable(id)
            dispatch(setAppStatus({status: "succeeded"}))
            return response.data
        } catch (e) {

        }
    }
)
export const filteredTable = createAction(
    "tableReducer/filteredTable", (table) => {
        return {payload: table}
    })
const setAppStatus = createAction<{ status: RequestStatusType }>('appActions/setAppStatus')
const setAppError = createAction<{ error: string | null }>('appActions/setAppError')

export const tableAsyncActions = {
    getTable,
    createTable,
    deleteTable,
    filteredTable,
    setAppStatus,
    setAppError
}


export const mainSlice = createSlice({
    name: "tableReducer",
    initialState: {
        isInitialized: false,
        status: "idle" as RequestStatusType,
        table: [] as DataType[],
    },
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getTable.fulfilled, (state, action) => {
                state.table = action.payload ? action.payload.reverse() : []
            })
            .addCase(createTable.fulfilled, (state, action) => {
                state.table = [...action.payload, ...state.table]
            })
            .addCase(deleteTable.fulfilled, (state, action) => {
                state.table = state.table.filter(f => f.id !== action.payload)
            })
            .addCase(tableAsyncActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(tableAsyncActions.filteredTable, (state, action) => {
                state.table = action.payload
            })

    })
})


export const tableReducer = mainSlice.reducer
export const {} = mainSlice.actions
