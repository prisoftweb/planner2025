import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
//import { ReportByProject, CostGroupByType } from '@/interfaces/ReportsOfCosts'
import { ReportByCostcenterCategory } from '@/interfaces/CostCenter'

export default function ReportCostByCategory({costsCostCenter}: {costsCostCenter: ReportByCostcenterCategory[]}){
  
  const style = StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'row',
      margin: '3px'
    },
    containerTable: {
      paddingVertical: '10px',
      borderBottom: '1px solid gray',
      //borderTop: '1px solid gray'
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
  // const reportSorted = reports.sort((a, b) => {
  //   const nameA = a.project.title.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b.project.title.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  
  //   // names must be equal
  //   return 0;
  // });

  // let totalTypes: number = 0;
  // costsByTypes.map((costtype) => {
  //   totalTypes += costtype.totalCost;
  // });

  //console.log('costos por categoria => ', costsCostCenter);

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date();
  return(
    <Document>
      <Page>
        {/* <View style={{padding: '30px'}}> */}
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              <Text style={[style.subTitle, {textAlign:'right'}]}>Detalle de costo agrupado por categoria</Text>
              {/* <Text style={[style.subTitle, {textAlign:'right'}]}>Del dia 01 al 30 de junio 2024</Text> */}
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Tipo</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Obra</Text></View>
              {/* <View style={[style.header, {flex: 1}]}><Text>Categoria</Text></View> */}
              <View style={[style.header, {flex: 1}]}><Text>Categoria</Text></View>
              {/* <View style={[style.header, {flex: 1}]}><Text>Cuenta</Text></View> */}
              <View style={[style.header, {flex: 1}]}><Text>Total</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cantidad</Text></View>
            </View>
            {costsCostCenter.map((costCC, index:number) => (
              <View style={[style.table, index > 0 && costsCostCenter[index-1].project !== costCC.project? {borderTop: '1px solid gray'}: {}]} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{costCC.type}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.project}</Text></View>
                {/* <View style={[style.element, {flex: 1}]}><Text>{costCC.costocenter.category}</Text></View> */}
                <View style={[style.element, {flex: 1}]}><Text>{costCC.costocenter}</Text></View>
                {/* <View style={[style.element, {flex: 1}]}><Text>{costCC.costocenter.account}</Text></View> */}
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'MXN',
                  value: costCC.totalCost
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.quantity}</Text></View>                
              </View>
            ) )}
          </View>
        </View>
      </Page>
    </Document>
  )
}