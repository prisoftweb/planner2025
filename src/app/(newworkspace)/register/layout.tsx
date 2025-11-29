import { ToastContainer } from "react-toastify";

export default function SeccionLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            //pauseOnFocusLoss
            draggable
            //pauseOnHover
            theme="light"
          />
          {children}
        </main>
      </body>
    </html>
  );
}
