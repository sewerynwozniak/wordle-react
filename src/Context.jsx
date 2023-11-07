import React, { useState, useEffect } from 'react';
import dictionary from '../dictionary.json';
import targetWords from '../targetWords.json';

export const ThemeContext = React.createContext();



const ContextProvider = ({ children }) => {

 

  const boardTemplate = [
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}],
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}], 
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}],
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}],
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}],
    [{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null},{letter:'',status:null}]
  ];

  

    const keyboarsTable = [
        [{letter:'Q',status:null},{letter:'W',status:null},{letter:'E',status:null},{letter:'E',status:null},{letter:'R',status:null}, {letter:'T',status:null},{letter:'Y',status:null},{letter:'U',status:null}, {letter:'I',status:null},{letter:'O',status:null},{letter:'P',status:null}],

        [{letter:'A',status:null},{letter:'S',status:null},{letter:'D',status:null},{letter:'F',status:null},{letter:'G',status:null}, {letter:'H',status:null},{letter:'J',status:null},{letter:'K',status:null}, {letter:'L',status:null}],

        [{letter:'ENTER',status:null},{letter:'Z',status:null},{letter:'X',status:null},{letter:'C',status:null},{letter:'V',status:null}, {letter:'B',status:null},{letter:'N',status:null},{letter:'M',status:null}, {letter:'BACKSPACE',status:null}],
       
    ];


  const [board, setBoard] = useState(boardTemplate);
  const [keyboards, setKeyboards] = useState(keyboarsTable);
  const [keyArg, setKeyArg] = useState(null);
  const [boardIndex, setBoardIndex] = useState({ row: 0, index: -1 });
  const [targetWord, setTargetWord] = useState(null);

  const selectedLettetrs={

    wrong: [... new Set(board.flat().filter(el=>el.status=='wrong').map(el=>el.letter)) ],
    exist: [... new Set(board.flat().filter(el=>el.status=='exist').map(el=>el.letter)) ],
    correct: [... new Set(board.flat().filter(el=>el.status=='correct').map(el=>el.letter)) ]
    
  }

 


  //message
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

 


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

    if(showMessage==true) return


    setShowMessage(message=>!message)
    setMessage(messageArg)  

    //remove after x time
    const timer = setTimeout(()=>{
      setShowMessage(message=>!message)
    },1000)
  
  }




  const updateLetterStatus =()=>{
   
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

  }



  useEffect(()=>{
   //update keyboards' status after board updates
  
    setKeyboards(prevKeyboard=>prevKeyboard.map(row=>row.map(letterObj=>{

      if(selectedLettetrs.wrong.includes(letterObj.letter)){
        return {...letterObj,status:'wrong'}
      }else if(selectedLettetrs.exist.includes(letterObj.letter)){
        return {...letterObj,status:'exist'}
      }else if(selectedLettetrs.correct.includes(letterObj.letter)){
        return {...letterObj,status:'correct'}
      }else{
        return letterObj
      }
      
    })))

  },[board])





  const checkWord = ()=>{
 

    if(!checkIfEnoughLetter()){
      displayMessage('Not enough words!')
    }else{
      
      const word = board[boardIndex.row].map(obj=>obj.letter).join('')
     
      //check if this work exist in dictionary
      if(dictionary.some(dictWord=>dictWord.toUpperCase()==word)){
 
        //update letters' status
        updateLetterStatus()
     


        //if there is no win, update boardIndex
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
    return targetWord.toUpperCase() == board[boardIndex.row].map(obj=>obj.letter).join('').toUpperCase()
  }



  const clickKey = (newKey) => {



    if (newKey == 'ENTER') {
      
      checkWord()

    } else if (newKey == 'BACKSPACE') {

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
    <ThemeContext.Provider value={{ boardIndex, boardTemplate, board, keyboards, clickKey, showMessage, message}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
