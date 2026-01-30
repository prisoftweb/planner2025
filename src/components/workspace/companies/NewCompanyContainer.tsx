import { useState, useEffect } from "react";
import { useNewExpense } from "@/app/store/newExpense";
import Select, {components} from 'react-select'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import HeaderForm from "@/components/HeaderForm";
import { UsrBack } from "@/interfaces/User";
import { useOptionsExpense } from "@/app/store/newExpense";
import TooltipCloseIcon from "@/components/tooltipIcons/TooltipCloseIcon";
import NavNewCompanyStepper from "./NavNewCompanyStepper";
import DataBasicCompanyStepper from "./DataBasicCompanyStepper";
import LogoCompanyStepper from "./LogoCompanyStepper";
import AddressDataCompanyStepper from "./AddressDataCompanyStepper";
import { CreateCompany, CreateCompanyLogo, CreateCompanyWithLogoAndIsologo } from "@/app/api/routeCompany";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { insertCompanyInWorkSpace } from "@/app/api/routeWorkspace";

export default function NewCompanyContainer({token, handleOpen, handleFetchCompanies, idUser, idWS, openSideNav }:
  {token:string, handleOpen:(value: boolean) => void, handleFetchCompanies: () => Promise<void>, 
    idWS:string, idUser:string, openSideNav:boolean }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [indexStepper, setIndexStepper]=useState(0);
  const [nameCompany, setNameCompany] = useState<string>('');
  const [tradeNameCompany, setTradeNameCompany] = useState<string>('');
  const [emailCompany, setEmailCompany] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>(''); 
  const [phoneCompany, setPhoneCompany] = useState<string>('');
  const [file , setFile] = useState<File | null>(null);
  const [fileIsologo , setFileIsologo] = useState<File | null>(null);
  const [addressCompany, setAddressCompany] = useState<string>('');
  const [cpCompany, setCpCompany] = useState<string>('');
  const [communityCompany, setCommunityCompany] = useState<string>('');
  const [municipyCompany, setMunicipyCompany] = useState<string>('');
  const [stateCompany, setStateCompany] = useState<string>('');
  const [countryCompany, setCountryCompany] = useState<string>('');
  const [notesCompany, setNotesCompany] = useState<string>('');

  const handleNameCompany = (value:string) => {
    setNameCompany(value);
  }
  const handleTradeNameCompany = (value:string) => {
    setTradeNameCompany(value);
  }
  const handleEmailCompany = (value:string) => {
    setEmailCompany(value);
  }
  const handleContactCompany = (value:string) => {
    setContactCompany(value);
  }
  const handlePhoneCompany = (value:string) => {
    setPhoneCompany(value);
  }
  
  const handleIndexStepper = (value:number) => {
    setIndexStepper(value);
  }

  const handleFile = (value:File | null) => {
    setFile(value);
  }
  const handleFileIsologo = (value:File | null) => {
    setFileIsologo(value);
  }

  const handleAddressCompany = (value:string) => {
    setAddressCompany(value);
  }
  const handleCpCompany = (value:string) => {
    setCpCompany(value);
  }
  const handleCommunityCompany = (value:string) => {
    setCommunityCompany(value);
  }
  const handleMunicipyCompany = (value:string) => {
    setMunicipyCompany(value);
  }
  const handleStateCompany = (value:string) => {
    setStateCompany(value);
  }
  const handleCountryCompany = (value:string) => {
    setCountryCompany(value);
  }
  const handleNotesCompany = (value:string) => {
    setNotesCompany(value);
  }
  
  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  const createNewCompany = async (location:Object) => {
    if(file || fileIsologo){
      // const formData = new FormData();
      // formData.append('name', nameCompany);
      // formData.append('email', emailCompany);
      // formData.append('contact', contactCompany);
      // formData.append('phone', phoneCompany);
      // formData.append('location', JSON.stringify(location));
      // if(file){
      //   formData.append('logo', file);
      // }
      // if(fileIsologo){
      //   formData.append('isologo', fileIsologo);
      // }

      if(!file || !fileIsologo){
        let phoneformat = phoneCompany.trim();
        phoneformat = phoneformat.replace(/\s+/g, '');
        phoneformat = phoneformat.replace('(+52)', '');
        
        const formdata = new FormData();
        formdata.append('email', emailCompany);
        formdata.append('name', nameCompany);
        formdata.append('phone', phoneformat);
        formdata.append('tradename', tradeNameCompany);
        formdata.append('location', JSON.stringify(location));
        // formdata.append('logo', file);
        if(file){
          formdata.append('logo', file);
        }
        if(fileIsologo){
          formdata.append('logo', fileIsologo);
        }
        const res = await CreateCompanyLogo(token, formdata);
        // const res = await CreateCompanyLogo(token, formData);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Compania creada satisfactoriamente!!!!');
          const data={
            companys: 
            [
              {
                company:res._id, 
                user:idUser
              }
            ]
          }
          const resINsert=await insertCompanyInWorkSpace(token, idWS, data);
          if(typeof(resINsert)==='string'){
            showToastMessageError(resINsert);
          }
          else{
            setIndexStepper(0);
            setNameCompany('');
            setEmailCompany('');
            setContactCompany('');
            setPhoneCompany('');
            setTradeNameCompany('');
            setFile(null);
            setFileIsologo(null);
            setAddressCompany('');
            setCpCompany('');
            setCommunityCompany('');
            setMunicipyCompany('');
            setStateCompany('');
            setCountryCompany('');
            setNotesCompany('');
            handleFetchCompanies();
          }
        }     
      }else{
        let phoneformat = phoneCompany.trim();
        phoneformat = phoneformat.replace(/\s+/g, '');
        phoneformat = phoneformat.replace('(+52)', '');
        
        const formdata = new FormData();
        formdata.append('email', emailCompany);
        formdata.append('name', nameCompany);
        formdata.append('phone', phoneformat);
        formdata.append('tradename', tradeNameCompany);
        formdata.append('location', JSON.stringify(location));
        // formdata.append('logo', file);
        if(file){
          // formdata.append('logo', file);
          formdata.append('files', file);
        }
        if(fileIsologo){
          // formdata.append('logo', fileIsologo);
          // formdata.append('isologo', fileIsologo);
          formdata.append('files', fileIsologo);
        }
        const res = await CreateCompanyWithLogoAndIsologo(token, formdata);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Compania creada satisfactoriamente!!!!');
          const data={
            companys: 
            [
              {
                company:res._id, 
                user:idUser
              }
            ]
          }
          const resINsert=await insertCompanyInWorkSpace(token, idWS, data);
          if(typeof(resINsert)==='string'){
            showToastMessageError(resINsert);
          }
          else{
            setIndexStepper(0);
            setNameCompany('');
            setEmailCompany('');
            setContactCompany('');
            setPhoneCompany('');
            setTradeNameCompany('');
            setFile(null);
            setFileIsologo(null);
            setAddressCompany('');
            setCpCompany('');
            setCommunityCompany('');
            setMunicipyCompany('');
            setStateCompany('');
            setCountryCompany('');
            setNotesCompany('');
            handleFetchCompanies();
          }
        }
      }
    }else{
      const dataCompany = {
        name: nameCompany,
        email: emailCompany,
        contact: contactCompany,
        phoneNumber: phoneCompany,
        location: location,
        tradename:tradeNameCompany
      };
      const res = await CreateCompany(token, dataCompany);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        showToastMessage('Compania creada satisfactoriamente!!!!');
        const data={
          companys: 
          [
            {
              company:res._id, 
              user:idUser
            }
          ]
        }
        const resINsert=await insertCompanyInWorkSpace(token, idWS, data);
        if(typeof(resINsert)==='string'){
          showToastMessageError(resINsert);
        }else{
          setIndexStepper(0);
          setNameCompany('');
          setEmailCompany('');
          setContactCompany('');
          setPhoneCompany('');
          setTradeNameCompany('');
          setFile(null);
          setFileIsologo(null);
          setAddressCompany('');
          setCpCompany('');
          setCommunityCompany('');
          setMunicipyCompany('');
          setStateCompany('');
          setCountryCompany('');
          setNotesCompany('');
          handleFetchCompanies();
        }
      }
    }
  };

  let stepform: JSX.Element = <></>;

  stepform = indexStepper===1? (
    <LogoCompanyStepper handleIndex={handleIndexStepper} file={file} fileIsologo={fileIsologo}
        handleFile={handleFile} handleFileIsologo={handleFileIsologo} />
  ): indexStepper===2? (
    <AddressDataCompanyStepper addressCompany={addressCompany} communityCompany={communityCompany} 
        countryCompany={countryCompany} cpCompany={cpCompany} handleAddressCompany={handleAddressCompany}
        handleCommunityCompany={handleCommunityCompany} handleCountryCompany={handleCountryCompany}
        handleCpCompany={handleCpCompany} handleMunicipyCompany={handleMunicipyCompany}
        handleNotesCompany={handleNotesCompany} handleStateCompany={handleStateCompany}
        municipyCompany={municipyCompany} notesCompany={notesCompany} stateCompany={stateCompany}
        saveCompany={createNewCompany} />
  ): (<DataBasicCompanyStepper handleIndex={handleIndexStepper} contactCompany={contactCompany} 
          emailCompany={emailCompany} handleContactCompany={handleContactCompany} handleEmailCompany={handleEmailCompany}
          handleNameCompany={handleNameCompany} handlePhoneCompany={handlePhoneCompany} nameCompany={nameCompany} 
          openSideNav={openSideNav}
          phoneCompany={phoneCompany} handleTradeNameCompany={handleTradeNameCompany} tradeNameCompany={tradeNameCompany} />);

  return(
    <div className="z-10 w-full sm:max-w-lg absolute bg-white p-5 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full p-1 sm:p-3">
        <div className="flex justify-between items-center border border-slate-400 p-2 rounded-md" style={{backgroundColor:'#F8FAFC'}}>
          <HeaderForm img="/img/gastos.svg" subtitle="" 
            title="Agregar compañia"
          />
          <TooltipCloseIcon handleClose={handleOpen} />
        </div>
        <div className="mt-3">
          <NavNewCompanyStepper index={indexStepper} handleIndexStepper={handleIndexStepper} />
        </div>
        {stepform}
      </div>
    </div>
  )
}