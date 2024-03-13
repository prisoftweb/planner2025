import { createContext, useContext, useReducer } from "react";

const StepperClientContext = createContext<any>([]);
export const useRegFormContext = () => {
    return useContext(StepperClientContext);
}

const reducer = (state:any, action:any) => {
    // { type, data }
    //console.log('type action', action.type);
    switch (action.type) {
        case 'SET_BASIC_DATA': {
            return { ...state, databasic: { ...action.data } };
        }
        case 'SET_EXTRA_DATA': {
            return { ...state, extradata: { ...action.data } };
        }
        case 'SET_ADDRESS_DATA': {
            return { ...state, address: action.data };
        }
        case 'SET_CONTACTS': {
            return { ...state, contacts: action.data };
        }
        case 'INDEX_STEPPER': {
          return { ...state, indexstepper: action.data };
      }
    }
    return state;
}

const StepperClientProvider = ({ children }: {children:JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, { percent: 0, indexstepper: 0 });

    return <StepperClientContext.Provider value={[state, dispatch]}>
        {children}
    </StepperClientContext.Provider>
}

export default StepperClientProvider;