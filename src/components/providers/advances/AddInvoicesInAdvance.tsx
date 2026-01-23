import Label from "@/components/Label"
import TextArea from "@/components/TextArea"
import Button from "@/components/Button"

export default function AddInvoicesInAdvance() {
  return (
    <div>
      <Label>Notas:</Label>
      <TextArea></TextArea>
      <div className="flex justify-center mt-5">
        <Button>Guardar</Button>
      </div>
    </div>
  )
}
