import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AppProvider } from './context'

ReactDOM.render(
 <AppProvider>
   <App />
 </AppProvider>
 ,
document.querySelector("#root")
);