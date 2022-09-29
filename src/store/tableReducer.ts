import {DataType} from "../types/types";
import {api} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




//
// const initialState: InitialStateType = {
//     isInitialized: false,
//     table:[],
//     columns:"",
//     conditions:"",
//     input:"",
//
// }

// export const tableReducer = (state: InitialStateType = initialState, action: TableActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'TABLE/SET-TABLE':
//            return {...state, table: action.table}
//         // case 'APP/SET-ERROR':
//         //     return {...state, error: action.error}
//         case 'APP/SET-IS-INITIALIED':
//             return {...state, isInitialized: action.value}
//         default:
//             return {...state}
//     }
// }

// export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type InitialStateType = {
//     // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
//     isInitialized: boolean
//     // происходит ли сейчас взаимодействие с сервером
//     table: DataType[]
//     columns:string
//     conditions:string
//     input:string
//     // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
//     // error: string | null
//
// }
export const mainSlice=createSlice({
    name:"tableReducer",
    initialState:{
        table:[] as DataType[],
        columns:"" as string,
        conditions:"" as string,
        input:"" as string,
    },
    reducers:{},
    extraReducers:(builder => {
       builder
           .addCase(getSomeTable.fulfilled,(state,action)=>{
               state.table=action.payload?action.payload.reverse():[]
           })
           .addCase(createTable.fulfilled,(state,action)=>{
           })
    })
})
// export const setTableAC = (table: DataType[]) => ({type: 'TABLE/SET-TABLE', table} as const)
// // export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)
//

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
// // api.getTable().then(res => {
// //     if (res.status === 201) {
// //         dispatch(setTableAC(res.data));
// //     } else {
// //     }
// //     dispatch(setAppInitializedAC(true));
// // })
// export type SetTableActionType = ReturnType<typeof setTableAC>
//
//
//
// export type TableActionsType = SetTableActionType
//
//     | ReturnType<typeof setAppInitializedAC>
export const tableReducer=mainSlice.reducer