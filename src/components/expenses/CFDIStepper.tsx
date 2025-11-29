import { useState, useEffect } from "react";
import NavExpenseStepper from "./NavExpenseStepper";
import UploadFileDropZone from "../UploadFileDropZone";
import Button from "../Button";
import { useNewExpense } from "@/app/store/newExpense";
import { showToastMessageError } from "../Alert";
import { CFDIValidation } from "@/interfaces/Expense";
import { xml2js} from 'xml-js'
import { XMLCFDI } from "@/interfaces/Expense";
import { findCostExistsInBD } from "@/app/api/routeCost";
import { Expense } from "@/interfaces/Expenses";
import { MoneyFormatter } from "@/app/functions/Globals";

export default function CFDIStepper({token, user} : {token: string, user:string}) {
  
  const {updateCDFI} = useNewExpense();
  const [file, setFile] = useState<File>();
  const [dataCFDI, setDataCFDI] = useState<CFDIValidation>();
  
  useEffect(() => {
    if(CFDI){
      setFile(CFDI);
    }
  }, []);
  
  const { updateIndexStepper, CFDI} = useNewExpense();
  
  const validationType = async (f: File) => {
    if(!f.type.includes('xml') && !f.type.includes('XML')){
      showToastMessageError('Seleccione un archivo con la extension xml!!!');
      return 'Seleccione un archivo con la extension xml!!!';
    }else{
      const readFile=async () => {
        const t = await f.text();
                
        const res2: (XMLCFDI | any ) = xml2js(t);
        const uuid = res2.elements[0].elements.find((e: any) => e.name.toLowerCase().includes('complemento'));

        try {
          const uuidXML = uuid.elements.find((elem: any) => {
            if(elem.attributes?.UUID) return elem.attributes?.UUID;
          });

          const folioXML = uuidXML?.attributes?.UUID || 'error al leer CFDI';
          const res: Expense[] | string = await findCostExistsInBD(token, folioXML);
          if(typeof(res)==='string'){
            showToastMessageError(res);
            return false;
          }else{
            if(res.length > 0){
              const tot=MoneyFormatter(res[0]?.cost?.total?? 0);
              const user=res[0]?.user?.name?? ' ';
              const rep=res[0]?.report?.name?? ' ';
              const prj=res[0]?.project?.title?? ' ';
              const msj=`Gasto por un total de ${tot}, ingresado por ${user} en el informe ${rep} del proyecto ${prj}.`;
              showToastMessageError(msj);
              return false;
            }else{
              return true;
            }
          }
        } catch (error) {
          console.log('error al leer cfdi => ', error);
          return false;
        }
      }
      const resXML = await readFile();
      // return readFile();
      // console.log('resXML => ', resXML);
      return resXML;
    }
  }

  const handleCFDI = (value:CFDIValidation) => {
    setDataCFDI(value);
  }

  return (
    <div className="mt-2">
      <NavExpenseStepper index={2} />
      <UploadFileDropZone label="Subir archivo .XML" setFile={setFile} 
          Validation={validationType} getData={handleCFDI} token={token} />
      <div className="flex justify-center mt-8 space-x-5">
        <Button type="button" 
          onClick={() => {
            if(file && dataCFDI){
              updateCDFI(file, dataCFDI); 
            }
            updateIndexStepper(3);
          }}>Siguiente</Button>
      </div>
    </div>
  );
}
