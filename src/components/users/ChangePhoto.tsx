'use client'

import HeaderForm from "../HeaderForm"
import { useState, useEffect } from "react"
import UploadImage from "../UploadImage";
import Button from "../Button";
import Label from "../Label";
import { updateMeUser } from "@/app/api/routeUser";
import { showToastMessage, showToastMessageError } from "../Alert";
import { setCookie } from "cookies-next"
import { useUserStore } from "@/app/store/userStore";
import { useRef } from "react";
import { updateWorkSpaceWithLogo } from "@/app/api/routeWorkspace";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";
import { getWorkSpaces } from "@/app/api/routeWorkspace";
import { UsrBack } from "@/interfaces/User";

export default function ChangePhoto({id, token, user}: {id:string, token:string, user:UsrBack}){
  
  const [photo, setPhoto] = useState<File>();
  const {updateUser} = useUserStore();
  const refRequest = useRef(true);

  const [workspaces, setWorkspaces] = useState<IWorkSpaceMin[]>([]);
  
  useEffect(() => {
    const fetchWorkSpaces = async () => {
      const res = await getWorkSpaces(token);
      if(Array.isArray(res)){
        setWorkspaces(res);
      }else{
        showToastMessageError('Error al obtener los workspaces');
      }
    }
    fetchWorkSpaces();
  }, []);
  
  const onSave = async () => {
    if(photo){
      if(refRequest.current){
        refRequest.current = false;
        try {
          const data = new FormData();
          data.append('photo', photo);

          const dataws = new FormData();
          dataws.append('picture', photo);

          const res = await updateMeUser(id, data, token);
          if(typeof(res)==='string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            showToastMessage('La foto ha sido actualizada!!');
            setCookie('user', res);
            updateUser(res);

            const wsToUpdate = workspaces.filter((ws) => ws.email === user.email);
            const resws = await updateWorkSpaceWithLogo(dataws, wsToUpdate[0]?._id?? '', token);
            if(typeof(res)==='string'){
              refRequest.current = true;
              showToastMessageError(res);
            }else{
              refRequest.current = true;
              showToastMessage('La foto del workspace ha sido actualizada!!');
            }
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un error al cambiar foto!!');
        }
      }else{
        showToastMessageError('Ya hay una solicitud en proceso!!');
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