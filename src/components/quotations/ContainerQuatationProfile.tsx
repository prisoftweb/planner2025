'use client'
import { IQuotationMin } from "@/interfaces/Quotations"
import UpdateQuatationComponent from "./UpdateQuatationComponent"
import ProfileQuatation from "./ProfileQuatation"

export default function ContainerQuatationProfile({quatation, token, usr}: 
  {quatation: IQuotationMin, usr:string, token:string}) {

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
        style={{backgroundColor:'#F8FAFC'}}>
        <div className={`w-full max-w-md`}>
          <ProfileQuatation quatation={quatation} />
        </div>
        <div className="mt-3 w-full md:max-w-2xl lg:w-full bg-white rounded-lg shadow-md pl-2 px-3" 
            style={{borderColor:'#F8FAFC'}}>
          <UpdateQuatationComponent id={quatation._id} quatation={quatation} token={token} usr={usr} />
        </div>
      </div>
    </>
  )
}
