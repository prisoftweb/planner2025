import { ChangeEvent } from "react";

export default function UploadImage({setFile}: {setFile: Function}){
  
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        //showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
      }
    }
  }
  
  return (
    <>
      <div className='border-2 border-dashed rounded-md border-gray-200 
        relative py-3 md:px-2 w-full cursor-pointer'>
        <input
          type="file" 
          id="photo" 
          name="photo"
          onChange={onFileChange}
          // multiple
          className="opacity-0 absolute inset-0 w-full cursor-pointer">                                            
        </input>
        <p className='text-center cursor-pointer'>Subir imagen</p>
      </div>
    </>
  )
}