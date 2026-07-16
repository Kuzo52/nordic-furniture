import "./globals.css";
import CartDrawer from "./components/CartDrawer";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { StoreProvider } from "./components/StoreProvider";

export const metadata = {
  title: {
    default: "NORDIC — мебель, следующая за природой",
    template: "%s — NORDIC",
  },
  description:
    "Скандинавская мебель из натуральных материалов для спокойного дома.",
  openGraph: {
    title: "NORDIC — скандинавская мебель",
    description: "Иконы северного дизайна для спокойного дома.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <SiteHeader />
          <CartDrawer />
          {children}
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
