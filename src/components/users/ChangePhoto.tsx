'use client'

import HeaderForm from "../HeaderForm"
import { useState } from "react"
import UploadImage from "../UploadImage";
import Button from "../Button";
import Label from "../Label";
import { updateMeUser } from "@/app/api/routeUser";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function ChangePhoto({id, token}: {id:string, token:string}){
  
  const [photo, setPhoto] = useState<File>();
  
  const onSave = async () => {
    if(photo){
      try {
        const data = new FormData();
        data.append('photo', photo);
        const res = await updateMeUser(id, data, token);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('La foto ha sido actualizada!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al cambiar foto!!');
      }
    }else{
      showToastMessageError('Debe elegir una foto primero!!!');
    }
  }

  return(
    <>
      <div className="w-full">
        <HeaderForm img="/img/user.svg" subtitle="Modificar foto de perfil" 
          title="Fotografia de usuario"
        />
        <form className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5" >
          <div className="mt-4">
            <Label>Foto</Label>
          </div>
          <div className="flex mt-4">
            {photo && <img src={URL.createObjectURL(photo)} className="w-14 h-14" />}
            <UploadImage setFile={setPhoto} />
          </div>
          <div className="flex justify-center mt-4">
            <Button type="button" onClick={onSave}>Guardar foto</Button>
          </div>
        </form>
      </div>
    </>
  )
}