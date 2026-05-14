'use client';

import { useRegFormContext } from "./StepperClientProvider";
import DataBasicStepper from "./DataBasicStepper";
import ContactsStepper from "./ContactsStepper";
import ExtraDataStepper from "./ExtraDataStepper";
import { Options } from "@/interfaces/Common";
import AddressClientStepper from "./AddressClientStepper";

export default function ContainerClientStepper({token, id, tags, company}: 
  {token:string, id:string, tags:Options[], company:string}){
  
  const [state] = useRegFormContext();
  
  let stepform: JSX.Element = <></>;
  // console.log('container client stepper tags => ', tags);

  if(state.indexstepper || state.indexstepper>=0){
    if(state.indexstepper===1){
      stepform = (<ExtraDataStepper token={token} company={company} />)
    }else if(state.indexstepper===2){
      stepform = (<AddressClientStepper token={token} company={company} />)
      }else if(state.indexstepper===3){
        stepform = (<ContactsStepper id={id} token={token} company={company} />)
        }else{
          stepform = (<DataBasicStepper token={token} id={id} tags={tags} company={company} />)
        }
  }else{
    stepform = <DataBasicStepper token={token} id={id} tags={tags} company={company} />
  }

  return(
    <>
      <div className='h-screen'>
        {stepform}
      </div>
    </>
  )
}