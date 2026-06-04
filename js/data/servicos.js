/* ARQUIVO: js/data/servicos.js
 * Serviços oferecidos (freelance / consultoria). Editável.
 * Para adicionar, copie um objeto: { titulo, descricao, icon, color, itens: [] }
 */

window.SERVICOS = [
    {
        titulo: 'Desenvolvimento Full Stack',
        descricao: 'Sistemas web sob medida, do banco de dados à interface.',
        icon: 'fa-solid fa-code', color: 'text-orange-400',
        itens: ['APIs REST com Django', 'Front-end React / React Native', 'PostgreSQL & modelagem de dados', 'Deploy com Docker']
    },
    {
        titulo: 'Automação & IA',
        descricao: 'Fluxos automatizados que economizam horas de trabalho manual.',
        icon: 'fa-solid fa-robot', color: 'text-pink-400',
        itens: ['Workflows com N8N', 'Integrações entre sistemas', 'Bots e geração de conteúdo com IA', 'Scripts Python sob demanda']
    },
    {
        titulo: 'Dados & BI',
        descricao: 'Transformo dados brutos em decisões claras.',
        icon: 'fa-solid fa-chart-column', color: 'text-yellow-400',
        itens: ['Dashboards em Power BI', 'ETL e modelagem', 'Análise exploratória', 'Relatórios automatizados']
    }
];
