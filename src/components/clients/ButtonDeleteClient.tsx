"use client"

import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeClient } from '@/app/api/routeClients';
import { ClientBack } from '@/interfaces/Clients';

export default function ButtonDeleteClient({token, client} : {token : string, client:ClientBack}){
  const router = useRouter()

  const deleteClient = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Cliente?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await removeClient(id, token);
                if(res === 204) {
                  showToastMessage('Cliente eliminado exitosamente!');
                  setTimeout(() => {
                    router.refresh();
                    router.push('/clients');
                  }, 2000)
                } else {
                  showToastMessageError('El cliente no pudo ser eliminado..');
                }
              } catch (error) {
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
      <button type="button" 
        className='bg-red-600 rounded-full text-white w-full py-2 hover:bg-red-400'
        onClick={() => deleteClient(client._id, client.name)}>
          ELIMINAR CLIENTE
      </button>
    </>
  )
}