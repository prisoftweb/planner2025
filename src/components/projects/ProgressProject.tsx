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

export default function ProgressProject({token, id, project, user}: 
  {token:string, id:string, project:OneProjectMin, user:string}){
  
  const [notes, setNotes] = useState<string>('');
  const [progress, setProgress] = useState<number>(project.progress || 0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const refRequest = useRef(true);

  const handleChangeNotes = (value:string) => {
    setNotes(value);
    noteIsEmpty(value);
  }

  const noteIsEmpty = (value: string) => {
    const note = value.trim();
    if(note===''){
      setIsEmpty(true);
      return true;
    }else{
      if(isEmpty){
        setIsEmpty(false);
      }
    }
    return false;
  }

  const insertProgress = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const empty = noteIsEmpty(notes);
      if(!empty){
        const data = {
          progress: {
            progress,
            notes,
            user
          }
        };
        try {
          const res = await InsertProgressInProject(token, id, data);
          if(res===200){
            refRequest.current = true;
            showToastMessage('Avance actualizado correctamente!!');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }else{
            refRequest.current = true;
            showToastMessageError(res);
          }
        } catch (error) {
          refRequest.current = true;
          showToastMessageError('Ocurrio un error al actualizar avance del proyecto!!');
        }
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso..!!!');
    }
  }

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Ingresa datos del proyecto" 
        title="Modificar proyecto"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="progress"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Avance</p></Label>
          <div className="flex gap-x-3 items-center">
            <Box sx={{ width: 370 }}>
              <Slider
                size="medium"
                defaultValue={progress}
                onChange={(e: any) => setProgress(e.target.value)}
                aria-label="Small"
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
            <p className="text-slate-700 text-lg">{progress}%</p>
          </div>
        </div>
        <div>
          <Label htmlFor="notes"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Notes</p></Label>
          <TextArea 
            onChange={(e) => handleChangeNotes(e.target.value)}
            value={notes}
          />
          {isEmpty && <p className="text-center text-red-500 text-sm">Los comentarios son obligatorios!!</p>}
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button"
            onClick={insertProgress}
          >Guardar cambios</Button>         
        </div>
      </div>  
    </div>
  )
}