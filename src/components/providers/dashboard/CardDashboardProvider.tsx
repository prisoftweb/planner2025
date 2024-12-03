import Link from "next/link"

export default function CardDashboardProvider({children, link, p1, p2, p3, textColor, textLink}:
    {children:JSX.Element, link:string, p1:string, p2:string, p3:string, textColor: string, textLink: string}){
  return(
    <>
      <div className="bg-white p-1">
        <p>{p1}</p>
        <div className="flex items-center text-2xl sm:text-4xl my-2">
          <div className={`${textColor} p-2 mr-5 rounded-lg`}>
            {/* <EnvelopeIcon width={20} height={20} /> */}
            {children}
          </div>
          <p className={textColor}>{p2}</p>
        </div>
        <div className="inline">
          <Link href={link} className="">
            <p className="inline mr-2 text-blue-500 text-xs">{textLink}</p>
          </Link>
          <p className="inline text-xs">{p3}</p>
        </div>
      </div>
    </>
  )
}