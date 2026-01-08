import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

type Params = {
  children: JSX.Element
  label: string
}

export default function TooltipContainerIcon({children, label}: Params) {

  return (
    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content={label} 
        // placement="right"
        placement="bottom" 
        className="text-black bg-white rounded-md border border-slate-400">
      {children}
    </Tooltip>
  )
}
