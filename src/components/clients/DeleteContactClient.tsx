"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeContactClient } from '@/app/api/routeClients';
import { Contact } from '@/interfaces/Contacts';

export default function DeleteContactClient({token, contact, idCli} : {token : string, contact:Contact, idCli:string}){
  
  const deleteContact = async (idp:string, id:string, name:string)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar contacto?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await removeContactClient(idCli, id, token);
                if(res === 204) {
                  showToastMessage('Contacto eliminado exitosamente!');
                  setTimeout(() => {
                    window.location.reload();
                  }, 500)
                } else {
                  showToastMessageError(res.toString());
                }
              } catch (error) {
                console.log(error);
                console.log('Error al eliminar contacto');
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
      <TrashIcon width={20} height={20} className="text-red-700 hover:text-red-500 cursor-pointer"
        onClick={() => deleteContact(idCli, contact._id || '', contact.name)}
      />
    </>
  )
}