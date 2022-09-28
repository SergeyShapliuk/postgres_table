import React, {useEffect, useState} from 'react';

import './App.css';
import {createTable, deleteTable, getTable} from "./api/api";


function App() {
    const [table, setTable] = useState(null);
    console.log(table)
    useEffect(() => {
        getSomeTable();
    }, []);

    const getSomeTable = () => {
        getTable.request().then(res => setTable(res))
    }
    const createSomeTable = () => {
        let date: any = prompt('Enter table date');
        let name: any = prompt('Enter table name');
        let quantity: any = prompt('Enter table quantity');
        let distance: any = prompt('Enter table distance');

        createTable.request(date, name, quantity, distance).then(res => console.log("res", res))
    }


    const deleteSomeTable = () => {
        let id = prompt('Enter merchant id');
        deleteTable.request(id).then(res=>console.log('ressss',res))
    }

    return (
        <div className="App">
            {table ? table : 'There is no some_table data available'}
            <br/>
            <button onClick={createSomeTable}>Add table</button>

            <br/>
            <button onClick={deleteSomeTable}>Delete table</button>
        </div>
    );
}

export default App;
