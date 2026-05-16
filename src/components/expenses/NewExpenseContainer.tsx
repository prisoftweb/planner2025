import HeaderForm from "../HeaderForm";
import { useState, useEffect } from "react";
import { useNewExpense } from "@/app/store/newExpense";
import DataStepper from "./DataStepper";
import VoucherStepper from "./VoucherStepper";
import CFDIStepper from "./CFDIStepper";
import TabDeductible from "./TabDeductible";
import DataNoDeductibleStepper from "./DataNoDeductibleStepper";
import VoucherNoDeductibleStepper from "./VoucherNoDeductibleStepper";
import SelectProjectStepper from "./SelectProyectStepper";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import RefreshStepperComponent from "./RefreshStepperComponent";
import TooltipCloseIcons from "../tooltipIcons/TooltipCloseIcon";

import { UsrBack } from "@/interfaces/User";
import { useOptionsExpense } from "@/app/store/newExpense";

import Label from "../Label";
import SelectReact from "../SelectReact";

export default function NewExpenseContainer({token, showForm, user, company }: 
  {token:string, showForm:Function, user:UsrBack, company:string }){
  
  const {vats, projects, conditions, categories} = useOptionsExpense();
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [idLabour, setIdLabour] = useState<string>('');
  const [idTicket, setIdTicket] = useState<string>('');
  const [updateCat, setUpdateCat]=useState<string>(categories.length>0?categories[0].value:'');

  const {indexStepper, isDeductible, project, updateProject, 
    report, isPettyCash, condition, category, updateReport, updateIndexStepper, 
    updateCondition, updateCategory} = useNewExpense();

  const handleUpdateCategory = (value:string) => {
    // setUpdateCat(value);
  }

  const handleCategory = (value:string) => {
    updateCategory(value);
    setUpdateCat(value);
  }

  if(idLabour==='' && categories.length > 0){
    const idL = categories.find((cat) => cat.label.toLowerCase().includes('mano de obra'))?.value || '';
    setIdLabour(idL);
  }

  if(idTicket==='' && categories.length > 0){
    const idT = categories.find((cat) => cat.label.toLowerCase().includes('ticket'))?.value || '';
    setIdTicket(idT);
  }

  const idVat = vats.find((vat) => vat.label === '0')?.value || '';
  
  const optSelectize = projects.find((optP) => optP.value === project)?? projects[0];
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

  const viewSelectProject: JSX.Element = indexStepper === 0 || projects.length===0 ? <></> : (
    <Select
      className={`w-full max-w-sm`} 
      value={optSelectize}
      options={projects}
      isDisabled={isPettyCash}
      maxMenuHeight={250}
      components={{
        DropdownIndicator
      }}
      placeholder='Buscar ...'
      styles={customStyles}
      onChange={(value:any) => {
        updateProject(value.value); 
      }}
    />)
  
  const handleResize = () => {
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
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  if(conditions.length > 0 && condition === ''){
    updateCondition(conditions[0].value);
  }

  const closeForm = () => {
    updateReport('', undefined);
    updateIndexStepper(0);    
    showForm(false);
  }

  let stepform: JSX.Element = <></>;
  if(isDeductible){
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <VoucherStepper token={token} user={user._id} />
      ): indexStepper===2? (
        <CFDIStepper token={token} user={user._id} />
      ): indexStepper===3? (
        <DataStepper token={token} user={user._id} handleUpdateCategory={handleUpdateCategory} company={company} />
      ): indexStepper===4? (
        <RefreshStepperComponent category={updateCat} isDeductible={isDeductible} />
      ): (
        <SelectProjectStepper />
      )
    }
  }else{
    if(indexStepper || indexStepper>=0){
      stepform = indexStepper===1? (
        <VoucherNoDeductibleStepper token={token} user={user._id} idVat={idVat} />
      ): indexStepper===2? (
        <DataNoDeductibleStepper token={token} user={user._id} company={company}
          idLabour={idLabour} idTicket={idTicket} idVat={idVat} handleUpdateCategory={handleUpdateCategory} />
      ): indexStepper===3? (
        <RefreshStepperComponent category={updateCat} isDeductible={isDeductible} />
      ):  (
        <SelectProjectStepper />
      )
    }
  }

  let indexCate = 0;
  if(category !== ''){
    categories.map((opt, index:number) => {
      if(opt.value === category){
        indexCate = index;
      }
    });
  }else{
    if(categories.length > 0 ){
      updateCategory(categories[0].value);
    }
  }

  return(
    <div className="z-10 w-full sm:max-w-3xl absolute bg-white p-5 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full p-1 sm:p-3">
        <div className="flex justify-end">
          <TooltipCloseIcons handleClose={closeForm} />
        </div>
        <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-x-3 gap-y-3">
          <HeaderForm img="/img/gastos.svg" subtitle="Ingresa los gastos del informe" 
            title="Nuevo gasto"
          />
          { report!=='' && viewSelectProject}
          {indexStepper==0 && categories.length > 0 && (
            <div className="w-48">
              <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
              <SelectReact index={indexCate} opts={categories} setValue={handleCategory} />
            </div>
          )}
        </div>
        <TabDeductible />
        {stepform}
      </div>
    </div>
  )
}