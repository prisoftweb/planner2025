import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "@/components/providers/Chip";
import { IOneCollectionMin } from "@/interfaces/Collections";

export default function ProfileCollection({collection}: {collection:IOneCollectionMin}){

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              <img src={'/img/estimates/quotations.svg'} alt="logo" className="w-full max-w-28 h-auto rounded-sm" />
            </div>
            <div className="w-full">
              <p className="text-slate-500">Proyecto?</p>
              <div className="flex gap-x-2 w-full justify-between">
                <p className="text-blue-500 text-lg">{collection?.client?.name || ''}</p>
                <Chip label={collection.condition[0].name} color={collection.condition[0].color} />
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 justify-between items-end mt-2">
            <div>
              <p className="text-slate-500">Factura</p>
              <p className="text-green-500 text-lg">{collection.invoices[0].invoice}</p>
            </div>
            <div>
              <p className="text-green-500 text-right">{collection?.date?.substring(0, 10)}</p>
              <p className="text-slate-500 text-lg text-right">Fecha</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <p className="text-blue-500">{collection?.reference}</p>
          <p className="text-slate-500 text-xs">{collection.concept}</p>
        </div>
         
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="border border-slate-500 p-1">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 my-2">
              <div className="">
                <p className="text-slate-500">Monto cobrado</p>
                <p className="text-green-600">{CurrencyFormatter({
                  currency: 'MXN',
                  value: collection.amount
                })}</p>
              </div>
              {/* <div className="">
                <p className="text-slate-500">Por cobrar</p>
                <p className="text-red-600">{CurrencyFormatter({
                  currency: 'MXN',
                  value: 0
                })}</p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-md mt-2">
          <div className="flex gap-x-2">
            <div>
              <img src={collection.user?.photo || '/img/users/default.jpg'} alt="logo" className="w-full rounded-3xl max-w-14 h-auto" />
            </div>
            <div>
              <p className="text-slate-400">Realiza</p>
              <p className="text-blue-500 text-lg">{collection.user.name}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}