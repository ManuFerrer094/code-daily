/**
 * app.js
 * Main application logic for CodeDaily.
 * Handles screen transitions, challenge loading, code evaluation, and progression.
 */

(function () {
    'use strict';

    // ===== UTILS =====
    function escapeHTML(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ===== STATE =====
    const state = {
        currentLevel: null,     // 'facil' | 'medio' | 'dificil'
        currentChallenge: null, // challenge object
        challengeIndex: 0,      // index within level
        challengeNumber: 0,     // total challenges attempted
        streak: 0,
        bestStreak: 0,
        totalSolved: 0,
        usedChallenges: { facil: [], medio: [], dificil: [] },
        solutionViewed: false
    };

    // ===== DOM REFS =====
    const $ = (id) => document.getElementById(id);

    const screens = {
        welcome: $('welcome-screen'),
        challenge: $('challenge-screen')
    };

    const els = {
        // Welcome
        statStreak: $('stat-streak'),
        statSolved: $('stat-solved'),
        statBest: $('stat-best'),
        particles: $('particles'),

        // Challenge header
        levelBadge: $('current-level-badge'),
        levelText: $('current-level-text'),
        challengeNumber: $('challenge-number'),
        headerStreak: $('header-streak'),

        // Challenge content
        challengeContent: $('challenge-content'),
        solutionPanel: $('solution-panel'),
        solutionCode: $('solution-code'),

        // Console
        consoleOutput: $('console-output'),

        // Modal
        resultModal: $('result-modal'),
        modalIcon: $('modal-icon'),
        modalTitle: $('modal-title'),
        modalMessage: $('modal-message'),
        modalDetails: $('modal-details'),
        modalActions: $('modal-actions'),
        modalCard: $('modal-card')
    };

    let editor = null; // CodeMirror instance

    // ===== INITIALIZATION =====
    function init() {
        loadState();
        updateStats();
        createParticles();
        setupEventListeners();
        initEditor();
    }

    // ===== PERSISTENCE =====
    function loadState() {
        try {
            const saved = localStorage.getItem('codedaily_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                state.streak = parsed.streak || 0;
                state.bestStreak = parsed.bestStreak || 0;
                state.totalSolved = parsed.totalSolved || 0;
                state.usedChallenges = parsed.usedChallenges || { facil: [], medio: [], dificil: [] };
            }
        } catch (e) { /* ignore */ }
    }

    function saveState() {
        try {
            localStorage.setItem('codedaily_state', JSON.stringify({
                streak: state.streak,
                bestStreak: state.bestStreak,
                totalSolved: state.totalSolved,
                usedChallenges: state.usedChallenges
            }));
        } catch (e) { /* ignore */ }
    }

    function updateStats() {
        els.statStreak.textContent = state.streak;
        els.statSolved.textContent = state.totalSolved;
        els.statBest.textContent = state.bestStreak;
    }

    // ===== PARTICLES =====
    function createParticles() {
        const container = els.particles;
        container.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(particle);
        }
    }

    // ===== CODE EDITOR =====
    function initEditor() {
        const textarea = $('code-editor');
        editor = CodeMirror.fromTextArea(textarea, {
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            tabSize: 2,
            indentUnit: 2,
            lineWrapping: true,
            viewportMargin: Infinity
        });
    }

    // ===== SCREEN MANAGEMENT =====
    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        // Level buttons
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = card.dataset.level;
                startChallenge(level);
            });
        });

        // Back button
        $('btn-back').addEventListener('click', () => {
            showScreen('welcome');
            updateStats();
        });

        // Solution toggle
        $('btn-solution').addEventListener('click', () => {
            els.solutionPanel.classList.toggle('hidden');
            state.solutionViewed = true;
        });

        $('btn-close-solution').addEventListener('click', () => {
            els.solutionPanel.classList.add('hidden');
        });

        // Run / Correct
        $('btn-run').addEventListener('click', runCode);

        // Reset
        $('btn-reset').addEventListener('click', () => {
            if (state.currentChallenge) {
                editor.setValue(state.currentChallenge.template);
                clearConsole();
            }
        });

        // Close modal on overlay click
        els.resultModal.addEventListener('click', (e) => {
            if (e.target === els.resultModal) {
                closeModal();
            }
        });

        // Keyboard shortcut: Ctrl+Enter to run
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (screens.challenge.classList.contains('active')) {
                    e.preventDefault();
                    runCode();
                }
            }
        });
    }

    // ===== CHALLENGE MANAGEMENT =====
    function getRandomChallenge(level) {
        const pool = CHALLENGES[level];
        const used = state.usedChallenges[level];
        const available = pool.filter(c => !used.includes(c.id));

        // If all used, reset
        if (available.length === 0) {
            state.usedChallenges[level] = [];
            return pool[Math.floor(Math.random() * pool.length)];
        }

        return available[Math.floor(Math.random() * available.length)];
    }

    function startChallenge(level) {
        state.currentLevel = level;
        state.solutionViewed = false;
        state.challengeNumber++;

        const challenge = getRandomChallenge(level);
        state.currentChallenge = challenge;
        state.usedChallenges[level].push(challenge.id);
        saveState();

        // Update UI
        updateLevelBadge(level);
        els.challengeNumber.textContent = state.challengeNumber;
        els.headerStreak.textContent = state.streak;

        // Render challenge
        renderChallenge(challenge);

        // Set editor content
        editor.setValue(challenge.template);
        setTimeout(() => editor.refresh(), 100);

        // Clear console & hide solution
        clearConsole();
        els.solutionPanel.classList.add('hidden');

        // Show challenge screen
        showScreen('challenge');
    }

    function updateLevelBadge(level) {
        els.levelBadge.className = 'level-badge level-' + level;
        const names = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil' };
        els.levelText.textContent = names[level];
    }

    function renderChallenge(challenge) {
        let html = `<h2>${challenge.title}</h2>`;
        html += challenge.description;

        if (challenge.examples && challenge.examples.length > 0) {
            html += '<div class="example-box"><h4>Ejemplos</h4><pre>';
            for (const ex of challenge.examples) {
                html += `${ex.input}  →  ${ex.output}\n`;
            }
            html += '</pre></div>';
        }

        if (challenge.hint) {
            html += `<div class="hint-tag">💡 Pista: ${challenge.hint}</div>`;
        }

        els.challengeContent.innerHTML = html;
        els.solutionCode.textContent = challenge.solution;
    }

    // ===== CODE EXECUTION =====
    function runCode() {
        const userCode = editor.getValue();
        clearConsole();

        if (!state.currentChallenge) return;

        logToConsole('info', '▶ Ejecutando tests...');
        logToConsole('info', '─'.repeat(40));

        try {
            const result = state.currentChallenge.test(userCode);
            displayTestResults(result);
        } catch (err) {
            logToConsole('error', `❌ Error: ${err.message}`);
            logToConsole('error', '');
            logToConsole('log', 'Revisa tu código e inténtalo de nuevo.');
            showResultModal(false, {
                error: err.message,
                passed: 0,
                total: '?'
            });
        }
    }

    function displayTestResults(result) {
        const { passed, total, results } = result;

        for (const r of results) {
            const icon = r.pass ? '✅' : '❌';
            logToConsole(r.pass ? 'success' : 'error', 
                `${icon} ${r.input}`);
            if (!r.pass) {
                logToConsole('log', `   Esperado: ${r.expected}`);
                logToConsole('error', `   Obtenido: ${r.got}`);
            }
        }

        logToConsole('info', '─'.repeat(40));

        const allPassed = passed === total;

        if (allPassed) {
            logToConsole('success', `🎉 ¡Todos los tests pasados! (${passed}/${total})`);
            state.streak++;
            state.totalSolved++;
            if (state.streak > state.bestStreak) {
                state.bestStreak = state.streak;
            }
            saveState();
        } else {
            logToConsole('error', `❌ Tests fallidos: ${passed}/${total}`);
            state.streak = 0;
            saveState();
        }

        els.headerStreak.textContent = state.streak;

        showResultModal(allPassed, { passed, total, results });
    }

    // ===== CONSOLE =====
    function clearConsole() {
        els.consoleOutput.innerHTML = '<span class="console-placeholder">Los resultados aparecerán aquí...</span>';
    }

    function logToConsole(type, message) {
        // Remove placeholder if present
        const placeholder = els.consoleOutput.querySelector('.console-placeholder');
        if (placeholder) placeholder.remove();

        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = message;
        els.consoleOutput.appendChild(line);
        els.consoleOutput.scrollTop = els.consoleOutput.scrollHeight;
    }

    // ===== MODAL =====
    function showResultModal(success, data) {
        if (success) {
            els.modalIcon.textContent = '🎉';
            els.modalTitle.textContent = '¡Correcto!';
            els.modalTitle.style.color = 'var(--success)';
            els.modalMessage.textContent = '¡Has resuelto el reto correctamente! ¡Gran trabajo!';
        } else {
            els.modalIcon.textContent = '💪';
            els.modalTitle.textContent = 'Sigue intentando';
            els.modalTitle.style.color = 'var(--error)';
            if (data.error) {
                els.modalMessage.textContent = `Tu código tiene un error: ${data.error}`;
            } else {
                els.modalMessage.textContent = `Has pasado ${data.passed} de ${data.total} tests. ¡Casi lo tienes!`;
            }
        }

        // Details
        const testListItems = data.results ? data.results.map(r => {
            const icon = r.pass ? '✅' : '❌';
            const detail = r.pass
                ? `Esperado: ${escapeHTML(r.expected)}`
                : `Esperado: ${escapeHTML(r.expected)} | Obtenido: ${escapeHTML(r.got)}`;
            return `<div class="test-result-item ${r.pass ? 'test-pass' : 'test-fail'}">
                <span>${icon} ${escapeHTML(r.input)}</span>
                <span class="test-expected">${detail}</span>
            </div>`;
        }).join('') : '';

        els.modalDetails.innerHTML = `
            <details class="detail-dropdown">
                <summary class="detail-row">
                    <span class="detail-label">Tests pasados</span>
                    <span class="detail-value">${data.passed}/${data.total}</span>
                </summary>
                <div class="test-results-list">
                    ${testListItems}
                </div>
            </details>
            <div class="detail-row">
                <span class="detail-label">Nivel</span>
                <span class="detail-value">${state.currentLevel === 'facil' ? 'Fácil' : state.currentLevel === 'medio' ? 'Medio' : 'Difícil'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Racha</span>
                <span class="detail-value">⚡ ${state.streak}</span>
            </div>
        `;

        // Actions
        els.modalActions.innerHTML = '';

        if (success) {
            // SUCCESS LOGIC
            if (state.currentLevel === 'dificil') {
                // Stay on hard level
                const btnNext = createButton('🔥 Siguiente reto difícil', 'btn-success', () => {
                    closeModal();
                    startChallenge('dificil');
                });
                els.modalActions.appendChild(btnNext);
            } else {
                // Propose higher level
                const nextLevel = state.currentLevel === 'facil' ? 'medio' : 'dificil';
                const nextLevelName = nextLevel === 'medio' ? 'Medio' : 'Difícil';
                const levelEmoji = nextLevel === 'medio' ? '⚡' : '🔥';

                const btnUp = createButton(`${levelEmoji} Subir a ${nextLevelName}`, 'btn-success', () => {
                    closeModal();
                    startChallenge(nextLevel);
                });
                els.modalActions.appendChild(btnUp);

                const btnSame = createButton('Continuar en este nivel', 'btn-outline', () => {
                    closeModal();
                    startChallenge(state.currentLevel);
                });
                els.modalActions.appendChild(btnSame);
            }
        } else {
            // FAILURE LOGIC
            if (state.currentLevel !== 'facil') {
                // Propose lower level
                const prevLevel = state.currentLevel === 'dificil' ? 'medio' : 'facil';
                const prevLevelName = prevLevel === 'facil' ? 'Fácil' : 'Medio';

                const btnDown = createButton(`Bajar a ${prevLevelName}`, 'btn-warning', () => {
                    closeModal();
                    startChallenge(prevLevel);
                });
                els.modalActions.appendChild(btnDown);
            }

            const btnRetry = createButton('🔄 Reintentar', 'btn-outline', () => {
                closeModal();
            });
            els.modalActions.appendChild(btnRetry);

            const btnNext = createButton('Siguiente reto', 'btn-outline', () => {
                closeModal();
                startChallenge(state.currentLevel);
            });
            els.modalActions.appendChild(btnNext);
        }

        els.resultModal.classList.remove('hidden');
    }

    function createButton(text, className, onClick) {
        const btn = document.createElement('button');
        btn.className = `btn ${className}`;
        btn.textContent = text;
        btn.addEventListener('click', onClick);
        return btn;
    }

    function closeModal() {
        els.resultModal.classList.add('hidden');
    }

    // ===== START =====
    document.addEventListener('DOMContentLoaded', init);
})();
