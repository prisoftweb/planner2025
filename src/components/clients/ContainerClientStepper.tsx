'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperClientProvider";
import DataBasicStepper from "./DataBasicStepper";
import ContactsStepper from "./ContactsStepper";
import ExtraDataStepper from "./ExtraDataStepper";
import { Options } from "@/interfaces/Common";
import AddressClientStepper from "./AddressClientStepper";

export default function ContainerClientStepper({token, id, tags}: {token:string, id:string, tags:Options[]}){
  
  const [state] = useRegFormContext();
  
  const [stepform, setStepForm] = useState<JSX.Element>(
                          <DataBasicStepper id={id} token={token} tags={tags} />)

  useEffect(() => {
    setStepForm(<DataBasicStepper token={token} id={id} tags={tags} />)
  }, [])

  try {
    useEffect(() => {
      try {
        if(state.indexstepper || state.indexstepper>=0){
          if(state.indexstepper===1){
            setStepForm(<ExtraDataStepper token={token} />)
          }else if(state.indexstepper===2){
            setStepForm(<AddressClientStepper token={token} />)
            }else if(state.indexstepper===3){
              setStepForm(<ContactsStepper id={id} token={token} />)
              }else{
                setStepForm(<DataBasicStepper token={token} id={id} tags={tags} />)
              }
        }
      } catch (error) {
        setStepForm(<DataBasicStepper token={token} id={id} tags={tags} />)
      }
    }, [state.indexstepper])
  } catch (error) {
    console.log(error);
  }

  return(
    <>
      <div className='h-screen'>
        {stepform}
      </div>
    </>
  )
}