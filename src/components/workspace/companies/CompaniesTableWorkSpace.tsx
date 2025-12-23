import Button from "@/components/Button"
import { useState } from "react"
import NewCompanyContainer from "./NewCompanyContainer";
import ContainerSideNav from "@/components/ContainerSideNav";
import { ICompanyInWorkSpace } from "@/interfaces/WorkSpaces";
import { getCompaniesByWorkSpace } from "@/app/api/routeCompany";
import { showToastMessageError } from "@/components/Alert";
import RemoveCompanyInWorkSpace from "./RemoveCompanyInWorkSpace";
import { updateCompany } from "@/app/api/routeCompany";

export default function CompaniesTableWorkSpace({companiesParam, token, idWS, idUSer}: 
  {companiesParam: ICompanyInWorkSpace[], token:string, idWS:string, idUSer:string}) {

  const [companies, setCompanies]=useState(companiesParam);
  const [openNewCompany, setOpenNewCompany]=useState<boolean>(false);

  const handleOpenNewCompany = (value:boolean) => {
    setOpenNewCompany(value);
  }

  const handleRemoveCompany = (idComp:string) => {
    console.log('comps +> ', companies);
    const comp = companies.filter((c) => c.companys._id!==idComp);
    console.log('comp after remove => ', comp);
    setCompanies(comp);

    const data={
      status:false
    }

    const res = updateCompany(token, data, idComp);
    if(typeof(res) === 'string'){
      showToastMessageError(res);
    }
  }

  const handleFetchCompanies = async () => {
    const res = await getCompaniesByWorkSpace(token, idWS);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      console.log('res handle etxh => ', res);
      setCompanies(res);
      setOpenNewCompany(false);
    }
  }

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // console.log('companies => ', companies);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex mt-2 items-center">
          <img src={'/img/projects/default.jpg'} alt="logo" className="rounded-full w-14 h-auto" />
          <div className="ml-2">
            <p className="text-xl">Perfiles de compañias</p>
            <p className="text-gray-500 text-sm">Lista de compañias</p>
          </div>
        </div>

        <Button onClick={() => setOpenNewCompany(true)}>Nueva</Button>
      </div>

      <div className="pt-3 mt-2 border-t border-slate-600">
        {/* <Table columns={columns} data={data} placeH="Buscar compañia.." /> */}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
          <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 h-[calc(100vh-149px)]
              overflow-scroll overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>
            {companies.map((com) => (
              <div role="button"
                key={com._id}
                className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
                  outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
                  focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
                  active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 bg-white`}
                // onClick={() => handleProjectSel(prj._id, prj.title)}
              >
                <div className="flex items-center w-full ">
                  <div className="flex mr-4 place-items-center items-end">
                    <img alt="responsable" src={ com.companys.logo? com.companys.logo : '/img/company.svg'}
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                      onClick={() => window.location.replace(`/workspace/companies/${com.companys._id}`)} />
                    <RemoveCompanyInWorkSpace name={com.companys.name} removeElement={handleRemoveCompany} 
                        token={token} idComp={com._id} idWs={idWS} idCompany={com.companys._id} />
                  </div>
                  <div className="w-full" onClick={() => window.location.replace(`/workspace/companies/${com.companys._id}`)}>
                    <div className="flex gap-x-3 justify-between items-center w-full">
                      <h6
                        className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-600">
                        {com.companys.name}
                      </h6>
                      <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                        Desde {new Date().getDate()} de {months[new Date().getMonth()]} de {new Date().getFullYear()}
                      </p>
                    </div>
                    <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-400">
                      {com.companys.tradename}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <ContainerSideNav width="w-full sm:max-w-lg" open={openNewCompany}>
        <NewCompanyContainer token={token} handleOpen={handleOpenNewCompany} 
            handleFetchCompanies={handleFetchCompanies} idWS={idWS} idUser={idUSer}
            openSideNav={openNewCompany} />
      </ContainerSideNav>

    </div>
  )
}
