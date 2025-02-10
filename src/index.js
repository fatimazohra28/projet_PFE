// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './pie/pages/app';
//import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './pie/redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<App />
</Provider>
);
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './tp2redux22/route';
// import {Provider} from 'react-redux'
// import store from './tp2redux22/redux/store';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// <Provider store={store}>
// <App />
// </Provider>
// );