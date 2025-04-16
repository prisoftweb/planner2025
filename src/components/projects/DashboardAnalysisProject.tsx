import HeaderForm from "../HeaderForm"
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { useEffect, useState } from "react";
import { getDashboardProjectByBudgetControl, getProjectContractualControl } from "@/app/api/routeProjects";
import { ProjectByBudgetedControl, IContractualControlProject } from "@/interfaces/DashboardProjects";
import { ProgressBarComponent } from "./dashboard/ProgressBarComponent";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { showToastMessageError } from "../Alert";

export default function DashboardAnalysisProject({token, id}: {token:string, id: string}){
  
  const {oneProjectStore} = useOneProjectsStore();
  const [budgetedControl, setBudgetedControl] = useState<ProjectByBudgetedControl>();
  const [contractualControl, setContractualControl]=useState<IContractualControlProject>();

  useEffect(() => {
    const fetch = async () => {
      const resBudCon = await getDashboardProjectByBudgetControl(token, id, oneProjectStore?.date? new Date(oneProjectStore?.date).getFullYear(): new Date().getFullYear());
      if(typeof(resBudCon) !== 'string'){
        console.log('presupuestado => ', resBudCon);
        setBudgetedControl(resBudCon[0]);
      }else{
        showToastMessageError(resBudCon);
      }

      const resContractualC = await getProjectContractualControl(token, id);
      if(typeof(resContractualC) !== 'string'){
        setContractualControl(resContractualC);
      }else{
        showToastMessageError(resContractualC);
      }
    };

    fetch();
  }, []);

  if(!oneProjectStore){
    return <></>;
  }

  // const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const colorsRandom = ['#E4D831', '#71B2F2', '#617178', '#FFA145', '#8579F0', '#ff5252', '#69f0ae', '#7D9F2D', '#289399', '#f08080']
  const getRandomArbi = (min: any, max: any) => {
    const res = parseInt(Math.random() * (max - min) + min);   
    return res;
  }

  const c1 = getRandomArbi(0, 9);
  const c2 = getRandomArbi(0, 9);
  const c3 = getRandomArbi(0, 9);
  const c4 = getRandomArbi(0, 9);
  const c5 = getRandomArbi(0, 9);
  const c6 = getRandomArbi(0, 9);

  const d1 = getRandomArbi(0, 9);
  const d2 = getRandomArbi(0, 9);
  const d3 = getRandomArbi(0, 9);
  const d4 = getRandomArbi(0, 9);
  const d5 = getRandomArbi(0, 9);
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Graficos del proyecto" 
        title="Analisis del proyecto"
      />
      <div className="mt-4 rounded-lg space-y-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">

          <div className="p-3">
            <p className="mb-2">CONTROL PRESUPUESTAL</p>
            {budgetedControl && (
              <div>
                <p className=" text-sm mt-2">Monto ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.amountInfo.amount?? 0
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.amountInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c1]} hei="h-5" />
                
                <p className=" text-sm mt-2">Presupuestado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.budgetedInfo.budgeted
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.budgetedInfo.porcentage } 
                    widthBar="w-full" color={colorsRandom[c2]} hei="h-5" />
                
                <p className=" text-sm mt-2">Costo ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.spentInfo.spent
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.spentInfo.porcentage } 
                    widthBar="w-full" color={colorsRandom[c3]} hei="h-5" />
                
                <p className=" text-sm mt-2">Pagado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.paymentInfo.totalPayments
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.paymentInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c4]} hei="h-5" />

                <p className=" text-sm mt-2">Facturado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.billingInfo.billedTotal
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.billingInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c5]} hei="h-5" />

                <p className=" text-sm mt-2">Utilidades ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.netprofitInfo.netprofitTotal
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.netprofitInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c6]} hei="h-5" />
              </div>
            )}
          </div>

          <div className="p-3">
            <p className="mb-2">CONTROL CONTRACTUAL</p>
            {contractualControl && (
              <div>
                <p className=" text-sm mt-2">Contratado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: contractualControl.estimateInfo.amountPro
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={contractualControl.estimateInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[d1]} hei="h-5" />
                
                <p className=" text-sm mt-2">Anticipo ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: 0
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={0} 
                    widthBar="w-full" color={colorsRandom[d2]} hei="h-5" />
                
                <p className=" text-sm mt-2">Amortizado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: contractualControl.estimateInfo.amountChargeOff
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={contractualControl.estimateInfo.porcentageChargeOff} 
                    widthBar="w-full" color={colorsRandom[d3]} hei="h-5" />
                
                <p className=" text-sm mt-2">Estimado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: contractualControl.estimateInfo.estimatedTotal
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={contractualControl.estimateInfo.porcentageEstimated } 
                    widthBar="w-full" color={colorsRandom[d4]} hei="h-5" />

                <p className=" text-sm mt-2">Garantia ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: contractualControl.estimateInfo.amountGuaranteeFund
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={contractualControl.estimateInfo.porcentageGuaranteeFund } 
                    widthBar="w-full" color={colorsRandom[d5]} hei="h-5" />
              </div>
            )}
          </div>
        </div>
      </div>  
    </div>
  )
}