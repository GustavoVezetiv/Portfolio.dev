# 🖥️ Portfólio Gustavo Vezetiv — Interface "OS-Like"

![Project Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

> Portfólio pessoal interativo inspirado em sistemas operacionais modernos (macOS/Linux): uma **dock** com apps que abrem em **janelas modais** sobre um fundo glassmorphism com mesh-gradient animado.

🔗 **Online:** [vezetiv.is-a.dev](https://vezetiv.is-a.dev)

---

## ✨ Conceito

A navegação não usa rolagem tradicional. O usuário interage com uma **dock** estilo OS; cada ícone abre um **app** (janela modal flutuante) com um tipo de conteúdo:

| App | Conteúdo |
|-----|----------|
| 🏅 Certificados | Carrosséis arrastáveis de certificações por categoria (Dev, Segurança, Office) |
| 💻 Projetos | Cards dos projetos desenvolvidos |
| 📄 Currículo | Prévia e download do CV em PDF |
| 📜 Dossiê | Recomendações e relatos profissionais |
| 👤 Sobre Mim | Biografia, skills e hobbies |

As redes sociais ficam no hero central, abaixo do nome.

---

## 🛠 Tech Stack

* **Core:** HTML5 + CSS3 + JavaScript (Vanilla, sem framework)
* **Estilização:** TailwindCSS (via CDN) + CSS customizado (`css/style.css`)
* **Ícones:** Font Awesome 6
* **Fontes:** Google Fonts (Montserrat, Inter, Fira Code, Press Start 2P, Alfa Slab One)
* **Deploy:** GitHub Pages + domínio `is-a.dev` (`CNAME`)

---

## 📂 Estrutura do projeto

```text
/
├── index.html        # Aplicação principal: hero, dock, janela modal,
│                     #   templates dos apps, banco de certificações e JS inline
├── css/
│   └── style.css     # Animações, dock, mesh-gradient, modais
├── js/
│   └── script.js     # (placeholder — JS atual está inline no index.html)
├── img/              # Favicons, logos e imagem Open Graph (og-image.png)
├── arc/              # Currículos em PDF + backup legado do dashboard
├── robots.txt        # Diretrizes de indexação
├── sitemap.xml       # Mapa do site
└── CNAME             # Domínio personalizado
```

> **Nota de manutenção:** atualmente o HTML, o CSS inline, o JavaScript e os dados
> (certificações/projetos) vivem todos dentro de `index.html`. Uma futura refatoração
> prevista move os dados para `data/*.js` e o JS para módulos em `js/` (ES Modules),
> eliminando a duplicação atual dos certificados (HTML + objeto JS).

---

## 🚀 Rodando localmente

Por usar `fetch`/PDF e caminhos relativos, sirva via servidor estático:

```bash
# Python
python -m http.server 8000
# ou Node
npx serve .
```

Acesse `http://localhost:8000`.

---

## 📈 SEO

A página inclui `title`/`description` descritivos, Open Graph + Twitter Card
(`img/og-image.png`), `canonical`, dados estruturados JSON-LD (`Person`),
`robots.txt` e `sitemap.xml`.

---

## 📬 Contato

- **E-mail:** gustavovezetiv8@gmail.com
- **LinkedIn:** [/in/gustavovezetiv](https://linkedin.com/in/gustavovezetiv)
- **GitHub:** [@gustavovezetiv](https://github.com/gustavovezetiv)
