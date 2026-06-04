/* ARQUIVO: js/apps.js
 * Controlador dos apps "OS-like" do dashboard.
 * Renderiza cada app a partir dos arrays em js/data/*.js (fonte única de verdade)
 * e substitui a antiga cadeia de `if` + monkey-patch de loadApp por um registry.
 */

let currentOpenApp = null;

/* ===================== RENDERERS ===================== */

function renderProjetos() {
    const cards = (window.PROJETOS || []).map(p => {
        const dot = `<span class="w-2 h-2 rounded-full ${p.status.color} ${p.status.pulse ? 'animate-pulse' : ''}"></span>`;
        const stack = p.stack.map(s => `<i class="${s.icon}" title="${s.title}"></i>`).join('');
        const links = [
            p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs text-white/70 hover:text-cyan-300 transition-colors"><i class="fa-brands fa-github"></i> Código</a>` : '',
            p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs text-white/70 hover:text-cyan-300 transition-colors"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ''
        ].filter(Boolean).join('<span class="text-white/20">•</span>');
        const linksRow = links ? `<div class="flex items-center gap-3 mt-4">${links}</div>` : '';
        return `
            <div class="relative bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${p.accent} transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-white/5 rounded-lg"><i class="${p.icon} text-2xl ${p.iconColor}"></i></div>
                    <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                        ${dot}<span class="text-[10px] uppercase text-white/60 font-bold">${p.status.label}</span>
                    </div>
                </div>
                <h3 class="text-xl font-montserrat font-bold text-white mb-2">${p.titulo}</h3>
                <p class="text-sm text-white/60 mb-6">${p.descricao}</p>
                <div class="flex gap-3 text-white/40">${stack}</div>
                ${linksRow}
            </div>`;
    }).join('');

    return `
        <div class="pt-10 px-4">
            <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 class="font-montserrat text-4xl font-black text-white mb-1 tracking-tighter">PROJETOS</h2>
                    <p class="text-white/50 text-xs font-inter tracking-widest uppercase">Code • Deploy • Innovation</p>
                </div>
                <div class="flex gap-2"><span class="px-3 py-1 rounded-full bg-white/5 text-[10px] text-white/60 border border-white/10">Full Stack</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">${cards}</div>
        </div>`;
}

function renderCertificados() {
    const grupos = window.CERT_GRUPOS || [];
    const certs = window.CERTIFICADOS || [];

    const secoes = grupos.map((grupo, idx) => {
        const doGrupo = certs.filter(c => c.grupo === grupo.id);
        if (!doGrupo.length) return '';
        const cards = doGrupo.map(c => `
            <div class="w-32 sm:w-40 h-40 sm:h-56 bg-[#1a1b1f] rounded-xl overflow-hidden flex-shrink-0 border border-white/5 flex flex-col hover:scale-105 transition-transform cursor-pointer cert-card" data-cert="${c.titulo}">
                <div class="h-[60%] w-full ${c.bg} flex items-center justify-center"><i class="${c.icon} text-4xl ${c.color}"></i></div>
                <div class="h-[40%] p-3 flex flex-col justify-center"><h3 class="text-white text-xs font-bold">${c.titulo}</h3><p class="text-gray-400 text-[10px] mt-1">${c.tag}</p></div>
            </div>`).join('');
        const marginBottom = idx === grupos.length - 1 ? 'mb-12' : 'mb-8';
        return `
            <div class="${marginBottom}">
                <h3 class="text-white font-montserrat font-bold text-sm mb-4 pl-4 border-l-4 ${grupo.border} ml-2 uppercase">${grupo.label}</h3>
                <div class="marquee-container w-full">
                    <div class="marquee-content">${cards}</div>
                </div>
            </div>`;
    }).join('');

    return `
        <div class="pb-32">
            <div class="text-center mb-10 mt-10">
                <h2 class="font-montserrat text-3xl font-extrabold text-white">Certificações & Habilidades</h2>
                <p class="text-white/50 text-sm mt-2">Tecnologia, Dados, Segurança e Gestão</p>
            </div>
            ${secoes}
        </div>`;
}

