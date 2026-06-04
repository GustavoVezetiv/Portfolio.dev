/* ARQUIVO: js/data/perfil.js
 * Fonte ÚNICA de verdade do perfil: identidade, bio, skills, contato e redes.
 * Usado pelos apps "Sobre", "Contato", "Currículo" e pelo hero do dashboard.
 */

window.PERFIL = {
    nome: 'Gustavo Vezetiv',
    titulo: 'Full Stack Developer',
    nivel: 'Lv. 21',
    local: 'Cuiabá-MT',
    email: 'gustavovezetiv8@gmail.com',
    // WhatsApp opcional: apenas dígitos com DDI/DDD (ex.: '5566999999999'). Vazio = botão escondido.
    whatsapp: '',
    // Texto curto do CTA comercial exibido no app Contato.
    ctaContato: 'Disponível para oportunidades (CLT) e projetos freelance. Vamos conversar?',
    curriculoPdf: 'arc/Curriculo_Gustavo_Vezetiv_Python_Dados_Integracoes.pdf',

    bioResumo: 'Sou estudante de TADS no IFMT (6º período), com um pé e um dedo em cada parte da tecnologia. Aventureiro, animado, desbravador da natureza e sempre procurando entender como as coisas funcionam.',

    bioCompleta: [
        'Ao longo das minhas experiências, aprendi a ter paciência, lidar com pessoas diferentes e perceber o quanto os detalhes fazem diferença. Trabalho bastante com Suporte, Documentação, Python, Docker, automações, Power BI e outras ferramentas que deixam tudo mais organizado e claro no dia a dia.',
        'Gosto de ajudar, colaborar e ouvir músicas no meio disso tudo. Valorizo ambientes onde existe respeito, espaço para crescer e incentivo à criatividade.',
        'A vida é uma eterna evolução, uma troca onde cada um contribui com o que sabe e faz de melhor naquele momento. Procuro hoje ser a minha melhor versão, e espero que possa contribuir para você ser a sua!'
    ],

    skills: 'React, Python, Django, SQL, Docker, Git, HTML, CSS, JS e Figma',
    hobbies: 'D&D, Smart Home, Games, Musica, Animações, QA, Trilhas e Exploração',

    // Redes sociais (ordem = ordem de exibição)
    sociais: [
        { nome: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com/in/gustavovezetiv', hover: 'hover:bg-blue-600/30' },
        { nome: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com/gustavovezetiv', hover: 'hover:bg-pink-600/30' },
        { nome: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/gustavovezetiv', hover: 'hover:bg-gray-700/30' }
    ]
};
