import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { OneProjectMin } from "@/interfaces/Projects";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function ProgressHistoryProject({project}: {project:OneProjectMin}){
    
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Avance del proyecto" 
        title="Avance del proyecto"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="progress"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Avance</p></Label>
          <div className="flex gap-x-3 items-center">
            <Box sx={{ width: 370 }}>
              <Slider
                size="medium"
                defaultValue={project.progress}
                aria-label="Small"
                min={0}
                max={100}
                disabled
                valueLabelDisplay="auto"
              />
            </Box>
            <p className="text-slate-700 text-lg">{project.progress}%</p>
          </div>
        </div>
      </div>  
    </div>
  )
}