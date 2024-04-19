import { useRegFormContext } from "./StepperProjectProvider";
import HeaderForm from "../HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ContainerProjectStepper from "./ContainerProjectStepper";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";

export default function NewProjectContainer({token, showForm, optClients, 
                              optCategories, optTypes, user, optCompanies}: 
                            {token:string, showForm:Function, optClients:Options[], 
                              optCategories:Options[], optTypes:Options[], user:string,
                              optCompanies: Options[] }){
  const [state] = useRegFormContext();

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
    <div className="z-50 w-full sm:max-w-2xl absolute top-16 bg-white p-3 right-0 h-screen">
      <div className="flex justify-between">
        <HeaderForm img="/img/projects.jpg" subtitle="Ingresa datos del nuevo proyecto" 
          title="Nuevo proyecto"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={closeForm} />
      </div>
      <ContainerProjectStepper token={token} optClients={optClients} 
          optCategories={optCategories} optTypes={optTypes} 
          user={user} optCompanies={optCompanies} />
    </div>
  )
}