import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef } from "react";
import { useRegFormContext } from "./StepperClientProvider";
import SaveClient from "@/app/functions/SaveClient";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavClientsStepper from "./NavClientsStepper";
import { Options } from '@/interfaces/Common'
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { optionsSource } from "@/interfaces/Clients";
import { SaveClientLogo } from "@/app/functions/SaveClient";

export default function DataBasicStepper({token, id, tags}: 
                          {token:string, id:string, tags:Options[]}){
  
  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);

  let tradenameI = '';
  let nameI = '';
  let rfcI = '';
  //let supplier = false;
  let emailI= '';

  if(state.databasic){
    tradenameI = state.databasic.tradename;
    nameI = state.databasic.name;
    rfcI = state.databasic.rfc;
    emailI = state.databasic.email? state.databasic.email : '';
    //supplier = state.databasic.suppliercredit;
  }

  //const [suppliercredit, setSuppliercredit] = useState<boolean>(supplier);

  const formik = useFormik({
    initialValues: {
      tradename:tradenameI,
      name:nameI,
      rfc: rfcI,
      email: emailI,
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
      const {name, tradename, rfc, email} = valores;
      
      let tagsSelected: string[] = [];
        optsTags.map((optTag) => {
          //tagsSelected.push(optTag.value);
          tagsSelected.push(optTag.label);
      })
      
      const data: any = {
        name,
        rfc,
        tradename,
        phone: phone? parseInt(phone): '',
        source,
        tags:tagsSelected,
        user: id,
        email,
        regime: regime,
      }

      //console.log('data basic', data);

      dispatch({ type: 'SET_BASIC_DATA', data: data });
      dispatch({type: 'INDEX_STEPPER', data: 1})
    },
  });
  
  const onClickSave = async () => {
    refRequest.current = false;
    if(state.extradata && state.extradata.photo){
      const data = new FormData();
      
      const {email, name, rfc, tradename} = formik.values;
      
      data.append('name', name);
      data.append('tradename', tradename);
      if(email && email!==''){
        data.append('email', email);
      }
      data.append('rfc', rfc);
      data.append('source', source);
      //data.append('tags', tags);
      let arrTags: string[]= [];
      optsTags.map((optTag) => {
        arrTags.push(optTag.label);
        //data.append('tags', optTag.label);
      })
      data.append('regime', regime);
      if(id && id!==''){
        data.append('user', id);
      }
      
      data.append('logo', state.extradata.photo);
      if(state.extradata.link){
        data.append('link', state.extradata.link);
      }
      
      let stret='', cp='', municipy='', country='', stateS='', community='';
      if(state.address){
        stret = state.address.stret? state.address.stret: '';
        cp = state.address.cp? state.address.cp: '';
        municipy = state.address.municipy? state.address.municipy: '';
        country = state.address.country? state.address.country: '';
        community = state.address.community? state.address.community: '';
        stateS = state.address.stateS? state.address.stateS: '';
      }

      const location = {
        community,
        country,
        cp: cp,
        municipy,
        state: stateS,
        stret
      }

      try {
        const res = await SaveClientLogo(data, token, location, arrTags, 
                        state.contacts? state.contacts: [], 
                        phone!==''? parseInt(phone): '');
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear cliente!!');
      }
    }else{
      const {name, rfc, tradename, email} = formik.values;
    
      let contact = [];
      if(state.contacts){
        contact = state.contacts;
      }

      let tagsSelected: string[] = [];
      optsTags.map((optTag) => {
        //tagsSelected.push(optTag.value);
        tagsSelected.push(optTag.label);
      })

      if(name && rfc && tradename){
        
        let link='', photo='';
        if(state.extradata){
          link = state.extradata.link? state.extradata.link: '';
          photo = state.extradata.photo? state.extradata.photo: '';
        }

        let contact = [];
        if(state.contacts){
          contact = state.contacts;
        }

        let stret='', cp='', municipy='', country='', stateS='', community='';
        if(state.address){
          stret = state.address.stret? state.address.stret: '';
          cp = state.address.cp? state.address.cp: '';
          municipy = state.address.municipy? state.address.municipy: '';
          country = state.address.country? state.address.country: '';
          community = state.address.community? state.address.community: '';
          stateS = state.address.stateS? state.address.stateS: '';
        }

        const data= {
          name,
          rfc,
          tradename,
          phone: phone? parseInt(phone): '',
          source,
          tags:tagsSelected,
          user: id,
          email,
          regime,
          link,
          photo,
          location: {
            stret,
            cp,
            municipy, 
            country,
            community,
            state:stateS,
          },
          contact
        }

        const res = await SaveClient(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      }else{
        refRequest.current = true;
        showToastMessageError('Llene todos los campos obligatorios!!');
      }
    }
  }

  const [phone, setPhone] = useState<string>('');
  //const [typePhone, setTypePhone] = useState<string>(optionsPhone[0].value);
  //const [optionsType, setOptionsType] = useState(optionsPhone[0]);
  const [regime, setRegime] = useState<string>('Fisica');
  const [source, setSource] = useState<string>(optionsSource[0].value);
  const [optsSource, setOptsSource] = useState(optionsSource[0]);
  //const [tagsSelected, setTagsSelected] = useState<string[]>([tags[0].value]);
  const [optsTags, setOptstags] = useState([tags[0]]);


  return(
    <div className="w-full h-full">
      <div className="my-5">
        <NavClientsStepper index={0} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
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
                {/* <InputMask mask='(+52) 999 999 9999' */}
                <InputMask mask='9999999999'
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 pl-9 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                  type="phone" 
                  placeholder="(+52) 444 429 7227"
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
              onChange={(value:any) => { setOptstags(value)}}
            />
          </div>

        </div>
        
        <div className="flex justify-center mt-8 space-x-5">
          <Button 
            onClick={() => {
              if(refRequest.current){
                onClickSave();
              }
              else{
                showToastMessageError('Ya hay una peticion en proceso..!');
              }
            }} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </form>  
    </div>
  )
}