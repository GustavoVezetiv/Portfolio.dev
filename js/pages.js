/* ARQUIVO: js/pages.js
 * Monta as páginas "espelho" estáticas/indexáveis (projetos, servicos, sobre, contato).
 * Reaproveita os render*() de apps.js → mesma fonte de dados, zero duplicação de conteúdo.
 *
 * Cada página espelho define <body data-page="projetos"> e contém:
 *   <div id="mirror-nav"></div> <main id="mirror"></main> <div id="mirror-footer"></div>
 */

const MIRROR_PAGES = [
    { id: 'projetos', label: 'Projetos', href: 'projetos.html', h1: 'Projetos' },
    { id: 'servicos', label: 'Serviços', href: 'servicos.html', h1: 'Serviços' },
    { id: 'sobre',    label: 'Sobre',    href: 'sobre.html',    h1: 'Sobre mim' },
    { id: 'contato',  label: 'Contato',  href: 'contato.html',  h1: 'Contato' }
];

const MIRROR_RENDERERS = {
    projetos: typeof renderProjetos === 'function' ? renderProjetos : null,
    servicos: typeof renderServicos === 'function' ? renderServicos : null,
    sobre:    typeof renderSobre === 'function' ? renderSobre : null,
    contato:  typeof renderContato === 'function' ? renderContato : null
};

function renderMirrorNav(current) {
    const nav = document.getElementById('mirror-nav');
    if (!nav) return;
    const links = MIRROR_PAGES.map(p =>
        `<a href="${p.href}" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${p.id === current ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}">${p.label}</a>`
    ).join('');
    const p = window.PERFIL || {};
    nav.className = 'relative z-20 sticky top-0 backdrop-blur-md bg-black/30 border-b border-white/10';
    nav.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <a href="index.html" class="font-montserrat font-black text-white tracking-tight">${p.nome || 'Gustavo Vezetiv'}</a>
            <nav class="flex items-center gap-1 flex-wrap">${links}</nav>
            <a href="index.html" class="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform">▶ Entrar na experiência</a>
        </div>`;
}

function renderMirrorFooter() {
    const footer = document.getElementById('mirror-footer');
    if (!footer) return;
    const p = window.PERFIL || {};
    const sociais = (p.sociais || []).map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener" class="text-white/50 hover:text-white transition-colors" aria-label="${s.nome}"><i class="${s.icon}"></i></a>`
    ).join('');
    footer.className = 'relative z-10 border-t border-white/10 mt-16';
    footer.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p class="text-white/40">© Gustavo Vezetiv · ${p.local || ''}</p>
            <div class="flex items-center gap-4 text-lg">${sociais}</div>
            <a href="mailto:${p.email}" class="text-cyan-300 hover:text-cyan-200 transition-colors">${p.email || ''}</a>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const section = document.body.getAttribute('data-page');
    const main = document.getElementById('mirror');
    const meta = MIRROR_PAGES.find(p => p.id === section);

    renderMirrorNav(section);
    if (main && meta && MIRROR_RENDERERS[section]) {
        main.innerHTML = `<h1 class="sr-only">${(window.PERFIL || {}).nome || 'Gustavo Vezetiv'} — ${meta.h1}</h1>` + MIRROR_RENDERERS[section]();
    }
    renderMirrorFooter();
});
