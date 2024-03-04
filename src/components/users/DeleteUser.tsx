"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
//import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeUser } from '@/app/api/routeUser';
import { User } from '@/interfaces/User';

export default function DeleteUser({token, user} : {token : string, user:User}){
  
  //const router = useRouter()

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
                if(res === 204) {
                  showToastMessage('Usuario eliminado exitosamente!');
                  setTimeout(() => {
                    // router.refresh();
                    // router.push('/users');
                    window.location.reload();
                  }, 500)
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
      <TrashIcon width={30} height={30} className="text-red-700 hover:text-red-500"
        onClick={() => deleteUser(user.id, user.name)}
      />
      {/* <button type="button" className='absolute right-9' onClick={() => {
        deleteUser(user.id, user.name)
        router.refresh()
        }}>
        <TrashIcon width={30} height={30} className="text-red-700 hover:text-red-500"/>
      </button> */}
    </>
  )
}