import {Document, Page, Text, Image, View} from '@react-pdf/renderer'
import { Company } from '@/interfaces/Companies';
import { ProjectMin } from '@/interfaces/Projects';
import { CurrencyFormatter } from '@/app/functions/Globals';
import { Svg, Path } from '@react-pdf/renderer';

export default function DownloadReportProjectsByDateCompletePDF({projects, satCompany, dateEnd, dateIni}:
  {projects:ProjectMin[], satCompany:Company, dateIni:Date, dateEnd:Date}) {

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);

  return(
    <Document>
      <Page>
        <View style={{padding: '15px', marginTop: '5px'}}>

          <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>
            <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5px'}}>
                <Image source={satCompany?.isologo?? satCompany.logo} style={{height: '57px', width:'auto'}}></Image>
                <View style={{display:'flex', flexDirection:'row', gap:'9px'}}>
                  <View>
                    <Text style={{fontSize:'15px', color:'gray', width: '250px'}}>PROYECTOS</Text>
                    {/* <Text style={{fontSize:'11px', color:'gray'}}>{project.title}</Text> */}
                  </View>
                </View>
              </View>

            </View>

            <View style={{display: 'flex', flexDirection: 'row', gap:'5px', justifyContent: 'space-between'}}>
              <View style={{padding:'13px'}}>

                <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                  {/* <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text> */}
                  <Text style={{fontSize:'10px'}}>{`${formatDate(dateIni)} al ${formatDate(dateEnd)}`}</Text>
                </View>

                <View style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:'3px'}}>
                  <Text style={{fontSize:'10px', color:'gray'}}>Fecha: </Text>
                  <Text style={{fontSize:'10px'}}>{`${formatDate(new Date())}`}</Text>
                </View>
                
              </View>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}}>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Proyecto</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Cuenta</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Cliente</Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Fecha inicial / final </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Estatus </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>IVA </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Garantia </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Amortizacion </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Monto </Text>
            <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '1px solid black', fontWeight: 'bold'}}>Total </Text>
          </View>

          {projects.map((p) => (
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', margin: '3px'}} key={p._id}>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.title}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.account}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.client.name}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.date?.substring(0, 10)} {'/'} {p?.endDate?.substring(0, 10)}  </Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.category?.name}</Text>
              {/* <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.includesTaxes? '✓' : 'X'}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.hasguaranteefund? '✓' : 'X'}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{p?.hasamountChargeOff? '✓' : 'X'}</Text> */}
              <View
                style={{
                  flex: 1,
                  padding: '2px',
                  borderBottom: '0.2px solid gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p?.includesTaxes ? (
                  <Svg width="8" height="8">
                    <Path
                      d="M1 4 L3 6 L7 1"
                      stroke="black"
                      strokeWidth="1"
                      fill="none"
                    />
                  </Svg>
                ) : (
                  <Text style={{ fontSize: '7px', fontWeight: 'bold' }}>X</Text>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  padding: '2px',
                  borderBottom: '0.2px solid gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p?.hasguaranteefund ? (
                  <Svg width="8" height="8">
                    <Path
                      d="M1 4 L3 6 L7 1"
                      stroke="black"
                      strokeWidth="1"
                      fill="none"
                    />
                  </Svg>
                ) : (
                  <Text style={{ fontSize: '7px', fontWeight: 'bold' }}>X</Text>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  padding: '2px',
                  borderBottom: '0.2px solid gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p?.hasamountChargeOff ? (
                  <Svg width="8" height="8">
                    <Path
                      d="M1 4 L3 6 L7 1"
                      stroke="black"
                      strokeWidth="1"
                      fill="none"
                    />
                  </Svg>
                ) : (
                  <Text style={{ fontSize: '7px', fontWeight: 'bold' }}>X</Text>
                )}
              </View>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: p?.amount?? 0
              })}</Text>
              <Text style={{flex: 1, fontSize: '7px', padding: '2px', borderBottom: '0.2px solid gray', fontWeight: 'bold'}}>{CurrencyFormatter({
                currency: 'USD',
                value: p?.amountotal?? 0
              })}</Text>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
