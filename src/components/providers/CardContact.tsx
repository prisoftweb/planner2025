import IconText from "./IconText"
import DeleteContact from "./DeleteContact"
import { Contact } from "@/interfaces/Contacts"
import Chip from "./Chip"
import DeletePhoneContact from "../DeletePhoneContact"

export default function CardContact({contact, token, idProv}: {contact:Contact, token:string, idProv:string}){
  
  type Phone = {
    pNumber: string,
    type: string
  }
  let listP: Phone[] = [];
  
  contact.phoneNumber.map((pnumber) => {
    listP.push({
      pNumber: pnumber.phone,
      type: pnumber.type,
    });
  })

  return(
    <>
      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-2">
        <div className="flex items-end">
          <IconText size="w-8 h-8" sizeText="" text={contact.name} />
          <DeleteContact contact={contact} token={token} idProv={idProv} />
        </div>
        <p className="text-sm text-slate-400">{contact.name}</p>
        <div>
          {contact.phoneNumber.map((pnumber, index) => (
            <div className="flex items-center gap-x-2 mt-1" key={index}>
              <DeletePhoneContact idC={contact._id || ''} phone={pnumber} 
                    token={token} numContacts={contact.phoneNumber.length} />
              <p className="text-xs font-thin text-slate-400" key={index}>{pnumber.phoneformat}</p>
              <Chip label={pnumber.type} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}