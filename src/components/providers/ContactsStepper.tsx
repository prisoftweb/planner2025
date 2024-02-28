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
  
  const [state, dispatch] = useRegFormContext();
  //const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  const saveContacts = async () => {
    let idContacts:string[] = [];
        
    contacts.map( async (contact) => {
      console.log('contacts map')
      console.log(JSON.stringify(contact));
      const idc = await createContact(token, contact);
      if(typeof(idc)==='string'){
        showToastMessageError(idc);
      }else{
        console.log('contacto creado');
        console.log(idc);
        idContacts.push(idc._id);
      }
    })

    return idContacts;
  }
  
  const onClickSave = async () => {
    //const {emailCompany, emailContact, nameContact} = formik.values;
    console.log(contacts);
    const {name, rfc, suppliercredit, tradename} = state.databasic;
    const {creditdays, creditlimit, currentbalance, percentoverduedebt} = state.creditline;
    
    try {
      if(name && rfc && tradename){
        
        let idContacts:string[] = [];
        
        contacts.map( async (contact) => {
          console.log('contacts map')
          console.log(JSON.stringify(contact));
          const idc = await createContact(token, contact);
          if(typeof(idc)==='string'){
            showToastMessageError(idc);
          }else{
            console.log('contacto creado');
            console.log(idc);
            idContacts.push(idc._id);
          }
        })

        setTimeout(async() => {
          // const idContacts = await saveContacts();
          // console.log('idcontacts =',idContacts)

          const data = {
            name,
            rfc,
            tradename,
            suppliercredit,
            tradeline: {
              creditdays,
              creditlimit,
              currentbalance,
              percentoverduedebt
            },
            contacts: idContacts,
            user: id,
          }

          console.log('sendd');
          console.log(JSON.stringify(data));
          const res = await SaveProvider(data, token);
          showToastMessage(res);
        }, 3000);
      }else{
        showToastMessageError('Nombre y RFC son obligatorios');
      }
    } catch (error) {
      showToastMessageError('Error al crear proveedor!!');
    }
  }

  const newContact = (newContact:Contact) => {
    // const {emailCompany, emailContact, nameContact} = formik.values;
    // if(!emailCompany && !emailContact && !nameContact){
    //   showToastMessageError('Debe llenar todos los campos antes de agregar un contacto nuevo!!');
    // }else{
    //   let phoneNumber: Phone[] = [];
      
    //   phones.map((phone:string, index:number) => {
    //     phoneNumber.push({
    //       phone,
    //       type: typesPhone[index],
    //     })
    //   })

      // const newContact:Contact ={
      //   email: emailContact,
      //   name: nameContact,
      //   emailcompany: emailCompany,
      //   phone: phoneNumber,
      // }

      setContacts((oldContacts) => [...oldContacts, newContact]);
    //}
  }
  const [view, setView] = useState<JSX.Element>(<FormContact addNewContact={newContact} />)
  // useEffect(() => {
  //   if(contacts.length > 1){
  //     setView(<></>);
  //     setTimeout(() => {
  //       setView(<FormContact addNewContact={newContact} />)  
  //     }, 1);
  //   }
  // }, [contacts.length])

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
        {view}
      </div>
    </>
  )
}