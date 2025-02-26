import { useState, useRef } from "react";
import { useRegFormContext } from "./StepperClientProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import FormContact from "../providers/FormContact";
import NavClientsStepper from "./NavClientsStepper";
import SaveClient, {SaveClientLogo} from "@/app/functions/SaveClient";
import { useClientStore } from "@/app/store/clientStore";

export default function ContactsStepper({id, token}: {id:string, token:string}){
  
  const [state, dispatch] = useRegFormContext();
  const [contacts, setContacts] = useState<string[]>(state.contacts? state.contacts: []);
  const refRequest = useRef(true);

  const {pushClient} = useClientStore();
  
  const onClickSave = async () => {
    refRequest.current = false;
    if(state.extradata && state.extradata.photo){
      const data = new FormData();
      if(state.databasic){
        data.append('name', state.databasic.name);
        data.append('tradename', state.databasic.tradename);
        if(state.databasic.email){
          data.append('email', state.databasic.email);
        }
        data.append('rfc', state.databasic.rfc);
        data.append('source', state.databasic.source);
        data.append('regime', state.databasic.regime);
        if(state.databasic.user){
          data.append('user', state.databasic.user);
        }
      }
      if(state.extradata){
        data.append('logo', state.extradata.photo);
        if(state.extradata.link){
          data.append('link', state.extradata.link);
        }
      }
      let stret='', cp='', municipy='', country='', stateS='', community='';
      if(state.address){
        stret = state.address.stret? state.address.stret: '';
        cp = state.address.cp? state.address.cp: '';
        municipy = state.address.municipy? state.address.municipy: '';
        country = state.address.country? state.address.country: '';
        community = state.address.community? state.address.community: '';
        stateS = state.address.stateS? state.address.stateS: '';
      }

      const location = {
        community,
        country,
        cp: cp,
        municipy,
        state: stateS,
        stret
      }
      try {
        const res = await SaveClientLogo(data, token, location, 
                    state.databasic.tags? state.databasic.tags: [], contacts,
                    state.databasic.phone? state.databasic.phone: '');
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          if(res.client) pushClient(res.client);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear cliente!!');
      }
    }else{
      let name='', tradename='', email='', rfc='', source='', phone='',tags=[], user='', regime='';
      if(state.databasic){
        name=state.databasic.name? state.databasic.name : '';
        tradename=state.databasic.tradename? state.databasic.tradename : '';
        email=state.databasic.email? state.databasic.email : '';
        rfc=state.databasic.rfc? state.databasic.rfc : '';
        phone=state.databasic.phone? state.databasic.phone : '';
        source=state.databasic.source? state.databasic.source : '';
        tags=state.databasic.tags? state.databasic.tags : '';
        user=state.databasic.user? state.databasic.user : '';
        regime=state.databasic.regime? state.databasic.regime : '';
      }

      let link='', photo='';
      if(state.extradata){
        link = state.extradata.link? state.extradata.link: '';
        photo = state.extradata.photo? state.extradata.photo: '';
      }

      let stret='', cp='', municipy='', country='', stateS='', community='';
      if(state.address){
        stret = state.address.stret? state.address.stret: '';
        cp = state.address.cp? state.address.cp: '';
        municipy = state.address.municipy? state.address.municipy: '';
        country = state.address.country? state.address.country: '';
        community = state.address.community? state.address.community: '';
        stateS = state.address.stateS? state.address.stateS: '';
      }

      const data = {
        name, 
        tradename, 
        email, 
        rfc, 
        phone, 
        source,
        tags, 
        user,
        link,
        regime,
        location: {
          stret,
          cp,
          municipy, 
          country,
          community,
          state:stateS,
        },
        contact: contacts
      }

      try {
        const res = await SaveClient(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          if(res.client) pushClient(res.client);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      } catch (error) {
        refRequest.current = true;
        showToastMessageError('Error al crear cliente!!');
      }
    }
  }

  const newContact = (newContact:string) => {
    setContacts((oldContacts) => [...oldContacts, newContact])
    if(state.contacts){
      dispatch({ type: 'SET_CONTACTS', data: [...state.contacts, newContact] });
    }else{
      dispatch({ type: 'SET_CONTACTS', data: [newContact] });
    }
  }
  
  const updateContact = () => {}

  return(
    <>
      <div className="w-full">
        <div className="mx-5">
          <NavClientsStepper index={3} />
        </div>
        <FormContact addNewContact={newContact} token={token} contact={''} 
            updateContact={updateContact} >
          <button type="button" 
            onClick={() => {
              if(refRequest.current){
                onClickSave();
              }
              else{
                showToastMessageError('Ya hay una peticion en proceso..!');
              }
            }}
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
           hover:bg-slate-200">
            Guardar
          </button>
        </FormContact>
      </div>
    </>
  )
}