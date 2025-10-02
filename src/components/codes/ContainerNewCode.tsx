'use client'

import { useEffect, useState } from "react"
import { getExecuteProjectsMin } from "@/app/api/routeProjects"
import { ProjectMin } from "@/interfaces/Projects"
import { showToastMessageError } from "../Alert";
import NewCode from "./NewCode";
import { createCode, removeCode } from "@/app/api/routeCode";
import {ICode} from "@/interfaces/Code";
import SelectProviderCode from "./SelectProviderCode";
import SelectUserCode from "./SelectUserCode";

type TCode = {
  code: string,
  date: string,
  user: string,
  project: string
  provider: string,
  userRequesting: string
}

export default function ContainerNewCode({token, user}: {token: string, user:string}) {

  const [projects, setProjects] = useState<ProjectMin[]>([]);
  const [projectSel, setProjectSel]=useState<string>();
  const [providerSel, setProviderSel]=useState<string>();
  const [userSel, setUserSel]=useState<string>();
  const [projectTitle, setProjectTitle]=useState<string>('');
  const [codeData, setCodeData] = useState<ICode | undefined>();
  const [search, setSearch]=useState<string>('');
  const [widthPage, setWidthPage]=useState<number>(500);

  const handleResize = () => {
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidthPage(Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      // const res = await getActiveProjectsMin(token);
      const res = await getExecuteProjectsMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setProjects(res);
      }
    }
    fetch();
  }, [])

  const handleProjectSel = async (value: string, title:string) => {
    setProjectSel(value);
    setProjectTitle(title);

    // const code = generarToken(5);

    // const data: TCode = {
    //   code,
    //   date: new Date().toISOString(),
    //   user,
    //   project: value,
    //   provider: providerSel
    // }

    // setCodeData({
    //   __v: 0,
    //   _id: '384737',
    //   code,
    //   date: new Date().toDateString(),
    //   datets: new Date().toDateString(),
    //   id: '384737',
    //   project: title,
    //   status: true,
    //   user: user
    // });

    // const res = await createCode(token, data);
    // if(typeof(res)==='string'){
    //   showToastMessageError(res);
    // }else{
    //   setCodeData(res);
    // }

  }

  // const handleProvSel = async (value: string, title:string) => {
  const handleProvSel = async (value: string) => {
    setProviderSel(value);
    
    // const code = generarToken(5);

    // if(projectSel){
    //   const data: TCode = {
    //     code,
    //     date: new Date().toISOString(),
    //     user,
    //     project: projectSel,
    //     provider: value,
    //     userRequesting: value
    //   }

    //   const res = await createCode(token, data);
    //   if(typeof(res)==='string'){
    //     showToastMessageError(res);
    //   }else{
    //     setCodeData(res);
    //   }
    // }
  }

  const handleUserSel = async (value: string) => {
    setUserSel(value);
    
    const code = generarToken(5);

    if(projectSel && providerSel && value){
      const data: TCode = {
        code,
        date: new Date().toISOString(),
        user,
        project: projectSel,
        provider: providerSel,
        userRequesting: value
      }

      console.log('data code => ', data);

      const res = await createCode(token, data);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        console.log('res ocde => ', res);
        setCodeData(res);
      }
    }
  }

  function generarToken(longitud = 5) {
    // const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      token += caracteres[indice];
    }
    return token;
  }

  const closeform = async (id:string) => {
    const res = await removeCode(token, id);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      setProjectSel('');
      setCodeData(undefined);
      setProjectTitle('');
      setProviderSel(undefined);
    }

    // setProjectSel(undefined);
    // setCodeData(undefined);
    // setProjectTitle('');
    // setProviderSel(undefined);
  }

  const returnProject = async () => {
    setProjectSel(undefined);
    setCodeData(undefined);
    setProjectTitle('');
    setProviderSel(undefined);
  }

  const returnform = async (id:string) => {
    // setProjectSel('');
    // setCodeData(undefined);
    // setProjectTitle('');
    setUserSel(undefined);
  }

  const returnProviderSel = async () => {
    setProviderSel(undefined);
    console.log('ret prov => ');
  }

  // const viewProv=projectSel? <SelectProviderCode handleProvSel={handleProvSel} returnProject={returnProject} token={token} size={widthPage} />: <></>;
  // const viewComponent=(providerSel && codeData ? <NewCode closeForm={closeform} returnForm={returnform} code={codeData} title={projectTitle} size={widthPage} />: viewProv );

  console.log('user => ', userSel);
  const viewComponent=(providerSel && codeData && userSel ? 
                <NewCode closeForm={closeform} returnForm={returnform} code={codeData} title={projectTitle} size={widthPage} /> : (
                  userSel ? <></>: (
                    providerSel? <SelectUserCode handleUserSel={handleUserSel} returnProvider={returnProviderSel} token={token} size={widthPage} /> : (
                      projectSel? <SelectProviderCode handleProvSel={handleProvSel} returnProject={returnProject} token={token} size={widthPage} /> : <></>
                    )
                  )
                ))
  
  // const viewProv=projectSel? <SelectProviderCode handleProvSel={handleProvSel} returnProject={returnProject} token={token} size={widthPage} />: <></>;
  // const viewComponent=(providerSel && codeData ? <NewCode closeForm={closeform} returnForm={returnform} code={codeData} title={projectTitle} size={widthPage} />: viewProv );
  
  const filteredProjects = search==''? projects: projects.filter((p) => p.title.toString().toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`grid ${widthPage < 500? 'grid-cols-1': 'grid-cols-2'} gap-x-3`}>
      <div>
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
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={'Buscar proyecto'} required ></input>
          </div>
        </div>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
          <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-149px)]
              overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
            {filteredProjects.map((prj) => (
              <div role="button"
                key={prj._id}
                className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
                  ${prj._id===projectSel? 'bg-slate-500': 'bg-white'}`}
                onClick={() => handleProjectSel(prj._id, prj.title)}
              >
                <div className="flex items-center w-full ">
                  <div className="grid mr-4 place-items-center">
                    <img alt="responsable" src={ prj.photo? prj.photo : '/img/projects/default.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                  </div>
                  <div className="w-full">
                    <div className="flex gap-x-3 justify-between items-center w-full">
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {prj.title}
                      </h6>
                      <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                        {prj.category.name}
                      </p>
                    </div>
                    <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                      {prj.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
        {/* {codeData && widthPage < 500 && viewComponent } */}
        {widthPage < 500 && viewComponent}
      </div>

      <div>
        {/* {codeData && widthPage > 500 && <NewCode closeForm={closeform} returnForm={returnform} code={codeData} title={projectTitle} size={widthPage} />} */}
        {/* {codeData && widthPage > 500 && viewComponent} */}
        {widthPage > 500 && viewComponent}
      </div>
    </div>
  )
}
