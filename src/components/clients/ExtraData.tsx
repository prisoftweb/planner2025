import Input from "../Input"
import Label from "../Label"
import { useState } from "react"
import UploadImage from "../UploadImage"
import Button from "../Button"

export default function ExtraData({token}: {token:string}){
  
  const [page, setPage] = useState('');
  const [file, setFile] = useState('');

  const onClickSave = async () => {
    
    // try {
    //   const res = await SaveClient(data, token);
    //   if(res.status){
    //     showToastMessage(res.message);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 500);
    //   }else{
    //     showToastMessageError(res.message);
    //   }
    // } catch (error) {
    //   showToastMessageError('Error al crear cliente!!');
    // }
  }

  return(
    <>
      <div className="w-full">
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
        </div>
      </div>
    </>
  )
}