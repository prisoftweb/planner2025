import { ClientBack } from "@/interfaces/Clients";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Label from "../Label";
import Input from "../Input";
import { useState, useRef } from "react";
import { optionsSource } from "@/interfaces/Clients";
import { Options } from "@/interfaces/Common";
import Select from 'react-select';
import InputMask from 'react-input-mask';
import Button from "../Button";
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import { updateClient } from "@/app/api/routeClients";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function DataBasic({client, tags, id, token}: 
                          {client:ClientBack, tags:Options[], id:string, token:string}){
  const refRequest = useRef(true);
  const formik = useFormik({
    initialValues: {
      tradename:client.tradename,
      name:client.name,
      rfc: client.rfc,
      email: client.email? client.email: '',
    }, 
    validationSchema: Yup.object({
      tradename: Yup.string()
                  .required('El nombre comercial no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
      email: Yup.string(),
    }),
    onSubmit: async (valores) => {            
      if(refRequest.current){
        refRequest.current = false;
        const {name, tradename, rfc, email} = valores;
      
        let tagsSelected: any = [];
        if(updateTags){
          optsTags.map((optTag) => {
            //tagsSelected.push(optTag.value);
            tagsSelected.push(optTag.label);
          })
        }else{
          tagsSelected='';
        }
        
        const data: any = {
          name,
          rfc,
          tradename,
          phone,
          source,
          tags:tagsSelected,
          email,
          regime: regime,
        }

        const newObj = Object.fromEntries(Object.entries(data).filter(value => value[1]))
        try {
          const res = await updateClient(client._id, token, newObj);
          if(res === 200){
            refRequest.current = true;
            showToastMessage('Cliente actualizado exitosamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al actualizar informacion basica del cliente!!');
        }
      }
    },
  });

  const [phone, setPhone] = useState<string>(client.phone? client.phone: '');
  const [regime, setRegime] = useState<string>(client.regime);
  const [source, setSource] = useState<string>(optionsSource[0].value);
  const [optsSource, setOptsSource] = useState(optionsSource[0]);
  const [optsTags, setOptstags] = useState([tags[0]]);
  const [updateTags, setUpdateTags] = useState<boolean>(false);

  return(
    <>
      <form id="basicdata" onSubmit={formik.handleSubmit} className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
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
          <div className="col-span-2">
            <Label htmlFor="tradename"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
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
          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Origen</p></Label>
            <Select
              className='w-full' 
              options={optionsSource}
              maxMenuHeight={200}
              value={optsSource}
              onChange={(value:any) => {setSource(value.value); setOptsSource(value)}}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
          </div>
          <div>
          <Label htmlFor="phone"><p>Telefono</p></Label>
            <div className="flex items-center mt-2 flex-wrap gap-y-1">
              <div className="w-full flex  justify-start items-center relative">
                <InputMask mask='9999999999'
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                  type="phone"
                  placeholder="444 429 7227"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <DevicePhoneMobileIcon className="h-6 w-6 text-amber-400 hover:text-amber-500 absolute ml-1" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="regime"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Persona</p></Label>
            <div className="inline-flex rounded-md shadow-sm mx-2">
              <button type="button" className={`px-3 py-1 text-sm border border-green-400 rounded-md 
                        ${regime==='Fisica'? 'bg-green-500 text-white': ''}`}
                onClick={() => setRegime('Fisica')}
              >
                Fisico
              </button>
              <button type="button" className={`px-3 py-1 text-sm border border-red-400 rounded-md 
                        ${regime==='Moral'? 'bg-red-500 text-white': ''}`}
                onClick={() => setRegime('Moral')}
              >
                Moral
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Etiquetas</p></Label>
            <Select
              className='w-full'
              isMulti 
              options={tags}
              maxMenuHeight={200}
              value={optsTags}
              onChange={(value:any) => { setOptstags(value); setUpdateTags(true);}}
            />
          </div>

        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          {/* <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button> */}
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  )
}