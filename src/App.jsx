import React from 'react';
import Keyboard from './components/Keyboard'
import Board from './components/Board'
import ContextProvider from './Context';
import Message from './components/Message';

function App() {


  
  return (
    <>
      <ContextProvider>
        <div className="main"> 
          <Message />
          <Board />
          <Keyboard/>
        </div>
      </ContextProvider>
    </>
  )
}

export default App
