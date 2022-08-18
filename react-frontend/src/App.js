import React from 'react';
import './App.css';
import { ProductTable } from './components/ProductTable';

import { Routes, Route} from "react-router-dom";

import { InProgress } from './components/InProgress';
function App() {

  return(
    <>
      
      <main>
        
          <Routes>

            <Route path="/inventory" element={<ProductTable />}/>
            <Route path="/home" element={<InProgress/>}/>
            <Route path="/" element={<InProgress/>}/>

            
            
            
            {/* <Route exact path="/" element={<Navigate replace to={'/auth'}/>} /> */}
            
          </Routes>
        
      </main>
    </>
  );
}

export default App;
