"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from '@/libs/animations';

type Props = {
  token : string, 
  name:string, 
  id:string, 
  remove:Function, 
  removeElement: Function, 
  colorIcon?: string, 
  isCostcenterBudget?:boolean, 
  progreesAverage?: number, 
  totalAverage?: number
}

export default function RemoveElement({token, id, name, remove, removeElement, 
  colorIcon='text-red-500 hover:text-red-300', isCostcenterBudget=false, progreesAverage=0, 
  totalAverage=0} : Props){
  
  const deleteElement = async (progress: number, total: number)  => {
  
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
                res = await remove(id, token, progreesAverage, totalAverage);
                if(res === 204) {
                  showToastMessage(`${name} eliminado exitosamente!`);
                  removeElement(id);
                } else {
                  showToastMessageError(`${name} no pudo ser eliminado..`);
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
      <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Eliminar' 
          placement="right" className="text-black bg-white rounded-md border border-slate-400">
        <div className=''>
          <TrashIcon className={`cursor-pointer w-6 h-6 ${colorIcon} hover:bg-blue-100`}  
            onClick={() => {
              deleteElement(progreesAverage, totalAverage);
            }}
          />
        </div>
      </Tooltip>
    </>
  )
}