'use client'
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { IOneCollectionMin } from "@/interfaces/Collections";
import Button from "@/components/Button";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { insertConditionInCollection } from "@/app/api/routeCollections";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { getCollectionMin } from "@/app/api/routeCollections";
import { useState } from "react";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function ProfileCollection({collection, token, user, permissions}: 
  {collection:IOneCollectionMin, token:string, user:string, permissions:IPermissionsAndComponents}){

  const [oneCollection, setOneCollection]=useState<IOneCollectionMin>(collection);

  const isDeposited = oneCollection.condition[oneCollection.condition.length-1].name.toLowerCase().includes('depositado');

  const updateCollection = async () => {
    let col:IOneCollectionMin = await getCollectionMin(token, oneCollection._id);
    if(typeof(col)==='string'){
      showToastMessageError(col);
    }else{
      setOneCollection(col);
    }
  }

  const updateStatusCollection = async () => {
    const data = {
      condition: [
        {
          glossary: "67e318601945c0b1e4c9bc74",
          user
        }
      ]
    }
    const res = await insertConditionInCollection(token, data, oneCollection._id);
    if(typeof(res)==='string'){
      showToastMessageError(res);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }else{
      showToastMessage('Cobro devuelto satisfactoriamente!!!');
      updateCollection();
    }
  }

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={'/img/estimates/quotations.svg'} alt="logo" className="w-full max-w-28 h-auto rounded-sm" />
            </div>
            <div className="w-full">
              <p className="text-slate-500">Proyecto</p>
              <div className="flex gap-x-2 w-full justify-between">
                <p className="text-blue-500 text-lg">{oneCollection?.client?.name || ''}</p>
                <Chip label={oneCollection.condition[0].name} color={oneCollection.condition[0].color}
                    darktext={oneCollection?.condition[0]?.darktext?? false} />
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 justify-between items-end mt-2">
            <div>
              <p className="text-slate-500">ID Cobranza</p>
              <p className="text-green-500 text-lg">{oneCollection.invoices[0].invoice}</p>
            </div>
            <div>
              <p className="text-slate-500 text-lg text-right">Fecha</p>
              <p className="text-green-500 text-right">{oneCollection?.date?.substring(0, 10)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <p className="text-blue-500">{oneCollection?.reference}</p>
          <p className="text-slate-500 text-xs">{oneCollection.concept}</p>
        </div>
         
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="border border-slate-500 p-1">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto cobrado</p>
                <p className="text-green-600">{CurrencyFormatter({
                  currency: 'MXN',
                  value: oneCollection.amount
                })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <div className="flex gap-x-2">
            <div>
              <img src={oneCollection.user?.photo || '/img/users/default.jpg'} alt="logo" className="w-full rounded-3xl max-w-14 h-auto" />
            </div>
            <div>
              <p className="text-slate-400">Realiza</p>
              <p className="text-blue-500 text-lg">{oneCollection.user.name}</p>
            </div>
          </div>
        </div>

        {isDeposited && permissions.components.includes('refundpayment') && (
          <div className="bg-white p-3 rounded-lg shadow-md mt-2">
            <div className="flex gap-x-2 justify-center">
              <button
                className="text-white font-normal text-sm bg-red-700 rounded-xl w-36 h-9 py-2 hover:bg-red-500"
                onClick={updateStatusCollection}
              >
                <div className="flex gap-x-2 justify-center items-center">
                  <CheckCircleIcon className="text-green-500 w-6 h-6" />
                  Devolver pago
                </div>
              </button>
            </div>

            <div className="flex gap-x-2 justify-center items-center mt-2">
              <LockClosedIcon className="text-slate-500 w-6 h-6" />
              <div>
                <p className="text-slate-300 text-xs">SE CAMBIA EL ESTATUS DEL PAGO Y SE VALIDA DESDE</p>
                <p className="text-slate-300 text-xs">EL ESTADO DE CUENTA ASIGNADO</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}