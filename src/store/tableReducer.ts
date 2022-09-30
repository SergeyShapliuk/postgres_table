import {DataType} from "../utils/types";
import {api} from "../api/api";
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";




export const getSomeTable = createAsyncThunk<DataType[] | undefined,void>(
    "tableReducer/getSomeTable",async ()=>{
        try {
            const response = await api.getTable()
            return response.data
        }catch (e){

        }
    }
)
export const createTable = createAsyncThunk<{param:{date:string,name:string,quantity:number,distance:number}},any>(
    "tableReducer/createTable",async (param)=>{

        try {
            const response = await api.createTable(param)
            return response.data
        }catch (e){

        }
    }
)
export const deleteTable = createAsyncThunk<{id:string},any>(
    "tableReducer/deleteTable",async (id)=>{
        try {
            const response = await api.deleteTable(id)
            return response.data
        }catch (e){

        }
    }
)
export const filteredTable = createAction(
    "tableReducer/filteredTable",(table)=> {
        console.log("reducer",table)
        return {payload:table}
    })


export const mainSlice=createSlice({
    name:"tableReducer",
    initialState:{
        isInitialized: false,
        table:[] as DataType[],
    },
    reducers:{},
    extraReducers:(builder => {
       builder
           .addCase(getSomeTable.fulfilled,(state,action)=>{
               state.table=action.payload?action.payload.reverse():[]
           })
           .addCase(filteredTable,(state,action)=>{
               state.table=action.payload?action.payload:[]
           })

    })
})

export const tableReducer=mainSlice.reducer