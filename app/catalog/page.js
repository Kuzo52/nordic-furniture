import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Каталог",
  description:
    "Кресла, диваны, столы, свет и текстиль из коллекции NORDIC.",
};

export default function CatalogPage() {
  return (
    <main className="inner-page">
      <CatalogClient />
    </main>
  );
}
