import Label from "../Label"
//import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import HeaderForm from "../HeaderForm";
import { UpdateProject } from "@/app/api/routeProjects";
import { OneProjectMin } from "@/interfaces/Projects";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ParseProjectToOneProjectMin } from "@/app/functions/SaveProject";

export default function ExtraData({token, optClients, optCategories, 
                          optTypes, id, project}:
                        {token:string, optClients:Options[], optCategories:Options[], 
                          optTypes:Options[], id:string,
                          project:OneProjectMin}){

  const [client, setClient] = useState<string>(project.client._id);
  const [type, setType] = useState<string>(optTypes[0].value);
  const [category, setCategory] = useState<string>(optCategories[0].value);
  //const [company, setCompany] = useState<string>(optCompanies[0].value);
  const [guarantee, setGuarantee] = useState<boolean>(project.hasguaranteefund);
  // const [haveAddress, setHaveAddress] = useState<boolean>(false);
  const refRequest = useRef(true);

  const {oneProjectStore, updateOneProjectStore} = useOneProjectsStore();

  let idCli = 0;
  const idC = oneProjectStore?.client._id || project.client._id
  optClients.map((optCli, index:number) => {
    if(optCli.value === idC ){
      idCli = index;
    }
  });

  let idType = 0;
  const idT = oneProjectStore?.type._id || project.type._id
  optTypes.map((optTy, index:number) => {
    if(optTy.value === idT ){
      idType = index;
    }
  });

  let idCategory = 0;
  const idCat = oneProjectStore?.category._id || project.category._id
  optCategories.map((optCat, index:number) => {
    if(optCat.value === idCat ){
      idCategory = index;
    }
  })

  const [startDate, setStartDate] = useState<string>(oneProjectStore?.date? 
                oneProjectStore?.date.substring(0,10) : 
                    project.date? project.date.substring(0,10): '');

  const formik = useFormik({
    initialValues: {
      amount: oneProjectStore?.amount || project.amount,
    }, 
    validationSchema: Yup.object({
      amount: Yup.string()
                  .required('El monto es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      if(refRequest.current){
        refRequest.current = false;
        const {amount} = valores;
        const data= {
          amount: amount.toString().replace(/[$,]/g, ""),
          date: startDate,
          //categorys: category,
          category,
          //types: type,
          glossary: type,
          client,
          hasguaranteefund: guarantee
        }
        try {
          const res = await UpdateProject(token, id, data);
          if(typeof(res)!=='string'){
            refRequest.current = true;
            console.log('res router => ', res);
            const r = ParseProjectToOneProjectMin(res);
            console.log('parse res => ', r);
            updateOneProjectStore(r);
            showToastMessage('Proyecto actualizado satisfactoriamente!!');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un problema al actualizar proyecto!!');
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    },       
  });
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <SelectReact opts={optCategories} setValue={setCategory} index={idCategory} />
        </div>
        <div>
          <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
          <SelectReact opts={optClients} setValue={setClient} index={idCli} />
        </div>        
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
          <CurrencyInput
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            //value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            //placeholder="Please enter a number"
            defaultValue={project.guaranteefund?.amount || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.amount=parseFloat(value || '0');
            } catch (error) {
              formik.values.amount=0;
            }}}
            // onValueChange={(value, name, values) => {console.log(value, name, values); formik.values.amount=value || ''}}
          />
          {formik.touched.amount && formik.errors.amount ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.amount}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <SelectReact opts={optTypes} setValue={setType} index={idType} />
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 outline-none" 
            //showIcon
            selected={new Date(startDate)} onChange={(date:Date) => {
                setStartDate(date.toDateString()) 
                console.log(date); console.log(date.toDateString())}} 
          />
        </div>
        <div className=" flex gap-x-3">
          <div>
            <Label htmlFor="guarantee"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fondo de garantia</p></Label>
            <div className="inline-flex rounded-md shadow-sm mx-2">
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${guarantee? 'bg-green-500 text-white': ''}`}
                onClick={() => setGuarantee(true)}
              >
                Si
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${!guarantee? 'bg-red-500 text-white': ''}`}
                onClick={() => setGuarantee(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  )
}