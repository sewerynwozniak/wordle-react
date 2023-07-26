import React, {useState, useEffect} from 'react';


export const ThemeContext = React.createContext();


const ContextProvider = ({children}) => {


      const boardTemplate=[
        ['','','','',''],
        ['','','','',''], 
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
      ]
    
    const [board, setBoard] = useState(boardTemplate)

    const [boardIndex, setBoardIndex] = useState({row:0,index:0})


  
    const selectLetter = (key)=>{
      setBoardIndex({...boardIndex,index:boardIndex.index+1})


      const updatedBoard = board.map((row) => [...row]);
      updatedBoard[boardIndex.row][boardIndex.index] = key;
    
      setBoard(updatedBoard)
    }

  const clickKey = (key)=>{
    if(key=='ENTER'){

    }
    if(key=='BACK'){

    }else{
      selectLetter(key)

    }

  }

  useEffect(() => {
    // console.log('old board',boardTemplate)
     console.log('new board', board);
  }, [board]);


  return (
    <ThemeContext.Provider value={{boardIndex, setBoardIndex, boardTemplate,board, clickKey}}> 
        {children}
    </ThemeContext.Provider> 
  )
}

export default ContextProvider