//import { useRegFormContext } from "./StepperProjectProvider";
import HeaderForm from "@/components/HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
//import ContainerProjectStepper from "./ContainerProjectStepper";
import { showToastMessageInfo, showToastMessageWarning } from "@/components/Alert";
import {confirmAlert} from 'react-confirm-alert';
import { Options } from "@/interfaces/Common";
import { useState, useEffect } from "react";
import { ProjectMin } from "@/interfaces/Projects";
import SelectBudgetProject from "./SelectBudgetProject";
import NavBudgetStepper from "./NavBudgetStepper";
import { useNewBudget } from "@/app/store/budgetProject";
import AddCostCenter from "./AddCostCenter";
import { CostoCenterLV } from "@/interfaces/CostCenter";

export default function NewBudgetProject({token, showForm, optClients, 
                              optCategories, optTypes, user, optCompanies, condition, 
                              projects, costoCentersLV}: 
                            {token:string, showForm:Function, optClients:Options[], 
                              optCategories:Options[], optTypes:Options[], user:string,
                              optCompanies: Options[], condition: string, projects: ProjectMin[],
                              costoCentersLV: CostoCenterLV[] }){
  //const [state] = useRegFormContext();

  const [heightPage, setHeightPage] = useState<number>(900);

  const {indexStepper, updateIndexStepper} = useNewBudget();
  
  const handleResize = () => {
    //setHeightPage(window.outerHeight);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    //setHeightPage(document.body.offsetHeight - 110);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
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

  const component = 
    indexStepper === 0? <SelectBudgetProject projects={projects} token={token} />: 
    indexStepper === 1? <AddCostCenter costoCentersLV={costoCentersLV} token={token} 
                            user={user} closeForm={showForm} />:
      <></>;

  return(
    <div className="z-10 w-full sm:max-w-4xl absolute top-16 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full">
        <div className="flex justify-between">
          <HeaderForm img="/img/projects.jpg" subtitle="Selecciona el centro de costos y el monto del presupuesto" 
            title="Nuevo presupuesto"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={closeForm} />
        </div>
        <NavBudgetStepper />
        {component}
        {/* <ContainerProjectStepper token={token} optClients={optClients} 
            optCategories={optCategories} optTypes={optTypes} showForm={showForm}
            user={user} optCompanies={optCompanies} condition={condition} /> */}
      </div>
    </div>
  )
}