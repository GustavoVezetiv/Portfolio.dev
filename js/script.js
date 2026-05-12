/* ARQUIVO: script.js */

// --- ESTADO DO JOGO --- //
let rollCount = parseInt(localStorage.getItem('rollCount')) || 0; 
let isRolling = false;
let currentOpenApp = null;

// Elementos (podem ser null dependendo da página)
const d20Icon = document.getElementById('d20-icon');
const d20Result = document.getElementById('d20-result');
const diceContainer = document.getElementById('destiny-dice-container');
const uglyOverlay = document.getElementById('ugly-overlay');
const critOverlay = document.getElementById('crit-overlay');
const chaosPage = document.getElementById('page-chaos');
const appRoot = document.getElementById('app-root');

// --- LÓGICA DO DADO (Só roda na index.html) --- //

function rollDestiny() {
    if (isRolling) return;
    isRolling = true;
    
    d20Result.style.opacity = '0';
    d20Icon.style.opacity = '1';
    d20Icon.classList.add('rolling');
    
    setTimeout(() => {
        d20Icon.classList.remove('rolling');
        d20Icon.style.transform = 'rotate(0deg) scale(1)';
        let roll;
        
        // Lógica: sempre aleatório
        roll = Math.floor(Math.random() * 20) + 1;
        
        rollCount++;
        localStorage.setItem('rollCount', rollCount.toString());
        d20Icon.style.opacity = '0.2';
        d20Result.innerText = roll;
        d20Result.style.opacity = '1';

        setTimeout(() => {
            // Verifica se roll >= 15 para sucesso
            if (roll >= 15) {
                triggerCriticalSuccess(roll);
            } else {
                triggerChaosMode(roll);
            }
            isRolling = false;
        }, 800);
    }, 1000);
}

function triggerCriticalSuccess(roll) {
    // 1. Mostra animação de sucesso
    uglyOverlay.style.opacity = "0";
    setTimeout(() => uglyOverlay.style.display = "none", 500);
    
    critOverlay.classList.remove('hidden');
    critOverlay.style.opacity = '1';
    initConfetti(); // Chama a chuva de confetes

    diceContainer.style.opacity = '0';

    // 2. SALVA O TOKEN DE ACESSO E O RESULTADO DO ROLL
    sessionStorage.setItem('acessoPermitido', 'true');
    sessionStorage.setItem('lastRoll', roll.toString());

    // 3. REDIRECIONA PARA O DASHBOARD (Após 2.5s) - Interface Perfeita!
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2500);
}

function triggerChaosMode(roll) {
    uglyOverlay.style.opacity = "0";
    setTimeout(() => uglyOverlay.style.display = "none", 1500);
    
    // Salva o roll para validação posterior
    sessionStorage.setItem('lastRoll', roll.toString());
    
    // Mantém o dado visível, apenas deixa transparente
    diceContainer.style.opacity = '1';
    diceContainer.style.display = 'block';

    appRoot.classList.remove('hidden');
    document.getElementById('page-chaos').classList.remove('hidden-page');
    document.getElementById('nav-pill').classList.remove('hidden');
    document.getElementById('version-label').innerText = `Chaos (Roll: ${roll})`;
    
    generateChaosContent(roll);
}

function resetDice() {
    // Apenas rola novamente sem resetar para tela inicial
    if (isRolling) return;
    rollDestiny();
}

