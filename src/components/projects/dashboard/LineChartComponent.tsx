"use client"

import { LineChart } from "@tremor/react"
interface OptionsDashboard {
  label: string,
  costo: number
}

export const LineChartComponent = ({dataProjectsTop, colors}:{dataProjectsTop: OptionsDashboard[], colors: string[]}) => (
  <LineChart
    className="h-80"
    data={dataProjectsTop}
    index="label"
    colors={colors}
    categories={["costo"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
    yAxisWidth={76}
  />
)