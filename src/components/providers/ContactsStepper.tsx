import { useState, useRef } from "react";
import { useRegFormContext } from "./StepperProvider";
import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import FormContact from "./FormContact";
import BasicBarStepper from "./BasicBarStepper";

export default function ContactsStepper({id, token}: {id:string, token:string}){
  
  const [state, dispatch] = useRegFormContext();
  const [contacts, setContacts] = useState<string[]>([]);
  const refRequest = useRef(true);
  
  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const {name, rfc, suppliercredit, tradename} = state.databasic;
      let tradeline = {};

      if(suppliercredit){
        const {creditdays, creditlimit, currentbalance, percentoverduedebt} = state.creditline;
        tradeline = {
          creditdays: parseInt(creditdays),
          creditlimit: parseInt(creditlimit),
          currentbalance: parseInt(currentbalance),
          percentoverduedebt: parseInt(percentoverduedebt)
        }
      }
      
      try {
        if(name && rfc && tradename){
          
          const data: any = {
            name,
            rfc,
            tradename,
            suppliercredit,
            tradeline,
            contact: contacts,
            user: id,
          }

          const res = await SaveProvider(data, token);
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
          showToastMessageError('Nombre y RFC son obligatorios');
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear proveedor!!');
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso..!!!');
    }
  }

  const newContact = (newContact:string) => {
    setContacts((oldContacts) => [...oldContacts, newContact])
    if(state.contacts){
      dispatch({ type: 'SET_CONTACTS', data: [...state.contacts, newContact] });
    }else{
      dispatch({ type: 'SET_CONTACTS', data: [newContact] });
    }
  }
  
  const updateContact = () => {}

  return(
    <>
      <div className="w-full">
        <div className="mx-5">
          <BasicBarStepper index={2} />
        </div>
        {/* <button type="button" 
          onClick={onClickSave}
          className="border w-40 h-10 bg-black text-white border-slate-900 rounded-full 
              hover:bg-slate-600"
        >
          Guardar
        </button> */}
        <FormContact addNewContact={newContact} token={token} contact={''} 
            updateContact={updateContact} >
          <button type="button" 
            onClick={onClickSave}
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
           hover:bg-slate-200">
            Guardar
          </button>
        </FormContact>
      </div>
    </>
  )
}