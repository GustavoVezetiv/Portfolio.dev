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
        if (!document.body.contains(container)) return; // Para se o elemento sumir
        if (!isDragging) xPos += initialSpeed;

        if (Math.abs(xPos) >= content.scrollWidth / 2) xPos = 0;

        content.style.transform = `translate3d(${xPos}px, 0, 0)`;
        requestAnimationFrame(animate);
    }

    // Mouse
    container.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX;
        lastX = e.clientX;
        container.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
        if (isDragging) {
            const delta = e.clientX - lastX;
            xPos += delta * 1.5;
            lastX = e.clientX;
        }
    });
    window.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });

    // Touch (mobile) - detecta direção do movimento
    container.addEventListener('touchstart', e => {
        isDragging = true;
        isHorizontalDrag = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        lastX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);

        if (diffX > diffY && diffX > 5) {
            isHorizontalDrag = true;
            e.preventDefault();
            e.stopPropagation();
        }
        if (isHorizontalDrag) {
            const delta = currentX - lastX;
            xPos += delta * 1.5;
            lastX = currentX;
        }
    }, { passive: false });

    window.addEventListener('touchend', () => {
        isDragging = false;
        isHorizontalDrag = false;
    });

    requestAnimationFrame(animate);
}
