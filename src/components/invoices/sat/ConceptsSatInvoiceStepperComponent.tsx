import { useState, useEffect, useRef } from "react"
import Button from "@/components/Button";
import { IConceptsInvoice } from "@/interfaces/Invoices";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { createColumnHelper } from "@tanstack/react-table";
import AddNewConceptInInvoice from "../AddNewConceptInInvoice";
import Table from "@/components/Table";
import Input from "@/components/Input";
import CurrencyInput from "react-currency-input-field";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { getConceptsMin, } from "@/app/api/routeEstimates"
import { IConceptEstimateMin } from "@/interfaces/Estimate"
import { showToastMessageError } from "@/components/Alert"
import Label from "@/components/Label";
import { PriceConcept } from "@/interfaces/Estimate";
import { getPricesConcept } from "@/app/api/routeEstimates";

type DataBasicProps={
  token:string,
  nextStep:Function,
  saveInvoice:Function,
  user:string,
  handleAddConcept: (concept: any) => void,
  conceptsInvoice: IConceptsInvoice[],
  handleDiscount: (value: string) => void
  handleVat: (value: string) => void,
  vat: string,
  discount:string,
}

type TableConceptsInvoice = {
  Clave: string 
  Concepto: string 
  Descripcion: string 
  Unidad: string 
  Cantidad: number 
  Price: number 
  Importe: number
}

