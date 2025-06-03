import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Button from "../Button";
import { useState, useRef } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { OneProjectMin } from "@/interfaces/Projects";
import { InsertProgressInProject } from "@/app/api/routeProjects";
import TextArea from "../TextArea";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from "../Input";
import { UpdateProject } from "@/app/api/routeProjects";

export default function UpdateDateGuaranteeComponent({token, id, project, user}: 
  {token:string, id:string, project:OneProjectMin, user:string}){

  const [dateGuarantee, setDateGuarantee]=useState<string>(project.guaranteefund.date.substring(0, 10));
  const [datePayment, setDatePayment]=useState<string>(project.guaranteefund.date.substring(0, 10));

  const updateDateG = async () => {
    const data = {
      guaranteefund: {
          porcentage: project.guaranteefund.porcentage,
          date: dateGuarantee,
          amount: project.guaranteefund.amount
      }
    }
    const res = await UpdateProject(token, id, data);
    if(typeof(res)==='string'){
      showToastMessageError("Error al actualizar la fecha de garantia");
    }
    else {
      showToastMessage("Fecha de garantia actualizada correctamente");
    }

  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Programa fechas del fondo de garantia" 
        title="Modificar proyecto"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <div className="grid grid-cols-2 gap-x-3">
          <div>
            <Label htmlFor="progress"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha de garantia</p></Label>
            <Input type="date" value={dateGuarantee} onChange={(e) => setDateGuarantee(e.target.value)} />
            <div className="mt-3">
              <Button type="button"
              onClick={updateDateG}
              >Fecha de garantia</Button>
            </div>
          </div>
          <div>
            <Label htmlFor="progress"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha de pago</p></Label>
            <Input type="date" value={datePayment} onChange={(e) => setDatePayment(e.target.value)} />
            <div className="mt-3">
              <Button type="button"
              // onClick={insertProgress}
              >Programar pago</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-5">
                   
        </div>
      </div>  
    </div>
  )
}