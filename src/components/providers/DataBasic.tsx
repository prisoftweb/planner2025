import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import LabelRed from "../LabelRed";
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { Provider } from "@/interfaces/Providers";
import { useState, useRef, useEffect } from "react";
import { updateProvider, insertConditionInProvider } from "@/app/api/routeProviders";
import { showToastMessage, showToastMessageError } from "../Alert";
// import CardContact from "./CardContact";
import { useOneProviderStore } from "@/app/store/providerStore";
import { getCatalogsByNameAndType, getCatalogsByNameAndCondition } from "@/app/api/routeCatalogs";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";

export default function DataBasic({id, token, provider, user}:{id:string, token:string, provider:Provider, user:string}){
  
  const refRequest = useRef(true);

  const {updateOneProviderStore, oneProviderStore} = useOneProviderStore();

  const [type, setType]=useState<Options>();
  const [optTypes, setOptTypes] = useState<Options[]>([]);

  const [category, setCategory]=useState<Options>();
  const [optCategories, setOptCategories] = useState<Options[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [res, resc] = await Promise.all([
        getCatalogsByNameAndType(token, 'Providers'),
        getCatalogsByNameAndCondition(token, 'Providers')
      ]) 
      
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setOptTypes(res);
        setType(res[0]);
      }

      if(typeof(resc)==='string'){
        showToastMessageError(resc);
      }else{
        setOptCategories(resc);
        setCategory(resc[0]);
      }
    }
    fetch();
  }, [])

  const [suppliercredit, setSuppliercredit] = useState<boolean>(oneProviderStore? oneProviderStore.suppliercredit : provider.suppliercredit);

  const formik = useFormik({
    initialValues: {
      tradename: oneProviderStore?.tradename || provider.tradename,
      name: oneProviderStore?.name || provider.name,
      rfc: oneProviderStore?.rfc || provider.rfc,
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
    }),
    onSubmit: async (valores) => {
      if(refRequest.current){
        refRequest.current = false;
        const {name, tradename, rfc} = valores;
        const data= {
          name, 
          tradename,
          rfc,
          suppliercredit: suppliercredit
        }

        try {
          const res = await updateProvider(id, token, data);
          if(typeof(res)!=='string'){
            refRequest.current = true;
            showToastMessage('La informacion del proveedor ha sido actualizada!!');
            updateOneProviderStore(res);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al actualizar informacion del proveedor!!');
        }
      }else{
        showToastMessageError('Ya hay una solitud en proceso!!');
      }
    },       
  });

  const handleSupplierCredit = async (value:boolean) => {
    setSuppliercredit(value);
    if(value){
      const data ={
        condition: [
          {                        
            glossary: "6746442a734d5ab78ab98ddd",
            user                    
          }
        ]    
      }
      const res = await insertConditionInProvider(id, token, data);
      if(typeof(res) !== 'string'){
        showToastMessage('El proveedor ahora tiene linea de credito!!');
      }else{
        showToastMessageError(res);
      }
    }
  }

  const handleType=(value:Options) => {
    setType(value);
  }

  const handleCategory=(value:Options) => {
    setCategory(value);
  }
  
  // let showContacts: JSX.Element[] =[];

  // if(provider.contact){
  //   provider.contact.map((contact) => {
  //     showContacts.push(<CardContact contact={contact} idProv={provider._id} token={token} />)
  //   })
  // }

  const indexType=optTypes.findIndex(t => t.value===provider?.type)
  const indexStatus= Array.isArray(provider.condition) && provider.condition.length>0 ? optCategories.findIndex(c => c.value===provider.condition[0].glossary): 0;

  return(
    <div className="w-full md:max-w-md bg-white rounded-lg shadow-md pl-2 px-3">
      <HeaderForm img="/img/provider.svg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      />
      {/* <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3">
        {showContacts}
      </div> */}
      <form onSubmit={formik.handleSubmit} className="mt-4 bg-white border border-gray-200 rounded-lg shadow p-4 space-y-5">
        <div className="">
          <LabelRed htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></LabelRed>
          <Input type="text" name="name" autoFocus 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
        </div>
        <div className="">
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
          <Input type="text" name="tradename" 
            value={formik.values.tradename}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.tradename && formik.errors.tradename ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.tradename}</p>
              </div>
          ) : null}
        </div>
        <div className="">
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
          <Input type="text" name="rfc" 
            value={formik.values.rfc}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.rfc && formik.errors.rfc ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.rfc}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label>Tipo</Label>
          {optTypes.length>0 && (
            <SelectReact index={indexType>=0? indexType: 0} opts={optTypes} setValue={handleType} />
          )}
        </div>
        <div>
          <Label>Estatus</Label>
          {optCategories.length>0 && (
            <SelectReact index={indexStatus>=0? indexStatus: 0} opts={optCategories} setValue={handleCategory} />
          )}
        </div>
        <div className="inline-flex items-center">
          <Label>Linea de credito</Label>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={suppliercredit} onClick={() => handleSupplierCredit(!suppliercredit)} id="switch-3" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 peer-checked:border-green-500 peer-checked:before:bg-green-500" />
            <label htmlFor="switch-3"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}