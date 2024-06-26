import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Button from "../Button";
import { useState, useEffect } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Project } from "@/interfaces/Projects";
import { InsertProgressInProject } from "@/app/api/routeProjects";
import TextArea from "../TextArea";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function ProgressProject({token, id, project, user}: 
                                  {token:string, id:string, 
                                    project:Project, user:string}){
  
  const [notes, setNotes] = useState<string>('');
  const [progress, setProgress] = useState<number>(project.progress[project.progress.length -1]?.progress || 0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

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
          showToastMessage('Avance actualizado correctamente!!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }else{
          showToastMessageError(res);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al actualizar avance del proyecto!!');
      }
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
          <Box sx={{ width: 370 }}>
          <Slider
            size="medium"
            defaultValue={progress}
            onChange={(e: any) => setProgress(e.target.value)}
            aria-label="Small"
            valueLabelDisplay="on"
          />
        </Box>
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