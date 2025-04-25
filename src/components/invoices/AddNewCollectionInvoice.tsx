'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { OneProjectMin } from "@/interfaces/Projects"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { createCollectionWithVoucher, createCollectionUpdateMany } from "@/app/api/routeCollections"
import VoucherStepper from "../projects/estimates/collections/VoucherStepper"
import NavCollectionStepper from "../projects/estimates/collections/NavCollectionStepper"
import DataCollectionStepper from "../projects/estimates/collections/DataCollectionStepper"
import DispersionCollectionStepper from "../projects/estimates/collections/DispersionCollectionStepper"
import { IInvoiceTable } from "@/interfaces/Invoices"
import { GetProjectMin } from "@/app/api/routeProjects"

type TInvoiceStepper={
  folio: string,
  total: number,
  totalPending: number,
  previousAmount: number,
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

export default function AddNewCollectionInvoice({showForm, user, token, invoiceTable}: 
  {showForm:Function, user:string, token:string, invoiceTable:IInvoiceTable }) {
  // const refRequest = useRef(true);

  const [project, setProject] = useState<OneProjectMin>();
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [textConcept, setTextConcept]=useState<string>('');
  const [reference, setReference]=useState<string>('');
  const [voucher, setVoucher]=useState<File>();
  const [amount, setAmount]=useState<string>('');
  const [disperse, setDisperse]=useState<boolean>(false);
  const [invoicesDisp, setInvoicesDisp]=useState<TInvoiceStepper[]>([]);

  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandTextConcept, setBandTextConcept] = useState<boolean>(false);
  const [bandReference, setBandReference] = useState<boolean>(false);
  const [bandAmount, setBandAmount] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    const fetch = async () => {
      let prj: OneProjectMin = await GetProjectMin(token, invoiceTable?.project || '');
      if(typeof(prj) === "string")
        showToastMessageError(prj);
      else{
        setProject(prj);
        setInvoicesDisp([{
          id:invoiceTable.id,
          folio: invoiceTable.folio,
          project: {
            id: prj._id,
            title: prj.title
          },
          total: invoiceTable.amount,
          totalPending: invoiceTable.unchargedbalanceamount,
          previousAmount: invoiceTable.previousBalance,
          concepts: invoiceTable.formpaid+' | '+ invoiceTable.methodpaid + ' | ' + invoiceTable.usecfdi
        }]);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const handleStep = (value: number) => {
    setStep(value);
  }

  const handleDate = (value:string) => {
    setDate(value);
  }

  const handleUpdateAmount = (invoicesParam: TInvoiceStepper[]) => {
    let acum=0;
    if(invoicesParam.length > 0){
      invoicesParam.map((i, index:number) => {
        if(index > 0){
          acum+=i.total;
        }
      });
    }
    let auxAmount=0;
    try {
      auxAmount=Number(amount);
    } catch (error) {
      auxAmount=0;
    }

    const inv = invoicesParam.map((i, index) => {
      if (index === 0) {
        const aux: TInvoiceStepper = {
          id: i.id,
          folio: i.folio,
          project: i.project,
          concepts: i.concepts,
          total: auxAmount-acum,
          totalPending: invoiceTable.unchargedbalanceamount,
          previousAmount: invoiceTable.previousBalance
        }
        return aux;
      } else {
        return i;
      }
    });
    setInvoicesDisp(inv);
  }

  const handleAmount = (value:string) => {
    let auxAmount=0;
    try {
      auxAmount=Number(value);
    } catch (error) {
      auxAmount=0;
    }
    setAmount(auxAmount.toString());

    let acum=0;
    if(invoicesDisp.length > 0){
      invoicesDisp.map((i, index:number) => {
        if(index > 0){
          acum+=i.total;
        }
      });
    }

    const inv = invoicesDisp.map((i, index) => {
      if (index === 0) {
        const aux: TInvoiceStepper = {
          id: i.id,
          folio: i.folio,
          project: i.project,
          concepts: i.concepts,
          total: auxAmount-acum,
          totalPending: invoiceTable.unchargedbalanceamount,
          previousAmount: invoiceTable.previousBalance
        }
        return aux;
      } else {
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

  const validationData = () =>{
    let validation = true;
    if(!reference || reference===''){
      setBandReference(true);
      validation = false;
      return false;
    }else{
      setBandReference(false);
    }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(!amount || amount==='0'){
      setBandAmount(true);
      validation = false;
      return false;
    }else{
      setBandAmount(false);
    }
    if(!textConcept || textConcept===''){
      setBandTextConcept(true);
      validation = false;
      return false;
    }else{
      setBandTextConcept(false);
    }
    return validation;
  }

  const saveCollection = async () => {
    const val = validationData();

    if(val){
      const invoices = transformTypes(invoicesDisp);
      type TPaymentInvoice = {
        invoice: string,
        previousbalanceamount:number,
        charged: number,
        unchargedbalanceamount: number,
        partialitynumber: number,
        itemscharged: number
      }
      const paymentInInvoices: TPaymentInvoice[]=[];
      invoicesDisp.map((i) => {
        paymentInInvoices.push({
          charged: i.total,
          invoice: i.id,
          previousbalanceamount: i.previousAmount,
          itemscharged: 1,
          partialitynumber: 1,
          unchargedbalanceamount: i.totalPending
        });
      });

      if(project){
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
          const res = await createCollectionUpdateMany(token, data);
          if(typeof(res)==='string'){
            showToastMessageError(res);
          }else{
            showToastMessage('Cobro agregado satisfactoriamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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
          const res = await createCollectionWithVoucher(token, data);
          if(typeof(res)==='string'){
            showToastMessageError(res);
          }else{
            showToastMessage('Cobro agregado satisfactoriamente!!!');
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }
        }
      }else{
        showToastMessageError('No se puede guardar el cobro porque no se pudo obtener el projecto!!!');
      }
    }
  }

  if(!project){
    return(
      <form className="z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        {/* <NavCollectionStepper index={step} setIndex={handleStep} /> */}
        <p>Obteniendo proyecto...</p>

      </form>
    )
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
                                        saveCollection={saveCollection} updateAmount={handleUpdateAmount} />))

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