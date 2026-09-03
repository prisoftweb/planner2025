import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ReportByCostcenter } from '@/interfaces/CostCenter'
import { useMemo } from 'react';
import { Company } from "@/interfaces/Companies"

export default function ReportCostByCostCenter({costsCostCenter, dateFinal, dateIni, satCompany}: 
  {costsCostCenter: ReportByCostcenter[], dateIni:Date, dateFinal: Date, satCompany:Company}){

  const total=useMemo(() => costsCostCenter.reduce((accum, item) => accum+=item?.totalCost?? 0, 0), costsCostCenter);
  
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
    title: {
      fontSize: '14px',
      padding: '2px',
      borderBottom: '1px solid black',
      fontWeight: 'bold',
      color: 'black',
    },
  })
  
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date();
  return(
    <Document>
      <Page>
        <View style={{paddingVertical: '30px', paddingLeft: '30px'}}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}} >
            {/* <Image src={'/Palaciosconstrucciones_horizontal.png'} style={{width: '130px'}} /> */}
            <Image src={satCompany?.isologo?? satCompany.logo} style={{width: '130px'}} />
            <View style={{textAlign: 'right', display: 'flex', alignItems: 'flex-end'}} >
              <Text style={[style.title, {textAlign:'right'}]}>Resumen de costos por Centro de costos</Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>De {dateIni.getDate()} de {months[dateIni.getMonth()]} de {dateIni.getFullYear()} a {dateFinal.getDate()} de {months[dateFinal.getMonth()]} de {dateFinal.getFullYear()} </Text>
              <Text style={[style.subTitle, {textAlign:'right'}]}>San luis Potosi, S.L.P. a {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}</Text>
            </View>
          </View>
          
          <View style={style.containerTable}>
            <View style={style.table}>
              <View style={[style.header, {flex: 1}]}><Text style={{fontWeight: 'bold'}}>Tipo</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Proyecto</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Centro de costos</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cuenta</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Costo total</Text></View>
              <View style={[style.header, {flex: 1}]}><Text>Cantidad</Text></View>
            </View>
            {costsCostCenter.map((costCC, index:number) => (
              <View style={[style.table, index > 0 && costsCostCenter[index-1].project !== costCC.project? {borderTop: '1px solid gray'}: {}]} key={index}>
                <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}>{costCC.type}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.project}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.costocenter?.concept || ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.costocenter?.account || ''}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                  currency: 'USD',
                  value: costCC.totalCost
                })}</Text></View>
                <View style={[style.element, {flex: 1}]}><Text>{costCC.quantity}</Text></View>                
              </View>
            ) )}
            <View style={[style.table, {borderTop: '1px solid gray'}]}>
              <View style={[style.element, {flex: 1}, {fontWeight: 'bold'}]}><Text style={{fontWeight: 'bold'}}></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>
              <View style={[style.element, {flex: 1}]}><Text>{CurrencyFormatter({
                currency: 'USD',
                value: total
              })}</Text></View>
              <View style={[style.element, {flex: 1}]}><Text></Text></View>                
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}