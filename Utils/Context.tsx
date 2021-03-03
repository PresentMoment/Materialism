import {createContext, useState, useEffect} from 'react';
import useMediaQuery from './useMediaQuery'

let Context = createContext(false);

function Provider(props){

    const [state,setState] = useState(false);

     const res = useMediaQuery(425);
     setState(res);



  return(

    <Context.Provider value={{
        state:state
    }}>

      {props.children}
    </Context.Provider>

  )

}


const Consumer = Context.Consumer;
export {Provider, Consumer, Context}