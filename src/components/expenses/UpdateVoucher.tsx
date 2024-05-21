import Button from "../Button";
import UploadFileDropZone from "../UploadFileDropZone";
import { useState } from "react";

export default function UpdateVoucher({id, token}: {token: string, id:string}){
  
  const [file, setFile] = useState();

  const SaveData = () => {

  }

  return (
    <div className="mt-2">
      <UploadFileDropZone label="Subir PDF o imagen" setFile={setFile} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" onClick={SaveData}>Guardar</Button>
      </div>
    </div>
  );
}