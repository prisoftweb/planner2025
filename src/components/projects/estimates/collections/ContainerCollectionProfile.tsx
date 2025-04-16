import { IOneCollectionMin, IInvoicesByCollection } from "@/interfaces/Collections"
import ProfileCollection from "./ProfileCollection"
import ListInvoicesCollection from "./ListInvoicesCollection"

export default function ContainerCollectionProfile({collection, token, usr, invoices}: 
  {collection: IOneCollectionMin, usr:string, token:string, invoices:IInvoicesByCollection[]}) {

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
        style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileCollection collection={collection} />
          </div>
          <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
            <ListInvoicesCollection collection={collection} invoices={invoices} />
          </div>
      </div>
    </>
  )
}
