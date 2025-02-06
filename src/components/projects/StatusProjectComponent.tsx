import TimelineComponent from "./TimeLineComponent"
import HeaderForm from "../HeaderForm"

export default function StatusProjectComponent() {
  return (
    <>
      <HeaderForm img="/img/projects.svg" subtitle="Linea de tiempo de un proyecto" 
        title="Estatus de proyecto"
      />
      <div className="mt-4 max-w-sm rounded-lg space-y-5">
        <TimelineComponent />
      </div>
    </>
  )
}
