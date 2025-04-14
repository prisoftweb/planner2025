'use client'

import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Options } from '@/interfaces/Common'

export default function Selectize({options, routePage, subpath, onChangeFunction=() => console.log('')}: 
  {options:Options[], routePage:string, subpath:string, onChangeFunction?: Function}){
  
  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MagnifyingGlassIcon className='w-6 h-6 text-slate-400' />
        </components.DropdownIndicator>
      )
    )
  }
  
  const customStyles = {
    control: (base: any) => ({
      ...base,
      flexDirection: 'row-reverse',
      borderRadius: "9px",
    }),
  }

  const onChange = (value:string) => {
    window.location.replace(`/${routePage}/${value}${subpath}`);
  }
  
  return(
    <>
      <Select
        className='w-full max-w-md' 
        options={options}
        maxMenuHeight={250}
        components={{
          DropdownIndicator
        }}
        placeholder='Buscar ...'
        styles={customStyles}
        onChange={(value:any) => onChange(value.value)}
      />
    </>
  )
}