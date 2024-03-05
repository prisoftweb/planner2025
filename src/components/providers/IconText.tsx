export default function IconText({text, size, sizeText}: {text:string, size:string, sizeText:string}){
  
  const initials = text.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  let strIni = '';
  if(initials?.length && initials?.length >= 2){
    strIni = initials[0]+initials[1];
  }else if(initials?.length && initials?.length > 0){
    strIni = initials[0];
  }
  
  return(
    <>
      <div 
        className={`rounded-md text-white bg-blue-600 text-center
        uppercase ${size} flex items-center justify-center`}>
        <p className={sizeText}>{strIni}</p>
      </div>
    </>
  )
}