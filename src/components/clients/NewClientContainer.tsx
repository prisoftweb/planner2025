import { useRegFormContext } from "./StepperClientProvider";
import HeaderForm from "../HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ContainerClientStepper from "./ContainerClientStepper";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";

export default function NewClientContainer({token, id, showForm, tags}: 
                            {token:string, id:string, showForm:Function, tags:Options[]}){
  const [state] = useRegFormContext();

  const [heightPage, setHeightPage] = useState<number>(900);
  
  const handleResize = () => {
    setHeightPage(window.outerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 110);
    //console.log('useefect');
    //console.log(heightPage, '   ', window.outerHeight );
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
    <div className={`z-50 w-full sm:max-w-2xl absolute top-16 bg-white p-3 right-0`}
      style={{height: `${heightPage}px`}} >
      <div className="flex justify-between">
        <HeaderForm img="/img/clientes.svg" subtitle="Ingresa nuevo cliente" 
          title="Nuevo cliente"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={closeForm} />
      </div>
      <ContainerClientStepper token={token} id={id} tags={tags} />
    </div>
  )
}