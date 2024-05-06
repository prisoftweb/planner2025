import { ArrowPathIcon } from "@heroicons/react/24/solid"

export default function Loading() {
  return (
    // <div className="flex justify-center items-center w-screen h-screen">
    //   <div>
    //     <ArrowPathIcon width={40} height={40} className="animate-spin h-56 w-56 mr-3 text-slate-600" />
    //     <p className="text-center text-2xl mt-2">Loading ...</p>
    //   </div>
    // </div>
    <div className="flex justify-center items-center h-screen">
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="">Loading...</span>
      </div>
    </div>
  )
}