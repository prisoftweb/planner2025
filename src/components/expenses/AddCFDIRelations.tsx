import HeaderForm from "../HeaderForm"
import { useState, useEffect } from "react"
import { showToastMessageError } from "../Alert"

export default function AddCFDIRelations({cost, token}: {token:string, cost:string}) {
  

  return (
    <>
      <HeaderForm img="/img/projects.svg" subtitle="Lista de CFDI's relacionados" 
        title="CFDI' Relacionados"
      />
      
    </>
  )
}
