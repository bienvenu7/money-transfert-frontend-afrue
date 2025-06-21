import { TfiComment } from "react-icons/tfi";
import MobileNav from "../components/navigation/MobileNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout__container">
      <MobileNav />
      {/* help button */}
      <button className="help__button">
        <TfiComment />
      </button>
      {children}
    </main>
  );
}
