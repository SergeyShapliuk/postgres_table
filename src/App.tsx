import React from 'react';

import './App.css';
import Main from "./components/Main/Main";
import {Provider} from "react-redux";
import {store} from "./store/store";


function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <Main/>
            </Provider>

        </div>
    );
}

export default App;
