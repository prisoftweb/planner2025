export default function IconText({text}: {text:string}){
  return(
    <>
      <div 
        className="rounded-md text-white bg-blue-600 text-center
          uppercase w-8 h-8 flex items-center justify-center">
        <p>{text}</p>
      </div>
    </>
  )
}