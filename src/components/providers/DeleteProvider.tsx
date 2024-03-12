"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RemoveProvider } from '@/app/api/routeProviders';
import { TableProvider } from '@/interfaces/Providers';

export default function DeleteProvider({token, provider} : {token : string, provider:TableProvider}){
  const router = useRouter()

  const deleteProvider = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Proveedor?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await RemoveProvider(id, token);
                if(res === 204) {
                  showToastMessage('Proveedor eliminado exitosamente!');
                  setTimeout(() => {
                    window.location.reload();
                  }, 500)
                } else {
                  showToastMessageError('El proveedor no pudo ser eliminado..');
                  //router.refresh()
                }
              } catch (error) {
                console.log(error);
                console.log('Error al eliminar proveedor');
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
      <TrashIcon width={21} height={21} className="text-red-700 hover:text-red-500"
        onClick={() => deleteProvider(provider.id, provider.name)}
      />
    </>
  )
}