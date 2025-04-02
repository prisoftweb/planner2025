import { useState, useEffect } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import Button from "@/components/Button";
import CurrencyInput from "react-currency-input-field";
import { IConceptEstimate } from "@/interfaces/Estimate";
import { getAllConceptsEstimateMin } from "@/app/api/routeEstimates";
import { TableEstimatesProject } from "@/interfaces/Estimate";

type DataBasicProps={
  token:string,
  nextStep:Function,
  idEstimate:string,
  estimate:TableEstimatesProject | undefined
  saveInvoice:Function
}

export default function ConceptsInvoiceStepper({token, nextStep, idEstimate, estimate, saveInvoice}: DataBasicProps) {

  const [conceptsEstimate, setConceptsEstimate]=useState<IConceptEstimate[]>([]);  

  useEffect(() => {
    const fetch = async () => {
      const cons = await getAllConceptsEstimateMin(token, idEstimate);
      console.log('concetps estimate => ', cons);
      if(typeof(cons)==='string'){
        showToastMessageError(cons);
      }else{
        setConceptsEstimate(cons);
      }
    }
    fetch();
  }, []);

  return (
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
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
      </div>

      <div className="grid grid-cols-3 gap-x-2">
        <div className="">
          <Label htmlFor="subtotal"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
          <CurrencyInput
            id="subtotal"
            name="subtotal"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
              focus:border-slate-700 outline-0"
            // value={subtotal}
            value={estimate?.MontoPay.toFixed(2)}
            decimalsLimit={2}
            disabled
            prefix="$"
            // onValueChange={(value) => {try {
            //   updateAmounts(value?.replace(/[$,]/g, "") || '0');
            //   // setSubTotal(value?.replace(/[$,]/g, "") || '0');
            // } catch (error) {
            //   updateAmounts('0');
            //   // setSubTotal('0');
            // }}}
          />
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
            // onValueChange={(value) => {try {
            //   updateAmounts(value?.replace(/[$,]/g, "") || '0');
            //   // setSubTotal(value?.replace(/[$,]/g, "") || '0');
            // } catch (error) {
            //   updateAmounts('0');
            //   // setSubTotal('0');
            // }}}
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
            // onValueChange={(value) => {try {
            //   updateAmounts(value?.replace(/[$,]/g, "") || '0');
            //   // setSubTotal(value?.replace(/[$,]/g, "") || '0');
            // } catch (error) {
            //   updateAmounts('0');
            //   // setSubTotal('0');
            // }}}
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
            value={((estimate?.amountVat || 0) - (estimate?.MontoPay || 0)).toFixed(2)}
            disabled
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              // setVat(value?.replace(/[$,]/g, "") || '0');
            } catch (error) {
              // setVat('0');
            }}}
          />
        </div>

        <div className="">
          <Label htmlFor="total"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Total</p></Label>
          <CurrencyInput
            id="total"
            name="total"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
              focus:border-slate-700 outline-0"
            // value={total}
            value={estimate?.amountVat.toFixed(2)}
            decimalsLimit={2}
            prefix="$"
            disabled
            onValueChange={(value) => {try {
              // setTotal(value?.replace(/[$,]/g, "") || '0');
            } catch (error) {
              // setTotal('0');
            }}}
          />
        </div>
      </div>

      <div className="flex justify-center gap-x-2">
        <button
          className="text-black border border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
          onClick={() => nextStep(1)}
        >
          Atras
        </button>
        <Button type="button" onClick={() => saveInvoice()}>Guardar</Button>
      </div>
    </div>
  )
}
