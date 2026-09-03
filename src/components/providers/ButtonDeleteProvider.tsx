"use client"

import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RemoveProvider } from '@/app/api/routeProviders';
import { Provider } from '@/interfaces/Providers';

export default function ButtonDeleteProvider({token, provider} : {token : string, provider:Provider}){
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
                    router.refresh();
                    router.push('/providers');
                  }, 2000)
                } else {
                  showToastMessageError('El proveedor no pudo ser eliminado..');
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
        onClick={() => deleteProvider(provider._id, provider.name)}>
          ELIMINAR PROVEEDOR
      </button>
    </>
  )
}