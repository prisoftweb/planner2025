import HeaderForm from "../HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
//import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
//import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";
import { useNewExpense } from "@/app/store/newExpense";
import DataStepper from "./DataStepper";
import VoucherStepper from "./VoucherStepper";
import CFDIStepper from "./CFDIStepper";
import TabDeductible from "./TabDeductible";
import DataNoDeductibleStepper from "./DataNoDeductibleStepper";
import VoucherNoDeductibleStepper from "./VoucherNoDeductibleStepper";
import SelectProjectStepper from "./SelectProyectStepper";
import { Project } from "@/interfaces/Projects";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function NewExpenseContainer({token, showForm, user, optCostCenter, 
                                optProviders, optResponsibles, optGlossaries, 
                                optProjects, optCategories, optConditions, optTypes, 
                                projects }: 
                            {token:string, showForm:Function, user:string, 
                              optCostCenter:Options[],
                              optProviders:Options[], optResponsibles:Options[],
                              optGlossaries:Options[], optProjects:Options[], 
                              optCategories:Options[], optTypes:Options[], 
                              optConditions:Options[], projects:Project[]
                            }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [optSelectize, setOptSelectize] = useState<Options>();
  
  const [stepform, setStepForm] = useState<JSX.Element>(
                          <DataStepper optCostCenter={optCostCenter} 
                            optProviders={optProviders} optResponsibles={optResponsibles}
                            token={token} user={user} optGlossaries={optGlossaries} 
                            optProjects={optProjects} optCategories={optCategories} 
                            optConditions={optConditions} optTypes={optTypes}  />)

  const {indexStepper, isDeductible, project, updateProject} = useNewExpense();

  const handleResize = () => {
    //setHeightPage(window.outerHeight);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  const selectProject = () => {
    if(project === ''){
      setOptSelectize(optProjects[0]);
    }else{
      let aux = 0;
      optProjects.map((optP, index:number) => {
        if(optP.value === project){
          aux = index;
        }
      });
      setOptSelectize(optProjects[aux]);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    selectProject();
  }, []);

  useEffect(() => {
    selectProject();
  }, [project]);

  const closeForm = () => {
    showForm(false);
  }


  try {
    useEffect(() => {
      try {
        if(isDeductible){
          if(indexStepper || indexStepper>=0){
            if(indexStepper===1){
              setStepForm(<DataStepper optCostCenter={optCostCenter} 
                optProviders={optProviders} optGlossaries={optGlossaries} 
                optResponsibles={optResponsibles}
                token={token} user={user} optProjects={optProjects}
                optCategories={optCategories} optConditions={optConditions}
                optTypes={optTypes}
              />)
            }else if(indexStepper===2){
                setStepForm(<VoucherStepper token={token} />)
              }else if(indexStepper===3){
                  setStepForm(<CFDIStepper token={token} />)
                }else {
                  setStepForm(<SelectProjectStepper projects={projects} optProjects={optProjects} />)
              }
          }
        }else{
          if(indexStepper || indexStepper>=0){
            if(indexStepper===1){
              setStepForm(<DataNoDeductibleStepper optCostCenter={optCostCenter} 
                optResponsibles={optResponsibles} token={token} user={user} />)
            }else if(indexStepper===2){
                setStepForm(<VoucherNoDeductibleStepper token={token} />)  
              }else {
                  setStepForm(<SelectProjectStepper projects={projects} optProjects={optProjects} />)
              }
          }
        }
      } catch (error) {
        setStepForm(<></>)
      }
    }, [indexStepper, isDeductible]);
  } catch (error) {
    console.log(error);
  }

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MagnifyingGlassIcon className='w-6 h-6 text-slate-400' />
        </components.DropdownIndicator>
      )
    )
  }

  const customStyles = {
    control: (base: any) => ({
      ...base,
      flexDirection: 'row-reverse',
      borderRadius: "9px",
    }),
  }

  return(
    <div className="z-10 w-full sm:max-w-3xl absolute top-16 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full p-1 sm:p-3">
        <div className="flex justify-end">
          <XMarkIcon className="w-6 h-6 text-slate-500 
              hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={closeForm} />
        </div>
        <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-x-3 gap-y-3">
          <HeaderForm img="/img/costs/costs.svg" subtitle="Ingresa los gastos del proyecto" 
            title="Nuevo gasto"
          />
          
          <Select
            className={`w-full max-w-sm ${indexStepper===0? 'hidden': ''}`} 
            value={optSelectize}
            options={optProjects}
            maxMenuHeight={250}
            components={{
              DropdownIndicator
            }}
            placeholder='Buscar ...'
            styles={customStyles}
            onChange={(value:any) => updateProject(value.value)}
          />
        
        </div>
        <TabDeductible />
        {stepform}
      </div>
    </div>
  )
}