import {useState, useContext} from 'react'
import { ThemeContext } from '../Context';



const Board = () => {

   const {boardIndex, board} = useContext(ThemeContext);


  return (
    <div className='board__wrapper'>
        {board.map(row=>(
          <div className="board__row">
            {row.map(tile=>(
              <div className="board__tile">
                <span>
                  {tile}
                </span>
              </div>              
            ))}
          </div>
        ))}
    </div>
  )
}

export default Board

