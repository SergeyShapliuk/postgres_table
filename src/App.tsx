import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Main} from "./components/Main/Main";
import {Preloader} from "./components/preloader/Preloader";



function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <Preloader>
                    <Main/>
                </Preloader>
            </Provider>

        </div>
    );
}

export default App;
