"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "@/interfaces/Expenses"
import { UpdateCost } from "@/app/api/routeCost"
import { showToastMessage, showToastMessageError } from "../Alert"
import AddProvider from "./AddProvider";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function UpdateExtraExpense({token, id, user, optCostCenter, expense, 
                                        optGlossaries, optProviders, optResponsibles, 
                                        optProjects, optCategories, optConditions, optTypes }: 
                                  {token:string, id:string, user:string, 
                                    optCostCenter:Options[], expense:Expense, 
                                    optGlossaries:Options[], optProviders:Options[], 
                                    optResponsibles:Options[], optProjects:Options[], 
                                    optCategories:Options[], optTypes:Options[], 
                                    optConditions:Options[]}){
  
  const [costcenter, setCostCenter] = useState<string>(optCostCenter[0].value);
  //const [startDate, setStartDate] = useState<string>(expense.date.substring(0, 10));
  const [viewCC, setViewCC] = useState<JSX.Element>(<></>);
  const [typeExpense, setTypeExpense] = useState<string>(optTypes[0].value);
  const [typeCFDI, setTypeCFDI] = useState<string>(optTypes[0].value);
  const [provider, setProvider] = useState<string>(optProviders[0]?.value);
  const [responsible, setResponsible] = useState<string>(optResponsibles[0].value);
  const [category, setCategory] = useState<string>(optCategories[0].value);
  const [project, setProject] = useState<string>(optProjects[0].value);
  
  const [optionsProviders, setOptionProviders] = useState<Options[]>(optProviders);
  const [showProvider, setShowProvider] = useState<boolean>(false);
  const [indexProv, setIndexProv] = useState<number>(0);

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
          setIndexProv(index);
          indexProvider = index;
        }
      });
    }
    if(expense.typeCFDI){
      optTypes.map((optCFDI, index:number) => {
        if(optCFDI.value === expense.typeCFDI._id){
          setTypeCFDI(optCFDI.value);
          indexCFDI = index;
        }
      });
    }
    if(expense.category){
      optCategories.map((optCat, index:number) => {
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
                <div className=" col-span-1 sm:col-span-2">
                  <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
                  <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
                </div>

                <div>
                  <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
                  <SelectReact index={0} opts={optTypes} setValue={setTypeExpense} />
                </div>
                
                <div>
                  <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
                  <SelectReact index={indexCFDI} opts={optTypes} setValue={setTypeCFDI} />
                </div>
                
                <div>
                  <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
                  <SelectReact index={indexCategory} opts={optCategories} setValue={setCategory} />
                </div>
                
                {/* <div>
                  <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
                  <SelectReact index={indexProvider} opts={optProviders} setValue={setProvider} />
                </div> */}
                
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

  // const [selectProvider, setSelectProviders] = useState<JSX.Element>(<div>
  //     <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
  //     <SelectReact index={indexProv} opts={optProviders} setValue={setProvider} />
  //   </div>);
  const [selectProvider, setSelectProviders] = useState<JSX.Element>(<div>
            <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
            <div className="flex gap-x-2 items-center">
              <SelectReact index={indexProv} opts={optionsProviders} setValue={setProvider} />
              <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                onClick={() => setShowProvider(true)} />
            </div>
          </div>);

  // useEffect(() => {
  //   <div>
  //     <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
  //     <SelectReact index={indexProv} opts={optProviders} setValue={setProvider} />
  //   </div>
  // }, [indexProv]);

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
  
  const addProvider = (newProvider:Options) => {
    optProviders.push(newProvider);
    console.log('optProviders => ', optProviders);
    setOptionProviders((oldValues) => [...oldValues, newProvider])
    setProvider(newProvider.value);
    console.log('prov length => ', optProviders.length)
    setIndexProv(optProviders.length -1);
    // setSelectProviders(<div>
    //   <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
    //   <SelectReact index={optProviders.length -1} opts={optProviders} setValue={setProvider} />
    // </div>)
    setSelectProviders(<div className="">
            <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
            <div className="flex gap-x-2 items-center">
              <SelectReact index={indexProv} opts={optionsProviders} setValue={setProvider} />
              <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                onClick={() => setShowProvider(true)} />
            </div>
          </div>)
  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/costs/costs.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <form className="mt-4 w-full rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
        {viewCC}
        {selectProvider}
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button" onClick={updateExpense}>Guardar</Button>         
        </div>
      </form>
      {showProvider && <AddProvider token={token} setShowForm={setShowProvider} 
                            addProv={addProvider}  />}  
    </div>
  )
}