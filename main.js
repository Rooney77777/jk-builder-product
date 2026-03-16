const generateBtn = document.getElementById('generate-btn');
const resultsGrid = document.getElementById('lotto-results');
const themeBtn = document.getElementById('theme-btn');
const machineSphere = document.querySelector('.glass-sphere');
const body = document.body;

// Theme logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeBtn) themeBtn.textContent = 'Light Mode';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

function getBallClass(num) {
    if (num <= 10) return 'ball-1';
    if (num <= 20) return 'ball-2';
    if (num <= 30) return 'ball-3';
    if (num <= 40) return 'ball-4';
    return 'ball-5';
}

function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        if (machineSphere) machineSphere.classList.add('spinning');
        generateBtn.disabled = true;
        resultsGrid.innerHTML = '';

        setTimeout(() => {
            if (machineSphere) machineSphere.classList.remove('spinning');
            generateBtn.disabled = false;

            for (let i = 0; i < 5; i++) {
                const set = generateLottoSet();
                const row = document.createElement('div');
                row.classList.add('row-container');
                row.style.animationDelay = `${i * 0.1}s`;

                set.forEach(num => {
                    const ball = document.createElement('div');
                    ball.classList.add('lotto-number', getBallClass(num));
                    ball.textContent = num;
                    row.appendChild(ball);
                });

                resultsGrid.appendChild(row);
            }
        }, 1000);
    });
}
