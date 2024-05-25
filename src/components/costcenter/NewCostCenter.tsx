'use client'
import HeaderForm from "../HeaderForm"
import Input from "../Input"
import Label from "../Label"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "../Button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {showToastMessage, showToastMessageError} from "../Alert"
import { useState, useEffect } from "react"
import AddConcept from "./AddConcept"
import { CreateCostCenter, UpdateCostCenter, 
  InsertCategoryInCostCenter, getCostCenter, DeleteCategoryInCostCenter } from "@/app/api/routeCostCenter"
import { CostCenter, CostCenterTable } from "@/interfaces/CostCenter"
//import DeleteElement from "../DeleteElement"
import DeleteConceptCC from "./DeleteConcept"

interface CategoryCostCenter {
  "name": string,
  "account": string
}

export default function NewCostCenter({showForm, token, costCenter}: 
                    {showForm:Function, token:string, costCenter:(CostCenterTable | string)}){

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const [concepts, setConcepts] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [indexDeleteConcept, setIndexDeleteConcept] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState(0);
  const [addConcepts, setAddConcepts] = useState<JSX.Element[]>([]);
  const [concetpsCostCenter, setConceptsCostCenter] = useState<JSX.Element[]>([]);

  const handleResize = () => {
    setHeightPage(document.body.offsetHeight);
  }
  
  useEffect (() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 70);

    if(typeof(costCenter)!=='string'){
      const getCostC = async () => {
        const res:CostCenter = await getCostCenter(token, costCenter.id);
        if(typeof(res)!== 'string'){
          let aux:JSX.Element[] = [];
          res.categorys.map((category, index:number) => {
            aux.push(
              <div className="p-2 flex space-x-2 items-center" key={index}>
              <DeleteConceptCC id={res._id+'/'+category._id} name={category.name} 
                  remove={DeleteCategoryInCostCenter} token={token}
                  DeleteElement={DeleteConceptCostC} indexConcept={index} />
              <p>{category.account}</p>
              <p>{category.name}</p>
            </div>
            );
          });
          setConceptsCostCenter(aux);
        }else{
          setConceptsCostCenter([<p key={0}>{res}</p>]);
        }
      }
      getCostC();
    }
  }, [])

  const pushConcept = (concept: string, account:string) => {
    setConcepts((oldConcepts) => [...oldConcepts, concept]);
    setAccounts((oldAccounts) => [...oldAccounts, account]);
  }
  
  const DeleteConcept = (index:number) => {
    setIndexDelete(index);
  }
  
  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  const DeleteConceptCostC= (indexConcept: number) => {
    setIndexDeleteConcept(indexConcept);
  }

  useEffect(() => {
    if((!bandDelete) || ((concepts.length === addConcepts.length))){
      setAddConcepts((oldArray) => [...oldArray, <AddConcept pushElement={pushConcept} 
        DeleteElement={DeleteConcept}  bandPlus={true} index={addConcepts.length} 
        key={addConcepts.length} updateCount={updateCount} />])
    }
    setBandDelete(false);
  }, [countFiles])

  useEffect(() => {
    if(indexDelete !== -1){
      if(addConcepts.length > 1){
        const arrConcepts = concepts;
        arrConcepts.splice(indexDelete, 1);
        setConcepts(arrConcepts);
        
        const arrAccounts = accounts;
        arrAccounts.splice(indexDelete, 1);
        setAccounts(arrAccounts);

        setBandDelete(true);
        
        const arrElements = addConcepts;
        arrElements.splice(indexDelete, 1);
        setAddConcepts(arrElements);
      }else{
        showToastMessageError("No puedes eliminar concepto si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  useEffect(() => {
    if(indexDeleteConcept !== -1){
      console.log('index del => ', indexDeleteConcept);
      console.log('leng => ', concetpsCostCenter.length);
      const arrConcepts = concetpsCostCenter;
      arrConcepts.splice(indexDeleteConcept, 1);
      console.log('res => ', arrConcepts.length);
      setConceptsCostCenter(arrConcepts);
      console.log(arrConcepts);
    }
  }, [indexDeleteConcept]);
  
  const formik = useFormik({
    initialValues: {
      category: (typeof(costCenter)!== 'string')? costCenter.category: '',
      code: (typeof(costCenter)!== 'string')? costCenter.code: '',
    }, 
    validationSchema: Yup.object({
      category: Yup.string()
                  .required('La categoria es obligatoria!!'),
      code: Yup.string()
                  .required('El codigo es obligatorio!!'),
    }),

    onSubmit: async valores => {
      try {
        const categorys: CategoryCostCenter[] = []; 
        concepts.map((concept, index:number) => {
          categorys.push({
            account: accounts[index],
            name: concept
          })
        });

        if(typeof(costCenter)==='string'){
          const {category, code} = valores;
          const data = {
            name: category,
            code,
            categorys
          }
          const res = await CreateCostCenter(token, data);
          if(res===201){
            showForm(false);
            showToastMessage('Centro de costos creado exitosamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        }else{
          const data = {
            categorys
          }
          const res = await UpdateCostCenter(token, costCenter.id, valores);
          if(res===200){
            const resInsert = await InsertCategoryInCostCenter(token, costCenter.id, data);
            if(resInsert===200){
              showForm(false);
              showToastMessage('Centro de costos actualizado exitosamente!!!');
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }else{
              showToastMessageError(res + 'insert cost');
            }
          }else{
            showToastMessageError(res + 'update cost');
          }
        }
      } catch (error) {
        showToastMessageError('Error al crear Centro de costos!!');
      }
    }
  });

  return(
    <>
      <form className="z-10 top-16 absolute bg-white space-y-5 p-3 right-0 h-screen"
        onSubmit={formik.handleSubmit}
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <HeaderForm img="/img/company.svg" subtitle="Ingresa nueva categoria y concepto" 
            title="Nuevo centro de costo"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <Input type="text" name="category" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.category}
            autoFocus
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.category}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="code"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Codigo</p></Label>
          <Input type="text" name="code" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.code}</p>
            </div>
          ) : null}
        </div>
        <div>
          {concetpsCostCenter.map((conceptCC) => (
            conceptCC
          ))}
        </div>
        <div>
          {/* <div className=" flex justify-around">
            <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
            <Label><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cuenta</p></Label>
          </div> */}
          <div className="mt-1">
            {addConcepts.map((concept) => (
              concept
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}