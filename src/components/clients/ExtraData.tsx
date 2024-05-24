import Input from "../Input"
import Label from "../Label"
import { useState } from "react"
import UploadImage from "../UploadImage"
import Button from "../Button"
import { updateClient, updateClientLogo } from "@/app/api/routeClients"
import { showToastMessage, showToastMessageError } from "../Alert"

export default function ExtraData({token, id, link}: 
                        {token:string, id:string, link:string}){
  
  const [page, setPage] = useState(link);
  const [file, setFile] = useState('');

  const onClickSave = async () => {
    
    if(file){
      const formdata = new FormData();
      formdata.append('logo', file);
      if(page !== link){
        formdata.append('link', page);
      }
      try {
        const res = await updateClientLogo(formdata, token, id);
        if(res === 200){
          showToastMessage('Cliente actualizado exitosamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Error al actualizar link del cliente!!');
      }
    }else{
      if(page !== link){
        const data = {
          link: page,
        }
        try {
          const res = await updateClient(id, token, data);
          if(res === 200){
            showToastMessage('Link del cliente actualizado exitosamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            showToastMessageError(res);
          }
        } catch (error) {
          showToastMessageError('Error al actualizar link del cliente!!');
        }
      }else{
        showToastMessageError('No hay nada que actualizar!!');
      }
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
          <div>
            <Label>Logotipo</Label>
            <UploadImage setFile={setFile} />
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
        </div>
      </div>
    </>
  )
}