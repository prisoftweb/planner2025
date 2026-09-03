
export const ProgressBarComponent = ({label, progress, widthBar, color= '#00f', hei='h-2.5', amount=undefined}: 
    {progress:number, label: string, widthBar: string, color?: string, hei?: string, amount?: number | undefined}) => {

  const porcentaje = progress > 100? 100: progress;    

  return (
    <>
      <div className='flex gap-x-2 items-center flex-wrap-reverse sm:flex-nowrap'>
        <div className="flex gap-x-2 items-center w-full">
          {/* <div className={`${widthBar} bg-gray-200 ${hei} dark:bg-gray-700`}> */}
          <div className={`w-full bg-gray-200 ${hei} dark:bg-gray-700`}>
            <div className={`bg-purple-600 ${hei} dark:bg-purple-500`} 
                  style={{"width": porcentaje + '%', "backgroundColor": color}}></div>
          </div>
          <p className=" text-xs w-14">{progress.toString() + '%'}</p>
        </div>
        <p className=" text-xs w-full sm:w-1/3">{label}</p>
      </div>
    </>
  )
}