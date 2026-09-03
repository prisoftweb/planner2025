import { useRegFormContext } from "./StepperClientProvider";
import HeaderForm from "../HeaderForm";
import ContainerClientStepper from "./ContainerClientStepper";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";
import TooltipCloseIcon from "../tooltipIcons/TooltipCloseIcon";

type NewClientContainerProps = {
  token:string, 
  id:string, 
  showForm:Function, 
  tags:Options[],
  company:string
}

export default function NewClientContainer({token, id, showForm, tags, company}: NewClientContainerProps ){
  const [state] = useRegFormContext();

  const [heightPage, setHeightPage] = useState<number>(900);
 
  // console.log('new client container tags => ', tags);

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

  return(//top-16
    <div className={`z-10 w-full sm:max-w-2xl absolute bg-white px-2 py-2 sm:py-5 sm:px-7 right-0`}
      style={{height: `${heightPage}px`}} >
      <div className="flex justify-between p-2 rounded-md" style={{backgroundColor:'#F8FAFC', border:'0.5px solid #D3D3D3'}}>
        <HeaderForm img="/img/clientes.svg" subtitle="Ingresa nuevo cliente" 
          title="Nuevo cliente"
        />
        <TooltipCloseIcon handleClose={closeForm} />
      </div>
      <ContainerClientStepper token={token} id={id} tags={tags} company={company} />
    </div>
  )
}