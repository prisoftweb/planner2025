'use client'

import TabReports from "./TabReports"
import { useState } from "react"
import TableReportByProject from "./TableReportByProject";
import TableReportByType from "./TableReportByType";

export default function ContainerReportsPage({token}: {token:string}){
  
  const [option, setOption] = useState<number>(0);

  const handleOption = (value: number) => {
    setOption(value);
  }

  let table = <></>;
  switch(option){
    case 0:
      table =  <TableReportByProject token={token} />;
    break;
    case 1:
      table =  <TableReportByType token={token} />;
    break;
  }

  return(
    <div>
      <TabReports option={option} setOption={handleOption} />
      {table}
    </div>
  )
}