function renderSobre() {
    const p = window.PERFIL || {};
    const paragrafos = (p.bioCompleta || []).map(t => `<p>${t}</p>`).join('');
    return `
        <div class="flex flex-col items-center justify-center p-10 text-center max-w-3xl mx-auto mt-10">
            <div class="w-32 h-32 bg-gray-700 rounded-full mb-6 border-4 border-white/10 flex items-center justify-center text-4xl">
                <i class="fas fa-user-astronaut"></i>
            </div>
            <h2 class="text-3xl font-bold mb-4 font-montserrat">${p.nome || ''}</h2>

            <p class="text-white/70 leading-relaxed font-inter space-y-3 mb-2">${p.bioResumo || ''}</p>

            <div id="bio-expanded-content" class="hidden text-white/70 leading-relaxed font-inter space-y-3 mb-2">
                ${paragrafos}
            </div>

            <button id="bio-toggle-btn" onclick="toggleBioExpand()" class="px-4 py-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-400/50 rounded-lg mb-4 hover:border-cyan-300 flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20">
                <span id="bio-toggle-text">Ler mais</span>
                <i id="bio-toggle-icon" class="fas fa-chevron-down text-xs transition-transform duration-300"></i>
            </button>

            <div class="grid grid-cols-2 gap-4 mt-8 w-full pb-32">
                <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 class="font-bold text-cyan-400">Skills</h3>
                    <p class="text-sm text-white/60">${p.skills || ''}</p>
                </div>
                <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 class="font-bold text-purple-400">Hobbies</h3>
                    <p class="text-sm text-white/60">${p.hobbies || ''}</p>
                </div>
            </div>
        </div>`;
}

function renderDossie() {
    const recs = window.RECOMENDACOES || [];
    const corpo = !recs.length
        ? `<div class="md:col-span-2 border border-dashed border-white/15 rounded-2xl p-8 text-center bg-white/[0.03]">
               <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-2xl text-cyan-200">
                   <i class="fas fa-scroll"></i>
               </div>
               <h3 class="font-montserrat text-xl font-bold text-white mb-2">Recomendações em preparação</h3>
               <p class="text-white/55 max-w-xl mx-auto text-sm leading-relaxed">
                   Este espaço vai reunir relatos de pessoas que trabalharam, estudaram ou construíram algo comigo.
               </p>
           </div>`
        : recs.map(r => `
            <article class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-400/30 transition-colors">
                <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10"></div>
                <div class="relative flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-xl text-cyan-200 shrink-0">
                        <i class="fas ${r.icon || 'fa-quote-left'}"></i>
                    </div>
                    <div>
                        <p class="text-white/80 text-sm leading-relaxed mb-4">"${r.texto}"</p>
                        <h3 class="font-montserrat text-white font-bold text-sm">${r.nome || 'Recomendação profissional'}</h3>
                        <p class="text-white/45 text-xs mt-1">${r.contexto || 'Experiência compartilhada'}</p>
                    </div>
                </div>
            </article>`).join('');

    return `
        <div class="pt-10 px-4 pb-24">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 class="font-montserrat text-4xl font-black text-white mb-1 tracking-tighter">DOSSIÊ</h2>
                    <p class="text-white/50 text-xs font-inter tracking-widest uppercase">Recomendações • Bastidores • Confiança</p>
                </div>
                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-[10px] text-cyan-200 border border-cyan-400/20 uppercase tracking-widest">
                    <i class="fas fa-dice-d20"></i>
                    <span>Arquivo Vezetiv</span>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">${corpo}</div>
        </div>`;
}

function renderCurriculo() {
    const p = window.PERFIL || {};
    const mailto = `mailto:${p.email}?subject=Oportunidade%20de%20Trabalho&body=Ol%C3%A1%20Gustavo%2C%0A%0AGostaria%20de%20conversar%20sobre%20uma%20oportunidade...`;
    return `
        <div class="flex flex-col items-center justify-center h-full p-6">
            <i class="far fa-file-pdf text-6xl text-red-500 mb-4"></i>
            <h2 class="text-2xl font-bold mb-2">Visualizador de PDF</h2>
            <p class="text-white/50 mb-6">Clique aqui para visualizar em PDF o currículo.</p>
            <p class="text-white/50 mb-6 text-center">
                <a href="${mailto}" class="text-cyan-400 hover:text-cyan-300 transition-colors underline">${p.email}</a>
            </p>
            <a href="${p.curriculoPdf}" download target="_blank"
               class="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform cursor-pointer mb-8">
                Baixar PDF
            </a>
            <div class="w-full max-w-2xl border border-white/20 rounded-lg overflow-hidden bg-white/5">
                <div class="bg-white/10 px-4 py-2 border-b border-white/20">
                    <p class="text-sm text-white/60">Prévia do Currículo</p>
                </div>
                <iframe src="${p.curriculoPdf}" class="w-full h-96 bg-white" title="Prévia do currículo"></iframe>
            </div>
        </div>`;
}

