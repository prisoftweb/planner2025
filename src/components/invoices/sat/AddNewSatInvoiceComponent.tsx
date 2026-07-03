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
import { IResponseSatInvoice, ISatCompany, ISatConcept } from "@/interfaces/SatInvoice"
import { createFiscalApiInvoice } from "@/app/api/routeSatInvoices"

type Params = {
  showForm:(value: boolean) => void,
  isNew:boolean, 
  user:string, 
  token:string, 
  company:string,
  step:number,
  handleStep: (value: number) => void,
}

export default function AddNewSatInvoiceComponent({showForm, user, token, isNew, company, 
  handleStep, step}: Params) {

  const [folio, setFolio] = useState<string>('');
  // const [taxFolio, setTaxFolio] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [client, setClient] = useState<string>('');
  const [type, setType] = useState<string>();
  const [methodPaid, setMethodPaid] = useState<string>();
  const [formPaid, setFormPaid] = useState<string>();
  const [conditionPayment, setConditionPayment] = useState<string>('');
  const [condicionTPayment, setCondicionTPayment] = useState<string>('');
  const [odc, setOdc] = useState<string>('');
  const [project, setProject] = useState<string>('');

  const [labeFormPaid, setLabelFormPaid] = useState<string>('');
  const [labelMethodPaid, setLabelMethodPaid] = useState<string>('');
  const [labelType, setLabelType] = useState<string>('');
  const [labelConditionPayment, setLabelConditionPayment] = useState<string>('');
  const [labelCondicionPayment, setLabelCondicionPayment] = useState<string>('');

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  // const [step, setStep]=useState<number>(0);
  const [isVat, setIsVat]=useState<boolean>(true);

  const [subtotalInvoice, setSubtotalInvoice]=useState<number>(0);
  const [totalInvoice, setTotalInvoice]=useState<number>(0);
  const [vatT, setVatT]=useState<number>(0);
  const [discount, setDiscount]=useState<string>('0');
  const [vat, setVat]=useState<string>('16');

  const [satClient, setSatClient]=useState<ISatCLient>();
  // const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);
  const [conceptsInvoice, setConceptsInvoice]=useState<ISatConcept[]>([]);


  const handleLabelType = (value: string) => {
    setLabelType(value); 
  }

  const handleLabelMethodPaid = (value: string) => {
    setLabelMethodPaid(value);
  }

  const handleLabelFormPaid = (value: string) => {
    setLabelFormPaid(value);
  }

  const handleLabelConditionPayment = (value: string) => {
    setLabelConditionPayment(value);
    console.log('label condition payment => ', value);
  }

  const handleLabelCondicionPayment = (value: string) => {
    setLabelCondicionPayment(value);
  }

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
    // const res = await getClientTAXProfileMIN(token, '69f2ccb13b1b0672ab310b04');
    // const res = await getClientTAXProfileMIN(token, '69fbf97f3b1b0672ab319543');
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
    console.log('type => ', value);
    setType(value);
  }

  const handleMethodPaid = (value: string) => {
    setMethodPaid(value);
  }

  const handleFormPaid = (value: string) => {
    setFormPaid(value);
  }

  // const handleStep = (value: number) => {
  //   setStep(value);
  // }

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

  const handleCondicionTPayment = (value:string) => {
    setCondicionTPayment(value);
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

  // useEffect(() => {
  //   const fetch = async() => {
  //     const [resfolio] = await Promise.all([
  //       // getFOLIONEXT(token, '65d3813c74045152c0c4377e')
  //       getFOLIONEXT(token, company)
  //     ]);

  //     // console.log('res folio => ', resfolio);
  //     setFolio(resfolio);
  //   }

  //   if(isNew){
  //     fetch();
  //   }
  // }, [isNew]);

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

  const saveInvoice = async (companySatData:ISatCompany) => {
    // const val = validationData();
    const val = true;

    // showToastMessage('Timbrar factura...');

    // console.log('items => ', conceptsInvoice);
    const items = conceptsInvoice.map((c: ISatConcept) => {
        return {
          itemCode: c.conceptEstimate.codesat.toString(),
          quantity: c.quantity,
          unitOfMeasurementCode: c.conceptEstimate.unitsat.id,
          description: c.conceptEstimate.description,
          unitPrice: c.priceConcepEstimate.cost,
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

    if(val){
      const localString = (() => { const d = new Date(date); const now = new Date(); d.setHours(now.getHours(), now.getMinutes(), now.getSeconds()); return d.toLocaleString('sv-SE').replace(' ', 'T'); })();
      // console.log(localString);

      //   const dataConcepts: any[] = [];
      //   let amount: number = 0;
      //   conceptsInvoice.map((c: ISatConcept) => {
      //     dataConcepts.push({
      //         conceptEstimate:c.conceptEstimate._id,
      //         priceConcepEstimate:c.priceConcepEstimate,
      //         area:'sin area',
      //         section:'sin sección',
      //         quantity:c.quantity,
      //         amount:c.amount,
      //         date:c.date,
      //         user:c.user
      //     });
      //     amount += c.amount;
      //   });
      // const invoiceData = {
      //     // concepts: dataConcepts,
      //     folio:'f 200',
      //     // taxfolio: res.uuid,///////
      //     taxfolio: 'ESTA NO ES REAL',
      //     date,
      //     series: "F",
      //     // useCFDI: type?? '',
      //     // useCFDI: (conditionPayment?? '') + '-' + (labelConditionPayment?? ''),
      //     useCFDI: (labelConditionPayment?? ''),
      //     paymentMethod: (methodPaid?? '') + '-' + (labelMethodPaid?? ''),
      //     paymentWay: (formPaid?? '') + '-' + (labeFormPaid?? ''),
      //     user,
      //     client,
      //     project,
      //     company,
      //     concepts: dataConcepts,
      //     cost: {
      //       subtotal: subtotalInvoice, 
      //       iva: vatT,
      //       total: totalInvoice,
      //     },
      //     condition: [
      //       {glossary:"67d20cb359865f640af92638", user}
      //     ],
      //     // termsofpayment:conditionPayment,
      //     termsofpayment:condicionTPayment,
      //     purchaseorder:odc,
      //     accountreceivables: [{
      //       previousbalanceamount: totalInvoice,
      //       charged: 0,
      //       unchargedbalanceamount: totalInvoice,
      //       partialitynumber: 0,
      //     }],
      //     // sat:res.responses[0],
      //     typeofreceipts: type?? '' + (type=='I'? '- Ingreso': ''),
      //     typeInvoice: 'Timbrada'
      //   }
        
      //   console.log('invoice data => ', invoiceData);
      //   const resInvoice = await createInvoice(token, invoiceData);
      //   if(typeof(resInvoice)==='string'){
      //     showToastMessageError(resInvoice);
      //   }else{
      //     showToastMessage('Factura agregada satisfactoriamente!!');
      //     showForm(false);
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1500);
      //   }
      const invoice = {
        versionCode: "4.0",
        series: "F",
        date: localString,
        // paymentFormCode: "01",
        paymentFormCode: formPaid,
        // paymentMethodCode: "PUE",
        paymentMethodCode: methodPaid,
        currencyCode: "MXN",
        // typeCode: "I",
        typeCode: type,
        // expeditionZipCode: "42501",
        expeditionZipCode: companySatData?.issuer.expeditionZipCode.toString(),
        exchangeRate: 1,
        exportCode: "01",
        issuer: {
          tin: companySatData?.issuer.tin,
          legalName: companySatData?.issuer.legalName,
          taxRegimeCode: companySatData?.issuer.taxRegimeCode?? '',
          taxCredentials: companySatData?.issuer.taxCredentials,
        },
        recipient: {
          tin: satClient?.tin,
          legalName: satClient?.legalName,
          // zipCode: "0"+satClient?.zipCode.toString(),
          zipCode: satClient?.zipCode.toString(),
          taxRegimeCode: satClient?.taxRegimeCode,
          // taxRegimeCode: "621",
          // cfdiUseCode: "G01",
          cfdiUseCode: conditionPayment,
          // email: "someone@somewhere.com"
        },
        items
      };

      // console.log('invoice => ', invoice);

      const res: IResponseSatInvoice|string = await createFiscalApiInvoice(invoice);
      // const res=1;
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        // console.log('res create invoice => ', res);
        showToastMessage('Factura agregada satisfactoriamente!!');

        const dataConcepts: any[] = [];
        let amount: number = 0;
        conceptsInvoice.map((c: ISatConcept) => {
          dataConcepts.push({
              conceptEstimate:c.conceptEstimate._id,
              priceConcepEstimate:c.priceConcepEstimate,
              area:'sin area',
              section:'sin sección',
              quantity:c.quantity,
              amount:c.amount,
              date:c.date,
              user:c.user
          });
          amount += c.amount;
        });

        const index_=res.number.indexOf('-');
        let f='F ';
        if(index_ > 0){
          f+=res.number.substring(index_+1);
        }

        const invoiceData = {
          // concepts: dataConcepts,
          folio:f,
          taxfolio: res.uuid,///////
          // taxfolio: 'ESTA NO ES REAL',
          date,
          series: "F",
          // useCFDI: type?? '',
          // useCFDI: (conditionPayment?? '') + '-' + (labelConditionPayment?? ''),
          useCFDI: (labelConditionPayment?? ''),
          paymentMethod: (methodPaid?? '') + '-' + (labelMethodPaid?? ''),
          paymentWay: (formPaid?? '') + '-' + (labeFormPaid?? ''),
          user,
          client,
          project,
          company,
          concepts: dataConcepts,
          cost: {
            subtotal: subtotalInvoice, 
            iva: vatT,
            total: totalInvoice,
          },
          condition: [
            {glossary:"67d20cb359865f640af92638", user}
          ],
          // termsofpayment:conditionPayment,
          termsofpayment:condicionTPayment,
          purchaseorder:odc,
          accountreceivables: [{
            previousbalanceamount: totalInvoice,
            charged: 0,
            unchargedbalanceamount: totalInvoice,
            partialitynumber: 0,
          }],
          sat:res.responses[0],
          typeofreceipts: type?? '' + (type=='I'? '- Ingreso': ''),
          typeInvoice: 'Timbrada'
        }
        
        // console.log('invoice data => ', invoiceData);
        const resInvoice = await createInvoice(token, invoiceData);
        if(typeof(resInvoice)==='string'){
          showToastMessageError(resInvoice);
        }else{
          showToastMessage('Factura agregada satisfactoriamente!!');
          showForm(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        showForm(false);
      }
    }
  }

  const component = (step===0? <DataBasicSatInvoiceStepper bandDate={bandDate} client={client} date={date}  
                        nextStep={handleStep} setClient={handleClient} setDate={handleDate} folio={folio} 
                        token={token} setBandDate={handleBandDate} project={project} setProject={handleProject} /> : 
                        (step===1? <SatInvoicesConditionsStepper 
                                  conditionPayment={conditionPayment} handleConditionPayment={handleConditionPayment}
                                  handleFormPaid={handleFormPaid} handleMethodPaid={handleMethodPaid} 
                                  handleType={handleType} nextStep={handleStep} token={token} handleCondicionTPayment={handleCondicionTPayment}
                                  bandOdc={bandOdc} odc={odc} setOdc={handleOdc} setBandOdc={handleBandOdc}
                                  handleLabelFormPaid={handleLabelFormPaid} handleLabelMethodPaid={handleLabelMethodPaid}
                                  handleLabelType={handleLabelType} handleLabelConditionPayment={handleLabelConditionPayment}
                                  handleLabelCondicionPayment={handleLabelCondicionPayment} />: 
                                    (step==2? <ConceptsSatInvoiceStepperComponent nextStep={handleStep} handleAddConcept={handleAddNewConcept}
                                      token={token} user={user} conceptsInvoice={conceptsInvoice} company={company}
                                      discount={discount} handleDiscount={handleDiscount} handleVat={handleVat} vat={vat} /> :
                                        <ConfirmSatInvoiceComponent client={satClient} concepts={conceptsInvoice} date={date}
                                              folio={folio} iva={vatT} subtotal={subtotalInvoice} 
                                              total={totalInvoice} token={token} saveInvoice={saveInvoice}
                                              labelConditionPayment={labelConditionPayment} labelFormPaid={labeFormPaid}
                                              labelMethodPaid={labelMethodPaid} labelType={labelType} 
                                              companyParam={company} labelCondicion={labelCondicionPayment} />)))

  return (
    <>
      <form className={`z-10 absolute w-full bg-white space-y-5 p-5 right-0`}
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/invoices.svg" subtitle={"Crea factura"} 
            title={"Nueva factura"}
          />
          <TooltipCloseIcon handleClose={showForm} />
        </div>

        <NavInvoiceStepper index={step} setIndex={handleStep} isSat={1} />

        {component}
      </form>
    </>
  )
}
