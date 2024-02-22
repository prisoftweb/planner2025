"use client"

import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeUser } from '@/app/api/routeUser';

export default function ButtonDeleteUser({token, user} : {token : string, user:any}){
  const router = useRouter()

  const deleteUser = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Usuario?',
      message: `Desea eliminar ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await removeUser(id, token);
                console.log(res);
                if(res === 204) {
                  showToastMessage('Usuario eliminado exitosamente!');
                  setTimeout(() => {
                    router.refresh();
                    router.push('/users');
                  }, 2000)
                } else {
                  showToastMessageError('El usuario no pudo ser eliminado..');
                  //router.refresh()
                }
              } catch (error) {
                console.log('Error al eliminar usuario');
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
        onClick={() => deleteUser(user._id, user.name)}>
          ELIMINAR USUARIO
      </button>
    </>
  )
}