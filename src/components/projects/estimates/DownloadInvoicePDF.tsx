import { IInvoiceByDateAndConditionMin, IInvoiceMinFull } from "@/interfaces/Invoices"
import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { IInvoiceFull } from "@/interfaces/Invoices"
import { Company } from "@/interfaces/Companies"

export default function DownloadInvoicePDF({invoicemin, invoicefull, satCompany}: 
  {invoicemin:IInvoiceMinFull, invoicefull:IInvoiceFull, satCompany:Company}) {

  // const orderInvoices = invoices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // const total = invoices.reduce((acc, item) => acc + item.cost.total, 0);
  // const vat = invoices.reduce((acc, item) => acc + item.cost.iva, 0);
  // const subtotal = invoices.reduce((acc, item) => acc + item.cost.subtotal, 0);

  // const months=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // console.log('company pdf => ', satCompany);
  // console.log('invoice full => ', invoicefull);

  // console.log('company => ', satCompany);

  const logo = satCompany?.isologo?? satCompany.logo;

  // console.log('logo => ', logo);

  const folio= invoicefull.folio[0].toLowerCase()==='f'? invoicefull.folio: 'F '+invoicefull.folio; 

  let usecfdi= invoicefull.useCFDI;

  // console.log('usecfdi1 => ', invoicefull.useCFDI.substring(0, 3));
  // console.log('usecfdi2 => ', invoicefull.useCFDI.substring(4, 7));
  if(invoicefull.useCFDI.substring(0, 3)===invoicefull.useCFDI.substring(4, 7)){
    usecfdi=invoicefull.useCFDI.substring(4);
  }

  // console.log('logo => ', invoicemin.company.logo);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View>
              <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>{invoicemin.client.tradename}</Text>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>{invoicemin.client.name}</Text>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>{invoicemin.client.rfc}</Text>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', maxWidth:'240px'}}>{invoicemin.client?.taxregime?.regime}</Text>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Codigo postal {invoicemin.client.location.cp}</Text>

              {/* <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Proyecto: {invoicemin.project.title}</Text> */}
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Proyecto:</Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{invoicemin.project.title}</Text>
              </View>
            </View>

            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                {/* tradename */}
                <Text style={{fontSize:'15px', color:'black', fontWeight:'extrabold'}}>{satCompany.tradename}</Text>
                {/* name */}
                {/* consultar compania completa */}
                <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>{satCompany.tax.name}</Text>
                <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>{satCompany.tax?.rfc}</Text>
                <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold', maxWidth:'240px'}}>{satCompany.tax?.taxregime?.regime} </Text>
                <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Lugar de expedicion {satCompany.location?.cp}</Text>
              </View>

              {/* <Image source={invoicemin.company.logo} style={{height: '57px', width:'auto'}}></Image> */}
              {/* <Image source={invoicemin.company.logo} style={{height: '57px', width:'auto'}}></Image> */}
              {/* <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image> */}
              <Image source={logo} style={{height: '57px', width:'auto'}}></Image>

            </View>

          </View>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between', marginTop:'15px', borderTop: '1px solid gray', paddingTop:'10px'}}>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>Folio fiscal:</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Uso de CFDI: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{usecfdi} </Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Forma de pago: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{invoicemin.paymentWay}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Metodo pago: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{invoicemin.paymentMethod}</Text>
              </View>
              
            </View>

            <View>
              <Text style={{fontSize:'11px', color:'black', fontWeight:'extrabold'}}>{invoicemin.taxfolio}</Text>
              
              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Tipo de comprobante: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{invoicefull.typeofreceipts=='I'? 'Ingreso': 'Otro'}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Condicion de pago: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{invoicemin?.termsofPayment?.name}</Text>
              </View>

            </View>

            <View style={{display:'flex', flexDirection: 'column', alignItems:'flex-end'}}>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Factura: </Text>
                <Text style={{fontSize:'9px', color:'#262626', fontWeight:'extralight'}}>{folio}</Text>
              </View>
              {/* <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>Factura:</Text>
              <Text style={{fontSize:'11px', color:'gray', fontWeight:'extrabold', textAlign:'right'}}>F {invoicemin.folio}</Text> */}
              <Text style={{fontSize:'10px', color:'black', textAlign:'right'}}>{invoicemin.estimate?.name?? ''}</Text>
              <Text style={{fontSize:'10px', color:'black', textAlign:'right'}}>{invoicefull?.sat?.invoiceSignatureDate?.substring(0, 10)} {invoicefull?.sat?.invoiceSignatureDate?.substring(11, 19)}</Text>
              
            </View>

          </View>

          <View style={{backgroundColor:'#0095E1', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:'15px'}}>
            <Text style={{color:'white', textAlign:'center'}}>FACTURA</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>CANTIDAD</Text>
            <Text style={{flex: 4, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>DESCRIPCION</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>PRECIO</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold', textAlign:'right'}}>IMPORTE</Text>
          </View>

          {invoicemin.conceptsInvoiceInfo.map((c, index:number) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}} key={c._id+index} >
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{c.quantity}</Text>
              <Text style={{flex: 4, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{c.conceptEstimate.description}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.priceConcepEstimate.cost
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', fontWeight: 'bold', textAlign:'right'}}>{CurrencyFormatter({
                currency: 'MXN',
                value: c.priceConcepEstimate.cost * c.quantity
              })}</Text>
            </View>
          ))}

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid #0095E1', marginTop:'15px'}}>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>SUBTOTAL</Text>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.subtotal
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid #0095E1', marginTop:'5px'}}>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>(+) IVA</Text>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.iva
            })}</Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop:'1px solid #0095E1', marginTop:'5px'}}>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>TOTAL</Text>
            <Text style={{color:'black', textAlign:'center', fontSize:'10px', fontWeight:'extrabold'}}>{CurrencyFormatter({
              currency: 'MXN',
              value: invoicemin.cost.total
            })}</Text>
          </View>

          <View style={{marginTop:'15px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del SAT: </Text>
            <Text style={{fontSize:'7px', color:'#262626'}}>{invoicefull?.sat?.satCertificateNumber}</Text>
          </View>

          <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold'}}>Numero del serie CSD del emisor: </Text>
            <Text style={{fontSize:'7px', color:'#262626'}}>{invoicefull?.sat?.invoiceCertificateNumber}</Text>
          </View>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello digital del CFDI: </Text>
          <Text style={{fontSize:'7px', color:'#262626'}}> {invoicefull?.sat?.invoiceBase64Sello} </Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Sello del SAT: </Text>
          <Text style={{fontSize:'7px', color:'#262626'}}> {invoicefull?.sat?.satBase64Sello} </Text>

          <Text style={{fontSize:'10px', color:'black', fontWeight:'extrabold', marginTop:'5px'}}>Cadena Original: </Text>
          <Text style={{fontSize:'7px', color:'#262626'}}> {invoicefull?.sat?.satBase64OriginalString} </Text>

          <View style={{borderTop:'1px solid #0095E1', marginTop:'15px'}}></View>
          <Text style={{fontSize:'7px', color:'#262626', marginTop:'5px'}}> Este documento es una representación impresa de un CFDI. </Text>
        </View>
      </Page>
    </Document>
  )
}
