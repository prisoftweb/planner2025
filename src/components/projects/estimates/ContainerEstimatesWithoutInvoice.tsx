'use client'
import { IEstimateMin } from "@/interfaces/Estimate";
import TableEstimatesWithoutInovice from "./TableEstimatesWithoutInvoice";

export default function ContainerEstimatesWithoutInvoice({ estimates, token, user, company }: 
  {estimates:IEstimateMin[], token: string, user: string, company:string }) {

  const delEstimate = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      <TableEstimatesWithoutInovice estimates={estimates} delEstimate={delEstimate} token={token} company={company} />
    </>
  )
}
