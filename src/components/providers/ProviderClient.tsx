'use client'

import ProfileProvider from "./ProfileProvider"
import Sumary from "./Sumary"
import DataBasic from "./DataBasic"
import CreditLine from "./CreditLine"
import Contacts from "./Contacts"
import { useState, useEffect } from "react"
import { Provider } from "@/interfaces/Providers"
import { Contact } from "@/interfaces/Contacts"
//import { getContact, getContacts } from "@/app/api/routeContacts"

export default function ProviderClient({provider, token, id}: 
                            {provider:Provider, token:string, id:string}){
  
  const [view, setView] = useState<JSX.Element>
                (<Sumary provider={provider} />)

  const [opt, setOpt] = useState<number>(1);
  const [arrContacts, setArrContacts] = useState<Contact[]>([]);
  //const [contactss, setContactss] = useState
  //let contacts: Contact[] = [];
  // if(provider.contact && provider.contact?.length > 0){
  //   contacts = provider.contact;
  // }

  // const contacts:Contact[] = [
  //   {
  //     "_id": "65df6fb743adb70af9e20e1c",
  //     "name": "eduardo",
  //     "email": "eduardo@gmail.com",
  //     "companyemail": "company@gmail.com",
  //     "phoneNumber": [
  //         {
  //             "type": "Movil",
  //             "phone": "5545454322",
  //             "phoneformat": "(+52) 554 545 4322",
  //             "_id": "65df6fb743adb70af9e20e1d"
  //         }
  //     ],
  //     "status": true,
  //     "createAt": "2024-02-22T22:40:39.024Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65e0e01a43adb70af9e20f90",
  //     "name": "cont",
  //     "email": "personal@gmail.com",
  //     "companyemail": "empresa@gmail.com",
  //     "phoneNumber": [
  //         {
  //             "type": "Movil",
  //             "phone": "3464565777",
  //             "phoneformat": "(+52) 346 456 5777",
  //             "_id": "65e0e01a43adb70af9e20f91"
  //         }
  //     ],
  //     "status": true,
  //     "createAt": "2024-02-22T22:40:39.024Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65e0e03b43adb70af9e20f93",
  //     "name": "cont2",
  //     "email": "personal2@gmail.com",
  //     "companyemail": "empresa2@gmail.com",
  //     "phoneNumber": [
  //         {
  //             "type": "Movil",
  //             "phone": "3435345546",
  //             "phoneformat": "(+52) 343 534 5546",
  //             "_id": "65e0e03b43adb70af9e20f94"
  //         }
  //     ],
  //     "status": true,
  //     "createAt": "2024-02-22T22:40:39.024Z",
  //     "__v": 0
  //   },
  // ]

  useEffect(() => {
    opt===2? setView(<DataBasic id={id} provider={provider} token={token} />) : 
      (opt===3? setView(<CreditLine provider={provider} id={id} token={token} />): 
        (opt===4? setView(<Contacts id={id} contacts={provider.contact || []} token={token} />): 
          setView(<Sumary provider={provider} />) ))
  }, [opt])
  
  return(
    <>
      <div className="flex px-5 bg-white mt-2">
        <div className="w-1/3 md:w-1/2 mt-5">
          <ProfileProvider provider={provider} setOption={setOpt} />
        </div>
        <div className="w-full">
          {view}
        </div>
      </div>
    </>
  )
}