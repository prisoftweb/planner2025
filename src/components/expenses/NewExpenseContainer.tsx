import HeaderForm from "../HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { showToastMessageWarning, showToastMessageInfo } from "../Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";
import { useNewExpense } from "@/app/store/newExpense";
import DataStepper from "./DataStepper";
import VoucherStepper from "./VoucherStepper";
import CFDIStepper from "./CFDIStepper";

export default function NewExpenseContainer({token, showForm, user, optCostCenter, 
                                optProviders, optResponsibles, optGlossaries, 
                                optProjects }: 
                            {token:string, showForm:Function, user:string, 
                              optCostCenter:Options[],
                              optProviders:Options[], optResponsibles:Options[],
                              optGlossaries:Options[], optProjects:Options[]
                            }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  
  const [stepform, setStepForm] = useState<JSX.Element>(
                          <DataStepper optCostCenter={optCostCenter} 
                            optProviders={optProviders} optResponsibles={optResponsibles}
                            token={token} user={user} optGlossaries={optGlossaries} 
                            optProjects={optProjects}  />)

  const {indexStepper} = useNewExpense();

  const handleResize = () => {
    setHeightPage(window.outerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(document.body.offsetHeight - 110);
    //console.log('useefect');
    //console.log(heightPage, '   ', window.outerHeight );
  }, []);

  const closeForm = () => {
    
    showForm(false);
    // confirmAlert({
    //   title: 'Confirmacion para cerrar formulario?',
    //   message: `Desea cerrar el formulario y perder los datos guardados?`,
    //   buttons: [
    //   {
    //     label: 'Si',
    //     onClick: () => {
    //       //let res = undefined;

    //       switch('user'){
    //         case 'user':
    //           showForm(false);
    //         break;
    //       }
    //     }           
    //   },
    //   {
    //     label: 'No',
    //     onClick: () => {
    //       showToastMessageInfo('Se ha cancelado el cierre!');            
    //     }
    //   }
    //   ],
    //   closeOnEscape: true,
    //   closeOnClickOutside: true,
    //   keyCodeForClose: [8, 32],
    //   willUnmount: () => {},
    //   //afterClose: () => {},
    //   onClickOutside: () => {
    //     showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
    //   },
    //   onkeyPress: () => {
    //     showToastMessageInfo('Favor de seleccionar SI o NO');
    //   },
    //   onKeypressEscape: () => {
    //     showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
    //   },
    //   overlayClassName: "overlay-custom-class-name"
    // });
  }

  try {
    useEffect(() => {
      try {
        if(indexStepper || indexStepper>=0){
          if(indexStepper===1){
            setStepForm(<VoucherStepper />)
          }else if(indexStepper===2){
            setStepForm(<CFDIStepper />)
            }else {
              setStepForm(<DataStepper optCostCenter={optCostCenter} 
                  optProviders={optProviders} optGlossaries={optGlossaries} 
                optResponsibles={optResponsibles}
                token={token} user={user} optProjects={optProjects} />)
            }
        }
      } catch (error) {
        setStepForm(<></>)
      }
    }, [indexStepper])
  } catch (error) {
    console.log(error);
  }

  return(
    <div className="z-50 w-full sm:max-w-lg absolute top-16 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full">
        <div className="flex justify-between">
          <HeaderForm img="/img/projects.jpg" subtitle="Ingresa los gastos del proyecto" 
            title="Nuevo gasto"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500 cursor-pointer" onClick={closeForm} />
        </div>
        {stepform}
      </div>
    </div>
  )
}