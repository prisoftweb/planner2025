'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProvider";
import DataBasicStepper from "./DataBasicStepper";
import CreditLineStepper from "./CreditLineStepper";
import ContactsStepper from "./ContactsStepper";

export default function ContainerStepper({token, id, user}: {token:string, id:string, user:string}){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(<DataBasicStepper id={id} token={token} user={user} />)

  useEffect(() => {
    setStepForm(<DataBasicStepper token={token} id={id} user={user} />)
    return () => setStepForm(<></>);
  }, [])

  //aqui se puede usar el usememo
  try {
    useEffect(() => {
      try {
        if(state.indexstepper || state.indexstepper>=0){
          if(state.indexstepper===1){
            setStepForm(<CreditLineStepper token={token} id={id} user={user} />)
          }else if(state.indexstepper===2){
              setStepForm(<ContactsStepper id={id} token={token} user={user} />)
            }else{
              setStepForm(<DataBasicStepper token={token} id={id} user={user} />)
            }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper token={token} id={id} user={user} />)
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