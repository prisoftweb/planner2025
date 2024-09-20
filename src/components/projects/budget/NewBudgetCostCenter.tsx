import { useEffect, useState } from "react";
import { useOneBudget } from "@/app/store/budgetProject";
import { CurrencyFormatter } from "@/app/functions/Globals";
import HeaderForm from "@/components/HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Select from 'react-select'
import { Options } from "@/interfaces/Common";
import { CostoCenterLV } from "@/interfaces/CostCenter";
import Label from "@/components/Label";
import CurrencyInput from "react-currency-input-field";
import Button from "@/components/Button";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { InsertNewBudgetInBudgetByID } from "@/app/api/routeBudget";
import { getBudget } from "@/app/api/routeBudget";

//import DonutChartt from "@/components/expenses/dashboard/DonutChart";
import DonutChartBudget from "./DonutChartBudget";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function NewBudgetCostCenter({closeForm, costoCentersLV, user, token, id}: 
  {closeForm:Function, costoCentersLV: CostoCenterLV[], user:string, token: string, id: string}) {
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const {oneBudget, updateOneBudget} = useOneBudget();

  const [total, setTotal] = useState<string>('0');
  const [percentage, setPercentage] = useState<string>('0');

  const [category, setCategory] = useState<string>('');
  const [concept, setConcept] = useState<string>('');

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const onChangeTotal = (value: string) => {
    try {
      if(value.trim()===''){
        setTotal('0');
      }else{
        //setTotal(Number(value.replace(/[$,]/g, "")));
        setTotal(value);
      }
    } catch (error) {
      setTotal('0');
    }
  }

  const onChangePercentage = (value: string) => {
    try {
      if(value.trim()===''){
        console.log('if per => ');
        setPercentage('0');
      }else{
        //setTotal(Number(value.replace(/[$,]/g, "")));
        console.log('per = value ');
        setPercentage(value);
      }
    } catch (error) {
      console.log('catch ');
      setPercentage('0');
    }
  }
  
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

  const amount = CurrencyFormatter({
    currency: 'MXN',
    value: oneBudget?.amount || 0
  });

  const budgeted = CurrencyFormatter({
    currency: 'MXN',
    value: oneBudget?.budgeted || 0
  })

  const options: Options[] = [];

  costoCentersLV.map((cclv) => {
    options.push({
      //label: cclv.categoryname,
      label: cclv.label,
      value: cclv.categoryid+'/'+cclv.value
    })
  });

  const onChangeCostoCenter = (value: string) => {
    const indexCaracter = value.indexOf('/');
    const c1 = value.substring(0, indexCaracter);
    const c2 = value.substring(indexCaracter + 1);
    setCategory(c1);
    setConcept(c2);
    setTotal('0');
    setPercentage('0');
  }

  const fetchBudget = async() => {
    try {
      const res = await getBudget(token, id);
      if(typeof(res)==='string'){
        showToastMessageError('Error al actualizar pantalla del presupuesto!!');
      }else{
        updateOneBudget(res);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar pantalla del presupuesto!!');
    }
  }

  const onSaveBudget = async () => {
    const data = {
      newbudget: {
        cost: Number(total.replace(/[$,]/g, "")),
        percent: Number(percentage.replace(/[$, %,]/g, "")),
        date: new Date(),
        user,
        costocenter: {             
          category: category,
          concept: concept                        
        },
      }
    }

    if(!total || total.replace(/[$,]/g, "").trim()===''){
      showToastMessageError('Ingrese un monto total!!!');
    }else{
      if(!percentage || percentage.replace(/[$, %,]/g, "").trim()===''){
        showToastMessageError('Ingrese un porcentage!!!');
      }else{
        try {
          const res = await InsertNewBudgetInBudgetByID(id, token, data);
          if(typeof(res)==='string'){
            showToastMessageError(res);
          }else{
            fetchBudget();
            showToastMessage('Centro de costos agrregado satisfactoriamente!!!');
            setTotal('0');
            setPercentage('0');
          }
        } catch (error) {
          showToastMessageError('Error al agregar centro de costos!!!');
        }
      }
    }
  }

  const optsChart: OptionsDashboard[] = [];
  const categoriesConcepts: string[] = [];

  oneBudget?.newbudget.map((newB) => {
    optsChart.push({
      //costo: newB.cost,
      costo: newB.percent,
      label: newB.costocenter.concept
    });
    categoriesConcepts.push(newB.costocenter.concept);
  });
  
  return (
    <div className="z-10 w-full sm:max-w-5xl absolute top-16 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="flex justify-between">
        <HeaderForm img="/img/projects.jpg" subtitle="Selecciona el centro de costos y el monto del presupuesto" 
          title="Nuevo presupuesto"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500
          hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => closeForm(false)} />
      </div>
      <div className="grid grid-cols-3 gap-x-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={oneBudget?.project? oneBudget.project?.photo: '/img/projects/default.svg'} alt="logo" 
                className="max-w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{oneBudget?.project?.title || ''}</p>
              <p className="text-slate-500">{oneBudget?.project?.code || ''}</p>
              <p className="text-slate-500">{oneBudget?.conditionStatus? oneBudget?.conditionStatus : ''}</p>
              <p className="text-slate-500">{oneBudget?.project?.account || ''}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": oneBudget?.progressAverage?? 0}}></div>
            </div>
            <p>{oneBudget?.progressAverage?? 0}%</p>
          </div>
        </div>
        
        <div>
          <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2">
              <div>
                <img src={ oneBudget?.project?.client? oneBudget?.project.client.logo: '/img/clients.svg'} alt="logo" className="w-20 h-20" />
              </div>
              <div>
                <p className="text-slate-500">{'Cliente'}</p>
                <p className="text-blue-500">{oneBudget?.project?.client.name?? ''}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto de obra</p>
                <p className="text-green-600">{amount}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Presupuestado</p>
                <p className="text-red-500">{budgeted}</p>
              </div>
            </div>
            <div className="my-2">
              <p className="text-slate-500">Fecha ({oneBudget?.date?.substring(0, 10) || 'sin fecha'})</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md">
          <DonutChartBudget data={optsChart} colors={colors} category="costo"
              categories={categoriesConcepts} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div>
          <Select options={options} className="mt-2" onChange={(value:any) => onChangeCostoCenter(value.value)} />
          
          <div className="overflow-y-auto h-32 mt-5">
            {costoCentersLV.map((cclv) => (
              <div key={cclv.value} 
                className="p-2 shadow-md shadow-slate-400"
              >
                <p>{cclv.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5">
          <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
          <CurrencyInput
            prefix="$"
            value={total.replace(/[$,]/g, "")}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => onChangeTotal(e.target.value)}
          />
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentage</p></Label>
          <CurrencyInput 
            suffix="%"
            value={percentage.replace(/[$,%,]/g, "")}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
            onChange={(e) => onChangePercentage(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <Button type="button" onClick={onSaveBudget}>Guardar</Button>
      </div>

    </div>
  )
}
