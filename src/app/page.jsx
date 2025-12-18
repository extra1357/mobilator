'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Componente com todo o conteúdo
function HomePageContent() {
  useEffect(() => {
    // Aguardar DOM estar pronto e inicializar
    const timer = setTimeout(() => {
      initializePage();
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root{
          --bg:#f7fafc; --card:#ffffff; --muted:#6b7280; --accent:#2563eb; --success:#10b981;
          --max-width:1100px; --radius:12px;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        *{box-sizing:border-box}
        body{margin:0;background:var(--bg);color:#0f172a;line-height:1.4}
        header{background:linear-gradient(90deg,#0ea5e9 0%, #2563eb 100%);color:white;padding:28px 16px}
        .wrap{max-width:var(--max-width);margin:0 auto}
        header .title{display:flex;align-items:center;gap:12px}
        header h1{margin:0;font-size:20px;letter-spacing:0.2px}
        header p{margin:4px 0 0;font-size:13px;opacity:.95}
        main{padding:28px 16px}
        .controls{display:flex;gap:12px;align-items:center;margin:18px 0;flex-wrap:wrap}
        .search{flex:1;min-width:220px}
        input[type="search"], select{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #e6eef6;background:white}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:16px}
        .card{background:var(--card);border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(2,6,23,0.06);display:flex;flex-direction:column;transition:transform 0.2s}
        .card:hover{transform:translateY(-4px);box-shadow:0 12px 24px rgba(2,6,23,0.12)}
        .thumb{height:160px;background:#ddd;background-position:center;background-size:cover;position:relative;overflow:hidden}
        .card-body{padding:12px 14px;flex:1;display:flex;flex-direction:column}
        .price{font-weight:700;color:var(--accent);font-size:18px}
        .addr{font-size:13px;color:var(--muted);margin-top:6px}
        
        .description-container{
          height:80px;
          overflow-y:auto;
          margin-top:8px;
          padding-right:6px;
        }
        .description-container::-webkit-scrollbar{width:5px}
        .description-container::-webkit-scrollbar-track{background:#f1f5f9;border-radius:10px}
        .description-container::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
        .description-container::-webkit-scrollbar-thumb:hover{background:#94a3b8}
        .description-text{font-size:12px;color:var(--muted);line-height:1.4}
        
        .meta{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:12px}
        .btn{background:var(--accent);color:white;padding:8px 12px;border-radius:10px;border:none;cursor:pointer;transition:all 0.2s}
        .btn:hover{background:#1d4ed8;transform:scale(1.05)}
        .btn:disabled{opacity:0.5;cursor:not-allowed}
        .btn.secondary{background:#eef2ff;color:var(--accent);border:1px solid #c7ddff}
        footer{padding:18px 0;text-align:center;color:var(--muted);font-size:13px}
        .loading{text-align:center;padding:40px;font-size:18px;color:var(--muted)}
        .spinner{display:inline-block;width:40px;height:40px;border:4px solid #e6eef6;border-top-color:var(--accent);border-radius:50%;animation:spin 1s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .badge{position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.95);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;color:#0f172a;z-index:2}
        
        .thumbnails{display:flex;gap:4px;padding:8px;background:#f8fafc;border-top:1px solid #e5e7eb;overflow-x:auto}
        .thumbnails::-webkit-scrollbar{height:4px}
        .thumbnails::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}
        .mini-thumb{width:50px;height:50px;border-radius:6px;background-size:cover;background-position:center;cursor:pointer;border:2px solid transparent;transition:all 0.2s;flex-shrink:0}
        .mini-thumb:hover{border-color:var(--accent);transform:scale(1.1)}
        .mini-thumb.active{border-color:var(--accent);box-shadow:0 0 0 2px rgba(37,99,235,0.2)}
        
        .photo-counter{position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.75);color:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;z-index:2}

        .gallery-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;align-items:center;justify-content:center}
        .gallery-modal.open{display:flex}
        .gallery-content{max-width:90%;max-height:90%;position:relative}
        .gallery-main-img{max-width:100%;max-height:80vh;object-fit:contain;border-radius:8px}
        .gallery-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.9);border:none;width:50px;height:50px;border-radius:50%;cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
        .gallery-nav:hover{background:white;transform:translateY(-50%) scale(1.1)}
        .gallery-nav.prev{left:-60px}
        .gallery-nav.next{right:-60px}
        .gallery-close{position:absolute;top:-50px;right:0;background:rgba(255,255,255,0.9);border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center}
        .gallery-close:hover{background:white;transform:scale(1.1)}
        .gallery-thumbs{display:flex;gap:8px;margin-top:16px;justify-content:center;overflow-x:auto;max-width:100%}
        .gallery-thumb{width:80px;height:80px;border-radius:8px;background-size:cover;background-position:center;cursor:pointer;border:3px solid transparent;transition:all 0.2s;flex-shrink:0}
        .gallery-thumb:hover{border-color:white;transform:scale(1.05)}
        .gallery-thumb.active{border-color:var(--accent);box-shadow:0 0 0 2px rgba(37,99,235,0.5)}
        .gallery-info{text-align:center;color:white;margin-top:12px;font-size:14px}

        .contact-drawer{
          position:fixed;
          right:18px;
          bottom:18px;
          width:360px;
          max-width:calc(100% - 36px);
          border-radius:14px;
          background:linear-gradient(180deg,#ffffff, #fbfdff);
          box-shadow:0 18px 48px rgba(7,12,20,0.18);
          overflow:hidden;
          display:none;
          z-index:9998;
        }
        .contact-drawer.open{display:block}

        .drawer-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #eef2f6}
        .drawer-header h3{margin:0;font-size:15px}
        .drawer-body{padding:12px 14px}
        .field{margin-bottom:10px}
        label{display:block;font-size:12px;color:var(--muted);margin-bottom:6px}
        input[type="text"], input[type="email"], input[type="tel"], textarea, input[type="datetime-local"]{
          width:100%;padding:10px;border-radius:8px;border:1px solid #e6eef6;background:#fff
        }
        textarea{min-height:80px;resize:vertical}
        .small{font-size:12px;color:#374151}
        .lead-card{background:#f8fafc;border-radius:10px;padding:10px;margin-top:8px;border:1px solid #eef2f6}
        .prompt-box{background:#0b1220;color:white;padding:10px;border-radius:8px;margin-top:8px;font-size:13px;}
        .copy-btn{background:#fff;color:#0b1220;padding:6px 8px;border-radius:8px;border:none;cursor:pointer}

        .float-btn{
          position:fixed;
          right:20px;
          bottom:20px;
          background:#2563eb;
          color:white;
          padding:12px 18px;
          border:none;
          border-radius:50px;
          box-shadow:0 8px 22px rgba(0,0,0,0.22);
          cursor:pointer;
          font-size:14px;
          z-index:9999;
        }

        @media (max-width:640px){
          .contact-drawer{right:12px;left:12px;bottom:12px;width:auto}
          header h1{font-size:18px}
          .gallery-nav.prev{left:-10px}
          .gallery-nav.next{right:-10px}
          .gallery-close{top:-40px;right:-10px}
        }
      `}</style>

      <header>
        <div className="wrap">
          <div className="title">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="white" opacity=".08"></rect>
              <path d="M6 11.5L12 7l6 4.5V18a1 1 0 0 1-1 1h-3v-4H10v4H7a1 1 0 0 1-1-1v-6.5z" fill="white"></path>
            </svg>
            <div>
              <h1>Digital Imóveis</h1>
              <p>Descubra imóveis reais — entre em contato e agende visitas.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className="controls">
          <div className="search">
            <input id="q" type="search" placeholder="Buscar por cidade ou palavra-chave" />
          </div>
          <div style={{width:'160px'}}>
            <select id="filter">
              <option value="todos">Todos os imóveis</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Sobrado">Sobrado</option>
              <option value="Terreno">Terreno</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>
          <div style={{width:'140px'}}><input id="maxPrice" type="text" placeholder="Preço máx. (R$)" /></div>
          <div><button id="searchBtn" className="btn">Buscar</button></div>
        </div>

        <div id="loading" className="loading" style={{display:'block'}}>
          <div className="spinner"></div>
          <p>Carregando imóveis do banco de dados...</p>
        </div>

        <section id="list" className="grid" aria-live="polite"></section>

        <footer>
          © <span id="year"></span> Digital Imóveis — Sistema integrado com backend
        </footer>
      </main>

      <div id="galleryModal" className="gallery-modal">
        <div className="gallery-content">
          <button className="gallery-close">✕</button>
          <button className="gallery-nav prev">‹</button>
          <img id="galleryMainImg" className="gallery-main-img" src="" alt="Foto do imóvel" />
          <button className="gallery-nav next">›</button>
          <div className="gallery-info">
            <span id="galleryCounter"></span>
          </div>
          <div id="galleryThumbs" className="gallery-thumbs"></div>
        </div>
      </div>

      <aside className="contact-drawer" aria-label="Formulário de contato">
        <div className="drawer-header">
          <h3>Contato rápido</h3>
          <button style={{fontSize:'18px',background:'none',border:'none',cursor:'pointer',color:'#6b7280'}}>✕</button>
        </div>
        <div className="drawer-body">
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input id="name" type="text" placeholder="Seu nome" required />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div className="field">
            <label htmlFor="phone">Telefone</label>
            <input id="phone" type="tel" placeholder="(11) 9xxxx-xxxx" required />
          </div>
          <div className="field">
            <label htmlFor="property">Imóvel de interesse (opcional)</label>
            <input id="property" type="text" placeholder="Ex: Casa - Rua A, 123" />
          </div>
          <div className="field">
            <label htmlFor="datetime">Preferência de dia/hora</label>
            <input id="datetime" type="datetime-local" />
          </div>
          <div className="field">
            <label htmlFor="message">Mensagem</label>
            <textarea id="message" placeholder="Escreva sua mensagem..."></textarea>
          </div>

          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <button id="sendLead" className="btn">Enviar mensagem</button>
            <button id="clearForm" className="btn secondary">Limpar</button>
          </div>

          <div id="leadResult" className="lead-card small" style={{display:'none'}}></div>

          <div id="promptArea" style={{display:'none'}}>
            <div style={{marginTop:'10px',fontSize:'13px',color:'var(--muted)'}}>Prompt sugerido para o corretor:</div>
            <div className="prompt-box" id="agentPrompt"></div>
            <div style={{marginTop:'8px',display:'flex',gap:'8px'}}>
              <button id="copyPrompt" className="copy-btn">Copiar prompt</button>
              <button id="openWhats" className="copy-btn">Abrir WhatsApp</button>
            </div>
          </div>
        </div>
      </aside>

      <button id="openDrawer" className="float-btn">Contato rápido</button>
    </>
  );
}

// Função que inicializa toda a lógica JavaScript
function initializePage() {
  const API_URL_LEADS = '/api/leads';
  const API_URL_IMOVEIS = '/api/imoveis';
  
  let allProperties = [];
  let currentGallery = [];
  let currentImageIndex = 0;
  
  const agents = [
    { id: 'AG001', name: 'João Silva', phone: '+5511999000001' },
    { id: 'AG002', name: 'Mariana Alves', phone: '+5511999000002' },
    { id: 'AG003', name: 'Carlos Pereira', phone: '+5511999000003' }
  ];

  const listEl = document.getElementById('list');
  const loadingEl = document.getElementById('loading');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ATALHO CTRL+ALT+R PARA ADMIN (porta secreta invisível)
  const handleAdminShortcut = (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'r') {
      e.preventDefault();
      window.location.href = '/admin/login';
    }
  };
  
  document.addEventListener('keydown', handleAdminShortcut);

  window.openGallery = function(images, startIndex = 0) {
    currentGallery = images;
    currentImageIndex = startIndex;
    showGalleryImage();
    document.getElementById('galleryModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeGallery = function() {
    document.getElementById('galleryModal').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.nextImage = function() {
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    showGalleryImage();
  };

  window.prevImage = function() {
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    showGalleryImage();
  };

  function showGalleryImage() {
    const imgEl = document.getElementById('galleryMainImg');
    const counterEl = document.getElementById('galleryCounter');
    const thumbsEl = document.getElementById('galleryThumbs');
    
    if (imgEl) imgEl.src = currentGallery[currentImageIndex];
    if (counterEl) counterEl.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    
    if (thumbsEl) {
      const thumbsHtml = currentGallery.map((img, idx) => 
        `<div class="gallery-thumb ${idx === currentImageIndex ? 'active' : ''}" 
              style="background-image:url('${img}')" 
              onclick="currentImageIndex=${idx};window.showGalleryImage()"></div>`
      ).join('');
      thumbsEl.innerHTML = thumbsHtml;
    }
  }
  
  window.showGalleryImage = showGalleryImage;

  const prevBtn = document.querySelector('.gallery-nav.prev');
  const nextBtn = document.querySelector('.gallery-nav.next');
  const closeBtn = document.querySelector('.gallery-close');
  
  if (prevBtn) prevBtn.addEventListener('click', window.prevImage);
  if (nextBtn) nextBtn.addEventListener('click', window.nextImage);
  if (closeBtn) closeBtn.addEventListener('click', window.closeGallery);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeGallery();
    if (e.key === 'ArrowRight') window.nextImage();
    if (e.key === 'ArrowLeft') window.prevImage();
  });

  async function loadProperties() {
    try {
      const response = await fetch(`${API_URL_IMOVEIS}?publico=true`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      allProperties = (Array.isArray(data) ? data : (data.data || [])).filter(imovel => {
        return imovel.status === 'ATIVO' && imovel.disponivel === true;
      });
      
      console.log(`✅ ${allProperties.length} imóveis ativos carregados`);
      if (loadingEl) loadingEl.style.display = 'none';
      renderProperties(allProperties);
      
    } catch (error) {
      console.error('❌ Erro ao carregar imóveis:', error);
      if (loadingEl) loadingEl.innerHTML = '<p style="color:#ef4444">❌ Erro ao carregar imóveis do servidor.</p>';
    }
  }

  loadProperties();

  function renderProperties(items){
    if (!listEl) return;
    
    if (items.length === 0) {
      listEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px"><p style="font-size:18px;color:var(--muted)">🏚️ Nenhum imóvel disponível no momento</p></div>';
      return;
    }

    listEl.innerHTML = '';
    items.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      
      const images = p.imagens && p.imagens.length > 0 
        ? p.imagens 
        : ['https://source.unsplash.com/collection/8912953/800x600?sig=' + p.id.slice(-4)];
      
      const mainImg = images[0];
      const imageCount = images.length;
      
      card.innerHTML = `
        <div class="thumb" style="background-image:url('${mainImg}')" onclick="openGallery(${JSON.stringify(images).replace(/"/g, '&quot;')}, 0)">
          <span class="badge">${p.tipo}</span>
          ${imageCount > 1 ? `<span class="photo-counter">📷 ${imageCount} fotos</span>` : ''}
        </div>
        <div class="card-body">
          <div class="price">R$ ${p.preco?.toLocaleString('pt-BR')}</div>
          <div class="addr">${p.cidade}/${p.estado} • ${p.metragem}m²</div>
          <div class="description-container">
            <div class="description-text">${p.descricao || 'Imóvel disponível para visitação'}</div>
          </div>
          <div class="meta">
            <div style="font-size:11px;color:var(--muted)">Ref: ${p.id.slice(0,8)}</div>
            <div style="display:flex;gap:6px">
              <button class="btn" onclick="startContact('${p.id}', '${p.tipo}', '${p.cidade}')">Quero este</button>
              <button class="btn secondary" onclick="viewDetails('${p.id}')">Ver mais</button>
            </div>
          </div>
        </div>
        ${imageCount > 1 ? `
        <div class="thumbnails">
          ${images.slice(0, 5).map((img, idx) => 
            `<div class="mini-thumb" style="background-image:url('${img}')" 
                  onclick="event.stopPropagation();openGallery(${JSON.stringify(images).replace(/"/g, '&quot;')}, ${idx})"></div>`
          ).join('')}
          ${imageCount > 5 ? `<div class="mini-thumb" style="background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#6b7280" onclick="event.stopPropagation();openGallery(${JSON.stringify(images).replace(/"/g, '&quot;')}, 5)">+${imageCount - 5}</div>` : ''}
        </div>` : ''}
      `;
      listEl.appendChild(card);
    });
  }

  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = document.getElementById('q')?.value.trim().toLowerCase() || '';
      const filter = document.getElementById('filter')?.value || 'todos';
      const maxP = parseFloat(String(document.getElementById('maxPrice')?.value || '').replace(/\D/g,''));
      
      const result = allProperties.filter(p => {
        if(filter !== 'todos' && p.tipo !== filter) return false;
        if(q && !(p.cidade?.toLowerCase().includes(q) || p.endereco?.toLowerCase().includes(q) || p.tipo?.toLowerCase().includes(q))) return false;
        if(!isNaN(maxP) && maxP>0 && p.preco>maxP) return false;
        return true;
      });
      
      renderProperties(result);
    });
  }

  window.viewDetails = function(id){
    const p = allProperties.find(x => x.id === id);
    if(!p) return alert('Imóvel não encontrado');
    
    if(p.imagens && p.imagens.length > 0) {
      window.openGallery(p.imagens, 0);
    } else {
      alert(`${p.tipo}\n\nCidade: ${p.cidade}/${p.estado}\nMetragem: ${p.metragem}m²\nPreço: R$ ${p.preco?.toLocaleString('pt-BR')}\n\nDescrição: ${p.descricao || 'Sem descrição'}\n\nRef: ${p.id.slice(0,8)}`);
    }
  };

  window.startContact = function(id, tipo, cidade){
    const propEl = document.getElementById('property');
    if (propEl) propEl.value = `${tipo} - ${cidade} (Ref: ${id.slice(0,8)})`;
    abrirDrawer();
  };

  function abrirDrawer(){
    document.querySelector('.contact-drawer')?.classList.add('open');
    document.getElementById('name')?.focus();
  }
  
  function fecharDrawer(){
    document.querySelector('.contact-drawer')?.classList.remove('open');
  }

  const drawerCloseBtn = document.querySelector('.drawer-header button');
  const openDrawerBtn = document.getElementById('openDrawer');
  
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', fecharDrawer);
  if (openDrawerBtn) openDrawerBtn.addEventListener('click', abrirDrawer);

  const sendLeadBtn = document.getElementById('sendLead');
  if (sendLeadBtn) {
    sendLeadBtn.addEventListener('click', async () => {
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const property = document.getElementById('property')?.value.trim() || 'Interesse geral';
      const datetime = document.getElementById('datetime')?.value || '';
      const message = document.getElementById('message')?.value.trim() || '';

      if(!name || !email || !phone){
        alert('⚠️ Por favor preencha nome, e-mail e telefone.');
        return;
      }

      const leadData = {
        nome: name,
        email: email,
        telefone: phone,
        origem: 'site'
      };

      const originalText = sendLeadBtn.textContent;
      sendLeadBtn.disabled = true;
      sendLeadBtn.textContent = '⏳ Enviando...';

      try {
        const response = await fetch(API_URL_LEADS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });

        const result = await response.json();

        if (result.success) {
          const leadId = result.data.id;
          const status = result.data.status;
          const assigned = agents[Math.floor(Math.random() * agents.length)];

          const leadResultEl = document.getElementById('leadResult');
          if (leadResultEl) {
            leadResultEl.style.display = 'block';
            leadResultEl.innerHTML = `
              ✅ <strong>Sucesso!</strong> Mensagem enviada.<br>
              Lead: <strong>${leadId.slice(0, 8)}</strong> • Status: <strong>${status}</strong><br>
              Imóvel: ${property}<br>
              Corretor: <strong>${assigned.name}</strong> • ${assigned.phone}
            `;
          }

          const prompt = `Olá ${assigned.name},\n\n✨ Novo lead capturado pelo site!\n\nID: ${leadId}\nNome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nStatus IA: ${status}\nImóvel: ${property}\nData/Hora: ${datetime || 'Não informado'}\nMensagem: ${message || '—'}\n\n📋 Ação:\n1. Contato em 2h\n2. Confirmar visita\n3. Enviar localização\n4. Registrar no sistema`;

          const agentPromptEl = document.getElementById('agentPrompt');
          const promptAreaEl = document.getElementById('promptArea');
          if (agentPromptEl) agentPromptEl.textContent = prompt;
          if (promptAreaEl) promptAreaEl.style.display = 'block';

          ['name','email','phone','property','datetime','message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
          });

          setTimeout(() => {
            fecharDrawer();
            setTimeout(() => {
              if (leadResultEl) leadResultEl.style.display = 'none';
              if (promptAreaEl) promptAreaEl.style.display = 'none';
            }, 500);
          }, 2000);

        } else {
          alert('❌ Erro: ' + (result.error || 'Erro desconhecido'));
        }

      } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro de conexão com o servidor.');
      } finally {
        sendLeadBtn.disabled = false;
        sendLeadBtn.textContent = originalText;
      }
    });
  }

  const clearFormBtn = document.getElementById('clearForm');
  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', () => {
      ['name','email','phone','property','datetime','message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const leadResultEl = document.getElementById('leadResult');
      const promptAreaEl = document.getElementById('promptArea');
      if (leadResultEl) leadResultEl.style.display = 'none';
      if (promptAreaEl) promptAreaEl.style.display = 'none';
    });
  }

  const copyPromptBtn = document.getElementById('copyPrompt');
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      const text = document.getElementById('agentPrompt')?.textContent || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          alert('✅ Prompt copiado!');
        });
      }
    });
  }

  const openWhatsBtn = document.getElementById('openWhats');
  if (openWhatsBtn) {
    openWhatsBtn.addEventListener('click', () => {
      const txt = encodeURIComponent(document.getElementById('agentPrompt')?.textContent || '');
      window.open(`https://web.whatsapp.com/send?text=${txt}`, '_blank');
    });
  }

  const searchInput = document.getElementById('q');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        const btn = document.getElementById('searchBtn');
        if (btn) btn.click();
      }
    });
  }
}

// CRITICAL: Desabilita SSR para evitar erros de hydration
export default dynamic(() => Promise.resolve(HomePageContent), { 
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
      }}/>
    </div>
  )
});