//import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useRef } from "react";
import { useRegFormContext } from "./StepperProjectProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import NavProjectStepper from "./NavProjectStepper";
import SaveProject from "@/app/functions/SaveProject";
import { useNewProject } from "@/app/store/newProject";
import { useProjectsStore } from "@/app/store/projectsStore";

export default function AddressStepper({token, condition, showForm}: 
  {token:string, condition: string, showForm:Function}){
  
  const {updateAddress, amount, code, community, country, cp, date, description, hasguaranteefund,
    municipy, stateA, street, title, category, client, type, haveAddress, 
    company, amountG, dateG, percentage, user, amountCharge, dateCharge, hasamountChargeOff, 
    percentageCharge} = useNewProject();
  // const {amount, category, client, code, company, date, description, 
  //   hasguaranteefund, haveAddress, title, type, user} = useNewProject();
  
  const [state, dispatch] = useRegFormContext();
  const [guarantee, setGuarantee] = useState<boolean>(hasguaranteefund);
  // const [haveAmountCharge, sethaveAmountCharge] = useState<boolean>(false);
  const refRequest = useRef(true);

  const {updateHaveNewProject} = useProjectsStore();

  //const {updateAddress} = useNewProject();
  
  //console.log('addres stepper = ', amount, category, client, code, company, date, description, title);

  // let streetI = '';
  // let communityI = '';
  // let cpI = '';
  // let municipyI = '';
  // let stateI = '';
  // let countryI = '';

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
      street: street,
      community: community,
      cp: cp,
      municipy: municipy,
      stateA: stateA,
      country: country,
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
      updateAddress(community, country, cp, municipy, stateA, street);
      if(guarantee){
        dispatch({type: 'INDEX_STEPPER', data: 3})
      }else{
        dispatch({type: 'INDEX_STEPPER', data: 4})
      }
    },       
  });
  
  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const {community, country, cp, municipy, stateA, street} = formik.values;
      updateAddress(community, country, cp, municipy, stateA, street);
      
      const location = {
        community, country, cp, municipy, 
        state: stateA, 
        stret: street
      }

      let data;
      const guaranteeData = {
        amount:amountG,
        date: dateG,
        porcentage:percentage
      };

      const amountChargeOff = {
        amount:amountCharge.replace(/[$,%,]/g, ""),
        date: dateCharge,
        porcentage:percentageCharge.replace(/[$,%,]/g, "")
      };

      if(haveAddress && hasguaranteefund && hasamountChargeOff){
        data = {
          amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
          hasguaranteefund, title, types:type, user,
          location, hasamountChargeOff, amountChargeOff,
          guaranteefund: guaranteeData, condition: [{glossary: condition, user}]
        }
      }else{
        if(haveAddress && hasguaranteefund){
          data = {
            amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
            hasguaranteefund, title, types:type, user, guaranteefund: guaranteeData,
            location, condition: [{glossary: condition, user}]
          }
        }else{
          if(haveAddress && hasamountChargeOff){
            data = {
              amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
              hasguaranteefund, hasamountChargeOff, title, types:type, user, amountChargeOff,
              location, condition: [{glossary: condition, user}]
            }
          }else{
            if(haveAddress){
              data = {
                amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
                hasguaranteefund, hasamountChargeOff, title, types:type, user,
                location, condition: [{glossary: condition, user}]
              }
            }else{
              if(hasguaranteefund && hasamountChargeOff){
                data = {
                  amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
                  hasguaranteefund, hasamountChargeOff, title, types:type, user, amountChargeOff,
                  guaranteefund: guaranteeData, condition: [{glossary: condition, user}]
                }
              }else{
                if(hasguaranteefund){
                  data = {
                    amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
                    hasguaranteefund, hasamountChargeOff, title, types:type, user,
                    location, condition: [{glossary: condition, user}], guaranteefund: guaranteeData
                  }
                }else{
                  if(hasamountChargeOff){
                    data = {
                      amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
                      hasguaranteefund, hasamountChargeOff, title, types:type, user,
                      location, condition: [{glossary: condition, user}], amountChargeOff
                    }
                  }else{
                    data = {
                      amount: amount.replace(/[$,]/g, ""), categorys:category, client, code, company, date, description, 
                      hasguaranteefund, title, types:type, user, condition: [{glossary: condition, user}],
                    }
                  }
                }
              }
            }
          }
        }
      }
      try {
        console.log('date => ', date);
        console.log('data new proyect => ', JSON.stringify(data));
        const res = await SaveProject(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          updateHaveNewProject(true);
          showForm(false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Ocurrio un problema al crear proyecto!!');
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }

  return(
    <div className="w-full">
      <div className="my-5">
        <NavProjectStepper index={2} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-xl rounded-lg space-y-5">
        <div>
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
        </div>
        <div>
          <Label htmlFor="community"><p className="">Colonia</p></Label>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          {guarantee || hasamountChargeOff && (
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