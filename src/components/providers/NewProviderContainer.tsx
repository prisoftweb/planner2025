import { useRegFormContext } from "./StepperProvider";
import HeaderForm from "../HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ContainerStepper from "./ContainerStepper";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { useState, useEffect } from "react";

export default function NewProviderContainer({token, id, showForm}: {token:string, id:string, showForm:Function}){
  const [state] = useRegFormContext();

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(window.outerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 110);
    return () => window.removeEventListener('scroll', handleResize);
  }, []);
  
  const closeForm = () => {
    
    if(state.contacts){
      confirmAlert({
        title: 'Confirmacion para cerrar formulario?',
        message: `Desea cerrar el formulario y perder los datos guardados?`,
        buttons: [
        {
          label: 'Si',
          onClick: () => {
            //let res = undefined;
  
            switch('user'){
              case 'user':
                showForm(false);
              break;
            }
          }           
        },
        {
          label: 'No',
          onClick: () => {
            showToastMessageInfo('Se ha cancelado el cierre!');            
          }
        }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        //afterClose: () => {},
        onClickOutside: () => {
          showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
        },
        onkeyPress: () => {
          showToastMessageInfo('Favor de seleccionar SI o NO');
        },
        onKeypressEscape: () => {
          showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
        },
        overlayClassName: "overlay-custom-class-name"
      });
    }else{
      showForm(false);
    }
  }

  return(
    <div className="z-10 w-full sm:max-w-lg absolute top-16 bg-white p-3 right-0 h-screen"
      style={{height: `${heightPage}px`}}
    >
      <div className="flex justify-between">
        <HeaderForm img="/img/provider.svg" subtitle="Ingresa nuevo proveedor" 
          title="Nuevo proveedor"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500
          hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={closeForm} />
      </div>
      <ContainerStepper token={token} id={id} />
    </div>
  )
}