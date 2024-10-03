'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"

import { BudgetTableCostCenter } from "@/interfaces/Budget"
import Button from "@/components/Button";
import Label from "@/components/Label";
import HeaderForm from "@/components/HeaderForm";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import CurrencyInput from "react-currency-input-field";
import { UpdateNewBudgetInBudget, getBudget } from "@/app/api/routeBudget";
import { useOneBudget } from "@/app/store/budgetProject";

export default function EditBudget({showForm, token, budget, idBudget, user}: 
                    {showForm:Function, token:string, budget:(BudgetTableCostCenter), 
                      idBudget:string, user: string}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [total, setTotal] = useState<string>(budget.amount.replace(/[$,%, M, X,]/g, ""));
  const [percentage, setPercentage] = useState(budget.percentage.replace(/[$,%,]/g, ""));

  const {updateOneBudget} = useOneBudget();

  // console.log('budget => ', budget);
  // console.log('total => ', total);
  // console.log('percentage => ', percentage);

  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])

  const onChangeTotal = (value: string) => {
    if(value.replace(/[$,%,]/g, "").trim()===''){
      setTotal('0');
    }else{
      try {
        setTotal(value.replace(/[$,]/g, ""));
      } catch (error) {
        setTotal('0');
      }
    }
  }

  const onChangePercentage = (value: string) => {
    if(value.replace(/[$,%,]/g, "").trim()===''){
      setPercentage('0');
    }else{
      try {
        setPercentage(value.replace(/[$,%]/g, ""));
      } catch (error) {
        setPercentage('0');
      }
    }
  }

  const updateCostCenter = async () => {
    const data = {
      cost:total.replace(/[$,%,]/g, ""),
      percent:percentage.replace(/[$,%,]/g, ""),
      date: new Date(),
      user,
      costocenter: {
          category: budget.category.id,
          concept: budget.concept.id
      }
    }
    try {
      console.log('data new budget => ', data);
      const res = await UpdateNewBudgetInBudget(token, data, idBudget+'/'+budget.id);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        showToastMessage('El centro de costos ha sido actulizado exitosamente!!');
        console.log('res update ne bud in bud => ', res);
        const r = await getBudget(token, idBudget);
        if(typeof(r)=== 'string'){
          showToastMessageError('Error al actualizar cambios!!!');
        }else{
          updateOneBudget(r);
        }
        showForm(false);
      }
    } catch (error) {
      showToastMessageError('Ocurrrio un problema al actulizar centro de costos del presupuesto!!');
    }
  }
  
  return(
    <>
      <form className="z-10 top-16 w-full max-w-md absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/projects/default.svg" subtitle="Cambia monto de centro de costo" 
            title="Modificar informe presupuesto"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label>{budget.category.name}</Label>
          <Label>{budget.concept.name}</Label>
          <div className="w-full flex justify-center mt-5">
            <p>{percentage.replace(/[$,%,]/g, "")}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
              style={{"width": Number(percentage.replace(/[$,%,]/g, "") || 0)}}></div>
          </div>
        </div>

        <div>
          <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
          <CurrencyInput
            prefix="$"
            value={total}
            autoFocus
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => onChangeTotal(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje</p></Label>
          <CurrencyInput
            prefix="$"
            value={percentage}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => onChangePercentage(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-2">
          <Button type="button" onClick={updateCostCenter}>Guardar</Button>
        </div>
      </form>
    </>
  )
}