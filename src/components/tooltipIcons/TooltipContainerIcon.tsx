import {Tooltip} from "@nextui-org/react";

type Params = {
  children: JSX.Element
  label: string
}

export default function TooltipContainerIcon({children, label}: Params) {

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
    <Tooltip closeDelay={0} delay={100} motionProps={props} content={label} 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      {children}
    </Tooltip>
  )
}
