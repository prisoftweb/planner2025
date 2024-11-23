import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useState, useEffect, useRef } from "react";
import { showToastMessageError } from "../Alert";
import { createNewProvider } from "@/app/api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { Options } from "@/interfaces/Common";
import { useOutsideClick } from "@/app/functions/useOutsideClick";
import { CostsPaymentTable } from "@/interfaces/Providers";
import CurrencyInput from "react-currency-input-field";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function NewPartialCost({setShowForm, updateCost, cost}: {setShowForm:Function, updateCost:Function, cost: CostsPaymentTable}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [previousImport, setPreviosImport] = useState<string>(cost.Total.replace(/[$,",", M, X]/g, ""));
  const [paid, setPaid] = useState<string>(cost.paid.toString());
  const [pending, setPending] = useState<string>(cost.pending.toString());
  const [numPartial, setNumPartial] = useState<number>(cost.parciality);
  const refRequest = useRef(true);

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  const update = () => {
    const costAux: CostsPaymentTable = {
      archivos: cost.archivos,
      conceptCostoCenter: cost.conceptCostoCenter,
      condition: cost.condition,
      discount: cost.discount,
      Fecha: cost.Fecha,
      folio: cost.folio,
      folioFiscal: cost.folioFiscal,
      id: cost.id,
      isPaid: cost.isPaid,
      iva: cost.iva,
      Responsable: cost.Responsable,
      typeCFDI: cost.typeCFDI,
      Importe: cost.Importe,
      paid: Number(paid.replace(/[$,",", M, X]/g, "")),
      parciality: numPartial,
      pending: Number(pending.replace(/[$,",", M, X]/g, "")),
      Total: CurrencyFormatter({
        currency: 'MXN',
        value: Number(previousImport.replace(/[$,",", M, X]/g, ""))
      })
    }

    updateCost(costAux);
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

  const ref = useOutsideClick(() => {
    setShowForm(false);
  });

  return(
    <div className="w-full z-50 sm:max-w-lg absolute top-0 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}} 
      ref={ref}
    >
      <HeaderForm img="/img/payments/payments.svg" subtitle="Agrega parcialidad a una factura" 
        title="Agregar parcialidad"
      />
      <div className="shadow-md shadow-slate-500 m-3 p-3">
        <Label htmlFor="concept">{cost.conceptCostoCenter}</Label>
        <Label htmlFor="taxFolio">{cost.folioFiscal}</Label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <Label htmlFor="importe">{'Importe'}</Label>
            <p className="text-md text-green-500">{cost.Importe}</p>
          </div>
          <div>
            <Label htmlFor="discount">{'Descuento'}</Label>
            <p className="text-md text-red-500">{CurrencyFormatter({
              currency: 'MXN',
              value: cost.discount
            })}</p>
          </div>
          <div>
            <Label htmlFor="Iva">{'Iva'}</Label>
            <p className="text-md text-blue-500">{CurrencyFormatter({
              currency: 'MXN',
              value: cost.iva
            })}</p>
          </div>
          <div>
            <Label htmlFor="total">{'Total'}</Label>
            <p className="text-md text-red-500">{cost.Total}</p>
          </div>
        </div>
      </div>
      <div className="shadow-md shadow-slate-500 m-3 p-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <Label htmlFor="typecfdi">Tipo de CFDI</Label>
            <p className="text-md text-blue-500">{cost.typeCFDI}</p>
          </div>
          <div>
            <Label htmlFor="typecfdi">Fecha</Label>
            <p className="text-md text-blue-500">{cost.Fecha.substring(0, 10)}</p>
          </div>
        </div>
      </div>
      <form className="mt-4 max-w-md rounded-lg grid grid-cols-2 gap-x-3 gap-y-3">
        <div>
          <Label htmlFor="previousImport"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe Saldo anterior</p></Label>
          <CurrencyInput
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0" 
            value={previousImport}
            onChange={(e) => setPreviosImport(e.target.value.replace(/[$,",", M, X]/g, ""))}
          />
        </div>
        <div>
          <Label htmlFor="paid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pago</p></Label>
          <CurrencyInput
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0" 
            value={paid}
            onChange={(e) => setPaid(e.target.value.replace(/[$,",", M, X]/g, ""))}
          />
        </div>
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe Saldo insoluto</p></Label>
          <CurrencyInput
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
              focus:border-slate-700 outline-0" 
            value={pending}
            onChange={(e) => setPending(e.target.value.replace(/[$,",", M, X]/g, ""))}
          />
        </div>
        <div>
          <Label htmlFor="npartial"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Numero de parcialidad</p></Label>
          <Input 
            value={numPartial}
            onChange={(e) => setNumPartial(Number(e.target.value.replace(/[$,",", M, X]/g, "")))}
          />
        </div>
      </form>
      <div className="flex justify-center mt-8 space-x-5">
        <button type="button"
          className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
          hover:bg-slate-200"
          onClick={() => setShowForm(false)}
        >
          Cancelar
        </button>
        <Button type="button" onClick={update}>Guardar</Button>
      </div>
    </div>
  )
}