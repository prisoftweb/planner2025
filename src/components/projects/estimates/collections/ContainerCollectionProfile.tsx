'use client'
// import { useState } from "react"
import { IOneCollectionMin } from "@/interfaces/Collections"
import ProfileCollection from "./ProfileCollection"
import ListInvoicesCollection from "./ListInvoicesCollection"

export default function ContainerCollectionProfile({collection, token, usr}: 
  {collection: IOneCollectionMin, usr:string, token:string}) {

  // const [collectionState, setCollectionState]=useState<IOneCollectionMin>(collection);

  // const updateCollectionState = async () => {
  //   const res = await getQuotationMin(token, collection._id);
  //   if(typeof(res)==='string'){
  //     window.location.reload();
  //   }else{
  //     setCollectionState(res);
  //   }
  // }

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
        style={{backgroundColor:'#F8FAFC'}}>
          <div className={`w-full max-w-md`}>
            <ProfileCollection collection={collection} />
          </div>
          <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
              style={{borderColor:'#F8FAFC'}}>
            <ListInvoicesCollection collection={collection} />
          </div>
      </div>
    </>
  )
}
