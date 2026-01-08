"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from '@/libs/animations';

export default function DeleteElement({token, id, name, remove, 
  colorIcon='text-red-500 hover:text-red-300'} : 
  {token : string, name:string, id:string, remove:Function, colorIcon?: string}){
  
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
                res = await remove(token, id);
                if(res === 204) {
                  showToastMessage(`${name} eliminado exitosamente!`);
                  setTimeout(() => {
                    window.location.reload();
                  }, 500)
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
      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Eliminar' 
          placement="right" className="text-black bg-white rounded-md border border-slate-400">
        <TrashIcon className={`${colorIcon} cursor-pointer w-6 h-6 hover:bg-blue-100`}  
          onClick={() => {
            deleteElement();
          }}
        />
      </Tooltip>
    </>
  )
}