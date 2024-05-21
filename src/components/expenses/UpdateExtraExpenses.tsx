"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
// import Input from "../Input"
// import { useFormik } from "formik"
// import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState } from "react";
//import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "@/interfaces/Expenses"
import { UpdateCost } from "@/app/api/routeCost"
//import CurrencyInput from 'react-currency-input-field';
import { showToastMessage, showToastMessageError } from "../Alert"

export default function UpdateExtraExpense({token, id, user, optCostCenter, expense, 
                                        optGlossaries, optProviders, optResponsibles, 
                                        optProjects }: 
                                  {token:string, id:string, user:string, 
                                    optCostCenter:Options[], expense:Expense, 
                                    optGlossaries:Options[], optProviders:Options[], 
                                    optResponsibles:Options[], optProjects:Options[]}){
  
  const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  //const [startDate, setStartDate] = useState<string>(expense.date.substring(0, 10));
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [typeExpense, setTypeExpense] = useState<string>(optCostCenter[0].value);
  const [typeCFDI, setTypeCFDI] = useState<string>(optCostCenter[0].value);
  const [provider, setProvider] = useState<string>(optProviders[0].value);
  const [responsible, setResponsible] = useState<string>(optResponsibles[0].value);
  const [category, setCategory] = useState<string>(optGlossaries[0].value);
  const [project, setProject] = useState<string>(optProjects[0].value);

  useEffect(() => {
    let indexCC = 0;
    let indexCFDI = 0;
    let indexProvider = 0;
    let indexCategory = 0;
    let indexProject = 0;
    let indexResponsible = 0;
    if(expense.costcenter){
      optCostCenter.map((optCC, index:number) => {
        if(optCC.value===expense.costcenter._id){
          setCostCenter(optCostCenter[index].value);
          indexCC = index;
        }
      });
    }
    if(expense.provider){
      optProviders.map((optProv, index:number) => {
        if(optProv.value === expense.provider._id){
          setProvider(optProviders[index].value);
          indexProvider = index;
        }
      });
    }
    if(expense.typeCFDI){
      optGlossaries.map((optCFDI, index:number) => {
        if(optCFDI.value === expense.typeCFDI._id){
          setTypeCFDI(optCFDI.value);
          indexCFDI = index;
        }
      });
    }
    if(expense.category){
      optGlossaries.map((optCat, index:number) => {
        if(optCat.value === expense.category._id){
          setCategory(optCat.value);
          indexCategory = index;
        }
      });
    }
    if(expense.project){
      optProjects.map((optProj, index:number) => {
        if(optProj.value === expense.project._id){
          setProject(optProjects[index].value);
          indexProject = index;
        }
      });
    }
    if(expense.user){
      optResponsibles.map((optRes, index:number) => {
        if(optRes.value === expense.user._id){
          setResponsible(optResponsibles[index].value);
          indexResponsible = index;
        }
      });
    }
    setViewCC(<>
                <div>
                  <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
                  <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
                </div>

                <div>
                  <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
                  <SelectReact index={0} opts={optGlossaries} setValue={setTypeExpense} />
                </div>
                
                <div>
                  <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
                  <SelectReact index={indexCFDI} opts={optGlossaries} setValue={setTypeCFDI} />
                </div>
                
                <div>
                  <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
                  <SelectReact index={indexCategory} opts={optGlossaries} setValue={setCategory} />
                </div>
                
                <div>
                  <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
                  <SelectReact index={indexProvider} opts={optProviders} setValue={setProvider} />
                </div>
                
                <div>
                  <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
                  <SelectReact index={indexProject} opts={optProjects} setValue={setProject} />
                </div>
                
                <div>
                  <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
                  <SelectReact index={indexResponsible} opts={optResponsibles} setValue={setResponsible} />
                </div>
              </>);
    setCostCenter(optCostCenter[indexCC].value);
  }, []);

  const updateExpense = async () => {
    const data = {
      costcenter, provider, user:responsible, typeCFDI, category, project
    }
    try {
      const res = await UpdateCost(token, id, data);
      if(res === 200){
        showToastMessage('Costo actualizado satisfactoriamente!!!');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al actualizar costo!!');
    }
  }
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        {viewCC}
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button" onClick={updateExpense}>Guardar</Button>         
        </div>
      </form>  
    </div>
  )
}