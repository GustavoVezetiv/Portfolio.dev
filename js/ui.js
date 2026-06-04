/* ARQUIVO: js/ui.js
 * Utilitários de UI compartilhados entre index.html e dashboard.html.
 * Antes duplicados em script.js e no <script> inline do dashboard.
 */

// --- Confetti (Critical Success) ---
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

    for (let i = 0; i < 300; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
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
            if (p.size < 0.5) particles.splice(index, 1);
        });
        if (particles.length > 0) requestAnimationFrame(draw);
    }
    draw();
}

// --- Carrossel arrastável (Certificados) ---
// Detecta arrasto horizontal vs scroll vertical para não travar o toque no mobile.
// Os listeners globais (move/up) só existem enquanto há arrasto ativo — são
// adicionados no "down" e removidos no "up", evitando acúmulo a cada abertura.
function createDraggableMarquee(container, initialSpeed) {
    if (!container) return;
    const content = container.querySelector('.marquee-content');
    if (!content) return;

    const items = Array.from(content.children);
    if (items.length === 0) return;
    items.forEach(child => content.appendChild(child.cloneNode(true))); // Duplica para loop

    let xPos = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let isHorizontalDrag = false;

    function animate() {
        if (!document.body.contains(container)) return; // Para (e libera) quando o elemento sai do DOM
        if (!isDragging) xPos += initialSpeed;
        if (Math.abs(xPos) >= content.scrollWidth / 2) xPos = 0;
        content.style.transform = `translate3d(${xPos}px, 0, 0)`;
        requestAnimationFrame(animate);
    }

    // --- Mouse ---
    function onMouseMove(e) {
        const delta = e.clientX - lastX;
        xPos += delta * 1.5;
        lastX = e.clientX;
    }
    function onMouseUp() {
        isDragging = false;
        container.style.cursor = 'grab';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
    container.addEventListener('mousedown', e => {
        isDragging = true;
        lastX = e.clientX;
        container.style.cursor = 'grabbing';
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    // --- Touch (mobile) ---
    function onTouchMove(e) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        if (Math.abs(currentX - startX) > Math.abs(currentY - startY) && Math.abs(currentX - startX) > 5) {
            isHorizontalDrag = true;
            e.preventDefault();
            e.stopPropagation();
        }
        if (isHorizontalDrag) {
            xPos += (currentX - lastX) * 1.5;
            lastX = currentX;
        }
    }
    function onTouchEnd() {
        isDragging = false;
        isHorizontalDrag = false;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
    }
    container.addEventListener('touchstart', e => {
        isDragging = true;
        isHorizontalDrag = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        lastX = e.touches[0].clientX;
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
    }, { passive: true });

    requestAnimationFrame(animate);
}
