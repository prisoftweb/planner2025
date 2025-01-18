import Label from "@/components/Label";
import SelectReact from "@/components/SelectReact";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { Options } from "@/interfaces/Common";
// import FormNewConcept from "./FormNewConcept";
// import FormNewPrice from "./FormNewPrice";
// import Button from "@/components/Button";
import CurrencyInput from "react-currency-input-field";
import { IConceptEstimate, PriceConcept } from "@/interfaces/Estimate";
import { getPricesConcept, deletePriceInConceptEstimate } from "@/app/api/routeEstimates";
import RemoveElement from "@/components/RemoveElement";
import {BookmarkSquareIcon} from "@heroicons/react/24/solid";
import { insertPriceInConceptEstimate } from "@/app/api/routeEstimates";
import { showToastMessageError } from "@/components/Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function PriceUnityStepper({token, nextStep, handlePriceId, 
    handleAddNewPrice, conceptSelected, user }: 
  { token:string, nextStep:Function, handlePriceId:Function, handleAddNewPrice:Function, 
    conceptSelected: IConceptEstimate, user:string }) {

  // const [showNewPrice, setShowNewPrice] = useState<boolean>(false);

  const [bandPrice, setBandPrice] = useState<boolean>(false);
  const [cost, setCost] = useState<string>('0');
  // const [bandUnity, setBandUnity] = useState<boolean>(false);
  // const [bandDate, setBandDate] = useState<boolean>(false);

  const [prices, setPrices] = useState<PriceConcept[]>([]);

  const [search, setSearch] = useState<string>('');

  const handlePrices = () => {

  }

  let filteredPrices = prices;
  if(search && search !== ''){
    filteredPrices = prices.filter((p) => p.cost.toString().includes(search));
  }

  console.log('filtered prices => ', filteredPrices);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPricesConcept(token, conceptSelected._id);
      if(typeof(res) !== 'string'){
        setPrices(res);
      }
    }
    fetch();
  }, []);
  
  // const handleShowNewPrice = (value:boolean) => {
  //   setShowNewPrice(value);
  // }

  const handlePriceSelected = (price: PriceConcept) => {
    handlePriceId(price);
    nextStep(2);
  }

  const addPrice = async () => {

    if(cost && cost.trim()!==''){
      setBandPrice(false);
      const data = {
        prices: [
          {
            user,
            date: new Date(),
            cost: Number(cost.replace(/[$,]/g, ""))
          }
        ]
      }
      const res = await insertPriceInConceptEstimate(token, data, conceptSelected._id);
      if(typeof(res)==='string'){
        showToastMessageError('Error al insertar precio en el concepto!!!');
      }else{
        const res2 = await getPricesConcept(token, conceptSelected._id);
        if(typeof(res2) !== 'string'){
          setPrices(res2);
          handleAddNewPrice(res2);
          nextStep(2);
        }
      }
    }else{
      setBandPrice(true);
    }
  }

  // const valueConcept = conceptsLV.find((e) => e.value===conceptID)?.label || '';

  return (
      <>
        <div>
          <div className="flex justify-between items-end p-2 bg-slate-100 border border-slate-500 rounded-t-lg">
            <p className="text-slate-700">{conceptSelected.name}</p>
            <p className="text-slate-700">{conceptSelected.code}</p>
          </div>
          <div className="border border-slate-500 p-2 text-xs text-slate-500">
            <p>{conceptSelected.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="relative w-full p-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="default-search"
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)} 
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 
                rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                outline-0 outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar precio'} required ></input>
          </div>
          {/* <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                    onClick={() => setShowNewPrice(true)} /> */}
        </div>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
          <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-96
              overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
            {filteredPrices.map((price) => (
              <div role="button"
                key={price.cost}
                className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300"
                onClick={() => handlePriceSelected(price)}
              >
                <div className="flex items-center w-full ">
                  <div className="grid mr-4 place-items-center">
                    <img alt="responsable" src={ '/img/users/default.jpg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  </div>
                  <div className="flex justify-between items-center gap-x-2 w-full">
                    <div className="">
                      <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                        {price.date?.substring(0, 10)}
                      </p>
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {CurrencyFormatter({
                          currency: 'MXN',
                          value: price.cost
                        })}
                      </h6>
                    </div>
                    <div>
                      <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                        <RemoveElement id="" name={price.cost?.toString() || "sin costo"} remove={deletePriceInConceptEstimate} removeElement={handlePrices}
                          token={token}  />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </nav>
        </div>

        <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Precio</p></Label>
        <div className="flex justify-between gap-x-2">
          <CurrencyInput
            id="price"
            name="price"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
              focus:border-slate-700 outline-0"
            value={cost}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              setCost(value?.replace(/[$,]/g, "") || '0');
            } catch (error) {
              setCost('0');
            }}}
          />
          <BookmarkSquareIcon className="h6 w-6 text-slate-900 hover:text-slate-600" 
            onClick={addPrice} />
        </div>
        {bandPrice && (
          <p className="text-red-500">El precio unitario es obligatorio!!!</p>
        )}

        {/* <div className="px-2">
          <div className="grid grid-cols-3 gap-x-1">
            <div className=" col-span-2">
              <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Precio</p></Label>
              <div className="flex gap-x-2 items-center">
                <SelectReact opts={conceptsLV} index={0} setValue={handlePriceId} />
                <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                  onClick={() => setShowNewPrice(true)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-1 mt-2">
            <div>
              <Label htmlFor="price"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Precio</p></Label>
              <CurrencyInput
                id="price"
                name="price"
                className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                  focus:border-slate-700 outline-0"
                value={amount}
                decimalsLimit={2}
                prefix="$"
                onValueChange={(value) => {try {
                  setAmount(value?.replace(/[$,]/g, "") || '0');
                } catch (error) {
                  setAmount('0');
                }}}
              />
              {bandPrice && (
                <p className="text-red-500">El precio unitario es obligatorio!!!</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="unidad"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
              <Input type="text" name="unidad" 
                value={unity}
                onChange={(e) => setUnity(e.target.value)}
              />
              {bandUnity && (
                <p className="text-red-500">La unidad es obligatoria!!!</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
              <Input type="date" name="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {bandDate && (
                <p className="text-red-500">La fecha es obligatoria!!!</p>
              )}
            </div>
          </div>
        </div> */}

        <div className="flex gap-x-2 justify-center mt-2">
          <button className="text-black font-normal text-sm bg-white 
            rounded-xl w-36 h-9 py-2 hover:bg-slate-200 border border-black"
            onClick={() => nextStep(0)}>Atras</button>
          {/* <Button type="button" onClick={validationData}>Siguiente</Button> */}
        </div>
        {/* {showNewPrice && <FormNewPrice addPrice={handleAddNewPrice} setShowForm={handleShowNewPrice} 
                                token={token} valueConcept={valueConcept} code={code} 
                                description={description} />} */}
      </>
    )
}
