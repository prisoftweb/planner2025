"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removePayment } from '@/app/api/routePayments';
import { PaymentProvider } from '@/interfaces/Payments';

export interface PaymentInCosts {
  cost: string
  _id: string
  paymentelements: number
}

export default function RemovePaymentComponent({token, id, name, expenses, updateTable } : 
    {token : string, name:string, id:string, expenses: PaymentProvider[], 
      updateTable: Function}){
  
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
                const exp = expenses.find((e) => e._id=== id);
                if(exp){
                  const data: PaymentInCosts[] = []
                  exp.quantity.map((e) => {
                    console.log('exp quantity => ', e);
                    data.push({
                      _id: '',
                      cost: e,
                      paymentelements: 1
                    })
                  });
                  console.log('data remove => ', data);
                  res = await removePayment(id, token, data);
                  if(res === 204) {
                    showToastMessage(`${name} eliminado exitosamente!`);
                    updateTable(id);
                    // removeElement(id);
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 500)
                  } else {
                    console.log('res rem elem => ', res);
                    showToastMessageError(`${name} no pudo ser eliminado..`);
                  }
                }else{
                  showToastMessageError('No se pudieron encontrar los costos del pago!!!');
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
      {/* <TrashIcon width={20} height={20} className="text-red-500 hover:text-red-300 cursor-pointer" */}
      <TrashIcon className={`cursor-pointer w-6 h-6 text-red-500 hover:text-red-300`}  
        onClick={() => {
          deleteElement();
        }}
      />
    </>
  )
}