import SelectReact from "@/components/SelectReact"
import { useState, useEffect } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import { Options } from "@/interfaces/Common";
import Button from "@/components/Button";
import { getCatalogsByNameAndCategory } from "@/app/api/routeCatalogs";
import Input from "@/components/Input";
import { getSatPaymentMethods, getSatCfdiUses, getSatInvoiceTypes, getSatPaymentForms } from "@/app/api/routeSatInvoices";

type DataBasicProps={
  token:string,
  handleType:Function,
  handleFormPaid:Function,
  handleMethodPaid:Function,
  nextStep:Function,
  conditionPayment:string,
  handleConditionPayment:Function,
  odc:string,
  setOdc:Function,
  bandOdc:boolean
  setBandOdc:Function,
  handleCondicionTPayment:Function,
  handleLabelType: (value: string) => void,
  handleLabelMethodPaid: (value: string) => void,
  handleLabelFormPaid: (value: string) => void,
  handleLabelConditionPayment: (value: string) => void,
  handleLabelCondicionPayment: (value: string) => void,
}

export interface IMethodPayment {
  id: string
  description: string
  createdAt: string
  updatedAt: any
}

export default function SatInvoicesConditionsStepper({token, nextStep, handleFormPaid, 
  handleMethodPaid, handleType, conditionPayment, handleConditionPayment, odc, 
  setOdc, bandOdc, setBandOdc, handleCondicionTPayment, handleLabelFormPaid, handleLabelMethodPaid, 
  handleLabelType, handleLabelConditionPayment, handleLabelCondicionPayment}: DataBasicProps) {

  const [optConditionsPayment, setoptConditionsPayment]=useState<Options[]>([]);
  const [catalogPaymentMethod, setCatalogPaymentMethod]=useState<Options[]>([]);
  // const [satMethodPayment, setSatMethodPayment]=useState<IMethodPayment[]>([]);
  const [catalogCFDI, setCatalogCFDI]=useState<Options[]>([]);
  const [catalogFormPayment, setCatalogFormPayment]=useState<Options[]>([]);
  const [optCondicionesPayment, setoptCondicionesPayment]=useState<Options[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [conditions, fiscalMetPay, satTypes, satPayForm, condicionesP] = await Promise.all([
        getSatCfdiUses(),
        getSatPaymentMethods(),
        getSatInvoiceTypes(),
        getSatPaymentForms(),
        getCatalogsByNameAndCategory(token, 'invoices'),
      ]);

      if(typeof(conditions)==='string'){
        showToastMessageError(conditions);
      }else{
        const auxCond:Options[]=conditions.map( (m: IMethodPayment) => ({
          value: m.id,
          label: m.description,
        }));
        setoptConditionsPayment(auxCond);
        handleConditionPayment(auxCond[0].value);
        handleLabelConditionPayment(condicionesP[0].label);
      }

      if(typeof(fiscalMetPay)=='string'){
        showToastMessageError(fiscalMetPay);
      }else{
        // setSatMethodPayment(fiscalMetPay);
        console.log('fiscal met pay:', fiscalMetPay);
        const auxMet:Options[]=fiscalMetPay.map( (m: IMethodPayment) => ({
          value: m.id,
          label: m.description,
        }));

        console.log('aux met:', auxMet);

        setCatalogPaymentMethod(auxMet);
        handleMethodPaid(auxMet[0].value);
        handleLabelMethodPaid(auxMet[0].label);
      }

      if(typeof(satTypes)==='string'){
        showToastMessageError(satTypes);
      }else{
        const auxTypes:Options[]=satTypes.filter((m: IMethodPayment) => m.description !== 'Todos').map( (m: IMethodPayment) => ({
          value: m.id,
          label: m.description,
        }));
        setCatalogCFDI(auxTypes);
        console.log('sat types:', auxTypes);
        let indexT=auxTypes.findIndex((c) => c.label==="Ingreso");
        indexT=indexT<0?0:indexT;
        console.log('indexT => ', indexT);
        console.log('sat types:', auxTypes[indexT].value);
        handleType(auxTypes[indexT?? 0].value);
        handleLabelType(auxTypes[indexT?? 0].label);
        // handleLabelType(auxTypes[0].label);
        // handleConditionPayment(auxTypes[0].value)
      }

      // console.log('sat pay form => ', satPayForm);
      if(typeof(satPayForm)==='string'){
        showToastMessageError(satPayForm);
      }else{
        const auxPayForm:Options[]=satPayForm.map( (m: IMethodPayment) => ({
          value: m.id,
          label: m.description,
        }));
        setCatalogFormPayment(auxPayForm);
        handleFormPaid(auxPayForm[0].value);
        handleLabelFormPaid(auxPayForm[0].label);
        // handleConditionPayment(auxTypes[0].value)
      }

      // console.log('condicionesP => ', condicionesP);
      if(typeof(condicionesP)==='string'){
        showToastMessageError(condicionesP);
      }else{
        setoptCondicionesPayment(condicionesP);
        handleCondicionTPayment(condicionesP[0].value);
        handleLabelCondicionPayment(condicionesP[0].label);
        // handleConditionPayment(condicionesP[0].value)
      }
    }
    fetch();
  }, []);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const conditions:Options[] = await getCatalogsByNameAndCategory(token, 'invoices');
  //     if(typeof(conditions)==='string'){
  //       showToastMessageError(conditions);
  //     }else{
  //       setoptConditionsPayment(conditions);
  //       handleConditionPayment(conditions[0].value)
  //     }
  //   }
  //   fetch();
  // }, []);

  let indexCon = 0;
  if(optConditionsPayment.length > 0){
    indexCon=optConditionsPayment.findIndex((c) => c.value===conditionPayment);
  }
  if(indexCon<0) indexCon=0;

  const validationData = () => {
    nextStep(2);
  }

  const handleMetPaid = (value:string) => {
    handleMethodPaid(value);
    const label = catalogPaymentMethod.find((c) => c.value === value)?.label || '';
    handleLabelMethodPaid(label);
  }

  const handleTyp = (value:string) => {
    handleType(value);
    const label = catalogCFDI.find((c) => c.value === value)?.label || '';
    handleLabelType(label);
  }

  const handleFormPay = (value:string) => {
    handleFormPaid(value);
    const label = catalogFormPayment.find((c) => c.value === value)?.label || '';
    handleLabelFormPaid(label);
  }

  const handleCondicionPay = (value:string) => {
    handleConditionPayment(value);
    const label = optConditionsPayment.find((c) => c.value === value)?.label || '';
    handleLabelConditionPayment(label);
  }

  const handleConditionTP = (value:string) => {
    handleCondicionTPayment(value);
    const label = optCondicionesPayment.find((c) => c.value === value)?.label || '';
    handleLabelCondicionPayment(label);
  }

  const indexType=catalogCFDI.findIndex((c) => c.label==="Ingreso");

  return (
    <div>
      <div className="sm:grid sm:grid-cols-2 gap-x-2 gap-y-2">
        {optConditionsPayment.length > 0 && (
          <div className=" ">
            <Label htmlFor="conditionsPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Uso de factura</p></Label>
            <SelectReact index={0} opts={optConditionsPayment} setValue={handleCondicionPay} />
          </div>
        )}

        {catalogPaymentMethod.length > 0 && (
          <div className=" ">
            <Label htmlFor="methodPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Metodo de pago</p></Label>
            <SelectReact index={0} opts={catalogPaymentMethod} setValue={handleMetPaid} />
          </div>
        )}

        {catalogCFDI.length > 0 && (
          <div className="">
            <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
            <SelectReact index={indexType} opts={catalogCFDI} setValue={handleTyp} />
          </div>
        )}

        {catalogFormPayment.length > 0 && (
          <div className=" ">
            <Label htmlFor="formPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Forma de pago</p></Label>
            <SelectReact index={0} opts={catalogFormPayment} setValue={handleFormPay} />
          </div>
        )}

        {optConditionsPayment.length > 0 && (
          <div className=" ">
            <Label htmlFor="condicionesPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condiciones de pago</p></Label>
            <SelectReact index={0} opts={optCondicionesPayment} setValue={handleConditionTP} />
          </div>
        )}

        <div className="">
          <Label htmlFor="odc"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Orden de compra</p></Label>
          <Input type="text" value={odc} onChange={(e) => setOdc(e.target.value)} />
          {bandOdc && (
            <p className="text-red-700">Ingrese una orden de compra valida!!!!</p>
          )}
        </div>

      </div>
      <div className="flex justify-center gap-x-2 mt-3">
        <button
          className="text-black font-normal border border-black text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
          onClick={() => nextStep(0)}
          type="button"
        >
          Atras
        </button>
        <Button type="button" onClick={() => validationData()}>Siguiente</Button>
      </div>
    </div>
  )
}
