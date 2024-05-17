"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "@/interfaces/Expenses"
import { UpdateCost } from "@/app/api/routeCost"
import CurrencyInput from 'react-currency-input-field';
import { showToastMessage, showToastMessageError } from "../Alert"

export default function UpdateExpense({token, id, user, optCostCenter, expense, 
                                        optGlossaries, optProviders, optResponsibles, 
                                        optProjects }: 
                                  {token:string, id:string, user:string, 
                                    optCostCenter:Options[], expense:Expense, 
                                    optGlossaries:Options[], optProviders:Options[], 
                                    optResponsibles:Options[], optProjects:Options[]}){
  
  const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  const [startDate, setStartDate] = useState<string>(expense.date.substring(0, 10));
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
    if(expense.costcenter){
      optCostCenter.map((optCC, index:number) => {
        if(optCC.value===expense.costcenter._id){
          setCostCenter(optCostCenter[index].value);
          indexCC = index;
        }
      });
    }
    setViewCC(<>
                <div>
                  <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
                  <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
                </div>

                <div>
                  <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
                  <SelectReact index={0} opts={optCostCenter} setValue={setCostCenter} />
                </div>
                <div>
                  <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
                  <SelectReact index={0} opts={optGlossaries} setValue={setTypeExpense} />
                </div>
                <div>
                  <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
                  <SelectReact index={0} opts={optGlossaries} setValue={setTypeCFDI} />
                </div>
                <div>
                  <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
                  <SelectReact index={0} opts={optGlossaries} setValue={setCategory} />
                </div>
                <div>
                  <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
                  <SelectReact index={0} opts={optProviders} setValue={setProvider} />
                </div>
                <div>
                  <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
                  <SelectReact index={0} opts={optProjects} setValue={setProject} />
                </div>
                <div>
                  <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
                  <SelectReact index={0} opts={optResponsibles} setValue={setResponsible} />
                </div>
              </>);
    setCostCenter(optCostCenter[indexCC].value);
  }, []);

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        {viewCC}
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button">Guardar</Button>         
        </div>
      </form>  
    </div>
  )
}