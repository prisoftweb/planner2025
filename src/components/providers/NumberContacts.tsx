import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function NumberContacts({numContacts}: {numContacts:number}){
  return(
    <>
      <div className="flex text-slate-500 items-end">
        <UserCircleIcon className="w-8 h-8" />
        <p><sub>{numContacts}</sub></p>
      </div>
    </>
  )
}