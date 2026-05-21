import { IInvoiceByDateAndConditionMin } from "@/interfaces/Invoices"
import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'

export default function DownloadInvoicePDF({}: 
  {}) {

  // const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // const total = invoices.reduce((acc, item) => acc + item.cost.total, 0);
  // const vat = invoices.reduce((acc, item) => acc + item.cost.iva, 0);
  // const subtotal = invoices.reduce((acc, item) => acc + item.cost.subtotal, 0);

  // const months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View>
              <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>Peasa</Text>
              <Text style={{fontSize:'11px', color:'gray', marginTop:'5px'}}>Grupo constructor peasa</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>PEA900JHG</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>601- General de ley</Text>
              <Text style={{fontSize:'11px', color:'gray'}}>Codigo postal 20290</Text>

              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Proyecto: Edscha</Text>
            </View>

            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                
                <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>Palacios construcciones</Text>
                
                <Text style={{fontSize:'11px', color:'gray', marginTop:'5px'}}>Samuel Palacios Hernandez</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>PAHS7610243</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>612-Personas fisicas</Text>
                <Text style={{fontSize:'11px', color:'gray'}}>Lugar de expedicion 78377</Text>
              </View>

              <Image source={'/Palaciosconstrucciones-isologo.png'} style={{height: '57px', width:'auto'}}></Image>

            </View>

          </View>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between', marginTop:'15px', borderTop: '1px solid gray', paddingTop:'10px'}}>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Folio fiscal:</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Uso de CFDI: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>G03-Gastos en general</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Forma de pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>99-Por definir</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Metodo pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>PPD - Pago en parcialidades o diferido</Text>
              </View>
              
            </View>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Folio fiscal0980909098908098098:</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Tipo de comprobante: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>I - ingreso</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Condicion de pago: </Text>
                <Text style={{fontSize:'10px', color:'gray'}}>Contado</Text>
              </View>

            </View>

            <View style={{display:'flex', flexDirection: 'column', alignItems:'flex-end'}}>
              <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>Factura:</Text>
              <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>F 2876</Text>
              <Text style={{fontSize:'11px', color:'gray', textAlign:'right'}}>Estimacion #1</Text>
              <Text style={{fontSize:'11px', color:'gray', textAlign:'right'}}>15 de mayo de 2026</Text>
              
            </View>

          </View>

          <View style={{backgroundColor:'blue', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:'15px'}}>
            <Text style={{color:'white', textAlign:'center'}}>FACTURA</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>CANTIDAD</Text>
            <Text style={{flex: 4, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>DESCRIPCION</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>PRECIO</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>IMPORTE</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'15px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>SUBTOTAL</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: 1700
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'5px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>(+) IVA</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: 1700
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid blue', marginTop:'5px'}}>
            <Text style={{color:'gray', textAlign:'center', fontSize:'10px'}}>Total</Text>
            <Text style={{color:'blue', textAlign:'center', fontSize:'10px'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: 1700
            })}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del SAT: </Text>
            <Text style={{fontSize:'10px', color:'gray'}}>9294384093808409480594</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del emisor: </Text>
            <Text style={{fontSize:'10px', color:'gray'}}>9294384093808409480594</Text>
          </View>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello digital del CFDI: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello del SAT: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Cadena Original: </Text>
          <Text style={{fontSize:'7px', color:'black'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

        </View>
      </Page>
    </Document>
  )
}