export default function ConceptsSatInvoiceStepperComponent({token, nextStep, saveInvoice, 
  user, handleAddConcept, conceptsInvoice, handleDiscount, handleVat, discount, vat}: DataBasicProps) {

  // const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);  
  // const [showNewConcept, setShowNewConcept]=useState<boolean>(false);
  const [concepts, setConcepts] = useState<IConceptEstimateMin[]>([]);
  const [conceptSel, setConceptSel] = useState<IConceptEstimateMin | undefined>();
  const [prices, setPrices] = useState<PriceConcept[]>([]);
  const [priceSel, setPriceSel] = useState<PriceConcept>();

  const [quantity, setQuantity]=useState<string>('0');
  const [price, setPrice]=useState<string>('0');
  const [total, setTotal]=useState<string>('0');

  // const [totalInvoice, setTotalInvoice]=useState<string>('0');
  // const [discount, setDiscount]=useState<string>('0');
  // const [vat, setVat]=useState<string>('16');
  // const [subtotalInvoice, setSubtotalInvoice]=useState<string>('0');

  const handleTotal = (Qvalue: string, PValue:PriceConcept) => {
    try {
      const t = Number(Qvalue.replace(/[$,]/g, "")) *
                PValue.cost;
      
      setTotal(t.toFixed(2).toString());
    } catch (error) {
      setTotal('0');
    }
  }

  const fetchPrices = async (conceptSelected:IConceptEstimateMin | undefined) => {
    if(conceptSelected){
      const res = await getPricesConcept(token, conceptSelected._id);
      if(typeof(res) !== 'string'){
        setPrices(res);
      }else{
        showToastMessageError(res);
      }
    }else{
      setPrices([]);
    }
  }
  // fetch();

  const handleConcept = (conceptP:IConceptEstimateMin|undefined) => {
    setConceptSel(conceptP);
    if(conceptP){
      fetchPrices(conceptP);
    }
  }

  const addConcept = () => {
    // console.log('add concept => ');
    let t = 0;
    try {
      t=Number(total.replace(/[$,]/g, ""));
    } catch (error) {
      t=0;
    }
    if(conceptSel){
      if(priceSel){
        if(t > 0){
          const data = {
            conceptEstimate: conceptSel,
            priceConcepEstimate: {
                // cost: price,
                cost: priceSel.cost,
                date: new Date().toISOString(),            
                user
            },
            quantity: Number(quantity),
            // amount: Number(price.replace(/[$,]/g, "")),
            amount: priceSel.cost,
            date: new Date(),
            user: user
          }
          // console.log('entro => ', data);
          handleAddNewConcept(data);
          setConceptSel(undefined);
          setPriceSel(undefined);
          setPrices([]);
          setPrice('0');
          setTotal('0');
          setQuantity('0');
        }else{
          showToastMessageError('Error el total debe ser mayor a 0!!!');
        }
      }else{
        showToastMessageError('Seleccione un precio por favor!!')
      }
    }else{
      showToastMessageError("Seleccione un concepto por favor!!!");
    }
  }

  // const handleAddNewConcept = (concept: IConceptsInvoice) => {
  //   setConceptsInvoice((prev) => [...prev, concept]);
  //   setShowNewConcept(false);
  // }

  const handleAddNewConcept = (concept: any) => {
    // setConceptsInvoice((prev) => [...prev, concept]);
    // setShowNewConcept(false);
    handleAddConcept(concept);
  }

  // const handleShowNewConcept = (value:boolean) => {
  //   setShowNewConcept(value);
  // }

  useEffect(() => {
    const fetchCocnepts = async () => {
      let con: IConceptEstimateMin[];
      try {
        con = await getConceptsMin(token);
        if(typeof(con) === "string"){
          showToastMessageError(con);
          return <h1 className="text-center text-red-500">{con}</h1>
        }else{
          setConcepts(con);
          // setConcepSel(con[0]);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al obtener los conceptos');
        return <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos!!</h1>  
      }
    }
    fetchCocnepts();
  }, []);

  const columnHelper = createColumnHelper<TableConceptsInvoice>();
  
  const columns = [
    columnHelper.accessor('Clave', {
      header: 'Clave',
      id: 'clave',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Clave}</p>
      ),
    }),
    columnHelper.accessor('Concepto', {
      header: 'Concepto nombre',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Concepto}</p>
      ),
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Descripcion}</p>
      ),
    }),
    columnHelper.accessor('Unidad', {
      header: 'Unidad',
      id: 'unidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Unidad}</p>
      ),
    }),
    columnHelper.accessor('Cantidad', {
      header: 'Cantidad',
      id: 'cantidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Cantidad}</p>
      ),
    }),
    columnHelper.accessor('Price', {
      header: 'P. U.',
      id: 'precio',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Price
        })}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Importe',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const data = TransformConceptsInvoice(conceptsInvoice);

  let subtotalInvoice=0;
  let totalInvoice=0;
  let vatT=0;

  if(conceptsInvoice.length>0){
    const t = conceptsInvoice.reduce((acumulador, item) => {
                return acumulador + (item.amount * item.quantity);
              }, 0);

    subtotalInvoice=t;
    const tinv= (t * Number(vat.replace(/[$,%]/g, "")?? 0.1)) / 100;
    vatT=tinv;
    totalInvoice= tinv + t - Number(discount.replace(/[$,%]/g, "")?? 0);
  }

  return (
    <div>
      {/* <div className="my-2">
        <Button type="button" onClick={() => setShowNewConcept(true)}>Agregar Concepto</Button>
      </div> */}
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar concepto" />
      </div>
      <div className="block sm:hidden w-full">
        <ListData data={data} />
      </div>

      <div className="flex gap-x-2 items-center mt-3">
        {/* <SearchInTable placeH="Buscar concepto" /> */}
        {/*<SearchSelect options={prueba} />*/}
        {/* <SearchSelect
          options={prueba}
          getLabel={(u) => u.email}
          getKey={(u) => u.uuid}
          onSelect={(u) => console.log(u)}
        /> */}
        <SearchSelect
          options={concepts}
          getLabel={(u) => u.name}
          getKey={(u) => u._id}
          onSelect={(u) => {
            console.log(u);
            // setConceptSel(u);
            handleConcept(u);
          }}
        />
        <div className="w-28">
          <Input type="text" value={quantity} onChange={(e) => {
            setQuantity(e.target.value);
            if(priceSel){
              handleTotal(e.target.value?? '0', priceSel);
            }
          }} />
        </div>
    
        <div className="w-40">
          <SearchSelect
            options={prices}
            getLabel={(u) => u.cost.toString()}
            getKey={(u) => u._id}
            onSelect={(u) => {
              console.log(u);
              setPriceSel(u);
              handleTotal(quantity?? '0', u);
            }}
          />
        </div>
        {/* <CurrencyInput
          prefix="$"
          value={price.replace(/[$,]/g, "")}
          className="w-32 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                    focus:border-slate-700 outline-0"
          // onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
          decimalsLimit={2}
          onValueChange={(value) => {try {
            setPrice(value || '0');
            handleTotal(value || '0');
            // handleIdVat(idVat);
          } catch (error) {
            setPrice('0');
            handleTotal('0');
            // handleIdVat(idVat);
          }}}
        /> */}

        <CurrencyInput
          prefix="$"
          value={total.replace(/[$,]/g, "")}
          decimalsLimit={2}
          disabled
          className="w-32 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                    focus:border-slate-700 outline-0"
          // onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
        />

        <div className="w-6">
          <PlusCircleIcon onClick={addConcept} className={`w-6 h-6 text-green-500 cursor-pointer`} />
        </div>
      </div>

      <div className="flex justify-end gap-x-3">
          <div>
            <Label>Descuento</Label>
            <CurrencyInput
              prefix="$"
              value={discount.replace(/[$,]/g, "")}
              className="w-36 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                        focus:border-slate-700 outline-0"
              // onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
              decimalsLimit={2}
              onValueChange={(value) => {try {
                // setDiscount(value || '0');
                handleDiscount(value || '0');
                // handleTotal(value || '0');
                // handleIdVat(idVat);
              } catch (error) {
                handleDiscount('0');
                // handleTotal('0');
                // handleIdVat(idVat);
              }}}
            />
          </div>

          <div>
            <Label>Impuestos</Label>
            <CurrencyInput
              // prefix="$"
              suffix="%"
              value={vat.replace(/[$,%]/g, "")}
              className="w-36 border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                        focus:border-slate-700 outline-0"
              // onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
              decimalsLimit={2}
              onValueChange={(value) => {try {
                handleVat(value || '0');
                // handleTotal(value || '0');
                // handleIdVat(idVat);
              } catch (error) {
                handleVat('0');
                // handleTotal('0');
                // handleIdVat(idVat);
              }}}
            />
          </div>
      </div>

      <div className="flex justify-end gap-x-3">
        <div className="w-72">
          <div className="flex items-center justify-between gap-x-3">
            <p className="text-slate-500">Subtotal</p>
            <p className="text-slate-600">{CurrencyFormatter({
              currency: 'MXN',
              // value: Number(subtotalInvoice?.replace(/[$,%]/g, "")?? 0)
              value: subtotalInvoice
            })}</p>
          </div>
          <div className="flex items-center justify-between gap-x-3">
            <p className="text-slate-500">Descuento</p>
            <p className="text-green-500 mt-1">{CurrencyFormatter({
              currency: 'MXN',
              value: Number(discount?.replace(/[$,%]/g, "")?? 0)
            })}</p>
          </div>
          <div className="flex items-center justify-between gap-x-3">
            <p className="text-slate-500">IVA</p>
            <p className="text-slate-600 mt-1">{CurrencyFormatter({
              currency: 'MXN',
              // value: Number(vat?.replace(/[$,%]/g, "")?? 0)
              value: vatT
            })}</p>
          </div>
          <div className="flex items-center justify-between gap-x-3">
            <p className="text-slate-800 font-bold">Total</p>
            <p className="text-slate-800 font-bold mt-1">{CurrencyFormatter({
              currency: 'MXN',
              // value: Number(totalInvoice?.replace(/[$,%]/g, "")?? 0)
              value: totalInvoice
            })}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-x-2 mt-3">
        <button
          className="text-black border border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
          onClick={() => nextStep(1)}
        >
          Atras
        </button>
        {/* <Button type="button" onClick={() => saveInvoice(conceptsInvoice)}>Guardar</Button> */}
        <Button type="button" onClick={() => nextStep(3)}>Siguiente</Button>
      </div>
      {/* {showNewConcept && <AddNewConceptInInvoice showForm={handleShowNewConcept} token={token} 
                            updateConcepts={handleAddNewConcept} user={user} />} */}
    </div>
  )
}

