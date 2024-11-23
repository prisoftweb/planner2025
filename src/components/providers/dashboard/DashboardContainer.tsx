import { BarChartComponent } from "@/components/projects/dashboard/BarChartComponent"

export default function DashboardContainer() {
  return (
    <>
      <div className="flex justify-around p-5">
        <div className="shadow-md shadow-slate-500 p-5">
          <p className="text-5xl">18</p>
          <p className="text-3xl">proveedores</p>
          <p className="text-2xl text-red-500">{'Con credito >'}</p>
        </div>
        <div className="shadow-md shadow-slate-500 p-5">
          <p className="text-5xl">18</p>
          <p className="text-3xl">proveedores</p>
          <p className="text-2xl text-red-500">{'Con credito >'}</p>
        </div>
      </div>
      <div className="mt-10 flex">
        <div className="w-2/3"></div>
        <div className="w-1/3"></div>
      </div>
    </>
  )
}
