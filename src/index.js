import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './components';
import { AuthProvider } from './providers/AuthProvider';
  //import { BrowserRouter } from "react-router-dom"

// ReactDOM.render(
  
//   <React.StrictMode>
    
//      <App />
     
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
  
   <AuthProvider>
        <App /> 
    </AuthProvider>  
  
  </React.StrictMode>
 
);
