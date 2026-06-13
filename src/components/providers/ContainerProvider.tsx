'use client'

import { Provider } from "@/interfaces/Providers"
import Navigation from "../navigation/Navigation"
import { UsrBack } from "@/interfaces/User"
import WithOutProvider from "./WithoutProvider"
import ButtonNewProvider from "./ButtonNewProvider"
// import Header from "../Header"
import TableProviders from "./TableProviders"
import { useProviderStore } from "@/app/store/providerStore"
import { useEffect, useState } from "react"
import { TableProvider } from "@/interfaces/Providers"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Label from "../Label"
import SearchInTable from "../SearchInTable"
import Link from "next/link"
import { Tooltip } from "@nextui-org/react"
import { TbArrowNarrowLeft } from "react-icons/tb"
import { propsTooltip } from "@/libs/animations"
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { BsFileEarmarkPdf } from "react-icons/bs";
import DownloadProvidersReportPDF from "./DownloadProvidersReportPDF"
import { Company } from "@/interfaces/Companies"

type ContainerProps={
  providers: Provider[], 
  user:UsrBack, 
  token:string,
  company:Company
}

export default function ContainerProvider({providers, user, token, company}: ContainerProps ){

  const {providerStore, updateProviderStore} = useProviderStore();
  const [isCreditLine, setIsCreditLine]=useState<boolean>(true);
  const [isBankData, setIsBankData]=useState<boolean>(false);

  useEffect(() => {
    updateProviderStore(providers);
  }, []);

  console.log('providers data => ', providers);
  
  if(providerStore.length <= 0 && (providers.length === 0 || !providers)){
    return (
      <div>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
          <WithOutProvider id={user._id} token={token} company={user.profile} />
        </div>
      </div>
    )      
  }

  let data:TableProvider[] = [];
  if(Array.isArray(providerStore)){
    providerStore.map((prov:Provider) => {

      let nc = 0;
      if(prov.contact) nc = prov.contact.length;
      
      const dollar = CurrencyFormatter({
        currency: "MXN",
        value: prov.tradeline.currentbalance || 0
      })

      data.push({
        'id': prov._id,
        'name': prov.name,
        rfc: prov.rfc,
        currentbalance: dollar,
        account: prov.account,
        // account: prov?.account?._id?? '',
        suppliercredit: prov.suppliercredit,
        contacts: nc,
        tradename: prov.tradename || ' ',
        bankdetails: prov.bankdetails,
        email: prov?.email?? '',
        phone: prov?.phone?? '',
        type: prov?.type?? ''
      })
    })
  }

  const dataFilter=data.filter(p => p.suppliercredit==isCreditLine && p.bankdetails==isBankData);

  const handleDownload = async () => {
    const blob = await pdf(
      <DownloadProvidersReportPDF providers={providers} satCompany={company} />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Proveedores.pdf';
    link.click();

    URL.revokeObjectURL(url);
  };
  
  return(
    <>
      <Navigation user={user} token={token} />
      
      <div className="p-2 sm:p-3 md:p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
        {/* <HeaderProvider title="Proveedores" placeHolder="Buscar proveedor..">
          <div className="flex items-center gap-x-4">
            <div className="inline-flex items-center">
              <Label>Linea de credito</Label>  
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input checked={isCreditLine} 
                  onClick={() => setIsCreditLine(!isCreditLine)} id="cline" type="checkbox"
                  // onChange={() => console.log('')}
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                    appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                    peer-checked:border-green-500 peer-checked:before:bg-green-500
                    border border-slate-300" />
                <label htmlFor="cline"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
            <ButtonNewProvider id={user._id} token={token} />
          </div>    
        </HeaderProvider> */}

        <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-x-3 w-full lg:max-w-96">
            <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
              <Link href={'/'}>
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
                    placement="right" className="text-black bg-white rounded-md border border-slate-400">
                  <span>
                    <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
                  </span>
                </Tooltip>
              </Link>
            </div>
            <p className="text-xl ml-4 font-medium">Proveedores</p>
            <div className="flex flex-1 justify-end md:hidden">
              <ButtonNewProvider id={user._id} token={token} company={user.profile} />
            </div>
          </div>
          <div className="flex md:flex-1 gap-x-3 justify-end w-full items-center flex-wrap md:flex-nowrap">
            <div className="w-full md:w-auto">
              <SearchInTable placeH="Buscar proveedor.." />
            </div>
            <div className="flex items-center gap-x-3 mt-3 md:mt-0">
              <div className="inline-flex items-center">
                <Label>Datos bancarios</Label>  
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input checked={isBankData} 
                    onClick={() => setIsBankData(!isBankData)} id="bank" type="checkbox"
                    // onChange={() => console.log('')}
                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                      appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                      peer-checked:border-green-500 peer-checked:before:bg-green-500
                      border border-slate-300" />
                  <label htmlFor="bank"
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                      data-ripple-dark="true"></div>
                  </label>
                </div>
              </div>
              <div className="w-60 sm:w-auto">
                <div className="flex items-center gap-x-4">
                  <div className="inline-flex items-center">
                    <Label>Linea de credito</Label>  
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input checked={isCreditLine} 
                        onClick={() => setIsCreditLine(!isCreditLine)} id="cline" type="checkbox"
                        // onChange={() => console.log('')}
                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                          peer-checked:border-green-500 peer-checked:before:bg-green-500
                          border border-slate-300" />
                      <label htmlFor="cline"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          data-ripple-dark="true"></div>
                      </label>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <ButtonNewProvider id={user._id} token={token} company={user.profile} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end">
          <PDFDownloadLink document={<DownloadProvidersReportPDF providers={providers} satCompany={company} />} fileName={'Proveedores'} >
            {({loading, url, error, blob}) => 
              loading? (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                </Tooltip>
              ) : (
                <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informe' 
                    placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
                  <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                </Tooltip>
              ) }
          </PDFDownloadLink>
        </div> */}

        <div className="flex justify-end">
          <Tooltip
            closeDelay={0}
            delay={100}
            motionProps={propsTooltip}
            content="Informe"
            placement="right"
            className="text-blue-500 bg-white rounded-md border border-slate-400"
          >
            <button onClick={handleDownload}>
              <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
            </button>
          </Tooltip>
        </div>

        <div className="mt-5">
          <TableProviders data={dataFilter} token={token} />
        </div>
      </div>
    </>
  )
}

// const HeaderProvider = ({children, placeHolder, title}: 
//     {placeHolder:string, children: JSX.Element, title:string}) => {

//   return (
//     <div className="flex justify-between items-center gap-x-5 gap-y-3 flex-wrap sm:flex-nowrap">
//       <div className="flex items-center gap-x-3 w-full max-w-96">
//         <div className="p-1 border border-slate-400 bg-white rounded-md hover:bg-blue-100">
//           <Link href={'/'}>
//             <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Regresar' 
//                 placement="right" className="text-black bg-white rounded-md border border-slate-400">
//               <span>
//                 <TbArrowNarrowLeft className="w-10 h-10 text-slate-600" />
//               </span>
//             </Tooltip>
//           </Link>
//         </div>
//         <p className="text-xl ml-4 font-medium">{title}</p>
//       </div>
//       <div className="flex gap-x-3 justify-end w-full">
//         <SearchInTable placeH={placeHolder} />
//         <div className="w-60">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }
