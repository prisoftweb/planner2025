import Input from "../Input"
import Label from "../Label"
import { useState, useRef } from "react"
import UploadImage from "../UploadImage"
import Button from "../Button"
import { updateClient, updateClientLogo } from "@/app/api/routeClients"
import { showToastMessage, showToastMessageError } from "../Alert"
import { useClientProfileStore } from "@/app/store/clientStore"

export default function ExtraData({token, id, link, editInfo}: 
                        {token:string, id:string, link:string, editInfo: boolean}){
  
  const [page, setPage] = useState(link);
  const [file, setFile] = useState('');
  const refRequest = useRef(true);
  const {updateProfileClient} = useClientProfileStore();

  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      if(file){
        const formdata = new FormData();
        formdata.append('logo', file);
        if(page !== link){
          formdata.append('link', page);
        }
        try {
          const res = await updateClientLogo(formdata, token, id);
          if(typeof(res)==='string'){
            refRequest.current = true;
            showToastMessageError(res);
          }else{
            refRequest.current = true;
            showToastMessage('Cliente actualizado exitosamente!!');
            updateProfileClient(res);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
          }
          // if(res === 200){
          //   refRequest.current = true;
          //   showToastMessage('Cliente actualizado exitosamente!!');
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 500);
          // }else{
          //   refRequest.current = true;
          //   showToastMessageError(res);
          // }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Error al actualizar link del cliente!!');
        }
      }else{
        if(page !== link){
          const data = {
            link: page,
          }
          try {
            const res = await updateClient(id, token, data);
            if(typeof(res)==='string'){
              refRequest.current = true;
              showToastMessageError(res);
            }else{
              refRequest.current = true;
              showToastMessage('Link del cliente actualizado exitosamente!!');
              updateProfileClient(res);
            }
          } catch (error) {
            refRequest.current = true;
            showToastMessageError('Error al actualizar link del cliente!!');
          }
        }else{
          refRequest.current = true;
          showToastMessageError('No hay nada que actualizar!!');
        }
      }
    }else{
      showToastMessageError('Ya hay una peticion en proceso..!!!');
    }
  }

  return(
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Pagina</Label>
            <Input type="text" value={page} onChange={(e) => setPage(e.target.value)} />
          </div>
          {editInfo && (
            <div>
              <Label>Logotipo</Label>
              <UploadImage setFile={setFile} />
            </div>
          )}
        </div>
        {editInfo && (
          <div className="flex justify-center mt-8 space-x-5">
            <Button onClick={onClickSave} type="button">Guardar</Button>
          </div>
        )}
      </div>
    </>
  )
}