const ListData = ({data }: 
  {data: TableConceptsInvoice[] }) => {

  // const [dataReports, setDataReports] = useState(data);

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((c) => (
            <CardConcept concept={c} key={c.Concepto} />
          ))}
        </nav>
      </div>
    </div>
  )
}

const CardConcept = ({concept }: 
  {concept:TableConceptsInvoice }) => {
  
  return(
    <div role="button"
      // key={concept.Clave}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ invoice.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {/* <RemoveElement id={invoice.id} name={invoice.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
          <p>{concept.Clave}</p>
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {concept.Concepto}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {concept.Descripcion}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: concept.Importe
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {concept.Cantidad}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TransformConceptsInvoice(concepts:IConceptsInvoice[]):TableConceptsInvoice[]{
  const data:TableConceptsInvoice[]=[];
  
  concepts.forEach((c) => {
    data.push({
      Clave:c.conceptEstimate.code,
      Concepto:c.conceptEstimate.name,
      Descripcion:c.conceptEstimate.description,
      Unidad:c.conceptEstimate.unit.name,
      Cantidad:c.quantity,
      Price:c.priceConcepEstimate.cost,
      // Importe:c.amount,
      Importe:c.amount * c.quantity,
    })
  });
  return data;
}

// import { useState, useRef } from "react";

// export function SearchSelect({ options }: {options:string[]}) {
//   const [query, setQuery] = useState("");
//   const [filtered, setFiltered] = useState<string[]>([]);
//   const [show, setShow] = useState(false);
//   const [selected, setSelected] = useState<string|null>(null);
//   const ref = useRef<HTMLInputElement>(null);

//   const handleChange = (value:string) => {
//     setQuery(value);

//     if (!value) {
//       setFiltered([]);
//       return;
//     }

//     const results = options
//       .filter((item) =>
//         item.toLowerCase().includes(value.toLowerCase())
//       )
//       .slice(0, 5);

//     setFiltered(results);
//     setShow(true);
//   };

//   const handleSelect = (item:string) => {
//     setSelected(item);
//     setQuery(item);
//     setShow(false);
//   };

//   return (
//     <div className="relative w-full sm:max-w-md">
//       <input
//         ref={ref}
//         type="text"
//         value={query}
//         onChange={(e) => handleChange(e.target.value)}
//         onFocus={() => query && setShow(true)}
//         className="block w-full p-2 ps-3 text-sm border border-gray-300 rounded-lg"
//         placeholder="Buscar..."
//       />

//       {show && filtered.length > 0 && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow">
//           {filtered.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelect(item)}
//               className="px-3 py-2 cursor-pointer hover:bg-gray-100"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// import { useState, useRef } from "react";

type SearchSelectProps<T> = {
  options: T[];
  getLabel: (item: T) => string;
  getKey: (item: T) => string | number;
  onSelect: (item: T) => void;
  placeholder?: string;
};

export function SearchSelect<T>({
  options,
  getLabel,
  getKey,
  onSelect,
  placeholder = "Buscar..."
}: SearchSelectProps<T>) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<T[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value) {
      setFiltered([]);
      return;
    }

    const results = options
      .filter((item) =>
        getLabel(item).toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5);

    setFiltered(results);
    setShow(true);
  };

  const handleSelect = (item: T) => {
    setQuery(getLabel(item));
    setShow(false);
    onSelect(item);
  };

  return (
    <div className="relative w-full sm:max-w-md">
      <input
        ref={ref}
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => query && setShow(true)}
        className="block w-full p-2 border border-gray-300 rounded-lg"
        placeholder={placeholder}
      />

      {show && filtered.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow">
          {filtered.map((item) => (
            <li
              key={getKey(item)}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {getLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}