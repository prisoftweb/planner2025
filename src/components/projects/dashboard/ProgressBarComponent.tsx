import { ProgressBar } from '@tremor/react';

export const ProgressBarComponent = ({label, progress, widthBar}: {progress:number, label: string, widthBar: string}) => {
  return (
    <>
      <div className='flex gap-x-2'>
        <div className={widthBar}>
          <ProgressBar value={progress} label={progress.toString() + '%'} />
        </div>
        <p>{label}</p>
      </div>
    </>
  )
}