// =======================================
// HubCRM Ajuda — Search & Accordion JS
// Pure JS, no dependencies
// =======================================

const WPP_NUMBER = '5515991716525';
const WPP_MSG    = encodeURIComponent('Olá! Preciso de suporte com o HubCRM.');
const WPP_LINK   = `https://wa.me/${WPP_NUMBER}?text=${WPP_MSG}`;

// ---- Search index (populated on index page) ----
const SEARCH_INDEX = [
  {
    title: 'Primeiros Passos — Criar conta e fazer login',
    desc:  'Como criar sua conta, verificar o e-mail e acessar o HubCRM pela primeira vez.',
    url:   'primeiros-passos.html',
    keywords: 'cadastro conta login senha email verificação acesso'
  },
  {
    title: 'Contatos — Gerenciar sua base de clientes',
    desc:  'Como criar, editar, organizar e pesquisar contatos com tags.',
    url:   'contatos.html',
    keywords: 'contatos clientes importar tag busca telefone'
  },
  {
    title: 'Canais de Comunicação — WhatsApp, Instagram e E-mail',
    desc:  'Como conectar WhatsApp (oficial e Baileys), Instagram Direct e e-mail profissional.',
    url:   'canais.html',
    keywords: 'whatsapp instagram email canal conectar qrcode meta'
  },
  {
    title: 'Chats — Conversas Omnichannel',
    desc:  'Interface unificada de atendimento. Veja, responda e organize todos os atendimentos.',
    url:   'chats.html',
    keywords: 'chat conversa atendimento mensagem responder omnichannel'
  },
  {
    title: 'Campanhas — Disparo em Massa',
    desc:  'Envie mensagens em massa via WhatsApp com agendamento e acompanhamento.',
    url:   'campanhas.html',
    keywords: 'campanha disparo massa broadcast whatsapp template agenda'
  },
  {
    title: 'Kanban — Funil de Vendas',
    desc:  'Gerencie negócios, pipelines e etapas com arrastar e soltar.',
    url:   'kanban.html',
    keywords: 'kanban funil negocio pipeline etapa deal venda'
  },
  {
    title: 'Usuários & Equipe — Convidar e Gerenciar',
    desc:  'Como convidar membros da equipe, atribuir funções e gerenciar acessos.',
    url:   'usuarios.html',
    keywords: 'usuario equipe convite acesso permissao admin agente'
  },
  {
    title: 'Planos & Limites — Free, Pro e Enterprise',
    desc:  'Compare os planos, entenda os limites e saiba como fazer upgrade.',
    url:   'planos.html',
    keywords: 'plano free pro enterprise limite upgrade assinatura cobrança preco'
  },
];

// ---- Init search ----
function initSearch() {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) { results.style.display = 'none'; return; }

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-result-item"><p>Nenhum resultado para "<strong>${escapeHtml(q)}</strong>". <a href="${WPP_LINK}" target="_blank" rel="noopener">Pergunte no WhatsApp →</a></p></div>`;
    } else {
      matches.forEach(item => {
        const hl = highlight(item.title, q);
        const a  = document.createElement('a');
        a.className = 'search-result-item';
        a.href = item.url;
        a.innerHTML = `<h4>${hl}</h4><p>${item.desc}</p>`;
        results.appendChild(a);
      });
    }

    results.style.display = 'block';
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!results.contains(e.target) && e.target !== input) {
      results.style.display = 'none';
    }
  });
}

function highlight(text, q) {
  const escaped = escapeHtml(text);
  const regex   = new RegExp(`(${escapeRegex(q)})`, 'gi');
  return escaped.replace(regex, '<em>$1</em>');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---- FAQ Accordion ----
function initAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });
}

// ---- Sidebar active link ----
function initSidebarHighlight() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('[data-section]');

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.sidebar-nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ---- Inject WhatsApp float button ----
function injectWppFloat() {
  const div = document.createElement('div');
  div.className = 'wpp-float';
  div.innerHTML = `<a href="${WPP_LINK}" target="_blank" rel="noopener" data-tooltip="Falar com suporte">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span>Suporte via WhatsApp</span>
  </a>`;
  document.body.appendChild(div);
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', function () {
  initSearch();
  initAccordion();
  initSidebarHighlight();
  injectWppFloat();
});
