import Label from "../Label";
import { OneProjectMin } from "@/interfaces/Projects";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { useOneProjectsStore } from "@/app/store/projectsStore";

import { IOneQuotationMin } from "@/interfaces/Quotations";
import Chip from "../providers/Chip";

export default function ProfileQuatation({quatation}: {quatation:IOneQuotationMin}){

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            <img src={'/img/projects/default.svg'} alt="logo" 
              className="max-w-28 h-auto" />
          </div>
          <div>
            <p className="text-blue-500">Cliente</p>
            <p className="text-slate-500">{quatation.client.name}</p>
            <p className="text-slate-500">Solicita</p>
            <p className="text-slate-500">{quatation.user.name}</p>
            <Chip label={quatation.condition[0].name} color={quatation.condition[0].color} />
          </div>
        </div>

        <div>
          <p>Vichisa fase II</p>
          <p>Cotizacion de fase II, muros exterior y plafones
              ciegos en cuarto de maquinas.</p>
        </div>
         
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2 my-2">
            <div className="">
              <p className="text-slate-500">Monto cotizado</p>
              <p className="text-green-600">{CurrencyFormatter({
                currency: 'MXN',
                value: quatation.amountotal
              })}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Tiempo de respuesta</p>
              <p>{''}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Fecha solicitud</p>
              <p className="text-slate-500">{quatation.shippingdate.substring(0, 10)}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Fecha envio</p>
              <p className="text-slate-500">{quatation.shippingdate.substring(0, 10)}</p>
            </div>
          </div>
        </div>
        {/*
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Fondo de garantia</p>
              <p className="text-blue-600">{oneProjectStore?.guaranteefund?.porcentage || '0'} %</p>
            </div>
            <div>
              <p className="text-slate-500">Monto</p>
              <p className="text-blue-600">{amountGuarantee}</p>
            </div>
          </div>
        </div>

        {project.hasamountChargeOff && (
          <div className="my-2 mt-2 bg-white p-3 rounded-lg 
              shadow-md py-2">
            <div className="grid grid-cols-2 gap-x-2">
              <div className="border-r-1 border-gray-700">
                <p className="text-slate-500">Anticipo</p>
                <p className="text-blue-600">{oneProjectStore?.amountChargeOff.porcentage || '0'} %</p>
              </div>
              <div>
                <p className="text-slate-500">Monto</p>
                <p className="text-blue-600">{CurrencyFormatter({
                  currency: 'MXN',
                  value: oneProjectStore?.amountChargeOff?.amount? parseFloat(oneProjectStore.amountChargeOff?.amount.toString()) : 0
                })}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 grid grid-cols-2 gap-x-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="mt-3">
            <Label>Direccion</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.stret || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Colonia</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.community || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Municipio</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.municipy || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Codigo Postal</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.cp || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Estado</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.state || '' }</p>
          </div>
          <div className="mt-3">
            <Label>Pais</Label>
            <p className="my-0 text-slate-700">{oneProjectStore?.location?.country || '' }</p>
          </div>
        </div> */}
      </div>
    </>
  )
}