"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removePayment, getAllCostsPaymentByID } from '@/app/api/routePayments';
import { PaymentProvider } from '@/interfaces/Payments';

export interface PaymentInCosts {
  cost: string
  _id: string
  paymentelements: number
}

export default function RemovePaymentComponent({token, id, name, expenses, updateTable, user } : 
  {token : string, name:string, id:string, expenses: PaymentProvider[], 
    updateTable: Function, user: string}){
  
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

                const res = await getAllCostsPaymentByID(token, id);
                if(typeof(res)==='string'){
                  showToastMessageError('Error al consultar costos del pago!!!');
                }else{
                  const data = {
                    resdata: res,
                    condition: [{                        
                        glossary: "67318dacceaf47ece0d3aabb",
                        user                    
                    }]        
                  }
                  const res2 = await removePayment(id, token, data);
                  if(res2 === 204) {
                    showToastMessage(`${name} eliminado exitosamente!`);
                    updateTable(id);
                  } else {
                    showToastMessageError(`${name} no pudo ser eliminado..`);
                  }
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
      <TrashIcon className={`cursor-pointer w-6 h-6 text-red-500 hover:text-red-300`}  
        onClick={() => {
          deleteElement();
        }}
      />
    </>
  )
}