'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProvider";
import DataBasicStepper from "./DataBasicStepper";
import CreditLineStepper from "./CreditLineStepper";
import ContactsStepper from "./ContactsStepper";

export default function ContainerStepper({token, id}: {token:string, id:string}){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(<DataBasicStepper id={id} token={token} />)

  useEffect(() => {
    setStepForm(<DataBasicStepper token={token} id={id} />)
  }, [])

  try {
    useEffect(() => {
      try {
        if(state.indexstepper || state.indexstepper>=0){
          if(state.indexstepper===1){
            setStepForm(<CreditLineStepper token={token} id={id} />)
          }else if(state.indexstepper===2){
              setStepForm(<ContactsStepper id={id} token={token} />)
            }else{
              setStepForm(<DataBasicStepper token={token} id={id} />)
            }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper token={token} id={id} />)
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