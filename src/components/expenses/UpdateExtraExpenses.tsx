"use client"
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Button from "../Button";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { OneExpense } from "@/interfaces/Expenses"
import { UpdateCost } from "@/app/api/routeCost"
import { showToastMessage, showToastMessageError } from "../Alert"
import AddProvider from "./AddProvider";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useNewExpense } from "@/app/store/newExpense";
import { getProjectsLV } from "@/app/api/routeProjects";
import { CostoCenterLV } from "@/interfaces/CostCenter";
import { getCostoCentersLV } from "@/app/api/routeCostCenter";
import { getProvidersLV } from "@/app/api/routeProviders";
import { getUsersLV } from "@/app/api/routeUser";
import { getCatalogsByNameAndCategory, getCatalogsByNameAndType } from "@/app/api/routeCatalogs";

export default function UpdateExtraExpense({token, id, expense, isHistory}: 
                                  {token:string, id:string, expense:OneExpense, 
                                    isHistory:boolean}){
  
  const {currentExpense, updateCurrentExpense} = useNewExpense();
  const [typeCFDI, setTypeCFDI] = useState<string>(currentExpense?.typeCFDI._id || expense.typeCFDI._id);
  const [provider, setProvider] = useState<string>(currentExpense?.provider._id || expense.provider._id);
  const [responsible, setResponsible] = useState<string>(currentExpense?.user._id || expense.user._id);
  const [category, setCategory] = useState<string>(currentExpense?.category._id || expense.category._id);
  const [project, setProject] = useState<string>(currentExpense?.project._id || expense.project._id);
  
  //const [optionsProviders, setOptionProviders] = useState<Options[]>(optProviders);
  const [showProvider, setShowProvider] = useState<boolean>(false);
  
  const [optCostCenter, setOptCostCenter] = useState<Options[]>([]);
  const [optTypeCFDI, setOptTypeCFDI] = useState<Options[]>([]);
  const [optProjects, setOptProjects] = useState<Options[]>([]);
  const [optResponsibles, setOptResponsibles] = useState<Options[]>([]);
  const [optProviders, setOptProviders] = useState<Options[]>([]);
  const [optCategories, setOptCategories] = useState<Options[]>([]);
  const [costcenter, setCostCenter] = 
          useState<string>(currentExpense? 
                              typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?._id || ''
                              : typeof(expense.costocenter)==='string'? expense.costocenter : expense.costocenter?._id || '');

  const [concept, setConcept] = useState<string>(currentExpense? 
                                typeof(currentExpense.costocenter)==='string'? currentExpense.costocenter : currentExpense.costocenter?.concept?._id || ''
                                : typeof(expense.costocenter)==='string'? expense.costocenter : expense.costocenter?.concept._id || '');

  useEffect(() => {
    const fetchOptions = async () => {
      let costcenters: CostoCenterLV[];
      try {
        costcenters = await getCostoCentersLV(token);
        if(typeof(costcenters)==='string'){
          return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
      }
      
      let optTypes: Options[] = [];
      try {
        optTypes = await getCatalogsByNameAndType(token, 'cost');
        if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
      } catch (error) {
        return <h1>Error al consultar tipos de cfdi!!</h1>
      }

      let optPro: Options[] = [];
      try {
        optPro = await getProjectsLV(token);
        if(typeof(optPro)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optPro}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
      }

      let optRes : Options[] = [];
      try {
        optRes = await getUsersLV(token);
        if(typeof(optRes)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optRes}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
      }

      let optProv: Options[] =  [];
      try {
        optProv = await getProvidersLV(token);
        if(typeof(optProv)==='string'){
          return <h1 className="text-center text-lg text-red-500">{optProv}</h1>
        }    
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
      }

      let optCat: Options[] = [];
      try {
        optCat = await getCatalogsByNameAndCategory(token, 'cost');
        if(typeof(optCat)==='string') return <h1 className="text-red-500 text-center text-lg">{optCat}</h1>
      } catch (error) {
        return <h1>Error al consultar catalogos!!</h1>
      }

      const optCC:Options[]= [];
      costcenters.map((costcenter) => {
        optCC.push({
          label: costcenter.label || 'sin categoria',
          value: costcenter.categoryid + '/' + costcenter.value
        });
      });

      setOptCostCenter(optCC);
      setOptTypeCFDI(optTypes);
      setOptProjects(optPro);
      setOptResponsibles(optRes);
      setOptProviders(optProv);
      setOptCategories(optCat);
    }
    fetchOptions();
  }, []);
  
  const refRequest = useRef(true);
  const indexCC = optCostCenter.findIndex((cc) => cc.value === costcenter+'/'+concept);
  const indexCFDI = optTypeCFDI.findIndex((cfdi) => cfdi.value === typeCFDI);
  const indexCategory = optCategories.findIndex((cat) => cat.value === category);
  const indexProject = optProjects.findIndex((prj) => prj.value === project);
  const indexResponsible = optResponsibles.findIndex((res) => res.value === responsible);
  const indexProvider = optProviders.findIndex((prov) => prov.value === provider);

  // const handleCostCenter = (value: string) => {
  //   setCostCenter(value);
  // }

  const handleCostCenter = (value: string) => {
    console.log('value costoc => ', value);
    const indexCaracter = value.indexOf('/');
    const c1 = value.substring(0, indexCaracter);
    const c2 = value.substring(indexCaracter + 1);
    console.log('cad 1 => ', c1);
    console.log('cad 2 => ', c2);
    //updateCostCenter(c1, c2);
    setCostCenter(c1);
    setConcept(c2);
  }

  const handleCFDI = (value: string) => {
    setTypeCFDI(value);
  }

  const handleCategory = (value: string) => {
    setCategory(value);
  }

  const handleProject = (value: string) => {
    setProject(value);
  }

  const handleResponsible = (value: string) => {
    setResponsible(value);
  }

  const handleProvider = (value: string) => {
    setProvider(value);
  }

  const viewCC = optCostCenter.length > 0? (
    <>
      <div className=" col-span-1 sm:col-span-2">
        <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
        <SelectReact index={indexCC} opts={optCostCenter} setValue={handleCostCenter} />
      </div>

      <div>
        <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
        <SelectReact index={indexCFDI} opts={optTypeCFDI} setValue={handleCFDI} />
      </div>
      
      <div>
        <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
        <SelectReact index={indexCategory} opts={optCategories} setValue={handleCategory} />
      </div>
      
      <div>
        <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
        <SelectReact index={indexProject} opts={optProjects} setValue={handleProject} />
      </div>
      
      <div>
        <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
        <SelectReact index={indexResponsible} opts={optResponsibles} setValue={handleResponsible} />
      </div>
    </>
  ): (
    <></>
  )

  const selectProvider = optProviders.length > 0? (
    <div className="">
      <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
      <div className="flex gap-x-2 items-center">
        <SelectReact index={indexProvider} opts={optProviders} setValue={handleProvider} />
        {!isHistory && (
          <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
            onClick={() => setShowProvider(true)} />
        )}
      </div>
    </div>
  ): (
    <></>
  )

  // useEffect(() => {
  //   //let indexCC = 0;
  //   //let indexCFDI = 0;
  //   let indexProvider = 0;
  //   // let indexCategory = 0;
  //   // let indexProject = 0;
  //   // let indexResponsible = 0;
  //   // if(expense.costcenter){
  //   //   optCostCenter.map((optCC, index:number) => {
  //   //     // if(optCC.value===expense.costcenter){
  //   //     //   setCostCenter(optCostCenter[index].value);
  //   //     //   indexCC = index;
  //   //     // }
  //   //     if(typeof(expense.costcenter)==='string'){
  //   //       if(optCC.value===expense.costcenter){
  //   //         setCostCenter(optCostCenter[index].value);
  //   //         indexCC = index;
  //   //       }
  //   //     }else{
  //   //       if(optCC.value===expense.costcenter.categorys[0]._id){
  //   //         setCostCenter(optCostCenter[index].value);
  //   //         indexCC = index;
  //   //       }
  //   //     }
  //   //   });
  //   // }
  //   // if(expense.provider){
  //   //   optProviders.map((optProv, index:number) => {
  //   //     if(optProv.value === expense.provider._id){
  //   //       setProvider(optProviders[index].value);
  //   //       setIndexProv(index);
  //   //       indexProvider = index;
  //   //     }
  //   //   });
  //   // }
  //   // if(expense.typeCFDI){
  //   //   optTypes.map((optCFDI, index:number) => {
  //   //     if(optCFDI.value === expense.typeCFDI._id){
  //   //       setTypeCFDI(optCFDI.value);
  //   //       indexCFDI = index;
  //   //     }
  //   //   });
  //   // }
  //   // if(expense.category){
  //   //   optCategories.map((optCat, index:number) => {
  //   //     if(optCat.value === expense.category._id){
  //   //       setCategory(optCat.value);
  //   //       indexCategory = index;
  //   //     }
  //   //   });
  //   // }
  //   // if(expense.project){
  //   //   optProjects.map((optProj, index:number) => {
  //   //     if(optProj.value === expense.project._id){
  //   //       setProject(optProjects[index].value);
  //   //       indexProject = index;
  //   //     }
  //   //   });
  //   // }
  //   // if(expense.user){
  //   //   optResponsibles.map((optRes, index:number) => {
  //   //     if(optRes.value === expense.user._id){
  //   //       setResponsible(optResponsibles[index].value);
  //   //       indexResponsible = index;
  //   //     }
  //   //   });
  //   // }
  //   // setViewCC(<>
  //   //             <div className=" col-span-1 sm:col-span-2">
  //   //               <Label htmlFor="costcenter"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Centro de costos</p></Label>
  //   //               <SelectReact index={indexCC} opts={optCostCenter} setValue={setCostCenter} />
  //   //             </div>

  //   //             {/* <div>
  //   //               <Label htmlFor="typeExpense"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de gasto</p></Label>
  //   //               <SelectReact index={0} opts={optTypes} setValue={setTypeExpense} />
  //   //             </div> */}
                
  //   //             <div>
  //   //               <Label htmlFor="typeCFDI"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo de CFDI</p></Label>
  //   //               <SelectReact index={indexCFDI} opts={optTypes} setValue={setTypeCFDI} />
  //   //             </div>
                
  //   //             <div>
  //   //               <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
  //   //               <SelectReact index={indexCategory} opts={optCategories} setValue={setCategory} />
  //   //             </div>
                
  //   //             {/* <div>
  //   //               <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
  //   //               <SelectReact index={indexProvider} opts={optProviders} setValue={setProvider} />
  //   //             </div> */}
                
  //   //             <div>
  //   //               <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
  //   //               <SelectReact index={indexProject} opts={optProjects} setValue={setProject} />
  //   //             </div>
                
  //   //             <div>
  //   //               <Label htmlFor="responsible"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Responsable</p></Label>
  //   //               <SelectReact index={indexResponsible} opts={optResponsibles} setValue={setResponsible} />
  //   //             </div>
  //   //           </>);
  //   //setCostCenter(optCostCenter[indexCC].value);

  //   // setSelectProviders(<div className="">
  //   //         <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
  //   //         <div className="flex gap-x-2 items-center">
  //   //           <SelectReact index={indexProvider} opts={optionsProviders} setValue={setProvider} />
  //   //           <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
  //   //             onClick={() => setShowProvider(true)} />
  //   //         </div>
  //   //       </div>)
  // }, []);

  const updateExpense = async () => {
    if(refRequest.current){
      refRequest.current = false;
      
      const costocenter = {
        category: costcenter,
        concept
      }
      const data = {
        costocenter, provider, user:responsible, typeCFDI, category, project
      }
      try {
        const res = await UpdateCost(token, id, data);
        if(typeof(res) !== 'string'){
          refRequest.current = true;
          showToastMessage('Costo actualizado satisfactoriamente!!!');
          updateCurrentExpense(res);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Ocurrio un error al actualizar costo!!');
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }
  
  const addProvider = (newProvider:Options) => {
    //optProviders.push(newProvider);
    console.log('optProviders => ', optProviders);
    setOptProviders((oldValues) => [...oldValues, newProvider])
    setProvider(newProvider.value);
    console.log('prov length => ', optProviders.length)
    //setIndexProv(optProviders.length -1);
    // setSelectProviders(<div className="">
    //         <Label htmlFor="provider"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proveedor</p></Label>
    //         <div className="flex gap-x-2 items-center">
    //           <SelectReact index={indexProv} opts={optionsProviders} setValue={setProvider} />
    //           <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
    //             onClick={() => setShowProvider(true)} />
    //         </div>
    //       </div>)
  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/costs/costs.svg" subtitle="Modifica los datos basicos de un gasto" 
        title="Modificar gasto"
      />
      <form>
        <div className="mt-4 w-full rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
          {viewCC}
          {selectProvider}
        </div>
        {isHistory? <></>: (
          <div className="flex justify-center mt-8 space-x-5">
            <Button type="button" onClick={updateExpense}>Guardar</Button>         
          </div>
        )}
      </form>
      {showProvider && !isHistory && <AddProvider token={token} setShowForm={setShowProvider} 
                            addProv={addProvider}  />}  
    </div>
  )
}