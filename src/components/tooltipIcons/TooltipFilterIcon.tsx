import {Tooltip} from "@nextui-org/react";
import { GiSettingsKnobs } from "react-icons/gi"
import { propsTooltip } from "@/libs/animations";

type Params = {
  handleFilter: (value: boolean) => void
}

export default function TooltipFilterIcon({handleFilter}: Params) {

  return (
    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Filtrar' 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      <span className="inline-flex items-center justify-center">
        <GiSettingsKnobs className="w-10 h-10 rounded-md text-slate-500 
          hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
          onClick={() => handleFilter(true)}
        />
      </span>
    </Tooltip>
  )
}
