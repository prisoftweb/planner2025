import HeaderForm from "../HeaderForm"
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ProgressCircle } from "@tremor/react";
import { useEffect, useState } from "react";
import { getDashboardProjectByBudgetControl, getDashboardProjectCostoCenters } from "@/app/api/routeProjects";
import { ProjectByBudgetedControl, ProjectCostoCenters } from "@/interfaces/DashboardProjects";
import { ProgressBarComponent } from "./dashboard/ProgressBarComponent";
import { CurrencyFormatter } from "@/app/functions/Globals";
import DonutChartComponent from "./dashboard/DonutChartComponent";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function DashboardProfileProject({token, id}: {token:string, id: string}){
  
  const {oneProjectStore, updateOneProjectStore} = useOneProjectsStore();
  const [budgetedControl, setBudgetedControl] = useState<ProjectByBudgetedControl>();
  const [costoCenters, setCostoCenters] = useState<ProjectCostoCenters[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const resBudCon = await getDashboardProjectByBudgetControl(token, id);
      if(typeof(resBudCon) !== 'string'){
        setBudgetedControl(resBudCon[0]);
      }

      // console.log('res bud -> ', resBudCon);

      const resCostoC = await getDashboardProjectCostoCenters(token, id);
      if(typeof(resCostoC) !== 'string'){
        setCostoCenters(resCostoC);
      }
    };

    fetch();
  }, []);

  if(!oneProjectStore){
    return <></>;
  }

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const dataCostoCenters: OptionsDashboard[] = [];
  const categoriesCostoCenters: string[] = [];

  costoCenters.map((prj) => {
    dataCostoCenters.push({
      costo: prj.porcentage,
      label: prj.costocenter.concept
    });
    categoriesCostoCenters.push(prj.costocenter.concept);
  });

  // console.log('budgeted control => ', budgetedControl);
  // Colores para el grafico Progress-bar de control presupuestal
  const colorsRandom = ['#E4D831', '#71B2F2', '#617178', '#FFA145', '#8579F0', '#ff5252', '#69f0ae', '#7D9F2D', '#289399', '#f08080']
  const getRandomArbi = (min: any, max: any) => {
    const res = parseInt(Math.random() * (max - min) + min);   
    return res;
  }

  const c1 = getRandomArbi(0, 9);
  const c2 = getRandomArbi(0, 9);
  const c3 = getRandomArbi(0, 9);
  const c4 = getRandomArbi(0, 9);
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Graficos del proyecto" 
        title="Analisis del proyecto"
      />
      <div className="mt-4 rounded-lg space-y-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div className="p-3 w-full flex flex-col justify-center">
            <p className="mb-2">AVANCE DE PROYECTO</p>
            <ProgressCircle 
              value={oneProjectStore.progress}
              radius={100}
              strokeWidth={12}
            >
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {oneProjectStore.progress}%
                </span>
            </ProgressCircle>
          </div>

          <div className="p-3">
            <p className="mb-2">CONTROL PRESUPUESTAL</p>
            {budgetedControl && (
              <div>
                <p className=" text-sm">Monto total ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.amountInfo.amount?? 0
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.amountInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c1]} hei="h-5" />
                <p className=" text-sm">Presupuestado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.budgetedInfo.budgeted
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.budgetedInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c2]} hei="h-5" />
                <p className=" text-sm">Costo ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.spentInfo.spent
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.spentInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c3]} hei="h-5" />
                <p className=" text-sm">Pagado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: budgetedControl.estimateInfo.estimate
                  })}) 
                </p>
                  <ProgressBarComponent label={''} progress={budgetedControl.estimateInfo.porcentage} 
                    widthBar="w-full" color={colorsRandom[c4]} hei="h-5" />
              </div>
            )}
          </div>

          <div className="p-3">
            <p className="mb-2">CENTRO DE COSTOS</p>
            <DonutChartComponent data={dataCostoCenters} colors={colors} category="costo"
              categories={categoriesCostoCenters}  />
          </div>
        </div>
      </div>  
    </div>
  )
}