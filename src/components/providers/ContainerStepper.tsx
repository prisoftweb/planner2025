'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProvider";
import DataBasicStepper from "./DataBasicStepper";
import CreditLineStepper from "./CreditLineStepper";
import ContactsStepper from "./ContactsStepper";
import FinishStepper from "./FInishStepper";

export default function ContainerStepper({token, id}: {token:string, id:string}){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(<DataBasicStepper />)

  useEffect(() => {
    setStepForm(<DataBasicStepper />)
  }, [])

  try {
    useEffect(() => {
      console.log('index==', state.indexstepper);
      try {
        if(state.indexstepper){
          if(state.indexstepper===1){
            setStepForm(<CreditLineStepper />)
          }else if(state.indexstepper===2){
            setStepForm(<ContactsStepper />)
          }else{
            if(state.indexstepper===3){
              setStepForm(<FinishStepper token={token} id={id} />)
            }else{
              setStepForm(<DataBasicStepper />)
            }
          }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper />)
      }
    }, [state.indexstepper])
  } catch (error) {
    console.log(error);
  }

  return(
    <>
      {stepform}
    </>
  )
}