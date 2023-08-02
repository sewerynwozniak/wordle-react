import { useContext } from 'react'
import { ThemeContext } from '../Context';

const Message = () => {

    const {showMessage} = useContext(ThemeContext);
    const {message} = useContext(ThemeContext);

  return (
    
    <div className={`message ${!showMessage && 'message--hide'}`}>
        {message}
    </div>
  )
}

export default Message