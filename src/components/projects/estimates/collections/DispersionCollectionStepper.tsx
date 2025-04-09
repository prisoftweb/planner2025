'use client'
import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { showToastMessageError } from "@/components/Alert";

import { getInvoices } from "@/app/api/routeInvoices";
import { IInvoiceMin } from "@/interfaces/Invoices";
import { CurrencyFormatter } from "@/app/functions/Globals";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import CurrencyInput from "react-currency-input-field";
import Label from "@/components/Label";

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

export default function DispersionCollectionStepper({token, user, NextStep, invoicesDisp, 
    setInvoicesDisp, saveCollection, updateAmount}: 
  {token:string, user:string, NextStep:Function, invoicesDisp:TInvoiceStepper[], setInvoicesDisp:Function, 
    saveCollection:Function, updateAmount:Function}) {

  const [search, setSearch]=useState<string>('');
  const [invoices, setInvoices]=useState<TInvoiceStepper[]>([]);
  const [selected, setSelected]=useState<TInvoiceStepper>();
  const [amount, setAmount]=useState<string>('0');
  const [amountPending, setAmountPending]=useState<string>('0');

  useEffect(() => {
    const fetch = async() => {
      const res = await getInvoices(token);
      if(typeof(res)==='string'){
        showToastMessageError('Error al obtener facturas!!!');
      }else{
        const resI=transformTypes(res);
        setInvoices(resI);
      }
    }
    fetch();
  }, []);

  const filteredInvoices = search==''? invoices: invoices.filter((i) => i.folio.toString().includes(search));

  const addNewDispersion = () => {
    if(selected){
      const data: TInvoiceStepper = {
        id:selected?.id,
        folio: selected.folio,
        project: {
          id: selected.project.id,
          title: selected.project.title
        },
        total: Number(amount),
        totalPending: Number(amountPending),
        previousAmount: selected.previousAmount,
        concepts: selected.concepts
      }
      const i = [...invoicesDisp, data];
      updateAmount(i);
    }else{
      showToastMessageError('Seleccione una factura primero!!!!');
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-x-2">
        <div className="relative w-full p-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)} 
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 
              rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
              outline-0 outline-none 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar factura'} required ></input>
        </div>
      </div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {filteredInvoices.map((invoice) => (
            <div role="button"
              key={invoice.id}
              className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 ${invoice.id==selected?.id? 'bg-blue-500 text-white': ''}`}
              onClick={() => setSelected(invoice)}
            >
              <div className="flex items-center ">
                <div className="grid mr-4 place-items-center">
                  <img alt="responsable" src={ '/img/estimates/invoices.svg'}
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                </div>
                <div className={`w-full`}>
                  <div className="flex justify-between items-center">
                    <h6
                      className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-2xl text-blue-600">
                      {invoice.folio}
                    </h6>
                    <p className="text-slate-500 text-sm">{CurrencyFormatter({
                      currency: 'MXN',
                      value: invoice.total
                    })}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h6
                      className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-green-600">
                      {invoice.project.title}
                    </h6>
                    <p className="text-slate-500 text-sm">{invoice.concepts}</p>
                  </div>
                  {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {invoice.notes}
                  </p> */}
                </div>
              </div>
            </div>
          ))}

        </nav>
      </div>

      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {invoicesDisp.map((invoice) => (
            <div role="button"
              key={invoice.id}
              className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900`}
            >
              <div className="flex items-center ">
                <div className={`w-full`}>
                  <div className="flex justify-between items-center text-blue-100 border border-slate-500 rounded-t-md">
                    <h6
                      className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-2xl text-blue-600">
                      {invoice.folio}
                    </h6>
                    <p className="text-slate-500 text-sm">{CurrencyFormatter({
                      currency: 'MXN',
                      value: invoice.total
                    })}</p>
                  </div>
                  <div className="flex justify-between items-center border border-slate-500">
                    <h6
                      className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-green-600">
                      {invoice.project.title}
                    </h6>
                    <p className="text-slate-500 text-sm">{invoice.concepts}</p>
                  </div>
                  {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {invoice.notes}
                  </p> */}
                </div>
              </div>
            </div>
          ))}

        </nav>
      </div>

      <div className="grid grid-cols-7 items-center mt-3">
        <div className="col-span-3">
          <Label>Cobrado</Label>
          <CurrencyInput
            prefix="$"
            value={amount.replace(/[$,]/g, "")}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
          />
        </div>
        <div className="col-span-3">
          <Label>Por cobrar</Label>
          <CurrencyInput
            prefix="$"
            value={amountPending.replace(/[$,]/g, "")}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            onChange={(e) => setAmountPending(e.target.value.replace(/[$,]/g, "") || '0')}
          />
        </div>
        <PlusCircleIcon className="w-6 h-6 text-green-500 hover:text-green-300" 
          onClick={addNewDispersion}
        />
      </div>

      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => {
            NextStep(1); 
          }}>Atras</Button>
        <button type="button"
          onClick={() => saveCollection()}
          className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 
            border-slate-900 rounded-xl hover:bg-slate-200"
        >
          Guardar
        </button>         
      </div>
    </div>
  );
}

function transformTypes(invoiceFrom: IInvoiceMin[]){
  const invoiceTo: TInvoiceStepper[]=[];
  invoiceFrom.map((i) => {
    invoiceTo.push({
      total:i.cost.total,
      totalPending: i.cost.total,
      id:i._id,
      project: {
        id: typeof(i.project)==='string'? i.project: i.project._id,
        title: typeof(i.project)==='string'? i.project: i.project.title
      },
      folio: i.folio,
      concepts: i.paymentWay+' | '+ i.paymentMethod + ' | ' + i.useCFDI,
      previousAmount: i.cost.total
    });
  });
  return invoiceTo;
}