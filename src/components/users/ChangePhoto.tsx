'use client'

import HeaderForm from "../HeaderForm"
import { useState } from "react"
import UploadImage from "../UploadImage";
import Button from "../Button";
import Label from "../Label";

export default function ChangePhoto(){
  
  const [photo, setPhoto] = useState<File>();
  
  const onSave = () => {
    console.log('photo', photo);
  }

  return(
    <>
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Modificar foto de perfil" 
        title="Fotografia de usuario"
      />
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
    </>
  )
}