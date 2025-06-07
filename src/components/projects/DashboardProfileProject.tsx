import HeaderForm from "../HeaderForm"
import { useOneProjectsStore } from "@/app/store/projectsStore";
import { ProgressCircle } from "@tremor/react";
import { useEffect, useState } from "react";
import { getDashboardProjectCostoCenters } from "@/app/api/routeProjects";
import { ProjectCostoCenters } from "@/interfaces/DashboardProjects";
import DonutChartComponent from "./dashboard/DonutChartComponent";
import { showToastMessageError } from "../Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { GiProfit } from "react-icons/gi";
import { LiaMoneyBillWaveAltSolid, LiaMoneyCheckAltSolid } from "react-icons/lia";
import { ProjectByBudgetedControl } from "@/interfaces/DashboardProjects";
import { getDashboardProjectByBudgetControl } from "@/app/api/routeProjects";
import Label from "../Label";
import Chip from "../providers/Chip";
import { ITimeLineProject } from '@/interfaces/Projects';
import { IConditionProject } from "@/interfaces/Projects";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function DashboardProfileProject({token, id, conditions}: 
  {token:string, id: string, conditions: IConditionProject[]}){
  
  const {oneProjectStore} = useOneProjectsStore();
  const [costoCenters, setCostoCenters] = useState<ProjectCostoCenters[]>([]);
  const [showTotal, setShowTotal] = useState<boolean>(false);
  const [budgetedControl, setBudgetedControl] = useState<ProjectByBudgetedControl>();

  useEffect(() => {
    const fetch = async () => {
      
      const resCostoC = await getDashboardProjectCostoCenters(token, id);
      if(typeof(resCostoC) !== 'string'){
        setCostoCenters(resCostoC);
      }else{
        showToastMessageError(resCostoC)
      }

      const resBudCon = await getDashboardProjectByBudgetControl(token, id, oneProjectStore?.date? new Date(oneProjectStore?.date).getFullYear(): new Date().getFullYear());
      if(typeof(resBudCon) !== 'string'){
        setBudgetedControl(resBudCon[0]);
      }else{
        showToastMessageError(resBudCon);
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
 
  // const timeLine: ITimeLineProject[] = [];
  // timeLine.push({
  //   _id: '439878547',
  //   conditionstatus: {
  //     _id: '222',
  //     condition: {
  //       _id: '222',
  //       name: 'Creado',
  //       color: '#527'
  //     },
  //     user: {
  //       _id: '222',
  //       photo: '/img/users/default.jpg',
  //       name: 'Yo mero'
  //     },
  //     status: true,
  //     date: new Date().toISOString()
  //   }
  // }, 
  // {
  //   _id: '439878547',
  //   conditionstatus: {
  //     _id: '222',
  //     condition: {
  //       _id: '222',
  //       name: 'Creado',
  //       color: '#527'
  //     },
  //     user: {
  //       _id: '222',
  //       photo: '/img/users/default.jpg',
  //       name: 'Yo mero'
  //     },
  //     status: true,
  //     date: new Date().toISOString()
  //   }
  // }, 
  // {
  //   _id: '439878547',
  //   conditionstatus: {
  //     _id: '222',
  //     condition: {
  //       _id: '222',
  //       name: 'Creado',
  //       color: '#527'
  //     },
  //     user: {
  //       _id: '222',
  //       photo: '/img/users/default.jpg',
  //       name: 'Yo mero'
  //     },
  //     status: true,
  //     date: new Date().toISOString()
  //   }
  // });

  const timeLine: ITimeLineProject[] = [];
  conditions.map((c) => {
    timeLine.push({
      _id: c._id,
      conditionstatus: {
        _id: c.conditionstatus._id,
        condition: {
          _id: c.conditionstatus.condition._id,
          name: c.conditionstatus.condition.name,
          color: c.conditionstatus.condition.color
        },
        user: {
          _id: c.conditionstatus.user._id,
          photo: c.conditionstatus.user.photo || '/img/users/default.jpg',
          name: c.conditionstatus.user.name
        },
        status: c.conditionstatus.status,
        date: c.conditionstatus.date
      }
    });
  }); 
  
  return(
    <div className="w-full">
      {/* <HeaderForm img="/img/projects.svg" subtitle="Graficos del proyecto" 
        title="Analisis del proyecto"
      /> */}

      <div className="flex gap-x-5 justify-end mb-5 pr-3">
        <div className="inline-flex items-center">
          <Label>Despues de impuestos</Label>  
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input 
              checked={showTotal} 
              onClick={() => setShowTotal(!showTotal)} 
              id="discount" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="discount"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 mt-3">
        <Card amount={showTotal? ((oneProjectStore?.amount ?? 0) * 1.16): (oneProjectStore?.amount ?? 0)} title="Monto" >
          <LiaMoneyCheckAltSolid className="rounded-full w-7 h-7" />
        </Card>

        <Card amount={(showTotal? budgetedControl?.spentInfo?.spentTotal: budgetedControl?.spentInfo?.spentSubTotal) || 0} title="Costo" >
          <LiaMoneyBillWaveAltSolid className="rounded-full w-7 h-7" />
        </Card>

        <Card amount={(showTotal? budgetedControl?.netprofitInfo.netprofitTotal: budgetedControl?.netprofitInfo.netprofitSubTotal) || 0} title="Utilidad" >
          <GiProfit className="rounded-full w-7 h-7" />
        </Card>
      </div>
      <div className="mt-4 rounded-lg space-y-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 items-start">
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
            <p className="mb-2">CENTRO DE COSTOS</p>
            <DonutChartComponent data={dataCostoCenters} colors={colors} category="costo"
              categories={categoriesCostoCenters} showLegend={false}  />
          </div>
        </div>
      </div>

      {/* <ol className="relative border-s border-gray-400 dark:border-gray-700 ml-10">                  
        {timeLine.map((t) => (
          <li className="mb-10 ms-6" key={t._id}>            
            <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img className="rounded-full shadow-lg" src={t.conditionstatus?.user?.photo || '/img/users/default.jpg' } alt="user"/>
            </span>
            <div className="items-center justify-between px-10 bg-white dark:bg-gray-700 dark:border-gray-600">
              <Chip label={t.conditionstatus.condition.name} color={t.conditionstatus.condition.color} width='w-40' />
              <p className='text-xs'>{t.conditionstatus.date.substring(0, 10)}</p>
            </div>
        </li>
        ))}
      </ol> */}

      <ol className="relative flex gap-x-2 ml-10 flex-wrap">                  
        {timeLine.map((t) => (
          <li className="mb-10 ms-0" key={t._id}>            
            <div className="items-center justify-center px-0 bg-white dark:bg-gray-700 dark:border-gray-600">
              <span className="flex items-center justify-center w-full h-10 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img className="rounded-full shadow-lg w-9 h-auto" src={t.conditionstatus?.user?.photo || '/img/users/default.jpg' } alt="user"/>
              </span>
              <Chip label={t.conditionstatus.condition.name} color={t.conditionstatus.condition.color} width='w-40' />
              <p className='text-xs text-center'>{t.conditionstatus.date.substring(0, 10)}</p>
            </div>
        </li>
        ))}
      </ol>

    </div>
  )
}

export const Card = ({amount, children, title}: {children:JSX.Element, title:string, amount:number}) => {
  return(
    <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
      {children}
      <div>
        <p className="text-slate-600">{title}</p>
        <p className="text-xl font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: amount
        })}</p>
      </div>
    </div>
  )
}