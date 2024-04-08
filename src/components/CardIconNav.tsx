import {Tooltip} from "@nextui-org/react";

export default function CardIconNav({changeOption}: {changeOption:Function}){
  
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
  
  return(
    <>
      {/* <Tooltip closeDelay={0} delay={100} motionProps={props} content='Resumen'><ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer 
                              text-slate-500 pb-2 sm:pb-4 border-b border-slate-300" onClick={() => changeOption(1)} />
                          </Tooltip> */}
    </>
  )
}