function renderContato() {
    const p = window.PERFIL || {};
    const mailto = `mailto:${p.email}?subject=Oportunidade%20de%20Trabalho&body=Ol%C3%A1%20Gustavo%2C%0A%0AGostaria%20de%20conversar%20sobre%20uma%20oportunidade...`;
    const whatsBtn = p.whatsapp
        ? `<a href="https://wa.me/${p.whatsapp}" target="_blank" rel="noopener"
              class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-200 font-bold transition-colors">
               <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp
           </a>`
        : '';
    const sociais = (p.sociais || []).map(s => `
        <a href="javascript:void(0)" onclick="confirmRedirect('${s.url}')"
           class="group relative w-12 h-12 bg-white/10 ${s.hover} rounded-xl flex justify-center items-center text-white/70 hover:text-white text-xl border border-white/10 cursor-pointer transition-all">
            <i class="${s.icon}"></i>
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">${s.nome}</span>
        </a>`).join('');

    return `
        <div class="flex flex-col items-center justify-center max-w-2xl mx-auto p-8 text-center mt-6">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-2xl text-cyan-200 mb-5">
                <i class="fa-solid fa-paper-plane"></i>
            </div>
            <h2 class="font-montserrat text-4xl font-black text-white tracking-tighter mb-2">CONTATO</h2>
            <p class="text-white/55 text-sm leading-relaxed max-w-md mb-8">${p.ctaContato || ''}</p>

            <div class="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-6">
                <p class="text-[10px] uppercase tracking-[2px] text-white/40 mb-2">E-mail</p>
                <div class="flex flex-col sm:flex-row items-center gap-3 justify-center">
                    <a href="${mailto}" class="text-cyan-300 hover:text-cyan-200 transition-colors font-mono text-sm break-all">${p.email}</a>
                    <button onclick="copiarEmail()" id="copy-email-btn"
                        class="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white/80 transition-colors">
                        <i class="fa-regular fa-copy"></i> Copiar
                    </button>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 w-full mb-8">
                <a href="${mailto}" class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold hover:scale-[1.02] transition-transform">
                    <i class="fa-solid fa-envelope"></i> Enviar e-mail
                </a>
                ${whatsBtn}
            </div>

            <p class="text-[10px] uppercase tracking-[2px] text-white/40 mb-3">Redes</p>
            <div class="flex gap-4 justify-center">${sociais}</div>
        </div>`;
}

function renderServicos() {
    const cards = (window.SERVICOS || []).map(s => {
        const itens = (s.itens || []).map(i => `<li class="flex items-start gap-2 text-sm text-white/65"><i class="fa-solid fa-check text-cyan-400 mt-0.5 text-xs"></i><span>${i}</span></li>`).join('');
        return `
            <div class="bg-[#141414]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1">
                <div class="p-3 bg-white/5 rounded-lg w-fit mb-4"><i class="${s.icon} text-2xl ${s.color}"></i></div>
                <h3 class="text-xl font-montserrat font-bold text-white mb-2">${s.titulo}</h3>
                <p class="text-sm text-white/55 mb-4">${s.descricao}</p>
                <ul class="space-y-2">${itens}</ul>
            </div>`;
    }).join('');
    const email = (window.PERFIL || {}).email || '';
    const mailto = `mailto:${email}?subject=Or%C3%A7amento%20de%20projeto`;
    return `
        <div class="pt-10 px-4 pb-24">
            <div class="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 class="font-montserrat text-4xl font-black text-white mb-1 tracking-tighter">SERVIÇOS</h2>
                    <p class="text-white/50 text-xs font-inter tracking-widest uppercase">Freelance • Consultoria • Sob medida</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">${cards}</div>
            <div class="text-center">
                <a href="${mailto}" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                    <i class="fa-solid fa-paper-plane"></i> Solicitar orçamento
                </a>
            </div>
        </div>`;
}

/* ===================== REGISTRY ===================== */

const APPS = {
    certificados: { title: 'Certificados.app', render: renderCertificados, onMount: mountCertificados },
    projetos:     { title: 'Projetos.exe',     render: renderProjetos },
    curriculo:    { title: 'Curriculo.pdf',    render: renderCurriculo },
    dossie:       { title: 'Dossie.log',       render: renderDossie },
    sobre:        { title: 'Bio.txt',          render: renderSobre },
    servicos:     { title: 'Servicos.app',     render: renderServicos },
    contato:      { title: 'Contato.app',      render: renderContato }
};

/* ===================== CONTROLLER ===================== */

function loadApp(appId) {
    const app = APPS[appId];
    if (!app) { console.error('App não registrado:', appId); return; }

    const windowEl = document.getElementById('v3-app-window');
    const bodyEl = document.getElementById('v3-app-body');
    const titleEl = document.getElementById('v3-app-title');
    const heroEl = document.getElementById('v3-hero');
    if (!windowEl || !bodyEl) return;

    // Clicar no mesmo app aberto fecha (toggle)
    if (!windowEl.classList.contains('hidden') && currentOpenApp === appId) {
        closeApp();
        return;
    }
    currentOpenApp = appId;

    if (heroEl) {
        heroEl.style.opacity = '0';
        heroEl.style.transform = 'scale(0.9)';
    }

    bodyEl.innerHTML = app.render();
    titleEl.innerText = app.title;

    windowEl.classList.remove('hidden');
    windowEl.style.pointerEvents = 'auto';

    if (typeof app.onMount === 'function') {
        setTimeout(() => app.onMount(bodyEl), 50);
    }
}

