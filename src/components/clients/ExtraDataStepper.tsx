import NavClientsStepper from "./NavClientsStepper"
import Input from "../Input"
import Label from "../Label"
import { useState } from "react"
import UploadImage from "../UploadImage"
import { useRegFormContext } from "./StepperClientProvider";
import Button from "../Button"
import { showToastMessage, showToastMessageError } from "../Alert"
import SaveClient from "@/app/functions/SaveClient"

export default function ExtraDataStepper({token}: {token:string}){
  
  const [state, dispatch] = useRegFormContext();
  const [page, setPage] = useState('');
  const [file, setFile] = useState('');

  const onClickSave = async () => {
    
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

    let contact = [];
    if(state.contacts){
      contact = state.contacts;
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
      link:page,
      photo: file,
      regime,
      location: {
        stret,
        cp,
        municipy, 
        country,
        community,
        state:stateS,
      },
      contact
    }

    try {
      const res = await SaveClient(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    } catch (error) {
      showToastMessageError('Error al crear cliente!!');
    }
  }

  const onClickNext = () => {
    
    type Page = {
      link: string,
      photo?: any,
    }

    const data: Page = {
      photo: file,
      link: page,
    }
    
    if(!file){
      delete data.photo;
    }

    dispatch({ type: 'SET_EXTRA_DATA', data: data });
    dispatch({type: 'INDEX_STEPPER', data: 2})
  }

  return(
    <>
      <div className="w-full">
        <div className="my-5">
          <NavClientsStepper index={0} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Pagina</Label>
            <Input type="text" value={page} onChange={(e) => setPage(e.target.value)} />
          </div>
          <div>
            <Label>Logotipo</Label>
            <UploadImage setFile={setFile} />
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          <button type="button" onClick={onClickNext}
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  )
}