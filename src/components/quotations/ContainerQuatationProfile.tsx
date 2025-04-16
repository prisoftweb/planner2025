'use client'
import { IOneQuotationMin } from "@/interfaces/Quotations"
import UpdateQuatationComponent from "./UpdateQuatationComponent"
import ProfileQuatation from "./ProfileQuatation"
import { useState } from "react"
import { getQuotationMin } from "@/app/api/routeQuotations"

export default function ContainerQuatationProfile({quatation, token, usr}: 
  {quatation: IOneQuotationMin, usr:string, token:string}) {

  const [quatationState, setQuotationsState]=useState<IOneQuotationMin>(quatation);

  const updateQuotationState = async () => {
    const res = await getQuotationMin(token, quatation._id);
    if(typeof(res)==='string'){
      window.location.reload();
    }else{
      setQuotationsState(res);
    }
  }

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
        style={{backgroundColor:'#F8FAFC'}}>
        <div className={`w-full max-w-md`}>
          <ProfileQuatation quatation={quatationState} />
        </div>
        <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
          <UpdateQuatationComponent id={quatation._id} quatation={quatationState} token={token} 
              usr={usr} updateQuotationState={updateQuotationState} />
        </div>
      </div>
    </>
  )
}
