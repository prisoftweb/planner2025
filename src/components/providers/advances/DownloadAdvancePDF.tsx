import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { CurrencyFormatter } from '@/app/functions/Globals'
import { ICollectionMin, ITotalAmountRecoveredCollections } from '@/interfaces/Collections';

export default function DownloadAdvancePDF() {

  // const orderCollections = collections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '15px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>

            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                {/* <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'67px'}}></Image> */}
                <Image source={'/isologo_palacios.png'} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Palacios Construcciones</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Cda. Monreal #120</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Col. Gral. I. Martinez</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>San Luis Potosi S.L.P. </Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Mexico</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
                  </View>

                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>FC con PLACA</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Arquimedes #1234</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Col. Progreso</Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>San Luis Potosi S.L.P. </Text>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>Mexico</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
                  </View>
                </View>
              </View>
{/* <View style={{marginTop:'5px', display:'flex', flexDirection:'row', gap: '2px', fontSize: '10px', justifyContent:'flex-start', alignItems:'center'}}></View> */}
            </View>

            <View style={{padding:'13px'}}>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Proveedor: </Text>
                <Text style={{fontSize:'10px'}}>FC con PLACA</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>RFC: </Text>
                <Text style={{fontSize:'10px'}}>FPL12060789A</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Folio: </Text>
                <Text style={{fontSize:'10px'}}>3234</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                <Text style={{fontSize:'10px'}}>{new Date().toISOString()}</Text>
              </View>

              <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                <Text style={{fontSize:'10px', color:'gray'}}>Facturas Relacionadas: </Text>
                <Text style={{fontSize:'10px'}}>
                  {CurrencyFormatter({
                    currency: 'MXN',
                    value: 215893.34
                  })}
                </Text>
              </View>

              <View style={{border:'1px solid gray'}}>
                <View style={{border:'1px solid gray', backgroundColor:'green', textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px', width:'50%'}}>Anticipo</Text>
                  <Text style={{color:'white', textAlign:'center', fontSize:'10px', width:'50%'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: 2517314.82
                    })}
                  </Text>
                </View>
                <View style={{textAlign:'center', border:'1px solid gray', padding:'3px', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'gray', fontSize:'11px'}}>
                    {CurrencyFormatter({
                      currency: 'MXN',
                      // value: total || 0
                      value: 2517314.82
                    })}
                  </Text>
                </View>
              </View>

            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Comp.</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 3, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Informe</Text>
            {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estatus </Text> */}
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Descripcion </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estatus </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Centro de costos</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Total</Text>
          </View>

        </View>
      </Page>
    </Document>
  )
}
