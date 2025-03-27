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
// import DataBasicStepper from "./DataBasicStepper"
// import InvoicesConditionsStepper from "./InvoicesConditionsStepper"
// import ConceptsInvoiceStepper from "./ConceptsInvoceStepper"
// import NavInvoiceStepper from "./NavInvoiceStepper"
import { createCollectionWithVoucher, createCollectionUpdateMany } from "@/app/api/routeCollections"
import VoucherStepper from "./VoucherStepper"
import NavCollectionStepper from "./NavCollectionStepper"

import DataCollectionStepper from "./DataCollectionStepper"
import DispersionCollectionStepper from "./DispersionCollectionStepper"
import { IInvoiceMin, IInvoiceTable } from "@/interfaces/Invoices"

type TInvoiceStepper={
  folio: string,
  total: number,
  totalPending: number
  id:string,
  project: {
    title:string,
    id:string
  },
  concepts: string
}

type TInvoiceSend={
  invoice: string,
  amountcharged: number,
  project: string,
}

export default function AddNewCollectionComponent({showForm, user, token, project, invoiceTable}: 
  {showForm:Function, user:string, token:string, invoiceTable:IInvoiceTable, 
    project:OneProjectMin}) {
  // const refRequest = useRef(true);

  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [textConcept, setTextConcept]=useState<string>('');
  const [reference, setReference]=useState<string>('');
  const [voucher, setVoucher]=useState<File>();
  const [amount, setAmount]=useState<string>('');
  const [disperse, setDisperse]=useState<boolean>(false);
  const [invoicesDisp, setInvoicesDisp]=useState<TInvoiceStepper[]>([{
    id:invoiceTable.id,
    folio: invoiceTable.folio,
    project: {
      id: project._id,
      title: project.title
    },
    total: invoiceTable.amount,
    totalPending: invoiceTable.amount,
    concepts: invoiceTable.formpaid+' | '+ invoiceTable.methodpaid + ' | ' + invoiceTable.usecfdi
  }]);

  // const [conceptsEstimate, setConceptsEstimate] = useState<IConceptEstimate[]>([]);

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);
  const [bandTextConcept, setBandTextConcept] = useState<boolean>(false);
  const [bandReference, setBandReference] = useState<boolean>(false);
  const [bandAmount, setBandAmount] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleStep = (value: number) => {
    setStep(value);
  }

  const handleDate = (value:string) => {
    setDate(value);
  }

  const handleAmount = (value:string) => {
    let auxAmount=0;
    try {
      auxAmount=Number(value);
    } catch (error) {
      auxAmount=0;
    }
    setAmount(auxAmount.toString());

    const inv = invoicesDisp.map((i, index) => {
      if (index === 0) {
        // Increment the clicked counter
        const aux: TInvoiceStepper = {
          id: i.id,
          folio: i.folio,
          project: i.project,
          concepts: i.concepts,
          total: auxAmount,
          totalPending: auxAmount,
        }
        return aux;
      } else {
        // The rest haven't changed
        return i;
      }
    });
    setInvoicesDisp(inv);
  }

  const handleBandDate = (value:boolean) => {
    setBandDate(value);
  }

  const handleBandAmount = (value:boolean) => {
    setBandAmount(value);
  }
  
  const handleBandOdc = (value:boolean) => {
    setBandOdc(value);
  }

  const handleInvoicesDisp = (value: TInvoiceStepper[]) => {
    setInvoicesDisp(value);
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

  const handleBandTextConcept = (value:boolean) => {
    setBandTextConcept(value);
  }

  const handleDisperse = (value:boolean) => {
    setDisperse(value);
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
    if(!reference || reference===''){
      console.log('no folio');
      setBandReference(true);
      validation = false;
      return false;
    }else{
      setBandReference(false);
    }
    if(!date || date===''){
      console.log('no date');
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(!amount || amount==='0'){
      console.log('no amount');
      setBandAmount(true);
      validation = false;
      return false;
    }else{
      setBandAmount(false);
    }
    if(!textConcept || textConcept===''){
      console.log('no concept');
      setBandTextConcept(true);
      validation = false;
      return false;
    }else{
      setBandTextConcept(false);
    }
    console.log('ret val => ', validation);
    return validation;
  }

  const saveCollection = async () => {
    // console.log('on save invoice => ');
    const val = validationData();

    if(val){
      // const inv =
      const inv = invoicesDisp.map((i, index) => {
        if (index === 0) {
          // Increment the clicked counter
          const aux: TInvoiceStepper = {
            id: i.id,
            folio: i.folio,
            project: i.project,
            concepts: i.concepts,
            total: Number(amount),
            totalPending: Number(amount),
          }
          return aux;
        } else {
          // The rest haven't changed
          return i;
        }
      });
      const invoices = transformTypes(inv);
      type TPaymentInvoice = {
        invoice: string,
        previousbalanceamount:number,
        charged: number,
        unchargedbalanceamount: number,
        partialitynumber: number,
        itemscharged: number
      }
      const paymentInInvoices: TPaymentInvoice[]=[];
      inv.map((i) => {
        paymentInInvoices.push({
          charged: i.total,
          invoice: i.id,
          previousbalanceamount: i.totalPending,
          itemscharged: 1,
          partialitynumber: 1,
          unchargedbalanceamount: i.totalPending
        });
      });

      if(!voucher){
        const data = {
          reference,
          concept: textConcept,
          amount:Number(amount),
          date,
          company: "65d3813c74045152c0c4377e", 
          client: project.client._id,
          user,
          condition: [
            {
              glossary: "67e31aa81945c0b1e4c9bc76",
              user
            }
          ],
          conditionpartial: [
            {
                glossary: "67d20e2959865f640af92682",
                user
            }
          ],
          type: "67e31c8d1945c0b1e4c9bddf",
          invoices,
          paymentInInvoices
        }
        // showToastMessage('cobro sin voucehr');
        const res = await createCollectionUpdateMany(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Cobro agregado satisfactoriamente!!!');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2500);
        }
      }else{
        const data = new FormData();
        data.append('reference', reference);
        data.append('concept', textConcept);
        data.append('amount', JSON.stringify(Number(amount)));
        // data.append('amount', JSON.stringify(amount));
        data.append('date', date);
        data.append('company', "65d3813c74045152c0c4377e");
        data.append('client', project.client._id);
        data.append('user', user);
        data.append('condition', JSON.stringify([
          {
            glossary: "67e31aa81945c0b1e4c9bc76",
            user
          }
        ]));
        data.append('conditionpartial', JSON.stringify([
          {
              glossary: "67d20e2959865f640af92682",
              user
          }
        ]));
        data.append('type', "67e31c8d1945c0b1e4c9bddf");
        data.append('invoices', JSON.stringify(invoices));
        data.append('paymentInInvoices', JSON.stringify(paymentInInvoices));
        showToastMessage('costo con voucehr');
        const res = await createCollectionWithVoucher(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Cobro agregado satisfactoriamente!!!');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2500);
        }
      }
    }
  }

  const component = (step===0? <DataCollectionStepper bandCollection={bandAmount} bandDate={bandDate} bandReference={bandReference} 
                                  date={date} nextStep={handleStep} reference={reference} setBandDate={handleBandDate} 
                                  setBandReference={handleBandReference} setDate={handleDate} amount={amount}
                                  setAmount={handleAmount} saveCollection={saveCollection} setBandCollection={handleBandAmount}
                                  setReference={handleReference} token={token} bandTextConcept={bandTextConcept} 
                                  setTextConcept={handleTextConcept} textConcept={textConcept} 
                                  setBandConcept={handleBandTextConcept} disperse={disperse} setDisperse={handleDisperse} /> 
                                    : (step===1? <VoucherStepper NextStep={handleStep} setVoucher={handleVoucher}
                                          token={token} user={user} disperse={disperse} 
                                          saveCollection={saveCollection} voucher={voucher} />: 
                                    <DispersionCollectionStepper NextStep={handleStep} token={token}
                                        user={user} invoicesDisp={invoicesDisp} setInvoicesDisp={handleInvoicesDisp}
                                        saveCollection={saveCollection} />))

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

function transformTypes(invoiceFrom: TInvoiceStepper[]){
  const invoiceTo: TInvoiceSend[]=[];
  invoiceFrom.map((i) => {
    invoiceTo.push({
      amountcharged:i.total,
      invoice:i.id,
      project: i.project.id
    });
  });
  return invoiceTo;
}