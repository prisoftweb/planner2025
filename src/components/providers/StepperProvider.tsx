import { createContext, useContext, useReducer } from "react";

const StepperContext = createContext<any>([]);
export const useRegFormContext = () => {
    return useContext(StepperContext);
}

const reducer = (state:any, action:any) => {
    // { type, data }
    console.log('type action', action.type);
    switch (action.type) {
        case 'SET_BASIC_DATA': {
            return { ...state, databasic: { ...action.data } };
        }
        case 'SET_CREDIT_DATA': {
            return { ...state, creditline: { ...action.data } };
        }
        case 'SET_CONTACTS': {
            //console.log('set contacts')
            //console.log(action.data);
            return { ...state, contacts: action.data };
        }
        case 'SET_MORE': {
            return { ...state, more: action.data };
        }
        case 'INDEX_STEPPER': {
          return { ...state, indexstepper: action.data };
      }
    }
    return state;
}

const StepperProvider = ({ children }: {children:JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, { percent: 0, indexstepper: 0 });

    return <StepperContext.Provider value={[state, dispatch]}>
        {children}
    </StepperContext.Provider>
}

export default StepperProvider;