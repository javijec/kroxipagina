import "./styles.css";
import { EditButton } from "components/EditButton";
import { ErrorBoundary } from "components/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ErrorBoundary>
          {children}
          <EditButton />
        </ErrorBoundary>
      </body>
    </html>
  );
}
