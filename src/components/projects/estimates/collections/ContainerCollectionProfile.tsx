'use client'
import { IOneQuotationMin } from "@/interfaces/Quotations"
import UpdateQuatationComponent from "@/components/quotations/UpdateQuatationComponent"
import ProfileQuatation from "@/components/quotations/ProfileQuatation"
import { useState } from "react"
import { getQuotationMin } from "@/app/api/routeQuotations"
import { getCollectionMin } from "@/app/api/routeCollections"
import { IOneCollectionMin } from "@/interfaces/Collections"

export default function ContainerCollectionProfile({collection, token, usr}: 
  {collection: IOneCollectionMin, usr:string, token:string}) {

  const [collectionState, setCollectionState]=useState<IOneCollectionMin>(collection);

  const updateCollectionState = async () => {
    const res = await getQuotationMin(token, collection._id);
    if(typeof(res)==='string'){
      window.location.reload();
    }else{
      setCollectionState(res);
    }
  }

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
        style={{backgroundColor:'#F8FAFC'}}>
        {/* <div className={`w-full max-w-md`}>
          <ProfileQuatation quatation={quatationState} />
        </div>
        <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
          <UpdateQuatationComponent id={quatation._id} quatation={quatationState} token={token} 
              usr={usr} updateQuotationState={updateCollectionState} />
        </div> */}
      </div>
    </>
  )
}
