'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import DataBasicStepper from "./DataBasicStepper";
import ExtraDataStepper from "./ExtraDataStepper";
import AddressStepper from "./AddressStepper";
import Guarantee from "./Guarantee";
import { Options } from "@/interfaces/Common";

export default function ContainerProjectStepper({token, optClients, optCategories, 
                                optTypes, user, optCompanies}: 
                              {token:string, optClients:Options[], optCategories:Options[],
                                optTypes:Options[], user:string,
                                optCompanies: Options[] }){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(
                          <DataBasicStepper token={token} user={user} />)

  // useEffect(() => {
  //   setStepForm(<DataBasicStepper token={token} user={user} />)
  // }, [])

  try {
    useEffect(() => {
      try {
        if(state.indexstepper || state.indexstepper>=0){
          if(state.indexstepper===1){
            setStepForm(<ExtraDataStepper token={token} optClients={optClients} 
                            optCategories={optCategories} user={user} 
                            optTypes={optTypes} optCompanies={optCompanies} />)
          }else if(state.indexstepper===2){
            setStepForm(<AddressStepper token={token} />)
            }else if(state.indexstepper===3){
              setStepForm(<Guarantee token={token} />)
              }else{
                setStepForm(<DataBasicStepper user={user} token={token} />)
              }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper token={token} user={user} />)
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