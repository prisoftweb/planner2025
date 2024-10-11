import { ProgressBar } from '@tremor/react';

export const ProgressBarComponent = ({label, progress}: {progress:number, label: string}) => {
  return (
    <>
      <div className='flex gap-x-2'>
        <div className='w-2/3'>
          <ProgressBar value={progress} label={progress.toString() + '%'} />
        </div>
        <p>{label}</p>
      </div>
    </>
  )
}