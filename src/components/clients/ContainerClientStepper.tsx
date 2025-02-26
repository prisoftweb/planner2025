'use client';

import { useRegFormContext } from "./StepperClientProvider";
import DataBasicStepper from "./DataBasicStepper";
import ContactsStepper from "./ContactsStepper";
import ExtraDataStepper from "./ExtraDataStepper";
import { Options } from "@/interfaces/Common";
import AddressClientStepper from "./AddressClientStepper";

export default function ContainerClientStepper({token, id, tags}: {token:string, id:string, tags:Options[]}){
  
  const [state] = useRegFormContext();
  
  let stepform: JSX.Element = <></>;

  if(state.indexstepper || state.indexstepper>=0){
    if(state.indexstepper===1){
      stepform = (<ExtraDataStepper token={token} />)
    }else if(state.indexstepper===2){
      stepform = (<AddressClientStepper token={token} />)
      }else if(state.indexstepper===3){
        stepform = (<ContactsStepper id={id} token={token} />)
        }else{
          stepform = (<DataBasicStepper token={token} id={id} tags={tags} />)
        }
  }else{
    stepform = <DataBasicStepper token={token} id={id} tags={tags} />
  }

  return(
    <>
      <div className='h-screen'>
        {stepform}
      </div>
    </>
  )
}