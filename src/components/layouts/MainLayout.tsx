import Footer from '@/components/main/Footer';
import MobileNav from '@/components/MobileNav';
import { TfiComment } from 'react-icons/tfi';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='layout__container'>
      <MobileNav />
      {/* help button */}
      <button className='help__button'>
        <TfiComment />
      </button>
      {children}
      <Footer />
    </main>
  );
}
