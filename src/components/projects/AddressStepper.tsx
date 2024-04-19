import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavProjectStepper from "./NavProjectStepper";
import SaveProject from "@/app/functions/SaveProject";
import { useNewProject } from "@/app/store/newProject";

export default function AddressStepper({token}: {token:string}){
  
  const {amount, category, client, code, company, date, description, 
    hasguaranteefund, haveAddress, title, type, user} = useNewProject();
  
  const [state, dispatch] = useRegFormContext();
  const [guarantee, setGuarantee] = useState<boolean>(hasguaranteefund);

  const {updateAddress} = useNewProject();

  //console.log('addres stepper = ', amount, category, client, code, company, date, description, title);

  let streetI = '';
  let communityI = '';
  let cpI = '';
  let municipyI = '';
  let stateI = '';
  let countryI = '';

  // if(state.address){
  //   streetI = state.address.street? state.address.street: '';
  //   communityI = state.address.community? state.address.community: '';
  //   cpI = state.address.cp? state.address.cp: '';
  //   municipyI = state.address.municipy? state.address.municipy: '';
  //   stateI = state.address.state? state.address.state: '';
  //   countryI = state.address.country? state.address.country: '';
  //   //setGuarantee(state.address.guarantee);
  // }

  const formik = useFormik({
    initialValues: {
      street: streetI,
      community: communityI,
      cp: cpI,
      municipy: municipyI,
      stateA: stateI,
      country: countryI,
    }, 
    validationSchema: Yup.object({
      // street: Yup.string()
      //             .required('La calle y numero son obligatorios!!'),
      // community: Yup.string()
      //             .required('El colonia es obligatoria'),
      // cp: Yup.string()
      //             .required('El codigo postal es obligatorio'),
      municipy: Yup.string()
                  .required('El municipio es obligatorio'),
      stateA: Yup.string()
                  .required('El estado es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      const {community, country, cp, municipy, stateA, street} = valores;
      // const data= {
      //   name, 
      //   description,
      //   key: keyProject,
      // }

      // dispatch({ type: 'SET_BASIC_DATA', data: data });
      // dispatch({type: 'INDEX_STEPPER', data: 1})
      //dispatch({ type: 'SET_ADDRESS_DATA', data: valores });
      updateAddress(community, country, cp, municipy, stateA, street);
      dispatch({type: 'INDEX_STEPPER', data: 3})
    },       
  });
  
  const onClickSave = async () => {
    const {community, country, cp, municipy, stateA, street} = formik.values;
    updateAddress(community, country, cp, municipy, stateA, street);
    
    const data = {
      amount, category, client, code, company, date, description, 
      hasguaranteefund, haveAddress, title, type, user,
      location: {
        community, country, cp, municipy, 
        state: stateA, 
        street
      }
    }
    console.log(JSON.stringify(data));
    try {
      const res = await SaveProject(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un problema al crear proyecto!!');
    }
    // if(state.databasic){
    //   if(state.extradata){
    //     let amount, dateExtra, category, type, client, company;

    //     amount = state.extradata.amount;
    //     dateExtra = state.extradata.date;
    //     category = state.extradata.category;
    //     type = state.extradata.type;
    //     client = state.extradata.client;
    //     company = state.extradata.company;

    //     let percentage, dateGuarantee;

    //     if(state.guarantee){
    //       percentage = state.guarantee.percentage;
    //       dateGuarantee = state.guarantee.date;
    //     }

    //     const {community, country, cp, municipy, stateA, street} = formik.values;
    //     let title, description, code;
    //     title = state.databasic.title;
    //     description = state.databasic.description;
    //     code = state.databasic.code;  
    //     const data= {
    //       amount: parseFloat(amount),
    //       date: dateExtra,
    //       category,
    //       type,
    //       client,
    //       user,
    //       title,
    //       description,
    //       code,
    //       company,
    //       location: {
    //         street,
    //         community,
    //         cp,
    //         municipy,
    //         state : stateA,
    //         country
    //       },
    //       guaranteefund: {
    //         porcentage: percentage,
    //         date: dateGuarantee,
    //       }
    //       // condition: [
    //       //   {glossary:"661964a1ca3bfa35200c1628", user}
    //       // ],
    //     }
    //     const res = await SaveProject(data, token);
    //     if(res.status){
    //       showToastMessage(res.message);
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 500);
    //     }else{
    //       showToastMessageError(res.message);
    //     }
    //   }else{
    //     showToastMessageError('No hay informacion extra!!')
    //   }
    // }else{
    //   showToastMessageError('No hay informacion basica!!'); 
    // }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavProjectStepper index={2} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <Label htmlFor="street"><p className="">Calle y numero</p></Label>
        <Input type="text" name="street" autoFocus 
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.street && formik.errors.street ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.street}</p>
          </div>
        ) : null}
        <Label htmlFor="community"><p className="">Comunidad</p></Label>
        <Input type="text" name="community" 
          value={formik.values.community}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.community && formik.errors.community ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.community}</p>
            </div>
        ) : null}
        <Label htmlFor="cp"><p className="">Codigo Postal</p></Label>
        <Input type="text" name="cp" 
          value={formik.values.cp}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.cp && formik.errors.cp ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.cp}</p>
          </div>
        ) : null}
        <Label htmlFor="municipy"><p className="">Municipio</p></Label>
        <Input type="text" name="municipy" 
          value={formik.values.municipy}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.municipy && formik.errors.municipy ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.municipy}</p>
          </div>
        ) : null}
        <Label htmlFor="stateA"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
        <Input type="text" name="stateA" 
          value={formik.values.stateA}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.stateA && formik.errors.stateA ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.stateA}</p>
          </div>
        ) : null}
        <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
        <Input type="text" name="country" 
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.country && formik.errors.country ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.country}</p>
          </div>
        ) : null}
        <div className="flex justify-end mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          {guarantee && (
                  <button type="submit"
                    className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 
                      border-slate-900 rounded-xl hover:bg-slate-200"
                  >
                    Siguiente
                  </button>
          )}
        </div>
      </form>  
    </div>
  )
}