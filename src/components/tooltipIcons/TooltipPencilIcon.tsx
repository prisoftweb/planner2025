import {Tooltip} from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { propsTooltip } from "@/libs/animations";

type Params = {
  handleBooleanValue: (value: boolean) => void
  handleElement: (value: any) => void
  element: any
}

export default function TooltipPencilIcon({handleBooleanValue, handleElement, element}: Params) {

  return (
    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      <PencilIcon className="w-6 h-6 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
        onClick={() => {handleElement(element); handleBooleanValue(true);}}
      />
    </Tooltip>
  )
}