function mountCertificados(bodyEl) {
    // Anima os carrosséis (a delegação de clique nos cards é registrada uma única vez no init)
    bodyEl.querySelectorAll('.marquee-container').forEach(m => createDraggableMarquee(m, -0.5));
}

function closeApp() {
    const windowEl = document.getElementById('v3-app-window');
    const heroEl = document.getElementById('v3-hero');
    if (windowEl) {
        windowEl.classList.add('hidden');
        windowEl.style.pointerEvents = 'none';
    }
    if (heroEl) {
        heroEl.style.opacity = '1';
        heroEl.style.transform = 'scale(1)';
    }
    currentOpenApp = null;
}

function goBack() { closeApp(); }

function handleBackdropClick(event) {
    if (event.target.id === 'v3-app-window') closeApp();
}

function goBackToIndex() {
    sessionStorage.removeItem('acessoPermitido');
    sessionStorage.removeItem('lastRoll');
    sessionStorage.removeItem('dashboardLocked');
    localStorage.setItem('rollCount', '0');
    window.location.href = 'index.html';
}

/* ===================== MODAL DE CERTIFICADO ===================== */

function openCertModal(titulo) {
    const cert = (window.CERTIFICADOS || []).find(c => c.titulo === titulo);
    if (!cert) return;

    const modal = document.getElementById('cert-modal');
    const content = document.getElementById('cert-modal-content');
    content.innerHTML = `
        <div class="flex justify-center mb-4">
            <div class="w-20 h-20 rounded-xl flex items-center justify-center ${cert.bg}">
                <i class="${cert.icon} text-4xl ${cert.color}"></i>
            </div>
        </div>
        <h2 class="text-2xl font-bold text-white text-center mb-4">${cert.titulo}</h2>
        <p class="text-white/70 leading-relaxed text-center">${cert.descricao}</p>`;
    modal.classList.remove('hidden');
    modal.style.pointerEvents = 'auto';
}

function closeCertModal(event) {
    if (event && event.target.id !== 'cert-modal') return;
    const modal = document.getElementById('cert-modal');
    modal.classList.add('hidden');
    modal.style.pointerEvents = 'none';
}

/* ===================== BIO (Sobre) ===================== */

function toggleBioExpand() {
    const expanded = document.getElementById('bio-expanded-content');
    const text = document.getElementById('bio-toggle-text');
    const icon = document.getElementById('bio-toggle-icon');
    if (!expanded) return;

    if (expanded.classList.contains('hidden')) {
        expanded.classList.remove('hidden');
        text.textContent = 'Ler menos';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        expanded.classList.add('hidden');
        text.textContent = 'Ler mais';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

/* ===================== REDIRECT EXTERNO ===================== */

function confirmRedirect(url) {
    if (confirm('Deseja realmente visitar este link?')) {
        window.open(url, '_blank', 'noopener');
    }
}

function copiarEmail() {
    const email = (window.PERFIL || {}).email;
    const btn = document.getElementById('copy-email-btn');
    if (!email) return;
    const feedback = () => {
        if (!btn) return;
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
        setTimeout(() => { btn.innerHTML = original; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(feedback).catch(feedback);
    } else {
        // Fallback para contextos sem Clipboard API
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        feedback();
    }
}

/* ===================== HERO + SOCIAIS (data-driven) ===================== */

function renderHeroSociais() {
    const wrap = document.getElementById('hero-sociais');
    if (!wrap || !window.PERFIL) return;
    wrap.innerHTML = window.PERFIL.sociais.map(s => `
        <a href="javascript:void(0)" onclick="confirmRedirect('${s.url}')"
           class="group relative w-10 h-10 bg-white/10 ${s.hover} rounded-lg flex justify-center items-center text-white/70 hover:text-white text-lg border border-white/10 cursor-pointer transition-all">
            <i class="${s.icon}"></i>
            <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">${s.nome}</span>
        </a>`).join('');
}

/* ===================== INIT ===================== */

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const certModal = document.getElementById('cert-modal');
    if (certModal && !certModal.classList.contains('hidden')) {
        // Fecha primeiro o modal de certificado, mantendo o app aberto
        closeCertModal({ target: { id: 'cert-modal' } });
    } else if (currentOpenApp) {
        closeApp();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderHeroSociais();
    // Delegação única de clique nos cards de certificado (desktop + mobile)
    const body = document.getElementById('v3-app-body');
    if (body) {
        body.addEventListener('click', e => {
            const card = e.target.closest('[data-cert]');
            if (card) openCertModal(card.getAttribute('data-cert'));
        });
    }
});
