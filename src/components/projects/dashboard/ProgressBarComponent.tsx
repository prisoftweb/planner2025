import { ProgressBar } from '@tremor/react';


export const ProgressBarComponent = ({label, progress, widthBar, color= '#00f'}: 
    {progress:number, label: string, widthBar: string, color?: string}) => {
  return (
    <>
      {/* <div className='flex gap-x-2'>
        <div className={widthBar}>
          <ProgressBar value={progress} label={progress.toString() + '%'} />
        </div>
        <p>{label}</p>
      </div> */}
      <div className='flex gap-x-2'>
        <div className={`${widthBar} bg-gray-200 rounded-full h-2.5 dark:bg-gray-700`}>
          <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
            style={{"width": progress + '%', "backgroundColor": color}}></div>
        </div>
        <p>{progress.toString() + '%'}</p>
        <p>{label}</p>
      </div>
    </>
  )
}