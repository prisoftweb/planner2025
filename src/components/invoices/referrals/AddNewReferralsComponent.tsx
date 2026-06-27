import HeaderForm from "@/components/HeaderForm"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { createInvoice } from "@/app/api/routeInvoices"
// import DataBasicInvoiceStepper from "../DataBasicInvoiceStepper"
// import InvoicesConditionsStepper from "@/components/projects/estimates/InvoicesConditionsStepper"
// import NavInvoiceStepper from "@/components/projects/estimates/NavInvoiceStepper"
import ConceptsInvoiceStepperComponent from "../ConceptsInvoiceStepperComponent"
import TooltipCloseIcon from "@/components/tooltipIcons/TooltipCloseIcon"
import DataBasicReferralStepper from "./DataBasicReferralStepper"
import ConceptsReferralsStepperComponent from "./ConceptReferralsStepper"
import NavRemisionStepper from "./NavRemisionStepper"

type Params = {
  showForm:(value: boolean) => void, 
  user:string, 
  token:string, 
  company:string
}

export default function AddNewReferralsComponent({showForm, user, token, company}: Params) {

  const [folio, setFolio] = useState<string>('');
  // const [taxFolio, setTaxFolio] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [client, setClient] = useState<string>('');
  // const [type, setType] = useState<string>('ADQUISICION_MERCANCIAS G01');
  // const [methodPaid, setMethodPaid] = useState<string>('PAGO_EN_UNA_EXHIBICION PUE');
  const [formPaid, setFormPaid] = useState<string>('EFECTIVO 01');
  const [conditionPayment, setConditionPayment] = useState<string>('');
  const [labelCondition, setLabelCondition]=useState<string>('');
  const [odc, setOdc] = useState<string>('');
  const [project, setProject] = useState<string>('');

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  // const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);
  // const [isVat, setIsVat]=useState<boolean>(true);

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleClient = (value: string) => {
    setClient(value);
  }

  const handleProject = (value: string) => {
    setProject(value);
  }

  // const handleType = (value: string) => {
  //   setType(value);
  // }

  // const handleMethodPaid = (value: string) => {
  //   setMethodPaid(value);
  // }

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

  // const handleTaxFolio = (value:string) => {
  //   setTaxFolio(value);
  // }

  const handleConditionPayment = (value:string, label:string) => {
    setConditionPayment(value);
    setLabelCondition(label);
  }

  const handleOdc = (value:string) => {
    setOdc(value);
  }

  const handleBandDate = (value:boolean) => {
    setBandDate(value);
  }
  
  // const handleBandOdc = (value:boolean) => {
  //   setBandOdc(value);
  // }

  const handleBandFolio = (value:boolean) => {
    setBandFolio(value);
  }

  // const handleBandTaxFolio = (value:boolean) => {
  //   setBandTaxFolio(value);
  // }

  // const handleIsVat = (value:boolean) => {
  //   setIsVat(value);
  // }

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
    // if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
    //   setBandTaxFolio(true);
    //   validation = false;
    //   return false;
    // }else{
    //   setBandTaxFolio(false);
    // }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    return validation;
  }

  const saveInvoice = async (conceptsInvoice: any[]) => {
    const val = validationData();

    const dataConcepts: any[] = [];
    let amount: number = 0;
    conceptsInvoice.map((c: any) => {
      dataConcepts.push({
          conceptEstimate:c.conceptEstimate._id,
          priceConcepEstimate:c.priceConcepEstimate,
          area:c.area,
          section:c.section,
          quantity:c.quantity,
          amount:c.amount * c.quantity,
          date:c.date,
          user:c.user
      });
      amount += (c.amount * c.quantity);
    });

    if(val){
      const currentDate=new Date(date.substring(0, 10));
      const day=currentDate.getDay();
      const days = (conditionPayment=="67d20a6a59865f640af92588"? 0: 
              (conditionPayment=="67d20a8b59865f640af9258a"? 10: (conditionPayment=="67d20aa159865f640af9258c"? 15: 30)));
      const newDay =currentDate.setDate(day+days);
      const newDate=new Date(newDay);
      const data = {
        folio,
        // taxfolio: taxFolio,
        date,
        // useCFDI: type,
        // paymentMethod: methodPaid,
        paymentWay: formPaid,
        user,
        client,
        project,
        company,
        typeInvoice: 'Remision',
        concepts: dataConcepts,
        cost: {
          subtotal: amount, 
          iva: 0,
          total: amount,
        },
        condition: [
          {glossary:"67d20cb359865f640af92638", user}
        ],
        termsofpayment:conditionPayment,
        purchaseorder:odc,
        duedate:newDate.toISOString(),
        accountreceivables: [{
          previousbalanceamount: amount,
          charged: 0,
          unchargedbalanceamount: amount,
          partialitynumber: 0,
        }]
      }

      console.log('data remision => ', data);
      console.log('data json => ', JSON.stringify(data));
      const resInvoice = await createInvoice(token, data);
      if(typeof(resInvoice)==='string'){
        showToastMessageError(resInvoice);
      }else{
        showToastMessage('Factura agregada satisfactoriamente!!');
        showForm(false);

        setFolio('');
        // setTaxFolio('');
        setDate(new Date().toISOString().substring(0, 10));
        setClient('');
        // setType('ADQUISICION_MERCANCIAS G01');
        // setMethodPaid('PAGO_EN_UNA_EXHIBICION PUE');
        setFormPaid('EFECTIVO 01');
        setConditionPayment('');
        setOdc('');
        setProject('');

        setBandFolio(false);
        // setBandTaxFolio(false);
        setBandDate(false);
        setBandOdc(false);
        setStep(0);
        // setIsVat(true);
      }
    }
  }

  const component= (step==0? <DataBasicReferralStepper bandDate={bandDate} bandFolio={bandFolio}  
                        client={client} date={date} folio={folio} 
                        nextStep={handleStep} setClient={handleClient} setDate={handleDate} 
                        setFolio={handleFolio} handleFormPaid={handleFormPaid}
                        token={token} setBandDate={handleBandDate} setBandFolio={handleBandFolio}
                        project={project} setProject={handleProject} handleConditionPayment={handleConditionPayment}
                        bandOdc={bandOdc} odc={odc} setOdc={handleOdc} /> : <ConceptsReferralsStepperComponent nextStep={handleStep} 
                          saveInvoice={saveInvoice} token={token} user={user} company={company} step={step} folio={folio}
                          conditionPayment={labelCondition} date={date} formPaid={formPaid} /> )

  // const component = (step===0? <DataBasicInvoiceStepper bandDate={bandDate} bandFolio={bandFolio}  
  //                       bandTaxFolio={bandTaxFolio} client={client} date={date} folio={folio} 
  //                       nextStep={handleStep} setClient={handleClient} setDate={handleDate} 
  //                       setFolio={handleFolio} setTaxFolio={handleTaxFolio} taxFolio={taxFolio}
  //                       token={token} setBandDate={handleBandDate} setBandFolio={handleBandFolio}
  //                       setBandTaxFolio={handleBandTaxFolio} project={project} setProject={handleProject}
  //                       handleIsVat={handleIsVat} isVat={isVat} /> : 
  //                       (step===1? <InvoicesConditionsStepper 
  //                                 conditionPayment={conditionPayment} handleConditionPayment={handleConditionPayment}
  //                                 handleFormPaid={handleFormPaid} handleMethodPaid={handleMethodPaid} 
  //                                 handleType={handleType} nextStep={handleStep} token={token} 
  //                                 bandOdc={bandOdc} odc={odc} setOdc={handleOdc} setBandOdc={handleBandOdc} />: 
  //                                   <ConceptsInvoiceStepperComponent nextStep={handleStep} 
  //                                     saveInvoice={saveInvoice} token={token} user={user}
  //                                     company={company} />))

  return (
    <>
      <form className="z-10 absolute w-full max-w-3xl bg-white space-y-5 p-5 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea remision"} 
            title={"Nueva remision"}
          />
          <TooltipCloseIcon handleClose={showForm} />
        </div>

        <NavRemisionStepper index={step} setIndex={handleStep} />

        {component}
      </form>
    </>
  )
}
