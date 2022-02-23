import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store}  from './redux/store/configureStore';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>  
          <BrowserRouter>     
       <App />    
       </BrowserRouter>
  </Provider>,
  rootElement
);
