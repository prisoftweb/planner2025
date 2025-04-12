import { CurrencyFormatter } from "@/app/functions/Globals";
import { IOneCollectionMin, IInvoicesByCollection } from "@/interfaces/Collections";
import { FaFileInvoiceDollar } from "react-icons/fa6";

export default function ListInvoicesCollection({collection, invoices}: 
  {collection:IOneCollectionMin, invoices:IInvoicesByCollection[]}){

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2 border-b border-black">
            <div>
              <img src={'/img/estimates/quotations.svg'} alt="logo" className="w-full max-w-28 h-auto rounded-sm" />
            </div>
            <div>
              <p className="text-slate-500">{'Detalles de un cobro '+ collection.reference}</p>
              <p className="text-blue-500 text-lg">Listado de facturas a las cuales se disperso el cobro</p>
            </div>
          </div>

          {/* <div className="flex gap-x-2 justify-between items-end mt-2">
            <div>
              <p className="text-slate-500">Factura</p>
              <p className="text-green-500 text-lg">{collection.invoices[0].invoice}</p>
            </div>
            <div>
              <p className="text-green-500">{collection?.date?.substring(0, 10)}</p>
              <p className="text-slate-500 text-lg">Fecha</p>
            </div>
          </div> */}
        </div>

        {invoices.map((invoice) => (
          <div role="button"
            key={invoice._id}
            className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
              outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
              active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 text-white`}
          >
            <div className="flex items-center w-full">
              <div className="grid mr-4 place-items-center">
                {/* <img alt="responsable" src={ '/img/estimates/invoices.svg'}
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
                <FaFileInvoiceDollar className={`h-6 w-6 ${invoice.paymentInInvoice.ischargedfull? 'text-green-500': 'text-red-500'}`} />
              </div>
              <div className={`w-full`}>
                <div className="flex justify-between items-center">
                  <h6
                    className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-2xl text-blue-600">
                    {invoice.paymentInInvoice.folio}
                  </h6>
                  <p className="text-slate-500 text-sm">{CurrencyFormatter({
                    currency: 'MXN',
                    value: invoice.paymentInInvoice.total
                  })}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h6
                    className="block font-sans antialiased font-semibold leading-relaxed tracking-normal text-green-600">
                    {invoice.paymentInInvoice.project}
                  </h6>
                  <p className="text-slate-500 text-sm">{invoice.paymentInInvoice.taxfolio}</p>
                </div>
                {/* <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                  {invoice.notes}
                </p> */}
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}