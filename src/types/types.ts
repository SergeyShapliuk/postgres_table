export type DataType={
    id:string
    date:number
    name:string
    quantity:number
    distance:number
}
export type FilteredType="равно"|"содержит"| "больше"|"меньше"|"Название"| "Количество"| "Расстояние"