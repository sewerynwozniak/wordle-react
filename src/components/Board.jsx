import {useState, useContext} from 'react'
import { ThemeContext } from '../Context';



const Board = () => {

   const {boardIndex, board} = useContext(ThemeContext);


  return (
    <div className='board__wrapper'
      onKeyDown={(e)=>console.log(e)}
    >
        {board.map(row=>(
          <div className="board__row">
            {row.map(tile=>(
              <div className={`board__tile ${tile.status=='correct' ? 'board__correct' : tile.status=='exist' ? 'board__exist' : tile.status=='wrong' ? 'board__wrong':'board__unactive'}`}>
                <span data-status={tile.status}>
                  {tile.letter}
                </span>
              </div>              
            ))}
          </div>
        ))}
    </div>
  )
}

export default Board

