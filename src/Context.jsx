import React, { useState, useEffect } from 'react';

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

  const updateBoardIndex = (key) => {
    setBoard((prevBoard) => {
      const updatedBoard = prevBoard.map((row) => [...row]);
      updatedBoard[boardIndex.row][boardIndex.index] = key;
      return updatedBoard;
    });
  };

  useEffect(() => {
    if (keyArg !== null) {
      updateBoardIndex(keyArg);
      setKeyArg(null);
    }

    if (boardIndex.index === boardTemplate[0].length - 1) {
      console.log('sprawdzamy');
    }
  }, [boardIndex, keyArg]);

  const clickKey = (newKey) => {
    if (newKey === 'ENTER') {
      // Do something
    } else if (newKey === 'BACK') {
      // Do something
    } else {
      if (boardIndex.index < boardTemplate[0].length - 1) {
        setKeyArg(newKey);
        setBoardIndex((prevIndex) => ({ ...prevIndex, index: prevIndex.index + 1 }));
      } else {
        setKeyArg(newKey);
        setBoardIndex((prevIndex) => ({ row: prevIndex.row + 1, index: 0 }));
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ boardIndex, boardTemplate, board, clickKey }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
