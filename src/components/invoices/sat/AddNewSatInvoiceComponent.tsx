import HeaderForm from "@/components/HeaderForm"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { createInvoice, getFOLIONEXT } from "@/app/api/routeInvoices"
// import DataBasicInvoiceStepper from "../DataBasicInvoiceStepper"
import DataBasicSatInvoiceStepper from "./DataBasicSatInvoiceStepper"
// import InvoicesConditionsStepper from "@/components/projects/estimates/InvoicesConditionsStepper"
import SatInvoicesConditionsStepper from "./SatInvoicesConditionsStepper"
import NavInvoiceStepper from "@/components/projects/estimates/NavInvoiceStepper"
// import ConceptsInvoiceStepperComponent from "../ConceptsInvoiceStepperComponent"
import ConceptsSatInvoiceStepperComponent from "./ConceptsSatInvoiceStepperComponent"
import TooltipCloseIcon from "@/components/tooltipIcons/TooltipCloseIcon"
import { ISatCLient } from "@/interfaces/Clients";
import { getClientTAXProfileMIN } from "@/app/api/routeClients";
import { IConceptsInvoice } from "@/interfaces/Invoices"
import ConfirmSatInvoiceComponent from "./ConfirmSatInvoiceComponent"
import { ISatCompany, ISatConcept } from "@/interfaces/SatInvoice"

type Params = {
  showForm:(value: boolean) => void,
  isNew:boolean, 
  user:string, 
  token:string, 
}

