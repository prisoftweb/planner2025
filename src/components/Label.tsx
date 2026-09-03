interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{}

export default function Label({children, ...props}:Props){
  return(
    <>
      <label
        className="after:content[' '] pointer-events-none flex
          w-full select-none !overflow-visible truncate text-sm font-normal leading-tight 
          text-gray-500 transition-all after:block after:w-full 
          after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform 
          after:duration-300 peer-placeholder-shown:leading-tight 
          peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight 
          peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 
          peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        {...props}
      >
        {children}
      </label>
    </>
  )
}