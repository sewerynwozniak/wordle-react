import {useState, useContext, useEffect} from 'react'
import { ThemeContext } from '../Context';


const Keyboard= () => {

    const {clickKey, keyboards} = useContext(ThemeContext);



    const keyboarsTable = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
     
    ];

    

    const handleKeyPress = (e)=>{   
         const key = e.key.toUpperCase() 
         if(/^[a-zA-Z]$/.test(key) | key=='ENTER' | key=='BACKSPACE'){
             clickKey(key)

         }
    }






    useEffect(()=>{
        window.addEventListener('keydown', handleKeyPress)
        return ()=>{
            window.removeEventListener('keydown', handleKeyPress)
        }
    },[handleKeyPress])
    

    


  return (
    <div className='keyboard__wrapper'>
        {keyboards.map((row, i)=>(
            <div
            key={i} className="keyboard__row">
                {row.map((key,i)=>(
                    
                    (
                        <button key={i}
                            className={`keyboard__key ${key.letter === 'ENTER'? 'keyboard__key--enter' : key.letter === 'BACKSPACE'? 'keyboard__key--backspace': 'keyboard__key--letter'} ${key.status==='correct'? 'keyboard__key--correct' : key.status==='exist'? 'keyboard__key--exist' : key.status==='wrong'? 'keyboard__key--wrong':''}`} 

                            onClick={()=>clickKey(key.letter)}
                                               
                        >
                            {key.letter}
                        </button>
                    )
                                    
                ))}
            </div>
        ))}
    </div>
  )
}

export default Keyboard