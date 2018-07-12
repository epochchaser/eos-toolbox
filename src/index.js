import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'mobx-react';
import accountStore from './stores/accountStore';

const stores = {
    accountStore
}

ReactDOM.render((
<Provider {...stores}>
    <App />
</Provider>
), document.getElementById("root"))
