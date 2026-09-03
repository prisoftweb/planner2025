import { useRegFormContext } from "./StepperProjectProvider";
import HeaderForm from "../HeaderForm";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import ContainerProjectStepper from "./ContainerProjectStepper";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";
import TooltipCloseIcon from "../tooltipIcons/TooltipCloseIcon";

type Props = {
  token:string, 
  showForm:Function, 
  optClients:Options[], 
  optCategories:Options[], 
  optTypes:Options[], 
  user:string,
  optCompanies: Options[], 
  condition: string,
  company:string 
}

export default function NewProjectContainer({token, showForm, optClients, 
  optCategories, optTypes, user, optCompanies, condition, company}: Props){

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

  return(//top-16
    <div className="z-10 w-full max-w-xl absolute bg-white px-2 py-2 sm:py-5 sm:px-7 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full">
        <div className="flex justify-between p-2 rounded-md" style={{backgroundColor:'#F8FAFC', border:'0.5px solid #D3D3D3'}}>
          <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del nuevo proyecto" 
            title="Nuevo proyecto"
          />
          <TooltipCloseIcon handleClose={closeForm} />
        </div>
        <ContainerProjectStepper token={token} optClients={optClients} 
            optCategories={optCategories} optTypes={optTypes} showForm={showForm}
            user={user} optCompanies={optCompanies} condition={condition} company={company} />
      </div>
    </div>
  )
}