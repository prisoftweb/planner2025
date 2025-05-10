import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ReportByProject, CostGroupByType } from '@/interfaces/ReportsOfCosts'

export default function ReportCostByProjects({reports, costsByTypes}: 
  {reports:ReportByProject[], costsByTypes: CostGroupByType[]}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      borderBottom: '1px solid gray',
    },
    header: {
      fontSize: '8px',
      padding: '2px',
      borderBottom: '1px solid black',
      fontWeight: 'bold'
    },
    element: {
      fontSize: '8px',
      padding: '4px',
    },
    subTitle: {
      fontSize: '8px',
      textAlign: 'right',
      margin: '1px',
      color: 'black',
    },
  })
  const reportSorted = reports.sort((a, b) => {
    const nameA = a.project.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.project.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  });

  let totalTypes: number = 0;
  costsByTypes.map((costtype) => {
    totalTypes += costtype.totalCost;
  });

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date();
  return(
    <Document>
      <Page>
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              <Text style={[style.subTitle, {textAlign:'right'}]}>Resumen de costos por obras</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Tipo</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Monto de obra</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cantidad</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Porcentaje %</Text></View>
            </View>
            {reportSorted.map((rep, index:number) => (
              <View style={[style.table, index > 0 && reports[index-1].project.title !== rep.project.title? {borderTop: '1px solid gray'}: {}]} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{rep.project.title}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{rep.tipo ?? 'Sin tipo'}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: rep.project.amount
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: rep.totalCost
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{rep.quantity}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{((rep.totalCost / rep.project.amount) * 100).toFixed(2)}%</Text></View>
              </View>
            ) )}
            <View style={{borderTop: '1px solid gray', marginTop: '20px'}}>
              {costsByTypes.map((costtype, index:number) => (
                <View style={[style.table]} key={index}>
                  <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>TOTAL</Text></View>
                  <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>{costtype.tipo}</Text></View>
                  <View style={[style.element, {flex: 1}]}><Text></Text></View>
                  <View style={[style.element, {flex: 1}]}><Text style={{fontSize: '11px', fontWeight:'semibold'}}>{CurrencyFormatter({
                    currency: 'MXN',
                    value: costtype.totalCost
                  })}</Text></View>
                  <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>{costtype.quantity}</Text></View>
                  <View style={[style.element, {flex: 1}]}><Text></Text></View>
                </View>
              ))}
            </View>
            <View style={[style.table, {borderTop: '1px solid gray'}]}>
              <View style={[style.element, {flex: 1}]}><Text style={{fontWeight: 'semibold'}}>TOTAL</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text style={{fontSize: '14px', fontWeight:'semibold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: totalTypes
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}