function generateChaosContent(roll) {
    const variants = [
        {
            className: 'chaos-terminal',
            icon: 'fa-terminal',
            title: 'KERNEL PANIC',
            subtitle: 'A interface tentou subir em modo produção e perdeu o save.',
            accent: 'text-emerald-300',
            border: 'border-emerald-400/50',
            button: 'border-emerald-300 text-emerald-300 hover:bg-emerald-300'
        },
        {
            className: 'chaos-breach',
            icon: 'fa-shield-virus',
            title: 'BREACH DETECTED',
            subtitle: 'Pacotes estranhos foram encontrados no corredor entre o dado e o dashboard.',
            accent: 'text-red-300',
            border: 'border-red-400/50',
            button: 'border-red-300 text-red-300 hover:bg-red-300'
        },
        {
            className: 'chaos-static',
            icon: 'fa-satellite-dish',
            title: 'SIGNAL LOST',
            subtitle: 'A transmissão chegou com ruído demais. O sistema está recompondo a frequência.',
            accent: 'text-cyan-300',
            border: 'border-cyan-300/50',
            button: 'border-cyan-300 text-cyan-300 hover:bg-cyan-300'
        },
        {
            className: 'chaos-arcane',
            icon: 'fa-dice-d20',
            title: 'ARCANE MISFIRE',
            subtitle: 'O D20 abriu uma versão instável demais da interface. Culpa dos modificadores.',
            accent: 'text-fuchsia-300',
            border: 'border-fuchsia-300/50',
            button: 'border-fuchsia-300 text-fuchsia-300 hover:bg-fuchsia-300'
        }
    ];
    const variant = variants[roll % variants.length];
    chaosPage.className = `page-section h-full w-full overflow-y-auto flex flex-col p-8 gap-8 items-center justify-start ${variant.className}`;
    chaosPage.innerHTML = `
        <div class="chaos-scanlines"></div>
        <div class="chaos-window w-full max-w-3xl mx-auto bg-black/60 border ${variant.border} p-6 sm:p-8 rounded-lg text-center mt-20 relative overflow-hidden">
            <div class="chaos-noise"></div>
            <div class="relative z-10">
                <div class="mx-auto mb-5 w-16 h-16 rounded-2xl border ${variant.border} flex items-center justify-center ${variant.accent} text-3xl bg-white/5">
                    <i class="fas ${variant.icon}"></i>
                </div>
                <p class="font-mono text-xs uppercase tracking-[4px] ${variant.accent} mb-2">Roll ${roll} / Access unstable</p>
                <h3 class="chaos-title ${variant.accent} font-black text-3xl sm:text-5xl mb-4">${variant.title}</h3>
                <p class="text-white/75 font-mono mb-6 max-w-xl mx-auto">${variant.subtitle}</p>
                <div class="chaos-code text-left font-mono text-[11px] sm:text-xs text-white/50 bg-black/40 border border-white/10 rounded-lg p-4 mb-6">
                    <p>&gt; boot --interface perfect-form</p>
                    <p>&gt; entropy_check: failed</p>
                    <p>&gt; fallback_channel: ${variant.className}</p>
                    <p>&gt; reroll_required: true</p>
                </div>
                <button onclick="rollDestiny()" class="px-6 py-2 border-2 ${variant.button} hover:text-black font-bold rounded transition-all duration-200 cursor-pointer animate-pulse hover:animate-none">Tente rolar novamente!</button>
            </div>
        </div>
    `;
}


// --- LÓGICA DO DASHBOARD (V3) --- //
// Funções movidas para dashboard.html

// --- UTILITÁRIOS --- //

function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
    
    for(let i=0; i<300; i++) {
        particles.push({
            x: canvas.width/2, y: canvas.height/2,
            vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 5 + 2
        });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.size *= 0.99; 
            ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
            if(p.size < 0.5) particles.splice(index, 1);
        });
        if(particles.length > 0) requestAnimationFrame(draw);
    }
    draw();
}

function createDraggableMarquee(container, initialSpeed) {
    if (!container) return;
    const content = container.querySelector('.marquee-content');
    if(!content) return;
    
    const items = Array.from(content.children);
    if(items.length === 0) return;
    items.forEach(child => content.appendChild(child.cloneNode(true))); // Duplica para loop

    let xPos = 0;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;

    function animate() {
        if(!document.body.contains(container)) return; // Para se o elemento sumir
        if (!isDragging) xPos += initialSpeed;
        
        // Loop infinito simples
        if (Math.abs(xPos) >= content.scrollWidth / 2) xPos = 0;
        
        content.style.transform = `translate3d(${xPos}px, 0, 0)`;
        requestAnimationFrame(animate);
    }

    // Mouse events
    container.addEventListener('mousedown', e => { isDragging = true; lastX = e.clientX; container.style.cursor = 'grabbing'; });
    window.addEventListener('mousemove', e => { if(isDragging) { const delta = e.clientX - lastX; xPos += delta * 1.5; lastX = e.clientX; }});
    window.addEventListener('mouseup', () => { isDragging = false; container.style.cursor = 'grab'; });
    
    // Touch events (mobile)
    container.addEventListener('touchstart', e => {
        isDragging = true;
        lastX = e.touches[0].clientX;
        e.preventDefault();
        e.stopPropagation();
    });
    window.addEventListener('touchmove', e => {
        if(isDragging) {
            e.preventDefault();
            e.stopPropagation();
            const delta = e.touches[0].clientX - lastX;
            xPos += delta * 1.5;
            lastX = e.touches[0].clientX;
        }
    }, { passive: false });
    window.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    requestAnimationFrame(animate);
}
