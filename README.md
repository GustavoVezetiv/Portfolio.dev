# 🎲 Portfólio Gamificado (RPG Edition)

![Project Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

> "A interface gráfica falhou... Role um D20 para tentar recuperar o sistema."

Portfólio pessoal interativo de **Gustavo Vezetiv**, construído com **HTML, CSS e JavaScript Vanilla** (sem frameworks). A navegação é uma experiência de RPG: a sorte (simulada por um D20) define qual versão da interface o visitante encontra.

---

## ✨ Conceito

1. **Safe Mode** — tela inicial propositalmente "antiga" (estilo anos 90) com os dados em texto puro (também serve de fallback para SEO e quem está sem JS).
2. **Chaos Mode** — em rolagens baixas, o site entra em colapso visual (glitch/cyberpunk) e convida a rolar de novo.
3. **Perfect Form** — em rolagens altas (≥15), carrega o `dashboard.html`: uma interface "OS-like" com dock e janelas modais (apps).

---

## 🧱 Arquitetura

Sem build, sem framework. JavaScript clássico com **separação entre dados, UI e controle**, e **fonte única de verdade** em `js/data/`.

```text
/
├── index.html            # Entrada: D20, Safe Mode e Chaos Mode
├── dashboard.html        # Perfect Form: shell OS-like (hero + dock + janela modal)
├── projetos.html         # Páginas "espelho" indexáveis (SEO + acesso direto),
├── servicos.html         #   reaproveitam os render*() de js/apps.js
├── sobre.html            #   (mesma fonte de dados, zero duplicação)
├── contato.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css         # Identidade visual, animações, background morphing
└── js/
    ├── script.js         # Lógica do D20 / Chaos (index)
    ├── ui.js             # Utilitários compartilhados (confetti, carrossel)
    ├── apps.js           # Registry de apps + render*() do dashboard
    ├── pages.js          # Monta as páginas espelho a partir dos render*()
    └── data/             # FONTE ÚNICA DE VERDADE
        ├── perfil.js
        ├── projetos.js
        ├── certificados.js
        ├── servicos.js
        └── dossie.js
```

### Como os apps funcionam
Cada app é uma entrada no registry `APPS` em `js/apps.js`:
```js
APPS = { projetos: { title, render }, ... }
```
`loadApp(id)` chama `render()` (que monta o HTML a partir de `js/data/*`) e injeta na janela modal. Para **adicionar um app**: crie o `render`, registre em `APPS` e adicione um item na dock do `dashboard.html`.

### Como editar o conteúdo
Edite apenas os arquivos em **`js/data/`** — os apps e as páginas espelho se atualizam sozinhos.
- Projetos: preencha `repo`/`demo` em `projetos.js` (botões aparecem automaticamente).
- WhatsApp: preencha `whatsapp` em `perfil.js` (botão some se vazio).

---

## 🛠 Tech Stack

* **Core:** HTML5, CSS3, JavaScript (ES) — sem framework, sem build.
* **Estilização:** TailwindCSS (via CDN) + `css/style.css`.
* **Ícones:** FontAwesome 6 · **Fontes:** Google Fonts (Montserrat, Inter, Fira Code, Press Start 2P).

---

## ▶ Rodando localmente

Por usar `fetch`/scripts relativos, sirva via HTTP (não abra com `file://`):

```bash
python -m http.server 4599
# acesse http://localhost:4599
```

> SEO: as URLs canônicas/sitemap usam `https://vezetiv.dev`. Ajuste se o domínio mudar.
