'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProps = async () => {
      try {
        const res = await fetch('/api/imoveis?publico=true');
        const data = await res.json();
        const active = (Array.isArray(data) ? data : []).filter(p => p.status === 'ATIVO');
        setProperties(active);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadProps();
  }, []);

  if (loading) return <div style={{textAlign:'center',padding:'60px'}}>Carregando...</div>;

  return (
    <div style={{padding:'20px',maxWidth:'1200px',margin:'0 auto'}}>
      <h1>🏠 Digital Imóveis</h1>
      <p>{properties.length} imóveis disponíveis</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'20px',marginTop:'20px'}}>
        {properties.map(p => (
          <div key={p.id} style={{border:'1px solid #ddd',borderRadius:'12px',padding:'15px',background:'white'}}>
            <h3 style={{color:'#2563eb',margin:'0 0 10px'}}>R$ {p.preco?.toLocaleString('pt-BR')}</h3>
            <p style={{fontSize:'14px',color:'#666'}}>{p.tipo} - {p.cidade}/{p.estado}</p>
            <p style={{fontSize:'13px',color:'#888'}}>{p.metragem}m²</p>
          </div>
        ))}
      </div>
    </div>
  );
}