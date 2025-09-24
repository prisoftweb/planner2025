import {Tooltip} from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/solid";

type Params = {
  handleBooleanValue: (value: boolean) => void
  handleElement: (value: any) => void
  element: any
}

export default function TooltipPencilIcon({handleBooleanValue, handleElement, element}: Params) {

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

  return (
    <Tooltip closeDelay={0} delay={100} motionProps={props} content='Modificar' 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      <PencilIcon className="w-6 h-6 text-slate-500 hover:text-slate-400 cursor-pointer hover:bg-blue-100" 
        onClick={() => {handleElement(element); handleBooleanValue(true);}}
      />
    </Tooltip>
  )
}
