import { useEffect, useState, useRef } from "react";
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
import { CostCenter } from "@/interfaces/CostCenter";

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function NewBudgetCostCenter({closeForm, costoCenters, user, token, id}: 
  {closeForm:Function, costoCenters: CostCenter[], user:string, token: string, id: string}) {
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const {oneBudget, updateOneBudget} = useOneBudget();

  const [total, setTotal] = useState<string>('0');
  const [percentage, setPercentage] = useState<string>('0');

  const [category, setCategory] = useState<string>('');
  const [concept, setConcept] = useState<string>('');


  //const [focusInput, setFocusInput] = useState<boolean>(true);
  // const inputRef = useRef<CurrencyInputProps>(null);
  const inputRef = useRef<any>(null);

  const options: Options[] = [];

  costoCenters.map((cc) => {
    cc.categorys.map((cat) => {
      options.push({
        //label: cclv.categoryname,
        label: (cc.name) + ' ' + cat.concept.name,
        value: cc._id+'/'+cat.concept._id
      });
    });
  });

  const [optSel, setOptSel] = useState<Options>(options[0]);

  const colors = ['blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];

  const onChangeTotal = (value: string) => {
    try {
      if(value.trim()===''){
        setTotal('0');
        setPercentage('0');
      }else{
        //setTotal(Number(value.replace(/[$,]/g, "")));
        const t = Number(value.replace(/[$,]/g, ""));
        //const p = Number(percentage.replace(/[$,]/g, ""));
        const p = (t / (oneBudget?.amount || 1)) * 100;
        setTotal(value);
        setPercentage(p.toFixed(2));
      }
    } catch (error) {
      setTotal('0');
      setPercentage('0');
    }
  }

  const onChangePercentage = (value: string) => {
    try {
      if(value.trim()===''){
        setPercentage('0');
        setTotal('0');
      }else{
        setPercentage(value);
        const p = Number(value.replace(/[$,%, ]/g, ""));
        const t = ((oneBudget?.amount || 0) * p ) / 100;
        setTotal(t.toFixed(2)); 
      }
    } catch (error) {
      setPercentage('0');
      setTotal('0');
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

  const onChangeCostoCenter = (value: Options) => {
    setOptSel(value);
    const indexCaracter = value.value.indexOf('/');
    const c1 = value.value.substring(0, indexCaracter);
    const c2 = value.value.substring(indexCaracter + 1);
    setCategory(c1);
    setConcept(c2);
    setTotal('0');
    setPercentage('0');
    inputRef?.current?.focus();
  }

  const onChangeCardCostoCenter = (value: string) => {
    const newOpt = options.find(opt => opt.value.includes(value));
    if(newOpt){
      setOptSel(newOpt);
      const indexCaracter = newOpt.value.indexOf('/');
      const c1 = newOpt.value.substring(0, indexCaracter);
      const c2 = newOpt.value.substring(indexCaracter + 1);
      setCategory(c1);
      setConcept(c2);
      setTotal('0');
      setPercentage('0');
      inputRef?.current?.focus();
    }else{
      showToastMessageError('Error al cambiar centro de costos!!');
    }
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
      progressAverage: Number(percentage.replace(/[$, %,]/g, "")),
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
      label: newB.costocenter.concept.name
    });
    categoriesConcepts.push(newB.costocenter.concept.name);
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
        <div className="bg-white p-3 rounded-lg shadow-md h-full">
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
                style={{"width": oneBudget?.progressAverage ? oneBudget?.progressAverage + '%': 0 + '%'}}></div>
            </div>
            <p>{oneBudget?.progressAverage?? 0}%</p>
          </div>
        </div>
        
        <div className="h-full bg-white p-3 rounded-lg shadow-md">
          <div className="">
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

        <div className="bg-white p-3 rounded-lg shadow-md h-full">
          <DonutChartBudget data={optsChart} colors={colors} category="costo"
              categories={categoriesConcepts} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 mt-3">
        {/* <div>
          <Select options={options} className="mt-2" 
            onChange={(value:any) => onChangeCostoCenter(value)}
            value={optSel} />
          <div className="overflow-y-auto h-64 mt-5">
            {costoCenters.map((cclv) => (
              cclv.categorys.map((conc) => (
                <div key={conc.concept._id} 
                  className={`p-3 border border-slate-700 flex cursor-pointer hover:bg-slate-200 text-slate-700 hover:text-slate-700
                    ${optSel.value.includes(conc.concept._id)? 'bg-blue-700 text-white': 'text-slate-700 bg-white'} 
                    shadow-md shadow-slate-400 justify-between items-center`}
                    onClick={() => onChangeCardCostoCenter(conc.concept._id)}
                >
                  <div className="flex gap-x-2">
                    <img className="w-6 h-6" src={cclv.icon} alt="icono" />
                    <p>{cclv.name}</p>
                  </div>
                  <p>{conc.concept.name}</p>
                </div>
              ))
            ))}
          </div>
        </div> */}

        <div>
          <Select options={options} className="mt-2" 
            onChange={(value:any) => onChangeCostoCenter(value)}
            value={optSel} />
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
            <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
                overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
              {costoCenters.map((cclv) => (
                cclv.categorys.map((conce) => (
                  <div role="button"
                    key={conce.concept._id}
                    className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                      outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                      focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                      active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300
                      ${optSel.value.includes(conce.concept._id)? 'bg-blue-700 text-white': 'text-slate-700 bg-white'}`}
                    onClick={() => onChangeCardCostoCenter(conce.concept._id)}
                  >
                    <div className="flex items-center ">
                      <div className="grid mr-4 place-items-center">
                        <img alt="responsable" src={ conce?.concept?.icon || '/img/users/default.jpg'}
                          className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <h6
                            className="block font-sans text-lg antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                            {cclv.name}
                          </h6>
                          {/* <p className="text-slate-500 text-sm">{conce.code}</p> */}
                        </div>
                        <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                          {conce.concept.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ))}

            </nav>
          </div>
          {/* <div className="overflow-y-auto h-64 mt-5">
            {costoCenters.map((cclv) => (
              cclv.categorys.map((conc) => (
                <div key={conc.concept._id} 
                  className={`p-3 border border-slate-700 flex cursor-pointer hover:bg-slate-200 text-slate-700 hover:text-slate-700
                    ${optSel.value.includes(conc.concept._id)? 'bg-blue-700 text-white': 'text-slate-700 bg-white'} 
                    shadow-md shadow-slate-400 justify-between items-center`}
                    onClick={() => onChangeCardCostoCenter(conc.concept._id)}
                >
                  <div className="flex gap-x-2">
                    <img className="w-6 h-6" src={cclv.icon} alt="icono" />
                    <p>{cclv.name}</p>
                  </div>
                  <p>{conc.concept.name}</p>
                </div>
              ))
            ))}
          </div> */}
        </div>

        <div className="p-5">
          <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
          <CurrencyInput
            prefix="$"
            ref={inputRef}
            autoFocus
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
