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
import DataBasicStepper from "./DataBasicStepper"
import InvoicesConditionsStepper from "./InvoicesConditionsStepper"
import ConceptsInvoiceStepper from "./ConceptsInvoceStepper"
import NavInvoiceStepper from "./NavInvoiceStepper"

export default function AddNewInvoiceComponent({showForm, updateEstimates, user, token, 
    estimate, project}: 
  {showForm:Function, updateEstimates:Function, user:string, token:string, 
    estimate:TableEstimatesProject | undefined, project:OneProjectMin}) {
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

  // const [conceptsEstimate, setConceptsEstimate] = useState<IConceptEstimate[]>([]);

  const [bandFolio, setBandFolio] = useState<boolean>(false);
  const [bandTaxFolio, setBandTaxFolio] = useState<boolean>(false);
  // const [bandSubtotal, setBandSubTotal] = useState<boolean>(false);
  // const [bandVat, setBandVat] = useState<boolean>(false);
  // const [bandTotal, setBandTotal] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandOdc, setBandOdc] = useState<boolean>(false);

  const [step, setStep]=useState<number>(0);

  // useEffect(() => {
  //   const fetch = async () => {
  //     // const clients = await getClientsLV(token);
  //     // if(typeof(clients)==='string'){
  //     //   showToastMessageError(clients);
  //     // }else{
  //     //   setOptClients(clients);
  //     // }
  //     // const cons = await await getConeptsEstimate(token, '');
  //     console.log('estimate => ', estimate?.id);
  //     // const cons = await getAllConceptsEstimateMin(token, (estimate?.id || ''));
  //     // console.log('concetps estimate => ', cons);
  //     // if(typeof(cons)==='string'){
  //     //   showToastMessageError(cons);
  //     // }else{
  //     //   setConceptsEstimate(cons);
  //     // }
  //   }
  //   fetch();
  // }, []);

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
    console.log('in validation');
    if(!folio || folio===''){
      console.log('no folio');
      setBandFolio(true);
      validation = false;
      return false;
    }else{
      setBandFolio(false);
    }
    if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
      setBandTaxFolio(true);
      console.log('no tax folio');
      validation = false;
      return false;
    }else{
      setBandTaxFolio(false);
    }
    if(!date || date===''){
      console.log('no date');
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(!odc || odc.trim()===''){
      setBandOdc(true);
      console.log('no odc');
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    // if(!subtotal || subtotal===''){
    //   setBandSubTotal(true);
    //   validation = false;
    // }else{
    //   setBandSubTotal(false);
    // }
    // if(!vat || vat===''){
    //   setBandVat(true);
    //   validation = false;
    // }else{
    //   setBandVat(false);
    // }
    // if(!total || total===''){
    //   setBandTotal(true);
    //   validation = false;
    // }else{
    //   setBandTotal(false);
    // }
    return validation;
  }

  const saveInvoice = async () => {
    console.log('on save invoice => ');
    const val = validationData();

    if(val && estimate){
      console.log('validation => ');
      const res: IEstimateMin = await getEstimateMin(token, estimate?.id);
      if(typeof(res)==='string'){
        showToastMessageError('Error al obtener los conceptos de la estimacion..');
      }else{
        const currentDate=new Date(date.substring(0, 10));
        console.log('current date => ', currentDate);
        const day=currentDate.getDay();
        const days = (conditionPayment=="67d20a6a59865f640af92588"? 0: 
                (conditionPayment=="67d20a8b59865f640af9258a"? 10: (conditionPayment=="67d20aa159865f640af9258c"? 15: 30)));
        console.log('day => ', day, ' day new => ', (day+7));
        const newDay =currentDate.setDate(day+days);
        console.log('new day => ', newDay);
        const newDate=new Date(newDay);
        console.log('new date => ', newDate);
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
            subtotal: estimate.Estimacion, 
            iva: estimate.Estimacion * 0.16,
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

        // console.log('create invoice => ', JSON.stringify(data));
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

  // const updateAmounts = (value: string) => {
  //   const val = Number(value.replace(/[$,]/g, ""));
  //   const v = val * 0.16;
  //   // setSubTotal(val.toString());
  //   // setVat(v.toString());
  //   // setTotal((val + v).toString());
  // }

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

        {/* <div className="bg-white p-3 grid grid-cols-6 gap-x-2 gap-y-2"> */}
          {/* {optClients.length > 0 && (
            <div className=" col-span-3">
              <div className="flex items-center gap-x-2 justify-between">
                <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input checked={editClient} 
                    onClick={() => setEditClient(!editClient)} id="editClient" type="checkbox"
                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                      appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                      peer-checked:border-green-500 peer-checked:before:bg-green-500
                      border border-slate-300" />
                  <label htmlFor="editClient"
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                      data-ripple-dark="true"></div>
                  </label>
                </div>
              </div>
              <SelectReact index={indexCLi} opts={optClients} setValue={handleClient} disabled={!editClient} />
            </div>
          )}
          
          <div className=" col-span-3">
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} autoFocus />
            {bandDate && (
              <p className="text-red-700">Ingrese una fecha valida!!!!</p>
            )}
          </div>

          <div className=" col-span-2">
            <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
            <Input type="text" value={folio} onChange={(e) => setFolio(e.target.value)} />
            {bandFolio && (
              <p className="text-red-700">Ingrese un folio valido!!!!</p>
            )}
          </div>

          <div className=" col-span-4">
            <Label htmlFor="taxfolio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio fiscal</p></Label>
            <Input type="text" value={taxFolio} onChange={(e) => setTaxFolio(e.target.value)} />
            {bandTaxFolio && (
              <p className="text-red-700">Ingrese un folio fiscal valido!!!!</p>
            )}
          </div> */}

          {/* {catalogPaymentMethod && (
            <div className=" col-span-3">
              <Label htmlFor="methodPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Metodo de pago</p></Label>
              <SelectReact index={0} opts={catalogPaymentMethod} setValue={handleMethodPaid} />
            </div>
          )}

          {catalogFormPayment && (
            <div className=" col-span-3">
              <Label htmlFor="formPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Forma de pago</p></Label>
              <SelectReact index={0} opts={catalogFormPayment} setValue={handleFormPaid} />
            </div>
          )}

          {catalogCFDI.length > 0 && (
            <div className=" col-span-6">
              <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
              <SelectReact index={0} opts={catalogCFDI} setValue={handleType} />
            </div>
          )} */}

        {/* </div> */}

        {/* <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
          <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
              overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
            {conceptsEstimate.map((conce) => (
              <div role="button"
                key={conce.conceptEstimate._id}
                className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300"
              >
                <div className="flex items-center ">
                  <div className="grid mr-4 place-items-center">
                    <img alt="responsable" src={ conce.user?.photo || '/img/users/default.jpg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h6
                        className="block font-sans text-lg antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {conce.conceptEstimate.name}
                      </h6>
                      <p className="text-slate-500 text-sm">{conce.conceptEstimate.code}</p>
                    </div>
                    <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                      {conce.conceptEstimate.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </nav>
        </div> */}

        {/* <div className="grid grid-cols-3 gap-x-2">
          <div className="">
            <Label htmlFor="subtotal"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            <CurrencyInput
              id="subtotal"
              name="subtotal"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              // value={subtotal}
              value={estimate?.Estimacion}
              decimalsLimit={2}
              disabled
              prefix="$"
              onValueChange={(value) => {try {
                updateAmounts(value?.replace(/[$,]/g, "") || '0');
                // setSubTotal(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                updateAmounts('0');
                // setSubTotal('0');
              }}}
            />
            {bandSubtotal && (
              <p className="text-red-700">Ingrese un monto valido!!!!</p>
            )}
          </div>

          <div className="">
            <Label htmlFor="amortization"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Amortizacion</p></Label>
            <CurrencyInput
              id="amortization"
              name="amortization"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={estimate?.Amortizacion}
              disabled
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                updateAmounts(value?.replace(/[$,]/g, "") || '0');
                // setSubTotal(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                updateAmounts('0');
                // setSubTotal('0');
              }}}
            />
          </div>

          <div className="">
            <Label htmlFor="guarantee"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fondo de garantia</p></Label>
            <CurrencyInput
              id="guarantee"
              name="guarantee"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={estimate?.Fondo}
              decimalsLimit={2}
              disabled
              prefix="$"
              onValueChange={(value) => {try {
                updateAmounts(value?.replace(/[$,]/g, "") || '0');
                // setSubTotal(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                updateAmounts('0');
                // setSubTotal('0');
              }}}
            />
          </div>

          <div className="">
            <Label htmlFor="vat"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Iva</p></Label>
            <CurrencyInput
              id="vat"
              name="vat"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              // value={vat}
              value={(estimate?.Estimacion || 0) * 0.16}
              disabled
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                // setVat(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                // setVat('0');
              }}}
            />
            {bandVat && (
              <p className="text-red-700">Ingrese un iva valido!!!!</p>
            )}
          </div>

          <div className="">
            <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
            <CurrencyInput
              id="total"
              name="total"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              // value={total}
              value={estimate?.amountVat}
              decimalsLimit={2}
              prefix="$"
              disabled
              onValueChange={(value) => {try {
                // setTotal(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                // setTotal('0');
              }}}
            />
            {bandTotal && (
              <p className="text-red-700">Ingrese un total valido!!!!</p>
            )}
          </div>
        </div> */}
        {component}
        {/* <div className="flex justify-center mt-2">
          <Button type="button" onClick={saveInvoice}>Guardar</Button>
        </div> */}
      </form>
    </>
  )
}