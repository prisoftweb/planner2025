'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProvider";
import DataBasicStepper from "./DataBasicStepper";
import CreditLineStepper from "./CreditLineStepper";
import ContactsStepper from "./ContactsStepper";
import BankDataStepper from "./BankDataStepper";

export default function ContainerStepper({token, id, user, company}: 
  {token:string, id:string, user:string, company:string}){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(<DataBasicStepper id={id} token={token} user={user} company={company} />)

  useEffect(() => {
    setStepForm(<DataBasicStepper token={token} id={id} user={user} company={company} />)
    return () => setStepForm(<></>);
  }, [])

  //aqui se puede usar el usememo
  try {
    useEffect(() => {
      try {
        if(state.indexstepper || state.indexstepper>=0){
          if(state.indexstepper===1){
            setStepForm(<CreditLineStepper token={token} id={id} user={user} company={company} />)
          }else if(state.indexstepper===2){
              setStepForm(<ContactsStepper id={id} token={token} user={user} company={company} />)
            }else{
              setStepForm(<DataBasicStepper token={token} id={id} user={user} company={company} />)
            }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper token={token} id={id} user={user} company={company} />)
      }
    }, [state.indexstepper])
  } catch (error) {
  }
  // try {
  //   useEffect(() => {
  //     try {
  //       if(state.indexstepper || state.indexstepper>=0){
  //         if(state.indexstepper===1){
  //           setStepForm(<CreditLineStepper token={token} id={id} user={user} company={company} />)
  //         }else if(state.indexstepper===2){
  //             setStepForm(<ContactsStepper id={id} token={token} user={user} company={company} />)
  //           }else if(state.indexstepper===3){
  //             setStepForm(<BankDataStepper token={token} id={id} user={user} company={company} />)
  //           }else{
  //             setStepForm(<DataBasicStepper token={token} id={id} user={user} company={company} />)
  //           }
  //       }
  //     } catch (error) {
  //       setStepForm(<DataBasicStepper token={token} id={id} user={user} company={company} />)
  //     }
  //   }, [state.indexstepper])
  // } catch (error) {
  // }

  return(
    <>
      {stepform}
    </>
  )
}