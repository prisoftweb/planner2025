'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import HeaderForm from "@/components/HeaderForm"
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { Options } from "@/interfaces/Common"
import { IEstimateMin, TableEstimatesProject } from "@/interfaces/Estimate"
import { getEstimateMin } from "@/app/api/routeEstimates"
import { createInvoice } from "@/app/api/routeInvoices"
import DataBasicStepper from "./DataBasicStepper"
import InvoicesConditionsStepper from "./InvoicesConditionsStepper"
import ConceptsInvoiceStepper from "./ConceptsInvoceStepper"
import NavInvoiceStepper from "./NavInvoiceStepper"

type Params = {
  showForm:Function, 
  updateEstimates:Function, 
  user:string, 
  token:string, 
  estimate:TableEstimatesProject | undefined, 
  project:OneProjectMin
}

export default function AddNewInvoiceComponent({showForm, updateEstimates, user, token, 
    estimate, project}: Params) {
  // const refRequest = useRef(true);

  const [folio, setFolio] = useState<string>('');
  const [taxFolio, setTaxFolio] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [client, setClient] = useState<string>(project.client._id);
  const [type, setType] = useState<string>('ADQUISICION_MERCANCIAS G01');
  const [methodPaid, setMethodPaid] = useState<string>('PAGO_EN_UNA_EXHIBICION PUE');
  const [formPaid, setFormPaid] = useState<string>('EFECTIVO 01');
  const [optClients, setOptClients] = useState<Options[]>([]);
  const [conditionPayment, setConditionPayment] = useState<string>('');
  const [odc, setOdc] = useState<string>('');

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleClient = (value: string) => {
    setClient(value);
  }

  const handleType = (value: string) => {
    setType(value);
  }

  const handleMethodPaid = (value: string) => {
    setMethodPaid(value);
  }

  const handleFormPaid = (value: string) => {
    setFormPaid(value);
  }

  const handleStep = (value: number) => {
    setStep(value);
  }

  const handleDate = (value:string) => {
    setDate(value);
  }

  const handleFolio = (value:string) => {
    setFolio(value);
  }

  const handleTaxFolio = (value:string) => {
    setTaxFolio(value);
  }

  const handleConditionPayment = (value:string) => {
    setConditionPayment(value);
  }

  const handleOdc = (value:string) => {
    setOdc(value);
  }

  const handleBandDate = (value:boolean) => {
    setBandDate(value);
  }
  
  const handleBandOdc = (value:boolean) => {
    setBandOdc(value);
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
    if(!folio || folio===''){
      setBandFolio(true);
      validation = false;
      return false;
    }else{
      setBandFolio(false);
    }
    if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
      setBandTaxFolio(true);
      validation = false;
      return false;
    }else{
      setBandTaxFolio(false);
    }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    return validation;
  }

  const saveInvoice = async () => {
    const val = validationData();

    if(val && estimate){
      const res: IEstimateMin = await getEstimateMin(token, estimate?.id);
      if(typeof(res)==='string'){
        showToastMessageError('Error al obtener los conceptos de la estimacion..');
      }else{
        const currentDate=new Date(date.substring(0, 10));
        const day=currentDate.getDay();
        const days = (conditionPayment=="67d20a6a59865f640af92588"? 0: 
                (conditionPayment=="67d20a8b59865f640af9258a"? 10: (conditionPayment=="67d20aa159865f640af9258c"? 15: 30)));
        const newDay =currentDate.setDate(day+days);
        const newDate=new Date(newDay);
        const data = {
          folio,
          taxfolio: taxFolio,
          date,
          useCFDI: type,
          paymentMethod: methodPaid,
          paymentWay: formPaid,
          user,
          client,
          estimate: estimate?.id,
          project: project._id,
          company: '65d3813c74045152c0c4377e',
          concepts: res.concepts,
          notes: res.description,
          amountGuaranteeFund: estimate.Fondo,
          amountChargeOff: estimate.Amortizacion,
          cost: {
            // subtotal: Number(subtotal.replace(/[$,]/g, "")), 
            // iva: Number(vat.replace(/[$,]/g, "")),
            // total: Number(total.replace(/[$,]/g, "")),
            // subtotal: estimate.Estimacion,
            subtotal: estimate.MontoPay, 
            // iva: estimate.Estimacion * 0.16,
            iva: (estimate?.amountVat || 0) - (estimate?.MontoPay || 0),
            total: estimate.amountVat,
            // discount: 0,        
            // vat:"6675daf663dfd817c9551b2a" 
          },
          condition: [
            {glossary:"67d20cb359865f640af92638", user}
          ],
          termsofpayment:conditionPayment,
          purchaseorder:odc,
          duedate:newDate.toISOString()
        }

        const resInvoice = await createInvoice(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(resInvoice);
        }else{
          showToastMessage('Factura agregada satisfactoriamente!!');
          updateEstimates();
          showForm(false);
        }
      }
    }
  }

  let indexCLi = 0;
  if(optClients.length > 0){
    indexCLi=optClients.findIndex((c) => c.value===project.client._id);
  }
  if(indexCLi<0) indexCLi=0;

  const component = (step===0? <DataBasicStepper bandDate={bandDate} bandFolio={bandFolio}  
                        bandTaxFolio={bandTaxFolio} client={client} date={date} folio={folio} 
                        nextStep={handleStep} setClient={handleClient} setDate={handleDate} 
                        setFolio={handleFolio} setTaxFolio={handleTaxFolio} taxFolio={taxFolio}
                        token={token} setBandDate={handleBandDate} setBandFolio={handleBandFolio}
                        setBandTaxFolio={handleBandTaxFolio} /> : (step===1? <InvoicesConditionsStepper 
                                  conditionPayment={conditionPayment} handleConditionPayment={handleConditionPayment}
                                  handleFormPaid={handleFormPaid} handleMethodPaid={handleMethodPaid} 
                                  handleType={handleType} nextStep={handleStep} token={token} 
                                  bandOdc={bandOdc} odc={odc} setOdc={handleOdc} setBandOdc={handleBandOdc} />: 
                                    <ConceptsInvoiceStepper estimate={estimate} 
                                      idEstimate={estimate?.id || ""} nextStep={handleStep} 
                                      saveInvoice={saveInvoice} token={token} />))

  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea factura apartir de "+ estimate?.Nombre} 
            title={"Nueva factura de " + estimate?.Nombre}
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        <NavInvoiceStepper index={step} setIndex={handleStep} />

        {component}
      </form>
    </>
  )
}