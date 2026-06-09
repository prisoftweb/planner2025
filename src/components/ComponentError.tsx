import Link from "next/link";
// import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: number;
  onRetry?: () => void;
  page:string,
  refresh?: boolean
}

export default function ComponentError({
  title = "Lo sentimos",
  message = "Ocurrió un problema al procesar tu solicitud.",
  errorCode,
  onRetry,
  page, refresh
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="mb-4 text-6xl">😕</div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        {message}
      </p>

      {errorCode && (
        <span className="mt-2 text-sm text-gray-400">
          Código de error: {errorCode}
        </span>
      )}

      {/* <Link href={page}>Reintentar</Link> */}
      {refresh ? <Link href={page}>Reintentar</Link> : <></> }
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Reintentar
        </button>
      )}
      {/* <button
        onClick={() => window.location.replace('/login')}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Reintentar
      </button> */}
      <Link href={'/login'}>
        <div className="text-white font-normal text-sm bg-black rounded-xl w-36 h-9 py-2 hover:bg-slate-600 print:hidden mt-3">
          Iniciar
        </div>
      </Link>
    </div>
  );
}