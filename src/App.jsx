import React from 'react';
import Keyboard from './components/Keyboard'
import Board from './components/Board'
import ContextProvider from './Context';


function App() {


  
  return (
    <>
      <ContextProvider>
        <div className="main"> 
          <Board />
          <Keyboard/>
        </div>
      </ContextProvider>
    </>
  )
}

export default App
