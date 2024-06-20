import {Document, Page, Text, Image, View, StyleSheet} from '@react-pdf/renderer'
import { Report } from '@/interfaces/Reports'

export default function AttachedPDF({report} :{report:Report}){
  
  const style = StyleSheet.create({
    textBlue: {
      color: 'blue',
      fontSize: '10px',
      textDecoration: 'underline',
    },
    textRed: {
      color: 'red',
      fontSize: '10px',
      textDecoration: 'underline',
    },
    paragraph: {
      marginTop: '9px',
      display: 'flex',
      flexDirection: 'row',
      fontSize: '10px',
      gap: '5px',
    },
    container: {
      margin: '1px solid gray',
      padding: '3px',
      fontSize: '10px',
      marginTop: '5px'
    },
    textFlex: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '10px',
    }
  })
  
  return(
    <Document>
      <Page>
        <View style={{justifyContent: 'center', marginTop: '10px'}}>
          <Image src={'/logoActualizado.jpg'} style={{width: '110px'}}></Image>
        </View>
        <Text style={{fontSize: '20px', textAlign: 'center'}}>(FF ANEXO I)</Text>
        <Text style={{fontSize: '15px', textAlign: 'center'}}> OFICIO DE ENTREGA </Text>
        <View style={[style.textFlex, {justifyContent: 'flex-end'}]}>
          <Text>SAN LUIS POTOSI S.L.P. </Text>
          <Text style={style.textBlue}>a 01 DE JUNIO DE 2024 12:35</Text>
        </View>
        <Text style={{fontSize: '10px'}}>C. DIANA CAMACHO PALACIOS</Text>
        <Text style={{fontSize: '10px'}}>DEPARTAMENTO DE ADMINISTRACION</Text>
        <View style={style.textFlex}>
          <Text>EMPRESA</Text>
          <Text style={style.textBlue}> PALACIOS CONSTRUCCIONES</Text>
        </View>
        <Text style={{fontSize: '10px'}}>PRESENTE:</Text>

        <View style={style.paragraph}>
          <Text>POR MEDIO DE LA PRESENTE, HAGO ENTREGA DE LAS COMPROBACIONES DEL FONDO FIJO
            QUE TENGO BAJO MI RESGUARDO COMO ENCARGADO DEL AREA DE </Text>
          <Text style={style.textBlue}> MEJORA CONTINUA</Text>
          <Text>DE LA EMPRESA</Text>
          <Text style={style.textBlue}>PALACIOS CONSTRUCCIONES</Text>
          <Text> ( EL IMPORTE TOTAL COMPROBADO DE MI FONDO FIJO ES DE </Text>
          <Text style={style.textRed}>$1,293.10 )</Text>
        </View>

        <View style={style.paragraph}>
          <Text>INGRESE A PLANNER LOS COMPROBANTES POR LA CANTIDAD MENCIONADA Y AL MISMO 
              TIEMPO SOLICITO ME SEA REPUESTO EL IMPORTE POR LA CANTIDAD DE: </Text>
          <Text style={style.textBlue}>$1,293.10. </Text>
          <Text>QUE SE REFIERE A GASTOS REALIZADOS DURANTE EL PERIODO COMPRENDIDO DEL</Text>
          <Text style={style.textBlue}>DIA 23 al 25 DE MAYO DEL AÑO 2024.</Text>
        </View>

        <View style={style.paragraph}>
          <Text>SIRVA EL PRESENTE ESCRITO PARA FORMALIZAR EL CIERRE PARA LA COMPROBACION DE
              GASTOS EFECTUADOS EN OPERACIONES DEL PROYECTO DE</Text>
          <Text style={style.textBlue}>ADMINISTRACION DE PALACIOS CONSTRUCCIONES EN SAN LUIS POTOSI S.L.P. </Text>
          <Text>A FAVOR DE LA EMPRESA </Text>
          <Text style={style.textBlue}> PALACIOS CONSTRUCCIONES</Text>
          <Text>Y QUE FUI ASIGNADO PARA REALIZAR LAS SIGUIENTES ACTIVIDADES:</Text>
        </View>

        <View style={style.container}>
          <Text style={style.textBlue}>PAPELERIA Y FORMATEO DE PC</Text>
        </View>

        <View style={style.paragraph}>
          <Text>NO HABIENDO MAS QUE INFORMAR Y EN EL ENTENDIDO QUE TENGO CLARO LOS EFECTOS
              QUE PUDIERAN GENERARSE POR FALTA DE RECTITUD Y HONRADEZ DE MI PARTE COMO 
              ENCARGADO DEL FONDO FIJO Y CUMPLIENDO LAS POLITICAS DE FONDO FIJO DE LA 
              EMPRESA</Text>
          <Text style={style.textBlue}>PALACIOS CONSTRUCCIONES.</Text>
        </View>
        
        <Text>ME DESPIDO DE USTED, QUEDANDO A SUS ORDENES PARA CUALQUIER ACLARACION</Text>
        <Text>ATENTAMENTE</Text>
      </Page>
    </Document>
  )
}