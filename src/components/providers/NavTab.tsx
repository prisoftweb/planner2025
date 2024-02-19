import Link from "next/link"

export default function NavTab({tab, idProv}: {tab:string, idProv:string}){
  return(
    <>
      <div className="flex mt-5 bg-white py-1">
        <Link href={`/providers/${idProv}?tab=1`}>
          <div className={`w-50 px-5 ${tab==='1'? 'border-b-4 border-blue-600':''}`}>
            <p>Perfil proveedor</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=2`}>
          <div className={`w-50 px-5 ${tab==='2'? 'border-b-4 border-blue-600':''}`}>
            <p>Historial de facturas</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=3`}>
          <div className={`w-50 px-5 ${tab==='3'? 'border-b-4 border-blue-600':''}`}>
            <p>Anticipos</p>
          </div>
        </Link>
        <Link href={`/providers/${idProv}?tab=4`}>
          <div className={`w-50 px-5 ${tab==='4'? 'border-b-4 border-blue-600':''}`}>
            <p>Pagos</p>
          </div>
        </Link>
      </div>
    </>
  )
}