/* ARQUIVO: js/data/certificados.js
 * Fonte ÚNICA de verdade dos certificados/skills.
 * Cada item alimenta tanto o card do carrossel quanto o modal de detalhes.
 *
 * Para adicionar um certificado, copie um objeto e preencha:
 *   { titulo, grupo, icon, color, bg, tag, descricao }
 *   - grupo: deve bater com um CERT_GRUPOS.id abaixo
 *   - icon : classes FontAwesome completas (ex.: 'fa-solid fa-broom' ou 'fa-brands fa-react')
 *   - color: classe de cor do ícone (ex.: 'text-white', 'text-cyan-300')
 *   - bg   : gradiente Tailwind (ex.: 'bg-gradient-to-br from-slate-700 to-slate-900')
 *   - tag  : legenda curta exibida no card
 */

window.CERT_GRUPOS = [
    { id: 'dev', label: 'Dev & Arquitetura', border: 'border-blue-500' },
    { id: 'seguranca', label: 'Segurança & Infra', border: 'border-red-500' },
    { id: 'office', label: 'Produtividade & Office', border: 'border-green-500' }
];

window.CERTIFICADOS = [
    // ---------- Dev & Arquitetura ----------
    { titulo: 'Clean Code & SOLID', grupo: 'dev', icon: 'fa-solid fa-broom', color: 'text-white', bg: 'bg-gradient-to-br from-slate-700 to-slate-900', tag: 'Boas Práticas',
      descricao: 'Domínio de princípios de código limpo e arquitetura SOLID. Essencial para criar código manutenível, escalável e seguindo as melhores práticas de engenharia de software.' },
    { titulo: 'Estruturas de Dados', grupo: 'dev', icon: 'fa-solid fa-sitemap', color: 'text-white', bg: 'bg-gradient-to-br from-indigo-700 to-purple-800', tag: 'Fundamentos',
      descricao: 'Conhecimento profundo sobre estruturas de dados como arrays, listas, árvores, grafos e hash tables. Fundamental para otimizar algoritmos e melhorar performance.' },
    { titulo: 'React / React Native', grupo: 'dev', icon: 'fa-brands fa-react', color: 'text-cyan-300', bg: 'bg-gradient-to-br from-cyan-600 to-blue-700', tag: 'Web & Mobile',
      descricao: 'Desenvolvimento de aplicações web com React e mobile com React Native. Criação de componentes reutilizáveis, gerenciamento de estado e hooks.' },
    { titulo: 'Docker Avançado', grupo: 'dev', icon: 'fa-brands fa-docker', color: 'text-sky-300', bg: 'bg-gradient-to-br from-sky-600 to-blue-800', tag: 'Contêineres',
      descricao: 'Containerização de aplicações, orquestração com Docker Compose, otimização de imagens e implementação de boas práticas em ambientes de produção.' },
    { titulo: 'Arquitetura de Software', grupo: 'dev', icon: 'fa-solid fa-diagram-project', color: 'text-indigo-300', bg: 'bg-gradient-to-br from-indigo-600 to-violet-800', tag: 'MVC, REST',
      descricao: 'Design de arquiteturas escaláveis. Domínio de padrões como MVC, REST, microserviços e orientação a domínio (DDD).' },
    { titulo: 'Testes com Pytest', grupo: 'dev', icon: 'fa-solid fa-vial-circle-check', color: 'text-emerald-300', bg: 'bg-gradient-to-br from-teal-600 to-emerald-900', tag: 'Unitário & TDD',
      descricao: 'Testes unitários e de integração com Pytest. Implementação de Test-Driven Development (TDD) e cobertura de código para garantir qualidade.' },
    { titulo: 'Python P/ Dados', grupo: 'dev', icon: 'fa-brands fa-python', color: 'text-yellow-300', bg: 'bg-gradient-to-br from-blue-600 to-indigo-800', tag: 'Data Science Academy',
      descricao: 'Python para análise de dados com bibliotecas como Pandas, NumPy e Matplotlib. Manipulação e visualização de dados para insights.' },
    { titulo: 'Web com Django', grupo: 'dev', icon: 'fa-solid fa-server', color: 'text-green-300', bg: 'bg-gradient-to-br from-green-600 to-emerald-900', tag: 'Udemy / Prático',
      descricao: 'Desenvolvimento web com Django. ORM, autenticação, APIs, middleware e boas práticas de desenvolvimento web em Python.' },
    { titulo: 'APIs RESTful', grupo: 'dev', icon: 'fa-solid fa-cloud', color: 'text-sky-300', bg: 'bg-gradient-to-br from-gray-700 to-gray-900', tag: 'Django Framework',
      descricao: 'Design e implementação de APIs RESTful com Django. HTTP methods, status codes, autenticação e documentação com Swagger/OpenAPI.' },
    { titulo: 'SQL & PostgreSQL', grupo: 'dev', icon: 'fa-solid fa-database', color: 'text-purple-300', bg: 'bg-gradient-to-br from-purple-700 to-indigo-800', tag: 'Consultas Avançadas',
      descricao: 'Consultas SQL avançadas, otimização de índices e performance. PostgreSQL com triggers, stored procedures e advanced features.' },
    { titulo: 'Machine Learning', grupo: 'dev', icon: 'fa-solid fa-brain', color: 'text-fuchsia-300', bg: 'bg-gradient-to-br from-fuchsia-700 to-pink-800', tag: 'Modelos & Métricas',
      descricao: 'Desenvolvimento de modelos de machine learning com Scikit-learn. Classificação, regressão, clustering e validação de modelos.' },
    { titulo: 'Prompt Engineering', grupo: 'dev', icon: 'fa-solid fa-wand-magic-sparkles', color: 'text-pink-300', bg: 'bg-gradient-to-br from-pink-600 to-rose-800', tag: 'IA Generativa',
      descricao: 'Técnicas avançadas para otimizar prompts com IA generativa. Maximizar resultados com ChatGPT, Claude e outros modelos de IA.' },
    { titulo: 'Power BI Avançado', grupo: 'dev', icon: 'fa-solid fa-chart-column', color: 'text-yellow-300', bg: 'bg-gradient-to-br from-yellow-600 to-amber-800', tag: 'DAX & ETL',
      descricao: 'Dashboard avançado com Power BI. DAX, modelagem de dados, relações complexas e otimização de performance em relatórios.' },
    { titulo: 'BigQuery (Google)', grupo: 'dev', icon: 'fa-brands fa-google', color: 'text-red-300', bg: 'bg-gradient-to-br from-red-600 to-rose-800', tag: 'Cloud Analytics',
      descricao: 'Data warehouse em cloud com Google BigQuery. Processamento em larga escala, SQL otimizado e análise de big data.' },
    { titulo: 'Data Warehouse', grupo: 'dev', icon: 'fa-solid fa-cubes', color: 'text-orange-300', bg: 'bg-gradient-to-br from-orange-600 to-amber-800', tag: 'Modelagem ETL',
      descricao: 'Modelagem e implementação de data warehouses. Star schema, fact tables, dimension tables e processos ETL.' },
    { titulo: 'Power BI P/ Análise', grupo: 'dev', icon: 'fa-solid fa-chart-line', color: 'text-lime-300', bg: 'bg-gradient-to-br from-lime-600 to-green-800', tag: 'Fundação Bradesco',
      descricao: 'Análise de dados com Power BI. Visualizações interativas, insights de negócio e tomada de decisão baseada em dados.' },
    { titulo: 'Modelagem de Dados', grupo: 'dev', icon: 'fa-solid fa-diagram-project', color: 'text-teal-300', bg: 'bg-gradient-to-br from-teal-600 to-emerald-800', tag: 'Fundação Bradesco',
      descricao: 'Design de banco de dados relacional. Normalização, relacionamentos, integridade referencial e otimização de esquema.' },
    { titulo: 'Imersão em IA', grupo: 'dev', icon: 'fa-solid fa-brain', color: 'text-violet-300', bg: 'bg-gradient-to-br from-violet-600 to-purple-800', tag: 'Alura / Ebac',
      descricao: 'Imersão completa em Inteligência Artificial. Fundamentos, aplicações práticas e tendências em IA generativa.' },
    { titulo: 'IA & Cultura Digital', grupo: 'dev', icon: 'fa-solid fa-microchip', color: 'text-cyan-300', bg: 'bg-gradient-to-br from-cyan-600 to-teal-800', tag: 'Fundação Bradesco',
      descricao: 'Impacto da IA na transformação digital. Mudanças culturais, gestão de mudanças e adoção de tecnologias emergentes.' },

    // ---------- Segurança & Infra ----------
    { titulo: 'Cibersegurança', grupo: 'seguranca', icon: 'fa-solid fa-shield-halved', color: 'text-red-300', bg: 'bg-gradient-to-br from-red-700 to-rose-900', tag: 'Ataques & Prevenção',
      descricao: 'Princípios de segurança da informação. Prevenção de ataques, criptografia, autenticação e gestão de vulnerabilidades.' },
    { titulo: 'Fundamentos de Redes', grupo: 'seguranca', icon: 'fa-solid fa-network-wired', color: 'text-amber-300', bg: 'bg-gradient-to-br from-amber-600 to-yellow-800', tag: 'TCP/IP, VLANs',
      descricao: 'TCP/IP, OSI model, VLANs e roteamento. Configuração de redes e troubleshooting de conectividade.' },
    { titulo: 'Firewalls & VPN', grupo: 'seguranca', icon: 'fa-solid fa-shield', color: 'text-emerald-300', bg: 'bg-gradient-to-br from-emerald-600 to-green-800', tag: 'PfSense, Mikrotik',
      descricao: 'Configuração de firewalls com PfSense e Mikrotik. VPN, regras de firewall e políticas de segurança de rede.' },
    { titulo: 'LGPD', grupo: 'seguranca', icon: 'fa-solid fa-scale-balanced', color: 'text-yellow-300', bg: 'bg-gradient-to-br from-yellow-600 to-amber-800', tag: 'Conformidade',
      descricao: 'Lei Geral de Proteção de Dados Pessoais. Conformidade, privacidade de dados e responsabilidades legais.' },
    { titulo: 'Hardening Linux', grupo: 'seguranca', icon: 'fa-brands fa-linux', color: 'text-gray-300', bg: 'bg-gradient-to-br from-gray-600 to-slate-800', tag: 'Segurança OS',
      descricao: 'Segurança avançada em Linux. Permissões, firewall, SELinux, hardening e mitigação de vulnerabilidades.' },
    { titulo: 'Cloud Fundamentals', grupo: 'seguranca', icon: 'fa-solid fa-cloud-arrow-up', color: 'text-blue-300', bg: 'bg-gradient-to-br from-blue-600 to-sky-800', tag: 'Azure / AWS',
      descricao: 'Fundamentos de cloud computing. AWS, Azure e Google Cloud. IaaS, PaaS, SaaS e arquitetura em nuvem.' },
    { titulo: 'Segurança TI', grupo: 'seguranca', icon: 'fa-solid fa-lock', color: 'text-orange-300', bg: 'bg-gradient-to-br from-orange-600 to-amber-800', tag: 'Fundação Bradesco',
      descricao: 'Segurança em Tecnologia da Informação. Gestão de riscos, compliance e boas práticas de segurança corporativa.' },
    { titulo: 'Segurança Dados', grupo: 'seguranca', icon: 'fa-solid fa-user-shield', color: 'text-pink-300', bg: 'bg-gradient-to-br from-pink-600 to-rose-800', tag: 'Fundação Bradesco',
      descricao: 'Proteção de dados pessoais e sensíveis. Criptografia, backup, disaster recovery e conformidade com regulações.' },
    { titulo: 'Automação IA', grupo: 'seguranca', icon: 'fa-solid fa-robot', color: 'text-teal-300', bg: 'bg-gradient-to-br from-teal-600 to-emerald-800', tag: 'Docker + N8N',
      descricao: 'Automação com IA usando Docker e N8N. Workflows automatizados e integração de serviços para otimizar processos.' },
    { titulo: 'Dynamics 365', grupo: 'seguranca', icon: 'fa-brands fa-microsoft', color: 'text-blue-300', bg: 'bg-gradient-to-br from-blue-600 to-indigo-800', tag: 'Microsoft / DSA',
      descricao: 'Microsoft Dynamics 365. CRM, ERP e automação de processos de negócio com a plataforma Microsoft.' },

    // ---------- Produtividade & Office ----------
    { titulo: 'Excel Avançado', grupo: 'office', icon: 'fa-solid fa-file-excel', color: 'text-green-300', bg: 'bg-gradient-to-br from-green-600 to-emerald-800', tag: 'Fórmulas & Dashboards',
      descricao: 'Fórmulas avançadas, tabelas dinâmicas e dashboards. Análise de dados e automatização com Excel.' },
    { titulo: 'PowerPoint Pro', grupo: 'office', icon: 'fa-solid fa-person-chalkboard', color: 'text-red-300', bg: 'bg-gradient-to-br from-red-600 to-rose-800', tag: 'Storytelling & Design',
      descricao: 'Apresentações impactantes com PowerPoint. Storytelling visual e design profissional para comunicação eficaz.' },
    { titulo: 'Gestão de Projetos', grupo: 'office', icon: 'fa-solid fa-diagram-project', color: 'text-purple-300', bg: 'bg-gradient-to-br from-purple-600 to-violet-800', tag: 'PMBOK / Cronogramas',
      descricao: 'PMBOK e metodologias de gestão de projetos. Planejamento, execução, monitoramento e encerramento de projetos.' },
    { titulo: 'Scrum SFC™', grupo: 'office', icon: 'fa-solid fa-sitemap', color: 'text-rose-300', bg: 'bg-gradient-to-br from-rose-600 to-red-800', tag: 'Metodologia Ágil',
      descricao: 'Certificação Scrum Foundation Certified. Metodologia ágil, sprints, planning, retrospectivas e gestão eficiente de projetos.' },
    { titulo: 'Liderança', grupo: 'office', icon: 'fa-solid fa-user-tie', color: 'text-amber-300', bg: 'bg-gradient-to-br from-amber-600 to-yellow-800', tag: 'Gestão de Equipes',
      descricao: 'Desenvolvimento de competências de liderança. Gestão de equipes, comunicação e influência positiva.' },
    { titulo: 'Gestão de Tempo', grupo: 'office', icon: 'fa-solid fa-stopwatch', color: 'text-emerald-300', bg: 'bg-gradient-to-br from-emerald-600 to-green-800', tag: 'Produtividade / GTD',
      descricao: 'Produtividade e Getting Things Done (GTD). Técnicas de gestão de tempo para máxima eficiência.' },
    { titulo: 'Comunicação Profissional', grupo: 'office', icon: 'fa-solid fa-comments', color: 'text-cyan-300', bg: 'bg-gradient-to-br from-cyan-600 to-blue-800', tag: 'Clareza & Objetividade',
      descricao: 'Comunicação clara e objetiva. Escrita profissional, apresentações e comunicação interpessoal efetiva.' },
    { titulo: 'Excel Intermediário', grupo: 'office', icon: 'fa-solid fa-file-excel', color: 'text-green-300', bg: 'bg-gradient-to-br from-green-600 to-emerald-800', tag: 'Fundação Bradesco',
      descricao: 'Domínio intermediário de Excel. Funções avançadas, análise de dados e visualizações básicas.' },
    { titulo: 'Word Intermediário', grupo: 'office', icon: 'fa-solid fa-file-word', color: 'text-blue-300', bg: 'bg-gradient-to-br from-blue-600 to-indigo-800', tag: 'Fundação Bradesco',
      descricao: 'Edição profissional de documentos com Word. Formatação avançada, templates e criação de documentos estruturados.' },
    { titulo: 'Cultura Digital', grupo: 'office', icon: 'fa-solid fa-lightbulb', color: 'text-yellow-300', bg: 'bg-gradient-to-br from-yellow-600 to-amber-800', tag: 'Fundação Bradesco',
      descricao: 'Transformação digital e cultura organizacional. Adoção de novas tecnologias e mentalidade inovadora.' },
    { titulo: 'Conceitos Aviação', grupo: 'office', icon: 'fa-solid fa-plane', color: 'text-indigo-300', bg: 'bg-gradient-to-br from-indigo-600 to-violet-800', tag: 'SEST',
      descricao: 'Fundamentos da aviação civil. Conhecimento técnico de aeronaves, procedimentos e regulamentações aéreas.' }
];
