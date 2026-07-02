import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import {Tooltip} from "@nextui-org/react";
import { PiPresentationChartLight } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { FaRegImage } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { Resource2 } from "@/interfaces/Roles";
import { propsTooltip } from "@/libs/animations";
import {Cog8ToothIcon} from "@heroicons/react/24/solid";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

type NavResponsiveProps = {
  open:boolean, 
  setOpen:Function, 
  option:number, 
  changeOption:Function, 
  // clientPermission: Resource2
  permissions:IPermissionsAndComponents
}

export default function NavResponsive({open, setOpen, option, changeOption, permissions}: NavResponsiveProps){

  const [isHover, setIsHover] = useState<number>(-1);
  
  // const permissionProfile = clientPermission.routes.find((route) => route.route.name.toLowerCase() === 'profile');
  
  // if(!permissionProfile){
  //   return <></>
  // }

  // const basicData = permissionProfile?.components.find((comp) => comp.component.name.toLowerCase() === 'basicdata');
  // const addressData = permissionProfile?.components.find((comp) => comp.component.name.toLowerCase() === 'address');
  // const resumeData = permissionProfile?.components.find((comp) => comp.component.name.toLowerCase() === 'resume');
  // const contactData = permissionProfile?.components.find((comp) => comp.component.name.toLowerCase() === 'contact');
  // const aditionalData = permissionProfile?.components.find((comp) => comp.component.name.toLowerCase() === 'aditionaldata');
  // const basicData = true;
  // const addressData = true;
  // const resumeData = true;
  // const contactData = true;
  // const aditionalData = true;
  // const configClient = true;

  let nav: JSX.Element = <></>;

  if(!open){
    nav = (
      <div className="bg-white top-52 space-y-4 left-4 p-2 flex flex-col items-center rounded-md h-full shadow-md">
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Expandir' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md rotate-90" 
              onClick={() => setOpen(true)} /></div>
        </Tooltip>
        {permissions.components.includes('resume') && (
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Resumen' 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400"> 
              <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
                <PiPresentationChartLight 
                  style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                          color: isHover===1 || option===1 ? 'white' : '',}}
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                  text-slate-500 my-1 bg-white rounded-md
                    ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
                    onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
                />
              </div>
          </Tooltip>
        )}
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion basica' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
              <ImProfile className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                  ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
                onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                    color: isHover===2 || option===2 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion extra' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
              <FaRegImage className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md
                ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
                onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                  color: isHover===3 || option===3 ? 'white' : '',}}
              />
            </div>
        </Tooltip>
        {permissions.components.includes('address') && (
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Direccion' 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
              <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
                <FaAddressCard className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                          text-slate-500 my-1 bg-white rounded-md
                  ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
                  onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
                  style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                    color: isHover===4 || option===4 ? 'white' : '',}}
                />
              </div>
          </Tooltip>
        )}
        {permissions.components.includes('contact') && (
          <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Contactos' 
            placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
              <div className="p-1" style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': '')}}>
                <MdContactPhone className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                        text-slate-500 my-1 bg-white rounded-md ${option===5? 'bg-blue-500': ''}`} onClick={() => changeOption(5)} 
                  onMouseEnter={() => {setIsHover(5)} } onMouseLeave={() => setIsHover(-1)}
                  style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                    color: isHover===5 || option===5 ? 'white' : '',}}
                />
              </div>              
          </Tooltip>
        )}
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Configuracion' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="p-1" style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': '')}}>
              <Cog8ToothIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                      text-slate-500 my-1 bg-white rounded-md ${option===6? 'bg-blue-500': ''}`} onClick={() => changeOption(6)} 
                onMouseEnter={() => {setIsHover(6)} } onMouseLeave={() => setIsHover(-1)}
                style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': ''), 
                  color: isHover===6 || option===6 ? 'white' : '',}}
              />
            </div>              
        </Tooltip>
      </div>
    )
  }else{
    nav = (
      <div className="w-full">
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Reducir' 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <div className="flex justify-end border-b border-slate-300 pr-2">
              <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
                  text-slate-500 rotate-90" onClick={() => setOpen(false)} />
            </div>
        </Tooltip>
        {permissions.components.includes('resume') && (
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
            flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
            onClick={() => changeOption(1)}
          >
            <PiPresentationChartLight 
              style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
                  color: isHover===1 || option===1 ? 'white' : '',}}
              className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md mr-2
                ${option===1? 'bg-blue-500': ''}`}
            />
            Resumen
          </div>
        )}
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
          onClick={() => changeOption(2)}  
        >
          <ImProfile 
            style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
                color: isHover===2 || option===2 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===2? 'bg-blue-500': ''}`}
          />
          Datos basicos
        </div>
        <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
          flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
          onClick={() => changeOption(3)}
        >
          <FaRegImage
            style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
                color: isHover===3 || option===3 ? 'white' : '',}}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
              text-slate-500 my-1 bg-white rounded-md mr-2
              ${option===3? 'bg-blue-500': ''}`} 
          />
          Datos extras
        </div>
        {permissions.components.includes('address') && (
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
            flex py-2 items-center border-b border-slate-300 ${option===4? 'bg-slate-200': ''}`}
            onClick={() => changeOption(4)}
          >
            <FaAddressCard
              style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
                color: isHover===4 || option===4 ? 'white' : '',}}
              className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md mr-2
                ${option===4? 'bg-blue-500': ''}`} 
            />
            Direccion
          </div>
        )}
        {permissions.components.includes('contact') && (
          <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
            flex py-2 items-center ${option===5? 'bg-slate-200': ''}`}
            onClick={() => changeOption(5)}
          >
            <MdContactPhone 
              style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
                color: isHover===5 || option===5 ? 'white' : '',}}
              className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
                text-slate-500 my-1 bg-white rounded-md mr-2
                ${option===5? 'bg-blue-500': ''}`}
            />
            Contactos
          </div>
        )}
      </div>
    )
  }
  // if(!open){
  //   nav = (
  //     <div className="bg-white top-52 space-y-4 left-4 p-2 flex flex-col items-center rounded-md h-full shadow-md">
  //       <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Expandir' 
  //         placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //           <div className="rotate-180 p-1"><ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md rotate-90" 
  //             onClick={() => setOpen(true)} /></div>
  //       </Tooltip>
  //       {resumeData?.status && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Resumen' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400"> 
  //             <div className="p-1" style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': '')}}>
  //               <PiPresentationChartLight 
  //                 style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
  //                         color: isHover===1 || option===1 ? 'white' : '',}}
  //                 className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                 text-slate-500 my-1 bg-white rounded-md
  //                   ${option===1? 'bg-blue-500': ''}`} onClick={() => changeOption(1)} 
  //                   onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(-1)}
  //               />
  //             </div>
  //         </Tooltip>
  //       )}
  //       {basicData?.status && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion basica' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //             <div className="p-1" style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': '')}}>
  //               <ImProfile className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                         text-slate-500 my-1 bg-white rounded-md
  //                   ${option===2? 'bg-blue-500': ''}`} onClick={() => changeOption(2)} 
  //                 onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(-1)}
  //                 style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
  //                     color: isHover===2 || option===2 ? 'white' : '',}}
  //               />
  //             </div>
  //         </Tooltip>
  //       )}
  //       {aditionalData?.status && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Informacion extra' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //             <div className="p-1" style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': '')}}>
  //               <FaRegImage className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                         text-slate-500 my-1 bg-white rounded-md
  //                 ${option===3? 'bg-blue-500': ''}`} onClick={() => changeOption(3)} 
  //                 onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(-1)}
  //                 style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
  //                   color: isHover===3 || option===3 ? 'white' : '',}}
  //               />
  //             </div>
  //         </Tooltip>
  //       )}
  //       {addressData?.status && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Direccion' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //             <div className="p-1" style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': '')}}>
  //               <FaAddressCard className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                         text-slate-500 my-1 bg-white rounded-md
  //                 ${option===4? 'bg-blue-500': ''}`} onClick={() => changeOption(4)} 
  //                 onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(-1)}
  //                 style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
  //                   color: isHover===4 || option===4 ? 'white' : '',}}
  //               />
  //             </div>
  //         </Tooltip>
  //       )}
  //       {contactData && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Contactos' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //             <div className="p-1" style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': '')}}>
  //               <MdContactPhone className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                       text-slate-500 my-1 bg-white rounded-md ${option===5? 'bg-blue-500': ''}`} onClick={() => changeOption(5)} 
  //                 onMouseEnter={() => {setIsHover(5)} } onMouseLeave={() => setIsHover(-1)}
  //                 style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
  //                   color: isHover===5 || option===5 ? 'white' : '',}}
  //               />
  //             </div>              
  //         </Tooltip>
  //       )}
  //       {configClient && (
  //         <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Configuracion' 
  //           placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //             <div className="p-1" style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': '')}}>
  //               <Cog8ToothIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //                       text-slate-500 my-1 bg-white rounded-md ${option===6? 'bg-blue-500': ''}`} onClick={() => changeOption(6)} 
  //                 onMouseEnter={() => {setIsHover(6)} } onMouseLeave={() => setIsHover(-1)}
  //                 style={{backgroundColor: isHover===6 ? '#0075c9' : (option===6? '#178DE1': ''), 
  //                   color: isHover===6 || option===6 ? 'white' : '',}}
  //               />
  //             </div>              
  //         </Tooltip>
  //       )}
  //     </div>
  //   )
  // }else{
  //   nav = (
  //     <div className="w-full">
  //       <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Reducir' 
  //         placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
  //           <div className="flex justify-end border-b border-slate-300 pr-2">
  //             <ArrowDownTrayIcon className="w-4 h-4 sm:w-12 sm:h-12 pb-2 sm:pb-4 cursor-pointer 
  //                 text-slate-500 rotate-90" onClick={() => setOpen(false)} />
  //           </div>
  //       </Tooltip>
  //       {resumeData && (
  //         <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
  //           flex py-2 items-center border-b border-slate-300 mt-3 ${option===1? 'bg-slate-200': ''}`}
  //           onClick={() => changeOption(1)}
  //         >
  //           <PiPresentationChartLight 
  //             style={{backgroundColor: isHover===1 ? '#0075c9' : (option===1? '#178DE1': ''), 
  //                 color: isHover===1 || option===1 ? 'white' : '',}}
  //             className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md mr-2
  //               ${option===1? 'bg-blue-500': ''}`}
  //           />
  //           Resumen
  //         </div>
  //       )}
  //       {basicData && (
  //         <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
  //           flex py-2 items-center border-b border-slate-300 ${option===2? 'bg-slate-200': ''}`}
  //           onClick={() => changeOption(2)}  
  //         >
  //           <ImProfile 
  //             style={{backgroundColor: isHover===2 ? '#0075c9' : (option===2? '#178DE1': ''), 
  //                 color: isHover===2 || option===2 ? 'white' : '',}}
  //             className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md mr-2
  //               ${option===2? 'bg-blue-500': ''}`}
  //           />
  //           Datos basicos
  //         </div>
  //       )}
  //       {aditionalData && (
  //         <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
  //           flex py-2 items-center border-b border-slate-300 ${option===3? 'bg-slate-200': ''}`}
  //           onClick={() => changeOption(3)}
  //         >
  //           <FaRegImage
  //             style={{backgroundColor: isHover===3 ? '#0075c9' : (option===3? '#178DE1': ''), 
  //                 color: isHover===3 || option===3 ? 'white' : '',}}
  //             className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md mr-2
  //               ${option===3? 'bg-blue-500': ''}`} 
  //           />
  //           Datos extras
  //         </div>
  //       )}
  //       {addressData && (
  //         <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
  //           flex py-2 items-center border-b border-slate-300 ${option===4? 'bg-slate-200': ''}`}
  //           onClick={() => changeOption(4)}
  //         >
  //           <FaAddressCard
  //             style={{backgroundColor: isHover===4 ? '#0075c9' : (option===4? '#178DE1': ''), 
  //               color: isHover===4 || option===4 ? 'white' : '',}}
  //             className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md mr-2
  //               ${option===4? 'bg-blue-500': ''}`} 
  //           />
  //           Direccion
  //         </div>
  //       )}
  //       {contactData && (
  //         <div className={`hover:text-gray-900 hover:bg-gray-100 cursor-pointer pl-2
  //           flex py-2 items-center ${option===5? 'bg-slate-200': ''}`}
  //           onClick={() => changeOption(5)}
  //         >
  //           <MdContactPhone 
  //             style={{backgroundColor: isHover===5 ? '#0075c9' : (option===5? '#178DE1': ''), 
  //               color: isHover===5 || option===5 ? 'white' : '',}}
  //             className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer 
  //               text-slate-500 my-1 bg-white rounded-md mr-2
  //               ${option===5? 'bg-blue-500': ''}`}
  //           />
  //           Contactos
  //         </div>
  //       )}
  //     </div>
  //   )
  // }

  const navResponsive = (
    // <div className={`grid ${contactData? 'grid-cols-5': 'grid-cols-4'} mt-3 border-t pt-2 sm:hidden`}>
    <div className={`grid grid-cols-5 mt-3 border-t pt-2 sm:hidden`}>
      {permissions.components.includes('resume') && (
        <div onClick={() => changeOption(1)} className="flex flex-col items-center">
          <PiPresentationChartLight className={`w-6 h-6 ${option===1 ? 'text-green-500' : 'text-slate-500'}`} />
          <span className="text-xs">Resumen</span>
        </div>
      )}

      <div onClick={() => changeOption(2)} className="flex flex-col items-center">
        <ImProfile className={`w-6 h-6 ${option===2 ? 'text-green-500' : 'text-slate-500'}`} />
        <span className="text-xs">Datos basicos</span>
      </div>

      <div onClick={() => changeOption(3)} className="flex flex-col items-center">
        <FaRegImage className={`w-6 h-6 ${option===3 ? 'text-green-500' : 'text-slate-500'}`} />
        <span className="text-xs">Datos extras</span>
      </div>

      {permissions.components.includes('address') && (
        <div onClick={() => changeOption(4)} className="flex flex-col items-center">
          <FaAddressCard className={`w-6 h-6 ${option===4 ? 'text-green-500' : 'text-slate-500'}`} />
          <span className="text-xs">Direccion</span>
        </div>
      )}

      {permissions.components.includes('contact') && (
        <div onClick={() => changeOption(5)} className="flex flex-col items-center">
          <MdContactPhone className={`w-6 h-6 ${option===5 ? 'text-green-500' : 'text-slate-500'}`} />
          <span className="text-xs">Contactos</span>
        </div>
      )}

      <div onClick={() => changeOption(6)} className="flex flex-col items-center">
        <Cog8ToothIcon className={`w-6 h-6 ${option===6 ? 'text-green-500' : 'text-slate-500'}`} />
        <span className="text-xs">Configuracion</span>
      </div>
    </div>
  )
   
  return(
    <>
      <div className="hidden md:block">
        {nav}
      </div>
      <div className=" md:hidden">
        {navResponsive}
      </div>
    </>
  )
}