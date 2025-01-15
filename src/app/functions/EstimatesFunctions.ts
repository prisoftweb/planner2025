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
      No: index++
    });
  });

  return table;
}

export function ConceptsDataToConceptsTable(conepts:IConceptEstimate[]){
  const table: ITableConceptsEstimate[] = [];
  
  conepts.map((concept) => {
    table.push({
      id: concept._id,
      Cantidad: 1,
      Clave: concept.code,
      Descripcion: concept.description,
      nombre: concept.name,
      PU: concept.prices && concept.prices.length > 0? (concept.prices[0].cost? concept.prices[0].cost: 0) : 0,
      Importe: concept.prices && concept.prices.length > 0? (concept.prices[0].cost? concept.prices[0].cost: 0 ) : 0,
      Unidad: concept.prices && concept.prices.length > 0? (concept.prices[0].unit? concept.prices[0].unit : 'NA'): 'NA'
    });
  });

  return table;
}