import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import PhoneContact from "./PhoneContact";
import { useState, useEffect } from "react";
import { useRegFormContext } from "./StepperProvider";
import { useRouter } from "next/navigation";
import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
//import { Contact, PhoneNumber } from "@/interfaces/Common";
import { Contact } from "@/interfaces/Contacts";
import FormContact from "./FormContact";
import BasicBarStepper from "./BasicBarStepper";
import { createContact } from "@/app/api/routeContacts";

export default function ContactsStepper({id, token}: {id:string, token:string}){
  
  const [state,] = useRegFormContext();
  //const router = useRouter();
  const [contacts, setContacts] = useState<string[]>([]);
  
  const onClickSave = async () => {
    //const {emailCompany, emailContact, nameContact} = formik.values;
    console.log(contacts);
    const {name, rfc, suppliercredit, tradename} = state.databasic;
    let tradeline = {};

    if(state.creditLine){
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = state.creditline;
      tradeline = {
        creditdays,
        creditlimit,
        currentbalance,
        percentoverduedebt
      }
    }
    
    try {
      if(name && rfc && tradename){
        
        //let idContacts:string[] = [];
        
        // contacts.map( async (contact) => {
        //   const idc = await createContact(token, contact);
        //   if(typeof(idc)==='string'){
        //     showToastMessageError(idc);
        //   }else{
        //     console.log('contacto creado');
        //     console.log(idc);
        //     idContacts.push(idc._id);
        //   }
        // })

        const data = {
          name,
          rfc,
          tradename,
          suppliercredit,
          tradeline,
          //contacts: idContacts,
          contact: contacts,
          user: id,
        }

        const res = await SaveProvider(data, token);
        if(res.status){
          showToastMessage(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res.message);
        }
      }else{
        showToastMessageError('Nombre y RFC son obligatorios');
      }
    } catch (error) {
      showToastMessageError('Error al crear proveedor!!');
    }
  }

  const newContact = (newContact:string) => {
    setContacts((oldContacts) => [...oldContacts, newContact])
  }
  // const [view, setView] = useState<JSX.Element>(
  //         <FormContact addNewContact={newContact} token={token} />)

  const updateContact = () => {}

  return(
    <>
      <div className="w-full">
        {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Agrega 1 o mas contactos" 
          title="Contacto nuevo"
        /> */}
        <div className="mx-5">
          <BasicBarStepper index={2} />
        </div>
        <button type="button" 
          onClick={onClickSave}
          className="border w-40 h-10 bg-black text-white border-slate-900 rounded-full 
              hover:bg-slate-600"
        >
          Guardar
        </button>
        <FormContact addNewContact={newContact} token={token} contact={''} updateContact={updateContact} />
        {/* {view} */}
      </div>
    </>
  )
}