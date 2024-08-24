import IconText from "./IconText";
import { Provider } from "@/interfaces/Providers";
import { useOneProviderStore } from "@/app/store/providerStore";

export default function ProfileProvider(){
  
  const {oneProviderStore} = useOneProviderStore();

  return(
    <>
      <div className="h-full">
        <div className="bg-white p-3 rounded-lg shadow-md mt-3 flex flex-col items-center w-full">
          <div className="flex items-end">
            <IconText text={oneProviderStore?.tradename || ''} size="w-20 h-20" sizeText="text-3xl" />
            <div className={`w-4 h-4 ${oneProviderStore?.suppliercredit? 'bg-green-500': 'bg-red-500'}`} />
          </div>
          <p className="text-xl text-gray-800 text-center">{oneProviderStore?.name}</p>
          <p className="text-sm text-gray-500 leading-5 md:leading-6">{oneProviderStore?.tradename}</p>
          <p className="text-sm text-gray-500 leading-5 md:leading-6">{oneProviderStore?.rfc}</p>
          <p className="text-sm text-gray-500 leading-5 md:leading-6">{oneProviderStore?.account}</p>
        </div>
        <div className="flex justify-center bg-white p-3 rounded-lg shadow-md mt-3">
          <div className="flex pl-4 text-center">
            <div className="w-40 border border-slate-300">
              <div className="flex w-40">
                <div className="w-1/2 bg-green-600">
                  <p className="text-white">{oneProviderStore?.tradeline.creditdays} days</p>
                </div>
                <div className="w-1/2 bg-slate-100">
                  <p>{oneProviderStore?.tradeline.percentoverduedebt} %</p>
                </div>
              </div>
              <div className="w-40">
                <p>$ {oneProviderStore?.tradeline.currentbalance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-white p-3 rounded-lg shadow-md mt-3">
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center mt-3 ${option===1? 'bg-slate-200': ''}`}
          onClick={() => changeOption(1)}
        >
          <Squares2X2Icon className="w-4 h-4 mr-2 text-slate-500" />
          Resumen
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}  
        >
          <CalendarDaysIcon className="w-4 h-4 mr-2 text-slate-500" />
          Datos basicos
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <CreditCardIcon className="w-4 h-4 mr-2 text-slate-500" />
          Linea de credito
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer
          flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
          onClick={() => changeOption(4)}
        >
          <IdentificationIcon className="w-4 h-4 mr-2 text-slate-500" />
          Contactos
        </div>
      </div> */}
    </>
  )
}