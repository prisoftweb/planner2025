import {Tooltip} from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react";

type Params = {
  handleClose: (value: boolean) => void
}

export default function TooltipCloseIcon({handleClose}: Params) {

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        handleClose(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    <Tooltip closeDelay={0} delay={100} motionProps={props} content='Cerrar' 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      <XMarkIcon className="w-6 h-6 text-slate-500 hover:bg-red-500 rounded-full hover:text-white cursor-pointer" 
        onClick={() => {handleClose(false);}}
      />
    </Tooltip>
  )
}
