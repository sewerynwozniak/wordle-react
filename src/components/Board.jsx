import {useState, useContext} from 'react'
import { ThemeContext } from '../Context';



const Board = () => {

   const {board} = useContext(ThemeContext);


  return (
    <div className='board__wrapper'>
        {board.map((row, i)=>(
          <div key={i} className="board__row">
            {row.map((tile,i)=>(
              <div key={i} className={`board__tile ${tile.status=='correct' ? 'board__correct' : tile.status=='exist' ? 'board__exist' : tile.status=='wrong' ? 'board__wrong':'board__unactive'}`}>
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

