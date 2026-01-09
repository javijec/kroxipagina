import "./styles.css";
import { EditButton } from "components/EditButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <EditButton />
      </body>
    </html>
  );
}
