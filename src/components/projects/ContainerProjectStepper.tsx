'use client';

import { useEffect, useState } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import DataBasicStepper from "./DataBasicStepper";
import ExtraDataStepper from "./ExtraDataStepper";
import AddressStepper from "./AddressStepper";
import Guarantee from "./Guarantee";
import { Options } from "@/interfaces/Common";

export default function ContainerProjectStepper({token, optClients, optCategories, 
                                optTypes, user, optCompanies, condition, showForm}: 
                              {token:string, optClients:Options[], optCategories:Options[],
                                optTypes:Options[], user:string, showForm:Function,
                                optCompanies: Options[], condition: string }){
  
  const [state] = useRegFormContext();
  
  // const [stepform, setStepForm] = useState<JSX.Element>(
  //                         <DataBasicStepper token={token} user={user} 
  //                             condition={condition} showForm={showForm} />)

  // useEffect(() => {
  //   setStepForm(<DataBasicStepper token={token} user={user} />)
  // }, [])

  // try {
  //   useEffect(() => {
  //     try {
  //       if(state.indexstepper || state.indexstepper>=0){
  //         if(state.indexstepper===1){
  //           setStepForm(<ExtraDataStepper token={token} optClients={optClients} 
  //                           optCategories={optCategories} user={user} 
  //                           optTypes={optTypes} optCompanies={optCompanies}
  //                           condition={condition} />)
  //         }else if(state.indexstepper===2){
  //           setStepForm(<AddressStepper token={token} condition={condition} />)
  //           }else if(state.indexstepper===3){
  //             setStepForm(<Guarantee token={token} condition={condition} />)
  //             }else{
  //               setStepForm(<DataBasicStepper user={user} token={token} condition={condition} />)
  //             }
  //       }
  //     } catch (error) {
  //       setStepForm(<DataBasicStepper token={token} user={user} 
  //         condition={condition} showForm={showForm} />)
  //     }
  //   }, [state.indexstepper])
  // } catch (error) {
  //   console.log(error);
  // }

  let stepForm = <></>;
  try {
    if(state.indexstepper || state.indexstepper>=0){
      if(state.indexstepper===1){
        stepForm =(<ExtraDataStepper token={token} optClients={optClients} 
                        optCategories={optCategories} user={user} 
                        optTypes={optTypes} optCompanies={optCompanies}
                        condition={condition} showForm={showForm} />)
      }else if(state.indexstepper===2){
        stepForm =(<AddressStepper token={token} 
            condition={condition} showForm={showForm} />)
        }else if(state.indexstepper===3){
          stepForm =(<Guarantee token={token} condition={condition} showForm={showForm} />)
          }else{
            stepForm =(<DataBasicStepper user={user} token={token} 
                condition={condition} showForm={showForm} />)
          }
    }
  } catch (error) {
    stepForm =(<DataBasicStepper token={token} user={user} 
      condition={condition} showForm={showForm} />)
  }

  return(
    <>
      {stepForm}
    </>
  )
}