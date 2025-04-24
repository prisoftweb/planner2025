// 'use client'

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";

// import NewDonutChartComponent from "@/components/projects/dashboard/NewDonutChartComponent";
// import { ChartLine } from "@/components/projects/dashboard/NewDonutChartComponent";
// import TimelineComponent from "@/components/LineTimeComponent";

// const labels = ['January'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [11],
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [1],
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// const data = {
//   labels,
//   datasets: [{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[26.56],"label":"Sueldos y Salarios"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[26.18],"label":"Materiales directos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[8.98],"label":"Renta de maquinaria"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[6.5],"label":"Apoyo Viáticos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[4.68],"label":"Tiempos extras"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[3.71],"label":"Renta de casa"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[3.68],"label":"Cuotas al IMSS"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[2.8],"label":"Limpieza"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[1.46],"label":"Combustibles y lubricantes"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[1.24],"label":"Aguinaldo"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[1.16],"label":"Aislante"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[1.14],"label":"Anticipo a proveedores"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.98],"label":"Tablaroca"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.94],"label":"Aportaciones al infonavit"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.75],"label":"EPP"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.69],"label":"Renta de equipos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.63],"label":"Adquisicion de equipo"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.52],"label":"Adquisicion de herramientas"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.49],"label":"Accesorios"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.43],"label":"Materiales indirectos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.34],"label":"Fianzas"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.32],"label":"Postes metalicos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.27],"label":"Mantenimiento y conservacion"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.22],"label":"Fletes y acarreos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.16],"label":"Pasajes"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.15],"label":"Hospedaje"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.14],"label":"Alimentos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.11],"label":"Uniformes"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.1],"label":"Papeleria"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.08],"label":"Agua"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.06],"label":"Pintura"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.05],"label":"Capacitacion al personal"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.05],"label":"Mantenimiento vehiculos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.05],"label":"Adquisicion de mobiliario"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.04],"label":"Articulos de limpieza"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.04],"label":"Arrendamientos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.02],"label":"Compensaciones"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.02],"label":"Cursos STPS"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.02],"label":"Examenes medicos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.01],"label":"Telefonia"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.01],"label":"Medicamentos"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0.01],"label":"Casetas y peajes"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[0],"label":"Premios de asistencia"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[-0.22],"label":"Servicios de facturacion"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[-0.9],"label":"Descuentos o bonificaciones"},{"backgroundColor":"rgba(53, 162, 235, 0.5)","data":[-1.14],"label":"Aplicacion de anticipo"}]
// }

export default function Home() {
  const cookieStore = cookies();
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <div className="bg-white">
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md:p-5 flex justify-center">
          <img src="/img/Palaciosconstrucciones horizontal.svg" alt="logo" 
            className="w-auto h-96"
          />
        </div>
      </div>
      {/* <Bar options={options} data={data} /> */}
      {/* <TimelineComponent /> */}
    </>
  );
}