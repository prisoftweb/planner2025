
export default function ContainerSideNav({children, width}: {children:JSX.Element, width:string}) {
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-black bg-opacity-40">
        <div className={`relative z-50 ml-auto bg-white p-5 h-full overflow-y-auto ${width}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

// import Calendar, { DateObject } from "react-multi-date-picker";

// <div className="fixed inset-0 z-40 flex">
//   <div className="fixed inset-0 bg-black bg-opacity-40">
//     <div className={`relative z-50 ml-auto bg-white p-5 h-full overflow-y-auto ${width}`}>
//       <div className="z-10 w-full max-w-md absolute bg-white space-y-5 p-5 right-0">
//         <div>
//           <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Rango de fechas</p></Label>
//           <Calendar
//             className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
//               focus:border-slate-700 outline-0"
//             value={values}
//             onChange={(e: any) => {
//               console.log('handle values => ');
//               handleValues(e)
//             }}
//             range
//             numberOfMonths={2}
//             // containerClassName="z-[9999]" // Muy importante esto no estaba
//             showOtherDays
//             // style={{'padding': '10px', 'marginTop': '5px', 'borderRadius': '5px', 
//             //   'height': '35px', 'width': '330px'}}
//             // style={{'padding': '10px', 'marginTop': '5px', 'borderRadius': '5px', 
//             //   'height': '35px', 'width': '100%'}}
//             style={{
//               width: "100%",      // ocupa todo el ancho disponible del sidenav
//               maxWidth: "100%",   // evita que se desborde
//               borderRadius: "5px",
//             }}
//           /> 

//           <style jsx global>{`
//             .rmdp-wrapper {
//               display: flex !important;
//               flex-wrap: wrap !important;
//               justify-content: center !important;
//               width: 100% !important;
//             }

//             .rmdp-calendar {
//               flex: 1 1 45% !important;
//               min-width: 220px !important;
//               max-width: 100% !important;
//             }
//           `}</style>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>