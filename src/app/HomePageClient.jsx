'use client';

import { useEffect, useMemo, useState } from 'react';
import './home.css';

export default function HomePageClient() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Galeria
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Contato
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [leadResult, setLeadResult] = useState(null);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Shortcut admin
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'q') {
        e.preventDefault();
        window.location.href = '/admin/login';
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Load imóveis (blindado)
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch('/api/imoveis?publico=true', {
          cache: 'no-store'
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }

        const data = await res.json();
        const active = Array.isArray(data)
          ? data.filter(p => p.status === 'ATIVO')
          : [];

        if (mounted) {
          setProperties(active);
        }
      } catch (err) {
        console.error('Erro ao carregar imóveis:', err);
        if (mounted) setError('Não foi possível carregar os imóveis.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  // 🔑 ESTADO DERIVADO CORRETO (useMemo)
  const filteredProperties = useMemo(() => {
    let result = properties;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.cidade?.toLowerCase().includes(q) ||
        p.estado?.toLowerCase().includes(q) ||
        p.endereco?.toLowerCase().includes(q)
      );
    }

    if (filterType) {
      result = result.filter(p => p.tipo === filterType);
    }

    if (maxPrice) {
      result = result.filter(p => p.preco <= Number(maxPrice));
    }

    return result;
  }, [properties, searchQuery, filterType, maxPrice]);

  // Estados base
  if (loading) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign:'center', padding:'60px' }}>
        <h2>Erro</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!Array.isArray(properties)) return null;

  // Helpers
  const openGallery = (imgs, index = 0) => {
    setCurrentGallery(imgs);
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const startContact = (p) => {
    setContactForm({
      nome: '',
      email: '',
      telefone: '',
      mensagem: `Olá, tenho interesse no imóvel em ${p.cidade}/${p.estado}`
    });
    setDrawerOpen(true);
  };

  return (
    <>
      <header className="site-header">
        <h1>Digital Imóveis</h1>
      </header>

      <main className="wrap">
        <section className="controls">
          <input
            placeholder="Buscar cidade"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">Todos</option>
            <option value="CASA">Casa</option>
            <option value="APARTAMENTO">Apartamento</option>
            <option value="TERRENO">Terreno</option>
            <option value="COMERCIAL">Comercial</option>
          </select>

          <input
            type="number"
            placeholder="Preço máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </section>

        {filteredProperties.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px' }}>
            Nenhum imóvel encontrado.
          </div>
        ) : (
          <section className="grid">
            {filteredProperties.map(p => (
              <article
                key={p.id ?? `${p.cidade}-${p.preco}`}
                className="card"
              >
                {p.fotos?.length > 0 && (
                  <div className="card-img" onClick={() => openGallery(p.fotos)}>
                    <img src={p.fotos[0]} alt="" />
                  </div>
                )}
                <div className="card-body">
                  <div className="price">
                    R$ {p.preco?.toLocaleString('pt-BR')}
                  </div>
                  <button onClick={() => startContact(p)}>
                    Contato rápido
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
