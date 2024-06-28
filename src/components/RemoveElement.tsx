"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function RemoveElement({token, id, name, remove, removeElement} : 
                                {token : string, name:string, id:string, 
                                  remove:Function, removeElement: Function}){
  
  const deleteElement = async ()  => {
  
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
                res = await remove(id, token);
                if(res === 204) {
                  showToastMessage(`${name} eliminado exitosamente!`);
                  removeElement(id);
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
      {/* <TrashIcon width={20} height={20} className="text-red-500 hover:text-red-300 cursor-pointer" */}
      <TrashIcon className="text-red-500 hover:text-red-300 cursor-pointer w-6 h-6"  
        onClick={() => {
          deleteElement();
        }}
      />
    </>
  )
}