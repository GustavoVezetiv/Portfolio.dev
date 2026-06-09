/* ARQUIVO: js/data/projetos.js
 * Fonte ÚNICA de verdade dos projetos.
 *
 * Para adicionar um projeto, copie um objeto e preencha:
 *   titulo, descricao, icon, iconColor, accent (cor da borda no hover)
 *   status: { label, color, pulse }
 *   stack : [{ icon, title }]
 *   repo  : URL do repositório (string vazia esconde o botão)
 *   demo  : URL do deploy/APK (string vazia esconde o botão)
 */

window.PROJETOS = [
    {
        titulo: 'Real Estate Manager',
        descricao: 'Sistema completo de gestão de imóveis, contratos e agendamentos.',
        icon: 'fa-solid fa-city', iconColor: 'text-blue-500', accent: 'hover:border-blue-500/50',
        status: { label: 'Dev', color: 'bg-emerald-500', pulse: true },
        stack: [
            { icon: 'fa-brands fa-python', title: 'Python' },
            { icon: 'fa-solid fa-database', title: 'PostgreSQL' },
            { icon: 'fa-brands fa-docker', title: 'Docker' }
        ],
        repo: '', demo: ''
    },
    {
        titulo: 'Links App Mobile',
        descricao: 'App para gestão de links e QR Codes com categorização inteligente.',
        icon: 'fa-solid fa-mobile-alt', iconColor: 'text-cyan-500', accent: 'hover:border-cyan-500/50',
        status: { label: 'APK', color: 'bg-green-500', pulse: true },
        stack: [
            { icon: 'fa-brands fa-react', title: 'React Native' },
            { icon: 'fa-brands fa-js', title: 'TypeScript' }
        ],
        repo: '', demo: ''
    },
    {
        titulo: 'Automated AI Poster',
        descricao: 'Bot que analisa trends e cria posts no LinkedIn usando N8N e IA.',
        icon: 'fa-solid fa-robot', iconColor: 'text-pink-500', accent: 'hover:border-pink-500/50',
        status: { label: 'Online', color: 'bg-emerald-500', pulse: true },
        stack: [
            { icon: 'fa-solid fa-project-diagram', title: 'N8N' },
            { icon: 'fa-brands fa-docker', title: 'Docker' },
            { icon: 'fa-brands fa-python', title: 'Python' }
        ],
        repo: '', demo: ''
    },
    {
        titulo: 'Library Manager',
        descricao: 'Sistema clássico de gestão de acervo e empréstimos.',
        icon: 'fa-solid fa-book', iconColor: 'text-purple-500', accent: 'hover:border-purple-500/50',
        status: { label: 'Archived', color: 'bg-gray-500', pulse: false },
        stack: [
            { icon: 'fa-brands fa-php', title: 'PHP' },
            { icon: 'fa-solid fa-database', title: 'MySQL' }
        ],
        repo: '', demo: ''
    },
    {
        titulo: 'Driving School System',
        descricao: 'Sistema com controle de permissões (RBAC) para Instrutores, Alunos e Gerentes.',
        icon: 'fa-solid fa-car', iconColor: 'text-green-500', accent: 'hover:border-green-500/50',
        status: { label: 'Refactor', color: 'bg-yellow-500', pulse: true },
        stack: [
            { icon: 'fa-brands fa-python', title: 'Django' },
            { icon: 'fa-solid fa-users-gear', title: 'Gestão de Usuários' },
            { icon: 'fa-solid fa-database', title: 'SQL' }
        ],
        repo: '', demo: ''
    },
    {
        titulo: 'ML Data Classifier',
        descricao: 'Modelo supervisionado com Scikit-learn para classificação e análise preditiva de notas falsas.',
        icon: 'fa-solid fa-brain', iconColor: 'text-purple-500', accent: 'hover:border-purple-500/50',
        status: { label: 'Study', color: 'bg-gray-500', pulse: false },
        stack: [
            { icon: 'fa-brands fa-python', title: 'Python' },
            { icon: 'fa-solid fa-chart-line', title: 'Scikit-Learn' },
            { icon: 'fa-solid fa-microchip', title: 'IA' }
        ],
        repo: '', demo: ''
    }
];
