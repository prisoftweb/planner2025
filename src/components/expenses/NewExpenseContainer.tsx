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
//import { Project } from "@/interfaces/Projects";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ReportParse } from "@/interfaces/Reports";

export default function NewExpenseContainer({token, showForm, user, optCostCenter, 
                                optProviders, optResponsibles, optReports,
                                optProjects, optCategories, optConditions, optTypes, 
                                reports, idLabour, idTicket, optCostCenterDeductible,
                                optVats, optProvidersSAT }: 
                            {token:string, showForm:Function, user:string, 
                              optCostCenter:Options[], optProjects:Options[],
                              optProviders:Options[], optResponsibles:Options[],
                              optCategories:Options[], optTypes:Options[], 
                              optConditions:Options[], optVats:Options[],
                              reports:ReportParse[], optReports: Options[],
                              optCostCenterDeductible:Options[], idLabour:string, 
                              idTicket:string, optProvidersSAT:Options[]
                            }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  //const [stepform, setStepForm] = useState<JSX.Element>(<></>)
  //const [isPettyCash, setIsPettyCash] = useState<boolean>(false);

  const {indexStepper, isDeductible, project, updateProject, 
    report, isPettyCash, updateReport, updateIndexStepper, 
    updateCondition, updatePettyCash} = useNewExpense();

  const idVat = optVats.find((vat) => vat.label === '0')?.value || '';
  
  // let ind = 0;
  // if(project !== ''){
  //   optProjects.map((optP, index:number) => {
  //     if(optP.value === project){
  //       ind = index;
  //     }
  //   });
  // }
  
  //const [optSelectize, setOptSelectize] = useState<Options>(optProjects.find((optP) => optP.value === project)?? optProjects[0]);
  const optSelectize = optProjects.find((optP) => optP.value === project)?? optProjects[0];
  //console.log('find => ', optProjects.find((optP) => optP.value === project));
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

  const viewSelectProject: JSX.Element = (
    <Select
      className={`w-full max-w-sm ${indexStepper===0? 'hidden': ''}`} 
      value={optSelectize}
      options={optProjects}
      isDisabled={isPettyCash}
      //isDisabled={true}
      maxMenuHeight={250}
      components={{
        DropdownIndicator
      }}
      placeholder='Buscar ...'
      styles={customStyles}
      onChange={(value:any) => {
        console.log('onchange => ', value);
        updateProject(value.value); 
        //setOptSelectize(value);
      }}
    />)
  
  const handleResize = () => {
    //setHeightPage(window.outerHeight);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    updateCondition(optConditions[0].value);
    //selectProject();
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const closeForm = () => {
    updateReport('');
    updateIndexStepper(0);    
    showForm(false);
  }

  let stepform: JSX.Element = <></>;
  if(isDeductible){
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <DataStepper optCostCenter={optCostCenterDeductible} 
          optProviders={optProviders} 
          optResponsibles={optResponsibles}
          token={token} user={user} optCategories={optCategories}
          optTypes={optTypes} optVats={optVats} optProvidersSAT={optProvidersSAT}
        />
      ): indexStepper===2? (
        <VoucherStepper token={token} user={user} />
      ): indexStepper===3? (
        <CFDIStepper token={token} user={user} />
      ): (
        <SelectProjectStepper reports={reports} optReports={optReports}/>
      )
    }
  }else{
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <DataNoDeductibleStepper optCostCenter={optCostCenter} 
          optResponsibles={optResponsibles} token={token} user={user}
          idLabour={idLabour} idTicket={idTicket} idVat={idVat} />
      ): indexStepper===2? (
        <VoucherNoDeductibleStepper token={token} user={user} idVat={idVat} />
      ): (
        <SelectProjectStepper reports={reports} optReports={optReports}/>
      )
    }
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
          <HeaderForm img="/img/gastos.svg" subtitle="Ingresa los gastos del informe" 
            title="Nuevo gasto"
          />
          { report!=='' && viewSelectProject}
        </div>
        <TabDeductible />
        {stepform}
      </div>
    </div>
  )
}