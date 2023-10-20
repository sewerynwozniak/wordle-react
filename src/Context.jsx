import React, { useState, useEffect } from 'react';
import dictionary from '../dictionary.json';
import targetWords from '../targetWords.json';

export const ThemeContext = React.createContext();



const ContextProvider = ({ children }) => {

 

  const boardTemplate = [
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}],
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}], 
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}],
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}],
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}],
    [{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null},{letter:'',state:null}]
  ];

  const [board, setBoard] = useState(boardTemplate);
  const [keyArg, setKeyArg] = useState(null);
  const [boardIndex, setBoardIndex] = useState({ row: 0, index: -1 });
  const [targetWord, setTargetWord] = useState(null);

 

  //message
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');


 


  const updateBoardIndex = (key) => {
    setBoard((prevBoard) => {
      const updatedBoard = prevBoard.map((row) => [...row]);
      updatedBoard[boardIndex.row][boardIndex.index].letter = key;
      return updatedBoard;
    });
  };



  const checkIfEnoughLetter = ()=>{ 
    return !board[boardIndex.row].some(el=>el.letter=='')
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

      
      const word = board[boardIndex.row].map(obj=>obj.letter).join('')
     

      if(dictionary.some(dictWord=>dictWord.toUpperCase()==word)){
 

        //checking letters position

        setBoard((prevBoard) => prevBoard.map((row, i)=>{
          if(i==boardIndex.row){       
            return row.map((prevObj,i)=>{
              if(prevObj.letter.toUpperCase()==targetWord[i].toUpperCase()){           
                return {...prevObj, status:'correct'}
              }else if(targetWord.toUpperCase().includes(prevObj.letter.toUpperCase())){
                return {...prevObj, status:'exist'}
              }else{
                return {...prevObj, status:'wrong'}
              }
            })

          }else{
            return row
          }

        }))
        

 
        if(!checkIfWin() && boardIndex.row < board.length-1 ){
            setBoardIndex((prevIndex) => ({ row: prevIndex.row + 1, index: -1 }));
        }

       
      }else{
        displayMessage('Not a word')
      }

      if(checkIfWin()){
        displayMessage('You win!')
      }
      
    }

    
  }



  const checkIfWin = ()=>{
    console.log(targetWord)
    return targetWord.toUpperCase() == board[boardIndex.row].map(obj=>obj.letter).join('').toUpperCase()
  }



  const clickKey = (newKey) => {

  


    if (newKey == 'ENTER') {
      checkWord()

    } else if (newKey == 'BACK') {

      if(checkIfWin()) return;

      if(boardIndex.index==-1) return

      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((row) => [...row]);
        updatedBoard[boardIndex.row][boardIndex.index].letter = '';
        return updatedBoard;
      });
      setBoardIndex((prevIndex) => ({ ...prevIndex, index: prevIndex.index - 1 }));

    } else {

     
      if(checkIfWin()) return;

      if (boardIndex.index < boardTemplate[0].length - 1) {
        setKeyArg(newKey);
        setBoardIndex((prevIndex) => ({ ...prevIndex, index: prevIndex.index + 1 }));
      } 
    }
  
  };


  const drawLetter = ()=>{   
    const randomNumber = Math.floor(Math.random() * targetWords.length);
    console.log(targetWords[randomNumber])
    return targetWords[randomNumber]
  }


  useEffect(() => {
    
    setTargetWord(drawLetter())
  }, []);



  //useEffect
  useEffect(() => {

    
    if (keyArg !== null) {
      updateBoardIndex(keyArg);
      setKeyArg(null);
    }

    if (boardIndex.index === boardTemplate[0].length - 1) {
   
    }
  }, [boardIndex, keyArg]);




  return (
    <ThemeContext.Provider value={{ boardIndex, boardTemplate, board, clickKey, showMessage, message}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
