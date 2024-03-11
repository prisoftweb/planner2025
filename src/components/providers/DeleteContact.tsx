"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TableProvider } from '@/interfaces/Providers';
import { removeContactProvider } from '@/app/api/routeContacts';
import { Contact } from '@/interfaces/Contacts';

export default function DeleteContact({token, contact, idProv} : 
                    {token : string, contact:Contact, idProv:string}){
  const router = useRouter()

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
                res = await removeContactProvider(idp, id, token);
                if(res === 204) {
                  showToastMessage('Contacto eliminado exitosamente!');
                  setTimeout(() => {
                    window.location.reload();
                  }, 500)
                } else {
                  //showToastMessageError('El contacto no pudo ser eliminado..');
                  showToastMessageError(res.toString());
                  //router.refresh()
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
        onClick={() => deleteContact(idProv, contact._id || '', contact.name)}
      />
    </>
  )
}