import Link from "next/link"
import { Tooltip } from "@nextui-org/react"
import { MoneyFormatterToNumber, CurrencyFormatter } from "@/app/functions/Globals"

export default function CardDashboardProvider({children, link, p1, p2, p3, textColor, textLink, valueTooltip=false}:
    {children:JSX.Element, link:string, p1:string, p2:string, p3:string, textColor: string, textLink: string, valueTooltip?: boolean}){

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

  return(
    <>
      <div className="bg-white p-1">
        <p>{p1}</p>
        <div className="flex items-center text-2xl sm:text-4xl my-2">
          <div className={`${textColor} p-2 mr-3 rounded-lg`}>
            {/* <EnvelopeIcon width={20} height={20} /> */}
            {children}
          </div>
          {valueTooltip && (
            <Tooltip closeDelay={0} delay={100} motionProps={props} 
                content={CurrencyFormatter({
                  currency: 'USD',
                  value: MoneyFormatterToNumber(p2)
                })} 
                className="text-slate-900 bg-white" placement="top">
              <p className={textColor}>{p2}</p>
            </Tooltip>
          )}
          {!valueTooltip && <p className={textColor}>{p2}</p>}
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