import React from "react";
import { BsFiletypeXml } from "react-icons/bs";

type Props = {
  base64File: string;
  fileName: string;
};

const DownloadXMLButton: React.FC<Props> = ({ base64File, fileName }) => {
  const downloadXML = () => {
    // Decodificar base64 a bytes
    const byteCharacters = atob(base64File);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear Blob de tipo XML
    const blob = new Blob([byteArray], { type: "application/xml" });

    // Crear URL temporal
    const url = URL.createObjectURL(blob);

    // Crear enlace y disparar descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Liberar URL temporal
    URL.revokeObjectURL(url);
  };

  return (
    <BsFiletypeXml className="w-6 h-6 text-blue-600" onClick={downloadXML} />
    // <button
    //   onClick={downloadXML}
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     gap: "0.5rem",
    //     padding: "0.5rem 1rem",
    //     backgroundColor: "#f0f0f0",
    //     border: "1px solid #ccc",
    //     borderRadius: "5px",
    //     cursor: "pointer",
    //   }}
    // >
    //   <BsFiletypeXml size={20} color="#0070f3" />
    //   Descargar XML
    // </button>
  );
};

export default DownloadXMLButton;