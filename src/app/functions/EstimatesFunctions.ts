import { IEstimateProject, TableEstimatesProject, IConceptEstimate, ITableConceptsEstimate } from "@/interfaces/Estimate";

export function EstimatesDataToEstimatesTable(estimates:IEstimateProject[]){
  const table: TableEstimatesProject[] = [];
  
  estimates.map((estimate, index:number) => {
    table.push({
      id: estimate._id,
      Fecha: estimate.date,
      Amortizacion: estimate.amountChargeOff,
      Condicion: {
        __v: 0,
        _id: '',
        description: '',
        id: '',
        name: '',
        status: true,
        color: '#fff'
      },
      Estimacion: estimate.amount,
      Fondo: estimate.amountGuaranteeFund,
      MontoPay: estimate.amountPayable,
      Nombre: estimate.name,
      Orden: estimate.purschaseOrder || 'sin orden',
      No: index+1
    });
  });

  return table;
}

export function ConceptsDataToConceptsTable(conepts:IConceptEstimate[]){
  const table: ITableConceptsEstimate[] = [];
  
  conepts.map((concept) => {
    table.push({
      id: concept.conceptEstimate._id,
      Cantidad: 1,
      Clave: concept.conceptEstimate.code,
      Descripcion: concept.conceptEstimate.description,
      nombre: concept.conceptEstimate.name,
      PU: concept.conceptEstimate?.priceConcepEstimate? (concept.conceptEstimate?.priceConcepEstimate?.cost? concept.conceptEstimate.priceConcepEstimate.cost: 0) : 0,
      Importe: concept.conceptEstimate?.priceConcepEstimate? (concept.conceptEstimate?.priceConcepEstimate?.cost? concept.conceptEstimate.priceConcepEstimate.cost: 0) : 0,
      Unidad: (concept.conceptEstimate.unit?.name? concept.conceptEstimate.unit?.name: 'Sin unidad') || 'Sin unidad'
    });
  });

  return table;
}