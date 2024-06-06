import { ArrowDownTrayIcon, Cog6ToothIcon, 
  StarIcon, PhotoIcon, UserIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import {Tooltip} from "@nextui-org/react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";

export default function NavResponsive({open, setOpen, option, changeOption}: 
                {open:boolean, setOpen:Function, option:number, changeOption:Function}){

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

  const [isHover, setIsHover] = useState<number>(-1);

  const [nav, setNav] = useState<JSX.Element>();

  useEffect(() => {
  if(!open){
    setNav (
      <div className="bg-white top-52 space-y-4 left-4 p-2 flex flex-col items-center rounded-md h-full shadow-md">
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Expandir' 
            placement="right" className="text-blue-500 bg-white">
          <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
            text-slate-500 my-1 bg-white rounded-md rotate-90" 
            onClick={() => setOpen(true)} /></div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Editar Perfil' 
            placement="right" className="text-blue-500 bg-white"> 
              <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
                <UserIcon 
                  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                          color: isHover===1 || option===1 ? 'white' : '',}}
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                    ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                    onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                    
                />
              </div>
          </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Cambiar foto' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <MdOutlinePhotoLibrary className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}} 
              />
              {/* <PhotoIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}  
              /> */}
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Cambiar Contraseña' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <TbPasswordUser className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}} 
              />
              {/* <StarIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}  
              /> */}
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Configuracion' 
          placement="right" className="text-blue-500 bg-white">
            <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
              <FaUserCog className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => {setIsHover(4)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}} 
              />
              {/* <Cog6ToothIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                onMouseEnter={() => {setIsHover(4)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                  color: isHover===4 || option===4 ? 'white' : '',}}
              />   */}
            </div>              
        </Tooltip>
      </div>
    )
  }else{
    setNav (
      <div className="w-full">
        {/* <Tooltip closeDelay={0} delay={100} motionProps={props} content='Reducir' 
          placement="right" className="text-blue-500 bg-white">
            <div className="flex justify-end border-b border-slate-300 pr-2">
              <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 pb-2 sm:pb-4 cursor-pointer 
                  text-slate-500 rotate-90" onClick={() => setOpen(false)} />
            </div>
        </Tooltip> */}
        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Reducir' 
          placement="right" className="text-blue-500 bg-white">
            <div className="flex justify-end border-b border-slate-300 pr-2">
              <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
                  text-slate-500 rotate-90" onClick={() => setOpen(false)} />
            </div>
        </Tooltip>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
          onClick={() => changeOption(1)}
        >
          <UserIcon 
            //className="w-5 h-5 sm:w-6 sm:h-6 rounded-md cursor-pointer mr-2 text-slate-500" 
            style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                  color: isHover===1 || option===1 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===1? 'bg-blue-500': ''}`}
          />
            Editar Perfil
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}  
        >
          <MdOutlinePhotoLibrary 
            style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                  color: isHover===2 || option===2 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===2? 'bg-blue-500': ''}`}
          />
          {/* <PhotoIcon 
            //className="w-5 h-5 sm:w-6 sm:h-6 rounded-md cursor-pointer mr-2 text-slate-500" 
            style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                  color: isHover===2 || option===2 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===2? 'bg-blue-500': ''}`}
          /> */}
          Cambiar foto
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <TbPasswordUser 
            style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                color: isHover===3 || option===3 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===3? 'bg-blue-500': ''}`}
          />
          {/* <StarIcon 
            style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                color: isHover===3 || option===3 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===3? 'bg-blue-500': ''}`}
          /> */}
          Cambiar Contraseña
        </div>        
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center ${option===4? 'bg-slate-200': ''}`}
          onClick={() => changeOption(4)}
        >
          <FaUserCog 
            style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                color: isHover===4 || option===4 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===4? 'bg-blue-500': ''}`}
          />
          {/* <Cog6ToothIcon 
            style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                color: isHover===4 || option===4 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===4? 'bg-blue-500': ''}`}
          /> */}
          Configuracion
        </div>
      </div>
    )
    }
  }, [open, option, isHover])

  return(
    <>
      {nav}
    </>
  )
}