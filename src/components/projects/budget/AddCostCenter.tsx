import { useNewBudget } from "@/app/store/budgetProject"
import { CurrencyFormatter } from "@/app/functions/Globals";
import Label from "@/components/Label";
import CurrencyInput from "react-currency-input-field";
import { useState, useRef } from "react";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import Button from "@/components/Button";
import { createBudget } from "@/app/api/routeBudget";
import { useBudgetStore } from "@/app/store/budgetProject";
import { getBudgetsMin } from "@/app/api/routeBudget";

export default function AddCostCenter({token, user, closeForm}: 
  {token:string, user: string, closeForm: Function}) {

  const {project} = useNewBudget();
  const {updateBudgetsStore} = useBudgetStore();

  const [amountBudget, setAmountBudget] = useState<number>(project?.amount || 0);
  const [amountMessage, setAmountMessage] = useState<string>('');
  const [name, setName] = useState<string>(project?.title || '');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionMessage, setDescriptionMessage] = useState('');

  const tabRef = useRef<any>(null);
  const [bandTab, setBandTab] = useState<boolean>(false); 

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

  const amount = CurrencyFormatter({
    currency: "MXN",
    value: project?.amount || 0
  });

  const saveBudget = async () => {
    if(ValidationMessage()){
      const data = {
        title: name,
        description:description,
        date: new Date(),
        amount: amountBudget,
        conditionStatus:"CREADO",
        condition: [
          {glossary:"66e657bed63098c324d45464", user}
        ],
        progressAverage:0,
        project: project?._id,
        user
      }

      try {
        const res = await createBudget(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Presupuesto creado exitosamente!!!');
          fetchBudgets();
          closeForm(false);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un problema al crear presupuesto!!');
      }
    }
  }

  const keyDown = (event: any) => {
    // console.log(event.key);
    if(event.key==='Tab'){
      tabRef?.current?.focus();
      setBandTab(!bandTab);
    }
  };

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
            onKeyDown={(e) => keyDown(e)}
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
        <textarea 
          className="border border-gray-200 rounded-lg w-full text-sm text-gray-900 bg-white dark:bg-gray-800 
                  focus:ring-0 dark:text-white dark:placeholder-gray-400 my-2 p-2 outline-0 outline-none"
          rows={4}
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ref={tabRef}
        />
        {descriptionMessage !== ''}{
            <p className="text-red-500">{descriptionMessage}</p>
          }
      </div>
      <div className="flex justify-center">
        <Button onClick={saveBudget}>Guardar</Button>
      </div>
    </>
  )
}