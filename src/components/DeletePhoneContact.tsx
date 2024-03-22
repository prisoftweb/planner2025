"use client"

import { XCircleIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Phone } from '@/interfaces/Contacts';
import { removePhoneContact } from '@/app/api/routeContacts';

export default function DeletePhoneContact({token, phone, idC, numContacts} : 
                                {token : string, phone:Phone, idC:string, numContacts:number}){
  
  const deletePhone = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Telefono?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await removePhoneContact(token, id, idC);
                if(res === 204) {
                  showToastMessage('Telefono eliminado exitosamente!');
                  setTimeout(() => {
                    // router.refresh();
                    // router.push('/users');
                    window.location.reload();
                  }, 500)
                } else {
                  showToastMessageError('El telefono no pudo ser eliminado..');
                  //router.refresh()
                }
              } catch (error) {
                console.log('Error al eliminar telefono');
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
          if(numContacts > 1){
            deletePhone(phone._id || '', phone.phone)
          }else{
            showToastMessageError('No puedes eliminar el telefono si no hay mas telefonos!!');
          }
        }}
      />
    </>
  )
}