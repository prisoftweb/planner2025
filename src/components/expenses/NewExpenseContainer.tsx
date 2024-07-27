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

import { UsrBack } from "@/interfaces/User";
import { useOptionsExpense } from "@/app/store/newExpense";

export default function NewExpenseContainer({token, showForm, user, }: 
                            {token:string, showForm:Function, user:UsrBack, }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [idLabour, setIdLabour] = useState<string>('');
  const [idTicket, setIdTicket] = useState<string>('');

  const {indexStepper, isDeductible, project, updateProject, 
    report, isPettyCash, condition, updateReport, updateIndexStepper, 
    updateCondition, updatePettyCash} = useNewExpense();

  const {vats, projects, conditions, categories} = useOptionsExpense();

  if(idLabour==='' && categories.length > 0){
    const idL = categories.find((cat) => cat.label.toLowerCase().includes('mano de obra'))?.value || '';
    setIdLabour(idL);
  }

  if(idTicket==='' && categories.length > 0){
    const idT = categories.find((cat) => cat.label.toLowerCase().includes('ticket'))?.value || '';
    setIdTicket(idT);
  }

  //const idVat = optVats.find((vat) => vat.label === '0')?.value || '';
  const idVat = vats.find((vat) => vat.label === '0')?.value || '';
  
  // //const [optSelectize, setOptSelectize] = useState<Options>(optProjects.find((optP) => optP.value === project)?? optProjects[0]);
  // const optSelectize = optProjects.find((optP) => optP.value === project)?? optProjects[0];
  const optSelectize = projects.find((optP) => optP.value === project)?? projects[0];
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

  console.log('selectice => ', optSelectize);

  const viewSelectProject: JSX.Element = indexStepper === 0 || projects.length===0 ? <></> : (
    <Select
      className={`w-full max-w-sm`} 
      value={optSelectize}
      //options={optProjects}
      options={projects}
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
    // updateCondition(optConditions[0].value);
    //selectProject();
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  if(conditions.length > 0 && condition === ''){
    updateCondition(conditions[0].value);
  }

  const closeForm = () => {
    updateReport('');
    updateIndexStepper(0);    
    showForm(false);
  }

  let stepform: JSX.Element = <></>;
  if(isDeductible){
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <DataStepper token={token} user={user._id} />
      ): indexStepper===2? (
        <VoucherStepper token={token} user={user._id} />
      ): indexStepper===3? (
        <CFDIStepper token={token} user={user._id} />
      ): (
        <SelectProjectStepper />
      )
    }
  }else{
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <DataNoDeductibleStepper token={token} user={user._id}
          idLabour={idLabour} idTicket={idTicket} idVat={idVat} />
      ): indexStepper===2? (
        <VoucherNoDeductibleStepper token={token} user={user._id} idVat={idVat} />
      ): (
        <SelectProjectStepper />
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