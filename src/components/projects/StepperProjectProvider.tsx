import { createContext, useContext, useReducer } from "react";

const StepperProjectContext = createContext<any>([]);
export const useRegFormContext = () => {
    return useContext(StepperProjectContext);
}

const reducer = (state:any, action:any) => {
  console.log('action type = ', action.type);
    switch (action.type) {
      case 'SET_BASIC_DATA': {
          return { ...state, databasic: { ...action.data } };
      }
      case 'SET_EXTRA_DATA': {
            console.log('helppp')
          return { ...state, extradata: { ...action.data } };
      }
      case 'SET_ADDRESS_DATA': {
          return { ...state, address: action.data };
      }
      case 'SET_GUARANTEE': {
          return { ...state, guarantee: action.data };
      }
      case 'INDEX_STEPPER': {
        return { ...state, indexstepper: action.data };
    }
  }
  return state;
}

const StepperProjectProvider = ({ children }: {children:JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, { percent: 0, indexstepper: 0 });

    return <StepperProjectContext.Provider value={[state, dispatch]}>
        {children}
    </StepperProjectContext.Provider>
}

export default StepperProjectProvider;