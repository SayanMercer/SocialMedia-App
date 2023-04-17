import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { App } from './components';
import { AuthProvider,PostsProvider } from './providers';
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
    <PostsProvider>
        <App /> 
    </PostsProvider>   
    </AuthProvider>  
  
  </React.StrictMode>
 
);
