import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useState, useEffect } from 'react';
import { getAllProvidersWithTradeLine } from '@/app/api/routeDashboardProviders';
import { ProviderWithTradeLine } from '@/interfaces/DasboardProviders';
import { showToastMessageError } from '../Alert';
import IconText from '../providers/IconText';

type Props={
  token:string,
  returnProject: () => void
  handleProvSel: (value: string) => void
  size: number
}

export default function SelectProviderCode({token, returnProject, handleProvSel, size}: Props) {

  const [heightPage, setHeightPage] = useState<number>(900);
  const [providers, setProviders] = useState<ProviderWithTradeLine[]>([]);
  const [search, setSearch]=useState<string>('');

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    const fetch = async () => {
      const provs = await getAllProvidersWithTradeLine(token);

      if(typeof(provs)==='string'){
        showToastMessageError(provs);
        return
      }

      setProviders(provs);
    }

    fetch();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const header = <div className="flex gap-x-3 items-center border-slate-400 bg-slate-400 text-white cursor-pointer"
            onClick={() => returnProject()} >
          <div className="flex items-center gap-x-3">
            <div className="p-1 rounded-md ">
              <TbArrowNarrowLeft className="w-9 h-9 text-white" 
              />
            </div>
            <p className="text-xl ml-4 font-medium">REGRESAR</p>
            <img src="/img/projects/default.svg" className='rounded-full w-9 h-9' alt="proyecto" />
          </div>
          <></>
        </div>;

  const filteredProviders= search==''? providers: providers.filter((p) => p?.tradename?.toString()?.toLowerCase()?.includes(search.toLowerCase()));

  return (
    <div className={`${size < 500? 'z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0': ''} `}
      style={{height: `${heightPage}px`}}
    >
      {header}
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
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar provedor'} required ></input>
        </div>
      </div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-149px)]
            overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
          {filteredProviders.map((prov) => (
            <div role="button"
              key={prov._id}
              className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                ${prov._id===prov.name? 'bg-slate-500': 'bg-white'}`}
              onClick={() => handleProvSel(prov._id)}
            >
              <div className="flex items-center w-full ">
                <div className="grid mr-4 place-items-center">
                  <IconText size='h-12 w-12' sizeText='' text={prov?.name} />
                </div>
                <div className="w-full">
                  <div className="flex gap-x-3 justify-between items-center w-full">
                    <h6
                      className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                      {prov?.tradename}
                    </h6>
                  </div>
                  <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                    {prov?.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
