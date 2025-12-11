import {Tooltip} from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useEffect } from "react";
import { propsTooltip } from "@/libs/animations";

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

  return (
    <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Cerrar' 
        placement="right" className="text-black bg-white rounded-md border border-slate-400">
      <XMarkIcon className="w-6 h-6 bg-black text-white hover:bg-red-500 rounded-full hover:text-white cursor-pointer" 
        onClick={() => {handleClose(false);}}
      />
    </Tooltip>
  )
}
