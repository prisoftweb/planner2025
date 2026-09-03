import DeleteElement from "./DeleteElement";
import { Tooltip } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { propsTooltip } from "@/libs/animations";

const CardListComponent = ({element, token, handleElement, handleEdit, image, keyID, code, nameElement, removeElement, 
  title, subtitle, subtitle2, title2 }: 
  {image?:string, keyID:string, code?:string, element:any, token:string, handleElement?: (element:any) => void, 
    handleEdit?: (value: boolean) => void, nameElement?:string, removeElement?:Function, title?:string, subtitle?:string,
    title2?:string, subtitle2?:string }) => {
  
  return(
    <div role="button"
      key={keyID}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center gap-y-1">
          {image && (
            <img alt="responsable" src={ image}
              className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          )}
          {code && (
            <div 
              className={`rounded-md text-white bg-gray-600 text-center
              uppercase w-6 h-6 flex items-center justify-center`}>
              <p className={`text-xs uppercase `} >{code}</p>
            </div>
          )}

          {handleEdit && (
            <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content='Modificar' 
                placement="right" className="text-black bg-white rounded-md border border-slate-400">
              <PencilIcon className="w-6 h-6 text-slate-600 cursor-pointer hover:bg-slate-100" 
                onClick={() => {
                  if(handleElement && element){
                    handleElement(element);
                  }
                  handleEdit(true);
                }} />
            </Tooltip>
          )}

          {nameElement && removeElement && (
            <DeleteElement remove={removeElement} id={keyID} token={token} name={nameElement} />
          )}
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {title}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {subtitle}
              </p>
            </div>
            {(title2 || subtitle2) && (
              <div className="text-right">
                {title2 && (
                  <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                    {title2}
                  </p>
                )}
                {subtitle2 && (
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                    {subtitle2}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardListComponent;