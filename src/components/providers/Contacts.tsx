import { useState, useEffect, useRef } from "react";
import { Contact } from "@/interfaces/Contacts";
import FormContact from "./FormContact";
import { showToastMessage, showToastMessageError } from "../Alert";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import { updateContact } from "@/app/api/routeContacts";
import { updateContactProvider } from "@/app/api/routeProviders";
import CardContact from "./CardContact";
import { contactUpdateValidation } from "@/schemas/contact.schema";

export default function Contacts({id, token, contacts}: {id:string, token:string, contacts:(Contact[])}){
  
  const [index, setIndex] = useState(0);
  const numberContacts = 1;
  const [filter, setFilter] = useState<Contact[]>(contacts);
  const refRequest = useRef(true);

  const newContact = async (newContact:string) => {
    if(refRequest.current){
      refRequest.current = false;
      try {
        const res = await updateContactProvider({contact: newContact}, id, token);
        if(res===200){
          refRequest.current = true;
          showToastMessage('El proveedor ha sido actualizado!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          refRequest.current = true;
          showToastMessageError(res);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al actualizar proveedor');
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }

  const updateContactt = async (data:Contact, id:string) => {
    if(refRequest.current){
      refRequest.current = false;
      const validation = contactUpdateValidation.safeParse(data);
      if(validation.success){
        try {
          const res = await updateContact(id, token, data);
          if(res===200){
            refRequest.current = true;
            showToastMessage('El contacto ha sido actualizado!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al actualizar proveedor');
        }
      }else{
        refRequest.current = true;
        showToastMessageError(validation.error.issues[0].message);
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }

  const showNewContact = () => {
    setShowContacts(<FormContact token={token} addNewContact={newContact} 
        contact={''} updateContact={updateContactt} >
        <></>
      </FormContact>)
  }
  
  const [showContacts, setShowContacts] = useState<JSX.Element>(contacts.length > 0? 
    <FormContact token={token} addNewContact={newContact} contact={contacts[0]} 
      updateContact={updateContactt} >
        <></>
    </FormContact> : 
    <FormContact token={token} addNewContact={newContact} contact={''} 
      updateContact={updateContactt} >
        <Button onClick={showNewContact}>
          Nuevo contacto
        </Button>
      </FormContact> );

  useEffect(() => {
    if(contacts.length === 0){
      setShowContacts(<FormContact token={token} addNewContact={newContact} 
        contact={''} updateContact={updateContactt} >
          <></>
        </FormContact>);
    }else{
      let showConts: JSX.Element[] =[];
      contacts.map((contactm, index) => {
        showConts.push(<CardContact idProv={id} contact={contactm} token={token} key={index} />)
      })

      setShowContacts(<></>);
      setTimeout(() => {
        setShowContacts(
          <>
            <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3">
              {showConts}
            </div>
          
            <div className="flex items-center">
              <div className='w-10 md:w-20'>
                <ChevronLeftIcon onClick={Previous}
                  className="w-8 md:w-12 h-12 cursor-pointer text-yellow-950" />
              </div>
    
              {/* <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10'> */}
              <div className='grid gap-4 grid-cols-1 mt-3'>
                {filter.map((contact: Contact, index:number) => (
                  <div className='' key={index}>
                    <FormContact token={token} addNewContact={newContact} contact={contact} 
                      updateContact={updateContactt}
                    >
                      <button 
                        type="button"
                        onClick={showNewContact}
                        className="font-normal text-sm rounded-xl w-36 h-9 py-2
                          border bg-white text-slate-900 border-slate-900 
                          hover:bg-slate-200"  
                      >
                        Nuevo contacto
                      </button>
                    </FormContact>
                  </div>
                ))}
              </div>
    
              <div className='w-10 md:w-20'>
                <ChevronRightIcon onClick={Next}
                  className="w-8 md:w-12 h-12 cursor-pointer text-yellow-950" />
              </div>
            </div>
          </>
        )
      }, 100);
    }
  }, [, filter])
  
  useEffect(() => {
    let count = contacts.length - (index + numberContacts);
    
    if(count < 0){
      count = Math.abs(count);
      const arr1 = contacts.slice(index, index + numberContacts);
      const arr2 = contacts.slice(0, count);
      setFilter([...arr1, ...arr2]);
    }else{
      setFilter(contacts.slice(index, index + numberContacts));
    }
  }, [index])

  const Previous = () => {
    if(index > 0){
      setIndex(index -1);
    }else{
      setIndex(contacts.length -1);
    }
  }

  const Next = () => {
    if(index < contacts.length - 1){
      setIndex(index+1)
    }else{
      setIndex(0);
    }
  }

  return(
    <>
      {showContacts}
    </>
  )
}