export default function AddNewSatInvoiceComponent({showForm, user, token, isNew}: Params) {

  const [folio, setFolio] = useState<string>('');
  const [taxFolio, setTaxFolio] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [client, setClient] = useState<string>('');
  const [type, setType] = useState<string>('ADQUISICION_MERCANCIAS G01');
  const [methodPaid, setMethodPaid] = useState<string>('PAGO_EN_UNA_EXHIBICION PUE');
  const [formPaid, setFormPaid] = useState<string>('EFECTIVO 01');
  const [conditionPayment, setConditionPayment] = useState<string>('');
  const [odc, setOdc] = useState<string>('');
  const [project, setProject] = useState<string>('');

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);
  const [isVat, setIsVat]=useState<boolean>(true);

  const [subtotalInvoice, setSubtotalInvoice]=useState<number>(0);
  const [totalInvoice, setTotalInvoice]=useState<number>(0);
  const [vatT, setVatT]=useState<number>(0);
  const [discount, setDiscount]=useState<string>('0');
  const [vat, setVat]=useState<string>('16');

  const [satClient, setSatClient]=useState<ISatCLient>();
  // const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);
  const [conceptsInvoice, setConceptsInvoice]=useState<ISatConcept[]>([]);

  const handleAddNewConcept = (concept: any) => {
    console.log('concept => ', JSON.stringify(concept));
    setConceptsInvoice((prev) => [...prev, concept]);
    const nConcept=[...conceptsInvoice, concept];
    const t = nConcept.reduce((acumulador, item) => {
                return acumulador + (item.amount * item.quantity);
              }, 0);

    setSubtotalInvoice(t);
    const tinv= (t * Number(vat.replace(/[$,%]/g, "")?? 0.1)) / 100;
    setVatT(tinv);
    const totI= tinv + t - Number(discount.replace(/[$,%]/g, "")?? 0);
    setTotalInvoice(totI);
  }

  const [heightPage, setHeightPage] = useState<number>(900);

  const handleDiscount=(value:string) => {
    setDiscount(value);
  }

  const handleVat=(value:string) => {
    setVat(value);
  }

  async function handleSatCLient(idc:string){
    const res = await getClientTAXProfileMIN(token, idc);
    if(typeof(res)=='string'){
      showToastMessageError(res);
    }else{
      console.log('res sat cli => ', res[0]);
      setSatClient(res[0]);
    }
  }

  const handleClient = (value: string) => {
    setClient(value);
    handleSatCLient(value);
  }

  const handleProject = (value: string) => {
    setProject(value);
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

  // const handleFolio = (value:string) => {
  //   setFolio(value);
  // }

  // const handleTaxFolio = (value:string) => {
  //   setTaxFolio(value);
  // }

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

  // const handleBandFolio = (value:boolean) => {
  //   setBandFolio(value);
  // }

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

  useEffect(() => {
    const fetch = async() => {
      const [resfolio] = await Promise.all([
        getFOLIONEXT(token, '65d3813c74045152c0c4377e')
      ]);

      // console.log('res folio => ', resfolio);
      setFolio(resfolio);
    }

    if(isNew){
      fetch();
    }
  }, [isNew]);

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

  const saveInvoice = async (companySatData:ISatCompany) => {
    const val = validationData();

    showToastMessage('Timbrar factura...');

    console.log('items => ', conceptsInvoice);
    const items = conceptsInvoice.map((c: ISatConcept) => {
        return {
          itemCode: c.conceptEstimate.codesat,
          quantity: c.quantity,
          unitOfMeasurementCode: c.conceptEstimate.unitsat.id,
          description: c.conceptEstimate.description,
          unitPrice: c.priceConcepEstimate,
          taxObjectCode: "02",
          itemSku: "7506022301697",
          discount: 0,
          itemTaxes: [
            {
              taxCode: "002",      // IVA
              taxTypeCode: "Tasa", // Tasa
              taxRate: "0.160000", // 16%
              taxFlagCode: "T"     // Traslado
            }
          ]
        }
      });

      console.log('items 2 => ', items);

    if(val){
      const invoice = {
        // versionCode: "4.0",
        series: "F",
        // date: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ss"),
        date,
        paymentFormCode: "01",
        paymentMethodCode: "PUE",
        currencyCode: "MXN",
        typeCode: "I",
        expeditionZipCode: companySatData?.issuer.expeditionZipCode,
        exchangeRate: 1,
        exportCode: "01",
        issuer: {
          tin: companySatData?.issuer.tin,
          legalName: companySatData?.issuer.legalName,
          taxRegimeCode: "621",
          taxCredentials: companySatData?.issuer.taxCredentials,
        },
        recipient: {
          tin: satClient?.tin,
          legalName: satClient?.legalName,
          zipCode: satClient?.zipCode,
          taxRegimeCode: satClient?.taxRegimeCode,
          cfdiUseCode: "G01",
          // email: "someone@somewhere.com"
        },
        items
        // items: [
        //   {
        //     itemCode: "01010101",
        //     quantity: 9.5,
        //     unitOfMeasurementCode: "E48",
        //     description: "Invoicing software as a service",
        //     unitPrice: 3587.75,
        //     taxObjectCode: "02",
        //     itemSku: "7506022301697",
        //     discount: 255.85,
        //     itemTaxes: [
        //       {
        //         taxCode: "002",      // IVA
        //         taxTypeCode: "Tasa", // Tasa
        //         taxRate: "0.160000", // 16%
        //         taxFlagCode: "T"     // Traslado
        //       }
        //     ]
        //   }
        // ]
      };
      // const facturapi = new Facturapi('sk_test_tu_api_key');

      // const invoice = await facturapi.invoices.create({
      //   type: "I",
      //   customer: {
      //     legal_name: "Juan Pérez López",
      //     email: "juan@email.com",
      //     tax_id: "PELJ800101ABC",
      //     tax_system: "605",
      //     address: { zip: "78200" }
      //   },
      //   items: [{
      //     quantity: 1,
      //     product: {
      //       description: "Desarrollo de software",
      //       product_key: "81112100",
      //       price: 1000,
      //       taxes: [{ type: "IVA", rate: 0.16 }]
      //     }
      //   }],
      //   payment_form: "03",
      //   payment_method: "PUE",
      //   use: "G03"
      // });
      
      // El código postal del receptor es obligatorio (CFDI 4.0)
      // El régimen fiscal (tax_system) debe coincidir con el RFC
      // Usa correctamente las claves SAT (producto, uso, forma de pago)
      // Puedes guardar el customer previamente y solo mandar el id después
    }

    // const dataConcepts: any[] = [];
    // let amount: number = 0;
    // conceptsInvoice.map((c: any) => {
    //   dataConcepts.push({
    //       conceptEstimate:c.conceptEstimate._id,
    //       priceConcepEstimate:c.priceConcepEstimate,
    //       area:c.area,
    //       section:c.section,
    //       quantity:c.quantity,
    //       amount:c.amount,
    //       date:c.date,
    //       user:c.user
    //   });
    //   amount += c.amount;
    // });

    // if(val){
    //   const currentDate=new Date(date.substring(0, 10));
    //   const day=currentDate.getDay();
    //   const days = (conditionPayment=="67d20a6a59865f640af92588"? 0: 
    //           (conditionPayment=="67d20a8b59865f640af9258a"? 10: (conditionPayment=="67d20aa159865f640af9258c"? 15: 30)));
    //   const newDay =currentDate.setDate(day+days);
    //   const newDate=new Date(newDay);
    //   const data = {
    //     folio,
    //     taxfolio: taxFolio,
    //     date,
    //     useCFDI: type,
    //     paymentMethod: methodPaid,
    //     paymentWay: formPaid,
    //     user,
    //     client,
    //     project,
    //     company: '65d3813c74045152c0c4377e',
    //     concepts: dataConcepts,
    //     cost: {
    //       subtotal: amount, 
    //       iva: isVat? (amount * 0.16): 0,
    //       total: isVat? (amount * 1.16): amount,
    //     },
    //     condition: [
    //       {glossary:"67d20cb359865f640af92638", user}
    //     ],
    //     termsofpayment:conditionPayment,
    //     purchaseorder:odc,
    //     duedate:newDate.toISOString(),
    //     accountreceivables: [{
    //       previousbalanceamount: isVat? (amount * 1.16): amount,
    //       charged: 0,
    //       unchargedbalanceamount: isVat? (amount * 1.16): amount,
    //       partialitynumber: 0,
    //     }]
    //   }

    //   const resInvoice = await createInvoice(token, data);
    //   if(typeof(resInvoice)==='string'){
    //     showToastMessageError(resInvoice);
    //   }else{
    //     showToastMessage('Factura agregada satisfactoriamente!!');
    //     showForm(false);
    //   }
    // }
  }

  const component = (step===0? <DataBasicSatInvoiceStepper bandDate={bandDate} client={client} date={date}  
                        nextStep={handleStep} setClient={handleClient} setDate={handleDate} folio={folio} 
                        token={token} setBandDate={handleBandDate} project={project} setProject={handleProject} /> : 
                        (step===1? <SatInvoicesConditionsStepper 
                                  conditionPayment={conditionPayment} handleConditionPayment={handleConditionPayment}
                                  handleFormPaid={handleFormPaid} handleMethodPaid={handleMethodPaid} 
                                  handleType={handleType} nextStep={handleStep} token={token} 
                                  bandOdc={bandOdc} odc={odc} setOdc={handleOdc} setBandOdc={handleBandOdc} />: 
                                    (step==2? <ConceptsSatInvoiceStepperComponent nextStep={handleStep} handleAddConcept={handleAddNewConcept}
                                      token={token} user={user} conceptsInvoice={conceptsInvoice} 
                                      discount={discount} handleDiscount={handleDiscount} handleVat={handleVat} vat={vat} /> :
                                        <ConfirmSatInvoiceComponent client={satClient} concepts={conceptsInvoice} date={date}
                                              folio={folio} iva={vatT} subtotal={subtotalInvoice} 
                                              total={totalInvoice} token={token} saveInvoice={saveInvoice} />)))

  return (
    <>
      <form className="z-10 absolute w-full max-w-3xl bg-white space-y-5 p-5 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea factura"} 
            title={"Nueva factura"}
          />
          <TooltipCloseIcon handleClose={showForm} />
        </div>

        <NavInvoiceStepper index={step} setIndex={handleStep} />

        {component}
      </form>
    </>
  )
}
