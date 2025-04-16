"use client"

import { XCircleIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TreeTable } from '@/interfaces/Roles';
import { RemoveResourceTree } from '@/app/api/routeRoles';

export default function DeleteResourceTree({token, resource, idTree} : 
  {token : string, resource:TreeTable, idTree:string}){
  
  const deleteResource = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Recurso?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await RemoveResourceTree(token, idTree, id);
                if(res === 204) {
                  showToastMessage('Recurso eliminado exitosamente!');
                  setTimeout(() => {
                    window.location.reload();
                  }, 500)
                } else {
                  showToastMessageError('El recurso no pudo ser eliminado..');
                  //router.refresh()
                }
              } catch (error) {
                console.log('Error al eliminar recurso');
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
      <XCircleIcon width={20} height={20} className="text-slate-500 hover:text-slate-300 cursor-pointer"
        onClick={() => {
          deleteResource(resource.id, resource.resource);
        }}
      />
    </>
  )
}