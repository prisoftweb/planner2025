'use client'

import Selectize from "../Selectize"
import Header from "../HeaderPage"
import { Report } from "@/interfaces/Reports"
import { Options } from "@/interfaces/Common"
import { useOneReportStore } from "@/app/store/reportsStore"

export default function ContainerReport({report, options}: {report:Report, options:Options[]}) {
  
  const {updateOneReportStore} = useOneReportStore();

  const handleReport = () => {
    updateOneReportStore(undefined);
  }
  
  return (
    <Header title={report.name} previousPage="/reports">
      <Selectize options={options} routePage="expenses" subpath="/profile"
            onChangeFunction={handleReport} />
    </Header>
  )
}
