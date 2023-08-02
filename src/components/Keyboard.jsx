import {useState, useContext} from 'react'
import { ThemeContext } from '../Context';


const Keyboard= () => {

    const {clickKey} = useContext(ThemeContext);

    const keyboarsTable = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
     
    ];

    

  return (
    <div className='keyboard__wrapper'>
        {keyboarsTable.map(row=>(
            <div className="keyboard__row">
                {row.map(key=>(
                    
                    (
                        <div 
                            className={`keyboard__key ${key === 'ENTER' || key === 'BACK' ? 'keyboard__key--special' : 'keyboard__key--letter'}`} 
                            onClick={()=>clickKey(key)}
                        >
                            {key}
                        </div>
                    )
                                    
                ))}
            </div>
        ))}
    </div>
  )
}

export default Keyboard