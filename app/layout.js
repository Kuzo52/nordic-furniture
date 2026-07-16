import "./globals.css";

export const metadata = {
  title: "NORDIC — мебель, следующая за природой",
  description:
    "Скандинавская мебель из натуральных материалов для спокойного дома.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
