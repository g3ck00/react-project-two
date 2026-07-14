import {useReducer} from "react";

function useLoggerReducer(reducer: any, initialState: any) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const loggedDispatch = (action: any) => {
        console.log('%cAction:', 'color: blue', action)
        console.log('%cPrevious State:', 'color: red', state)
        dispatch(action)
        // El nuevo estado no está disponible hasta el próximo render
    }

    return [state, loggedDispatch]
}

export default useLoggerReducer;