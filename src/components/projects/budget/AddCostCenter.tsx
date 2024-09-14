import { ProjectMin } from "@/interfaces/Projects"
import { useNewBudget } from "@/app/store/budgetProject"
import { CurrencyFormatter } from "@/app/functions/Globals";
import { CostoCenterLV } from "@/interfaces/CostCenter";
import Select from 'react-select'
import { Options } from "@/interfaces/Common";
import Label from "@/components/Label";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Button from "@/components/Button";
import { createBudget } from "@/app/api/routeBudget";
import { useBudgetStore } from "@/app/store/budgetProject";
import { getBudgetsMin } from "@/app/api/routeBudget";

export default function AddCostCenter({costoCentersLV, token, user, closeForm}: 
  {costoCentersLV: CostoCenterLV[], token:string, user: string, closeForm: Function}) {

  const {project} = useNewBudget();
  const {updateBudgetsStore} = useBudgetStore();

  const [amountBudget, setAmountBudget] = useState<number>(0);
  const [amountMessage, setAmountMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionMessage, setDescriptionMessage] = useState('');

  // const options: Options[] = [];

  const onChangeAmount = (value: string) => {
    try {
      setAmountBudget(Number(value.replace(/[$,]/g, "")));
    } catch (error) {
      setAmountBudget(0);
    }
  }

  const fetchBudgets =  async() => {
    try {
      const res = await getBudgetsMin(token);
      if(typeof(res)==='string'){
        showToastMessageError('Error al actulizar informacion de la tabla!!');
      }else{
        updateBudgetsStore(res);
      }
    } catch (error) {
      showToastMessageError('Error al actualizar tabla!!');
    }
  }

  const ValidationMessage = () => {
    let val = true;
    if(amountBudget.toString()==='' || amountBudget.toString()===' '){
      val = false;
      setAmountMessage('El monto es obligatorio!!!');
    }else{
      setAmountMessage('')
    }

    if(name.trim()===''){
      val = false;
      setNameMessage('El nombre es obligatorio!!!');
    }else{
      setNameMessage('');
    }

    if(description.trim()===''){
      val = false;
      setDescriptionMessage('La descripcion es obligatoria!!!');
    }else{
      setDescriptionMessage('');
    }

    return val;
  }

  // const onChangePercentage = (value: string) => {
  //   try {
  //     setPercentage(Number(value.replace(/[$,%,]/g, "")));
  //   } catch (error) {
  //     setPercentage(0);
  //   }
  // }

  // costoCentersLV.map((cclv) => {
  //   options.push({
  //     //label: cclv.categoryname,
  //     label: cclv.label,
  //     value: cclv.value
  //   })
  // });

  const amount = CurrencyFormatter({
    currency: "MXN",
    value: project?.amount || 0
  });

  const saveBudget = async () => {
    //const val = ValidationMessage();
    if(ValidationMessage()){
      const data = {
        title: name,
        description:description,
        date: new Date(),
        //budgeted:0,
        //pending:1500000,
        amount: amountBudget,
        conditionStatus:"CREADO",
        condition: [
            {glossary:"66db72ccd86ee6cdaa075a53", user}
        ],
        progressAverage:0,
        //company: "65d3813c74045152c0c4377e",
        project: project?._id,
        user
      }

      try {
        //console.log('save budget => ', JSON.stringify(data));
        const res = await createBudget(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Presupuesto creado exitosamente!!!');
          fetchBudgets();
          closeForm(false);
          //console.log('budget => ', res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al crear presupuesto!!');
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={project?.photo? project?.photo: '/img/projects/default.svg'} alt="logo" 
                className="max-w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{project?.title || ''}</p>
              <p className="text-slate-500">{project?.code || ''}</p>
              <p className="text-slate-500">{project?.type? project?.type.name : ''}</p>
              <p className="text-slate-500">{project?.account || ''}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": project?.progress?? 0}}></div>
            </div>
            <p>{project?.progress?? 0}%</p>
          </div>
        </div>
        
        <div>
          <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2">
              <div>
                <img src={ project?.client? project.client.logo: '/img/clients.svg'} alt="logo" className="w-20 h-20" />
              </div>
              <div>
                <p className="text-slate-500">{'Cliente'}</p>
                <p className="text-blue-500">{project?.client? project.client.name: ''}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto de obra</p>
                <p className="text-green-600">{amount}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Presupuestado</p>
                <p>{''}</p>
              </div>
            </div>
            <div className="my-2">
              <p className="text-slate-500">Fecha ({project?.date?.substring(0, 10) || 'sin fecha'})</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          {nameMessage !== ''}{
            <p className="text-red-500">{nameMessage}</p>
          }
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
          <CurrencyInput
            prefix="$"
            value={amountBudget}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => onChangeAmount(e.target.value)}
          />
          {amountMessage !== ''}{
            <p className="text-red-500">{amountMessage}</p>
          }
        </div>
      </div>
      <div>
        <Label htmlFor="Description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
        <TextArea 
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionMessage !== ''}{
            <p className="text-red-500">{descriptionMessage}</p>
          }
      </div>
      <div className="flex justify-center">
        <Button onClick={saveBudget}>Guardar</Button>
      </div>
      {/* <div className="grid grid-cols-2 gap-x-3 mt-3">
        <div>
          <Select options={options} className="mt-2" onChange={(value:any) => onChange(value.value)} />
          
          <div className="overflow-y-auto h-32">
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
            suffix="$"
            value={total}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => onChangeTotal(e.target.value)}
          />
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentage</p></Label>
          <CurrencyInput 
            suffix="%"
            value={percentage}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                focus:border-slate-700 outline-0"
            onChange={(e) => onChangePercentage(e.target.value)}
          />
        </div>
      </div> */}
    </>
  )
}