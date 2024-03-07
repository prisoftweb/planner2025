import Link from "next/link"

export default function Card({children, link, p1, p2, p3}:
                    {children:JSX.Element, link:string, p1:string, p2:string, p3:string}){
  return(
    <>
      <div className="bg-white p-1">
        <p>{p1}</p>
        <div className="flex items-center text-2xl sm:text-4xl my-2">
          <div className="bg-sky-700 p-2 mr-5 text-white rounded-lg">
            {/* <EnvelopeIcon width={20} height={20} /> */}
            {children}
          </div>
          <p className="text-sky-700">{p2}</p>
        </div>
        <div className="inline">
          <Link href={link} className="">
            <p className="inline mr-2 text-blue-500 text-xs">Ver detalles</p>
          </Link>
          <p className="inline text-xs">{p3}</p>
        </div>
      </div>
    </>
  )
}