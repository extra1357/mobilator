'use client';

import { useEffect, useState, dynamic } from 'react';

// Isso força o Next.js a carregar a página apenas no navegador, matando o erro #418
const HomeContent = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/imoveis?publico=true', { cache: 'no-store' });
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.data || []);
        const ativos = lista.filter(p => p.status === 'ATIVO');
        setImoveis(ativos);
      } catch (e) {
        console.error("Erro na busca:", e);
      } finally {
        setLoading(false);
      }
    }
    load();

    const handleKey = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'q') window.location.href = '/admin/login';
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <header style={{ background: '#2563eb', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1>Digital Imóveis - Painel Ativo</h1>
        <p>Dados carregados diretamente do banco Neon.</p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #2563eb', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p>Sincronizando com o banco de dados...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {imoveis.length > 0 ? imoveis.map(p => (
            <div key={p.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ height: '180px', backgroundColor: '#ddd', backgroundImage: `url(${p.imagens?.[0] || ''})`, backgroundSize: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>R$ {p.preco?.toLocaleString('pt-BR')}</h3>
                <p style={{ fontSize: '14px', color: '#667' }}>{p.tipo} - {p.cidade}/{p.estado}</p>
                <button 
                  onClick={() => window.open(`https://wa.me/5511999999999?text=Interesse no imóvel ${p.id}`, '_blank')}
                  style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }}
                >
                  Tenho Interesse
                </button>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px' }}>
              <p>Nenhum imóvel ativo encontrado no banco.</p>
              <button onClick={() => window.location.href='/admin/login'} style={{ padding: '10px 20px', cursor: 'pointer' }}>Acessar Admin para Cadastrar</button>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        body { margin: 0; }
      `}</style>
      
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', fontSize: '10px', color: '#ccc' }}>
        Atalho Admin: Ctrl+Alt+Q
      </div>
    </div>
  );
};

// Desativa o SSR (Server Side Rendering) para esta página específica
export default dynamic(() => Promise.resolve(HomeContent), { ssr: false });