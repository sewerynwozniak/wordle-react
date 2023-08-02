import React, { useState, useEffect } from 'react';
import dictionary from '../dictionary.json';
import targetWords from '../targetWords.json';

export const ThemeContext = React.createContext();



const ContextProvider = ({ children }) => {
  const boardTemplate = [
    ['','','','',''],
    ['','','','',''], 
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
  ];

  const [board, setBoard] = useState(boardTemplate);
  const [keyArg, setKeyArg] = useState(null);
  const [boardIndex, setBoardIndex] = useState({ row: 0, index: -1 });

  //message
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');




  const updateBoardIndex = (key) => {
    setBoard((prevBoard) => {
      const updatedBoard = prevBoard.map((row) => [...row]);
      updatedBoard[boardIndex.row][boardIndex.index] = key;
      return updatedBoard;
    });
  };



  const checkIfEnoughLetter = ()=>{ 
    return !board[boardIndex.row].some(el=>el=='')
  }


  const displayMessage = (messageArg)=>{
    setShowMessage(message=>!message)
    setMessage(messageArg)

    //remove after x time
    setTimeout(()=>{
      setShowMessage(message=>!message)
    },1000)
  }


  const checkWord = ()=>{
 

    if(!checkIfEnoughLetter()){
      displayMessage('Not enough words!')
    }else{
      const word = board[boardIndex.row].join('').toUpperCase()


      if(dictionary.some(dictWord=>dictWord.toUpperCase()==word)){
        console.log('mamy takie słowo')
        setBoardIndex((prevIndex) => ({ row: prevIndex.row + 1, index: -1 }));
         
      }else{
        displayMessage('Not a word')
      }
    }

    


    
  }



  const clickKey = (newKey) => {
    if (newKey === 'ENTER') {
      checkWord()

    } else if (newKey === 'BACK') {

      if(boardIndex.index==-1) return
      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((row) => [...row]);
        updatedBoard[boardIndex.row][boardIndex.index] = '';
        return updatedBoard;
      });
      setBoardIndex((prevIndex) => ({ ...prevIndex, index: prevIndex.index - 1 }));

    } else {
      if (boardIndex.index < boardTemplate[0].length - 1) {
        setKeyArg(newKey);
        setBoardIndex((prevIndex) => ({ ...prevIndex, index: prevIndex.index + 1 }));
      } 
    }
    console.log('pod koniec funkcji')
  };



  //useEffect
  useEffect(() => {
    if (keyArg !== null) {
      updateBoardIndex(keyArg);
      setKeyArg(null);
    }

    if (boardIndex.index === boardTemplate[0].length - 1) {
      console.log('sprawdzamy');
    }
  }, [boardIndex, keyArg]);



  return (
    <ThemeContext.Provider value={{ boardIndex, boardTemplate, board, clickKey, showMessage, message}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
