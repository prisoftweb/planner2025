
export const ProgressBarComponent = ({label, progress, widthBar, color= '#00f', hei='h-2.5'}: 
    {progress:number, label: string, widthBar: string, color?: string, hei?: string}) => {

  const porcentaje = progress > 100? 100: progress;    
  return (
    <>
      <div className='flex gap-x-2'>
        <div className={`${widthBar} bg-gray-200 ${hei} dark:bg-gray-700`}>
          <div className={`bg-purple-600 ${hei} dark:bg-purple-500`} 
            style={{"width": porcentaje + '%', "backgroundColor": color}}></div>
        </div>
        <p className=" text-sm font-bold w-14">{progress.toString() + '%'}</p>
        <p className=" text-xs">{label}</p>
      </div>
    </>
  )
}