export default function SeccionLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>Este layout es independiente del global</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
