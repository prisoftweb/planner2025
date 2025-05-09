"use client"

import { XCircleIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function DeleteConcept({token, id, name, remove, 
                                    DeleteElement, indexConcept} : 
                                {token : string, name:string, id:string, 
                                  remove:Function, DeleteElement:Function, 
                                  indexConcept:number }){
  
  const deleteConcept = async ()  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await remove(token, id);
                if(res === 204) {
                  showToastMessage(`${name} eliminado exitosamente!`);
                  DeleteElement(indexConcept);
                  // setTimeout(() => {
                  //   window.location.reload();
                  // }, 500)
                } else {
                  showToastMessageError(`${name} no pudo ser eliminado..`);
                }
              } catch (error) {
                console.log('Error al eliminar');
              }
            break;
          }
        }           
      },
      {
        label: 'No',
        onClick: () => {
          showToastMessageInfo('Se ha cancelado la eliminacion!');            
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
  }
  
    return(
    <>
      <XCircleIcon width={16} height={16} className="text-red-500 hover:text-red-300 cursor-pointer"
        onClick={() => {
          deleteConcept();
        }}
      />
    </>
  )
}