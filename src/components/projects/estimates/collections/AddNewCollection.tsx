'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import Button from "@/components/Button"
// import Input from "@/components/Input"
// import Label from "@/components/Label"
import HeaderForm from "@/components/HeaderForm"
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from "react"
// import CurrencyInput from "react-currency-input-field"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
// import SelectReact from "@/components/SelectReact"
import { Options } from "@/interfaces/Common"
// import { getClientsLV } from "@/app/api/routeClients"
import { IEstimateMin, IConceptEstimate, TableEstimatesProject } from "@/interfaces/Estimate"
import { getEstimateMin, getAllConceptsEstimateMin } from "@/app/api/routeEstimates"
import { createInvoice } from "@/app/api/routeInvoices"
// import DataBasicStepper from "./DataBasicStepper"
// import InvoicesConditionsStepper from "./InvoicesConditionsStepper"
// import ConceptsInvoiceStepper from "./ConceptsInvoceStepper"
// import NavInvoiceStepper from "./NavInvoiceStepper"
import { createCollection } from "@/app/api/routeCollections"
import VoucherStepper from "./VoucherStepper"
import NavCollectionStepper from "./NavCollectionStepper"

import DataCollectionStepper from "./DataCollectionStepper"

export default function AddNewCollectionComponent({showForm, user, token, project}: 
  {showForm:Function, user:string, token:string, 
    project:OneProjectMin}) {
  // const refRequest = useRef(true);

  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [textConcept, setTextConcept]=useState<string>('');
  const [reference, setReference]=useState<string>('');
  const [voucher, setVoucher]=useState<File>();

  // const [conceptsEstimate, setConceptsEstimate] = useState<IConceptEstimate[]>([]);

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);
  const [bandTextConcept, setBandTextDate] = useState<boolean>(false);
  const [bandReference, setBandReference] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleStep = (value: number) => {
    setStep(value);
  }

  const handleDate = (value:string) => {
    setDate(value);
  }

  const handleBandDate = (value:boolean) => {
    setBandDate(value);
  }
  
  const handleBandOdc = (value:boolean) => {
    setBandOdc(value);
  }

  const handleVoucher = (value:File) => {
    setVoucher(value);
  }

  const handleReference = (value:string) => {
    setReference(value);
  }

  const handleBandReference = (value:boolean) => {
    setBandReference(value);
  }

  const handleTextConcept = (value:string) => {
    setTextConcept(value);
  }

  const handleBandFolio = (value:boolean) => {
    setBandFolio(value);
  }

  const handleBandTaxFolio = (value:boolean) => {
    setBandTaxFolio(value);
  }

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const validationData = () =>{
    let validation = true;
    console.log('in validation');
    if(!date || date===''){
      console.log('no date');
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    return validation;
  }

  const saveInvoice = async () => {
    console.log('on save invoice => ');
    const val = validationData();

    // if(val && estimate){
    //   console.log('validation => ');
    //   const res: IEstimateMin = await getEstimateMin(token, estimate?.id);
    //   const data = {
    //     date,
    //     user,
    //     project: project._id,
    //     company: '65d3813c74045152c0c4377e',
    //     concepts: res.concepts,
    //     notes: res.description,
    //     amountGuaranteeFund: estimate.Fondo,
    //     amountChargeOff: estimate.Amortizacion,
    //     cost: {
    //       // subtotal: Number(subtotal.replace(/[$,]/g, "")), 
    //       // iva: Number(vat.replace(/[$,]/g, "")),
    //       // total: Number(total.replace(/[$,]/g, "")),
    //       subtotal: estimate.Estimacion, 
    //       iva: estimate.Estimacion * 0.16,
    //       total: estimate.amountVat,
    //       // discount: 0,        
    //       // vat:"6675daf663dfd817c9551b2a" 
    //     },
    //     condition: [
    //       {glossary:"67d20cb359865f640af92638", user}
    //     ],
    //     // termsofpayment:conditionPayment,
    //     // purchaseorder:odc,
    //     // duedate:newDate.toISOString()
    //   }

    //   // console.log('create invoice => ', JSON.stringify(data));
    //   const resInvoice = await createInvoice(token, data);
    //   if(typeof(res)==='string'){
    //     showToastMessageError(resInvoice);
    //   }else{
    //     showToastMessage('Factura agregada satisfactoriamente!!');
    //     updateInvoices();
    //     showForm(false);
    //   }
    // }
  }

  const component = (step===0? <DataCollectionStepper bandCollection bandDate bandReference={bandReference} 
                                  date="" nextStep={handleStep} reference={reference} setBandDate={handleBandDate} 
                                  setBandReference={handleBandReference} setDate={handleDate} 
                                  setReference={handleReference} token={token} bandTextConcept={bandTextConcept} 
                                  setTextConcept={handleTextConcept} textConcept={textConcept} /> 
                                    : (step===1? <VoucherStepper NextStep={handleStep} setVoucher={handleVoucher}
                                          token={token} user={user} />: 
                                    <></>))

  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          {/* <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea factura apartir de "+ estimate?.Nombre} 
            title={"Nueva factura de " + estimate?.Nombre}
          /> */}
          <></>
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        <NavCollectionStepper index={step} setIndex={handleStep} />

        {component}
      </form>
    </>
  )
}