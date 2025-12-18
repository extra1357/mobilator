'use client';
import dynamic from 'next/dynamic';

// Força o componente a ser renderizado SOMENTE no cliente
const HomePageClient = dynamic(() => import('./HomePageClient'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      flexDirection: 'column'
    }}>
      <div className="spinner"></div>
      <p style={{marginTop: '16px'}}>Carregando...</p>
    </div>
  )
});

export default function Page() {
  return <HomePageClient />;
}