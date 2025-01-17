import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useEffect, useRef } from "react";
import { showToastMessageError } from "../Alert";
import { createNewProvider } from "@/app/api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { Options } from "@/interfaces/Common";
import { useOutsideClick } from "@/app/functions/useOutsideClick";

export default function AddProvider({token, setShowForm, addProv}: 
          {token:string, setShowForm:Function, addProv:Function}){
  
  //const [suppliercredit, setSuppliercredit] = useState<boolean>(false);
  const [heightPage, setHeightPage] = useState<number>(900);
  const refRequest = useRef(true);

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

  const ref = useOutsideClick(() => {
    setShowForm(false);
  });

  const formik = useFormik({
    initialValues: {
      tradename:'',
      name:'',
      rfc: '',
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
          //"suppliercredit": suppliercredit
        }
        try {
          const res:(Provider | string) = await createNewProvider(data, token);
          if(typeof(res)==='string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            const option: Options = {
              label: res.name,
              value: res._id
            }
            const tradeOption: Options = {
              label: res.tradename || name,
              value: res._id
            }
            console.log('new provider => ', option);
            addProv(option, tradeOption);
            setShowForm(false);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un error al crear proveedor!!');
        }
      }else{
        showToastMessageError('Ya hay una peticion en proceso..!!!');
      }
    },       
  });

  return(
    <div className="w-full z-50 sm:max-w-lg absolute top-0 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}} 
      ref={ref}
    >
      <HeaderForm img="/img/provider.svg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
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
        <div>
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
        <div>
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
        {/* <div className="inline-flex items-center">
          <Label>Linea de credito</Label>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={suppliercredit} 
              onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
              onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="switch-3"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div> */}
        <div className="flex justify-center mt-8 space-x-5">
          <button type="button"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
            onClick={() => setShowForm(false)}
          >
            Cancelar
          </button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}