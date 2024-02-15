'use client'

import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function Selectize({options}: any){
  
  const router = useRouter();

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

  const onChangeUser = (value:string) => {
    router.push(`/users/${value}?tab=1`)
  }
  
  return(
    <>
      <Select
        className='w-80' 
        options={options}
        maxMenuHeight={100}
        components={{
          DropdownIndicator
        }}
        placeholder='Buscar ...'
        styles={customStyles}
        onChange={(value:any) => onChangeUser(value.value)}
      />
    </>
  )
}