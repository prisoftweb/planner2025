import { useOneProjectsStore } from "@/app/store/projectsStore";
import { useEffect, useState } from "react";
import { getDashboardProjectByBudgetControl, getProjectContractualControl, getDashboardProjectCostoCentersCategory } from "@/app/api/routeProjects";
import { ProjectByBudgetedControl, IContractualControlProject } from "@/interfaces/DashboardProjects";
import { ProgressBarComponent } from "./dashboard/ProgressBarComponent";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { showToastMessageError } from "../Alert";
import { ProjectCostoCenters, ProjectCostoCentersCategory } from "@/interfaces/DashboardProjects";
import { ProgressCircle } from "@tremor/react";
import { getDashboardProjectCostoCenters } from "@/app/api/routeProjects";
import { OneProjectMin } from "@/interfaces/Projects";
import VerticalBarChart from "./VerticalBarChart";
import NewDonutChartComponent from "./dashboard/NewDonutChartComponent";
import { DonutChartJS } from "@/interfaces/DashboardProjects";
import Label from "../Label";
import { GiProfit } from "react-icons/gi";
import { LiaMoneyBillWaveAltSolid, LiaMoneyCheckAltSolid } from "react-icons/lia";

interface OptionsDashboard {
  label: string,
  costo: number
}

interface OptionsBarChart {
  label: string,
  data: number[],
  backgroundColor: string,
}

export default function DashboardAnalysisProject({token, id, project}: {token:string, id: string, project:OneProjectMin}){
  
  const {oneProjectStore} = useOneProjectsStore();
  const [budgetedControl, setBudgetedControl] = useState<ProjectByBudgetedControl>();
  const [contractualControl, setContractualControl]=useState<IContractualControlProject>();
  const [costoCenters, setCostoCenters] = useState<ProjectCostoCenters[]>([]);
  const [costoCentersCat, setCostoCentersCat] = useState<ProjectCostoCentersCategory[]>([]);
  const [showTotal, setShowTotal] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const resBudCon = await getDashboardProjectByBudgetControl(token, id, oneProjectStore?.date? new Date(oneProjectStore?.date).getFullYear(): new Date().getFullYear());
      if(typeof(resBudCon) !== 'string'){
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

      const resCostoC = await getDashboardProjectCostoCenters(token, id);
      if(typeof(resCostoC) !== 'string'){
        setCostoCenters(resCostoC);
      }else{
        showToastMessageError(resCostoC)
      }

      const resCostoCat = await getDashboardProjectCostoCentersCategory(token, id);
      if(typeof(resCostoCat) !== 'string'){
        setCostoCentersCat(resCostoCat);
      }else{
        showToastMessageError(resCostoCat)
      }

    };

    fetch();
  }, []);

  if(!oneProjectStore){
    return <></>;
  }

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

  // const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const dataCostoCenters: OptionsDashboard[] = [];
  const dataCostoCentersCat: OptionsBarChart[] = [];
  const categoriesCostoCenters: string[] = ['Categorias'];

  const values: number[] = [];
  const titles: string[] = [];

  costoCenters.map((prj) => {
    dataCostoCenters.push({
      costo: prj.porcentage,
      label: prj.costocenter.concept
    });
    titles.push(prj.costocenter.concept);
    values.push(prj.porcentage);
    categoriesCostoCenters.push(prj.costocenter.concept);
  });

  const dataCostCenterConcepts: DonutChartJS = {
    labels: titles,
    datasets: [
      {
        label: 'Projectos por cliente',
        data: values,
        backgroundColor:[ '#E4D831', '#71B2F2', '#434348', '#6BF672', '#FFA145', '#8579F0', '#FF467A', '#ff4081', '#e040fb', '#448aff', '#ff5252', '#ff6e40', '#69f0ae', '#7c4dff', '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399', '#289399', '#617178', '#8a9a9a', '#516f7d'],
        hoverOffset: 4
      }
    ]
  };

  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  costoCentersCat.map((prj) => {
    console.log('prj cat => ', prj.costocenter);
    dataCostoCentersCat.push({
      backgroundColor: random_rgba(),
      data:[prj.totalCost],
      label: prj.costocenter.category
    });
  });

  console.log('project => ', project);

  return(
    <div className="w-full">

      <div className="flex gap-x-5 justify-end my-5 pr-3">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-3 mt-3">
        <div className="p-3 flex gap-x-3 items-center bg-white shadow-md shadow-slate-300 rounded-md">
          <img src={project.photo} alt="foto" className="rounded-full w-6 h-6" />
          <div>
            <p className="text-slate-600">Proyecto</p>
            <p className="text-xl font-bold">{project.title}</p>
          </div>
        </div>

        <Card amount={showTotal? (project.amount * 1.16): project.amount} title="Monto" >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">

          <div className="bg-white">
            <div className="p-3 w-full flex flex-col justify-center">
              <p className="mb-2">AVANCE DE PROYECTO</p>
              <div className="flex gap-x-2 items-center">
                <div>
                  <div className="border-b-1 border-green-500 py-2">
                    <p className="text-xs">Duracion de proyecto</p>
                  </div>
                  <div className="border-b-1 border-green-500 py-2">
                    <p className="text-xs">Aplica fondo de garantia</p>
                    {project.hasguaranteefund? (
                        <div className="flex gap-x-3 items-center mt-1">
                          <p className="font-bold">si</p>
                          <div className="w-4 h-4 bg-green-500"></div>
                        </div>
                      ): (
                        <div className="flex gap-x-3 items-center mt-1">
                          <p className="font-bold">no</p>
                          <div className="w-4 h-4 bg-red-500"></div>
                        </div>
                      )}
                  </div>
                  <div className="py-2">
                    <p className="text-xs">Aplica anticipo</p>
                    {project.hasamountChargeOff? (
                        <div className="flex gap-x-3 items-center mt-1">
                          <p className="font-bold">si</p>
                          <div className="w-4 h-4 bg-green-500"></div>
                        </div>
                      ): (
                        <div className="flex gap-x-3 items-center mt-1">
                          <p className="font-bold">no</p>
                          <div className="w-4 h-4 bg-red-500"></div>
                        </div>
                      )}
                  </div>
                </div>
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
            </div>

            <div className="p-3 mt-3 bg-white">
              <p className="mb-2">CONTROL CONTRACTUAL</p>
              {contractualControl && (
                <div>
                  <p className=" text-sm mt-2">Contratado ({
                    CurrencyFormatter({
                      currency:'MXN',
                      value: (showTotal? contractualControl?.estimateInfo?.amount : 
                        contractualControl?.estimateInfo?.amountPro) || 0
                    })}) 
                  </p>
                    <ProgressBarComponent label={''} 
                      // progress={contractualControl?.estimateInfo?.porcentage || 0}
                      progress={100} 
                      widthBar="w-full" color={colorsRandom[d1]} hei="h-5" />
                  
                  <p className=" text-sm mt-2">Anticipo ({
                    CurrencyFormatter({
                      currency:'MXN',
                      value: contractualControl?.estimateInfo?.cashAdvance || 0
                    })}) 
                  </p>
                    <ProgressBarComponent label={''} progress={contractualControl?.estimateInfo?.porcentageCashAdvance || 0} 
                      widthBar="w-full" color={colorsRandom[d2]} hei="h-5" />
                  
                  <p className=" text-sm mt-2">Amortizado ({
                    CurrencyFormatter({
                      currency:'MXN',
                      value: contractualControl?.estimateInfo?.amountChargeOff || 0
                    })}) 
                  </p>
                    <ProgressBarComponent label={''} progress={contractualControl?.estimateInfo?.porcentageChargeOff || 0} 
                      widthBar="w-full" color={colorsRandom[d3]} hei="h-5" />
                  
                  <p className=" text-sm mt-2">Estimado ({
                    CurrencyFormatter({
                      currency:'MXN',
                      value: contractualControl?.estimateInfo?.estimatedTotal || 0
                    })}) 
                  </p>
                    <ProgressBarComponent label={''} progress={contractualControl?.estimateInfo?.porcentageEstimated || 0 } 
                      widthBar="w-full" color={colorsRandom[d4]} hei="h-5" />

                  <p className=" text-sm mt-2">Garantia ({
                    CurrencyFormatter({
                      currency:'MXN',
                      value: contractualControl?.estimateInfo?.amountGuaranteeFund || 0
                    })}) 
                  </p>
                    <ProgressBarComponent label={''} progress={contractualControl?.estimateInfo?.porcentageGuaranteeFund || 0 } 
                      widthBar="w-full" color={colorsRandom[d5]} hei="h-5" />
                </div>
              )}
            </div>

          </div>

          <div className="p-3 bg-white">
            <p className="mb-2">CONTROL PRESUPUESTAL</p>
            {budgetedControl && (
              <div>
                <p className=" text-sm mt-2">Monto ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.amountInfo?.amountotal: budgetedControl?.amountInfo?.amount) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} progress={(showTotal? budgetedControl?.amountInfo?.porcentageTotal: 
                                                    budgetedControl?.amountInfo?.porcentage) || 0} 
                  widthBar="w-full" color={colorsRandom[c1]} hei="h-5" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: budgetedControl.amountInfo.amountotal?? 0
                      })}
                    </p>
                    <p className="text-xs text-slate-700">Monto con IVA</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 text-right">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: (budgetedControl.amountInfo.amountotal?? 0) - (budgetedControl.amountInfo.amount?? 0)
                      })}
                    </p>
                    <p className="text-xs text-slate-700 text-right">IVA</p>
                  </div>
                </div>
                
                <p className=" text-sm mt-2">Presupuestado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.budgetedInfo?.budgetedTotal: 
                      (budgetedControl?.budgetedInfo?.budgetedTotal - (budgetedControl?.budgetedInfo?.budgetedTotal * 0.16) )) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} progress={budgetedControl?.budgetedInfo?.porcentageTotal || 0 } 
                  widthBar="w-full" color={colorsRandom[c2]} hei="h-5" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: budgetedControl.budgetedInfo.pendingBugetedTotal?? 0
                      })}
                    </p>
                    <p className="text-xs text-slate-700">Pendiente</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 text-right">
                      { (100 - (budgetedControl.budgetedInfo.porcentageTotal?? 0)).toFixed(2)}%
                    </p>
                    <p className="text-xs text-slate-700 text-right">Porcentaje</p>
                  </div>
                </div>
                
                <p className=" text-sm mt-2">Costo ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.spentInfo?.spentTotal: 
                              budgetedControl?.spentInfo?.spentSubTotal) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} progress={budgetedControl?.spentInfo?.porcentage || 0 } 
                  widthBar="w-full" color={colorsRandom[c3]} hei="h-5" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: (showTotal? budgetedControl?.spentInfo?.pendingSpentTotal: 
                          budgetedControl?.spentInfo?.pendingSpentSubTotal) || 0
                      })}
                    </p>
                    <p className="text-xs text-slate-700">Sobrante</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 text-right">
                      { (100 - ((showTotal? budgetedControl.spentInfo.porcentage: 
                                  budgetedControl.spentInfo.porcentageSubTotal) || 0)).toFixed(2)}%
                    </p>
                    <p className="text-xs text-slate-700 text-right">Porcentaje</p>
                  </div>
                </div>

                <p className=" text-sm mt-2">Facturado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.billingInfo?.billedTotal: 
                      budgetedControl?.billingInfo?.billedSubTotal) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} 
                  progress={(showTotal? budgetedControl?.billingInfo?.porcentage: 
                      budgetedControl?.billingInfo?.porcentageSubTotal) || 0} 
                  widthBar="w-full" color={colorsRandom[c5]} hei="h-5" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: (showTotal? budgetedControl?.billingInfo?.pendingBillingTotal: 
                          budgetedControl?.billingInfo?.pendingBillingSubTotal) || 0
                      })}
                    </p>
                    <p className="text-xs text-slate-700">Pendiente</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 text-right">
                      { (100 - ((showTotal? budgetedControl?.billingInfo?.porcentage: 
                                  budgetedControl?.billingInfo?.porcentageSubTotal) || 0)).toFixed(2)}%
                    </p>
                    <p className="text-xs text-slate-700 text-right">Porcentaje</p>
                  </div>
                </div>

                <p className=" text-sm mt-2">Pagado ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.paymentInfo?.paymentTotal: 
                      budgetedControl?.paymentInfo?.paymentSubTotal) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} progress={(showTotal? budgetedControl?.paymentInfo?.porcentage: 
                                                    budgetedControl?.paymentInfo?.porcentageSubTotal) || 0} 
                  widthBar="w-full" color={colorsRandom[c4]} hei="h-5" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {CurrencyFormatter({
                        currency:'MXN',
                        value: (showTotal? budgetedControl?.paymentInfo?.pendingPaymentTotal: 
                            budgetedControl?.paymentInfo?.pendingPaymentSubTotal) || 0
                      })}
                    </p>
                    <p className="text-xs text-slate-700">Pendiente</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 text-right">
                      { (100 - ((showTotal? budgetedControl.paymentInfo.porcentage: 
                                  budgetedControl?.paymentInfo?.porcentageSubTotal) || 0)).toFixed(2)}%
                    </p>
                    <p className="text-xs text-slate-700 text-right">Porcentaje</p>
                  </div>
                </div>

                <p className=" text-sm mt-2">Utilidades ({
                  CurrencyFormatter({
                    currency:'MXN',
                    value: (showTotal? budgetedControl?.netprofitInfo?.netprofitTotal: 
                              budgetedControl?.netprofitInfo?.netprofitSubTotal) || 0
                  })}) 
                </p>
                <ProgressBarComponent label={''} progress={(showTotal? budgetedControl?.netprofitInfo?.porcentage: 
                                                    budgetedControl?.netprofitInfo?.porcentageSubtotal) || 0} 
                  widthBar="w-full" color={colorsRandom[c6]} hei="h-5" />
              </div>
            )}
          </div>

          <div>
            {/* <div className="p-3 bg-white">
              <p className="mb-2">CENTRO DE COSTOS CATEGORIA</p>
              <DonutChartComponent data={dataCostoCenters} colors={colors} category="costo"
                categories={categoriesCostoCenters}  />
                <VerticalBarChart datasets={dataCostoCenters} labels={categoriesCostoCenters} />
            </div> */}

            <div className="p-3 mt-3 bg-white">
              <p className="mb-2">CENTRO DE COSTOS CONCEPTOS</p>
              {/* <DonutChartComponent data={dataCostoCenters} colors={colors} category="costo"
                categories={categoriesCostoCenters}  /> */}
                <NewDonutChartComponent data={dataCostCenterConcepts} />
            </div>
          </div>

        </div>
      </div>

      <div className="p-3 bg-white">
        <p className="mb-2">CENTRO DE COSTOS CATEGORIA</p>
        <VerticalBarChart datasets={dataCostoCentersCat} labels={['Costo total']} />
      </div>
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