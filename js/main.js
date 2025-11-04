// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    });
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.resource-card, .tool-card, .strategy-section');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Tool functionality
class ToolManager {
    constructor() {
        this.initTools();
    }

    initTools() {
        this.initMoodTracker();
        this.initFocusTimer();
        this.initBreathingGuide();
    }

    initMoodTracker() {
        const moodTrackerBtn = document.querySelector('[data-tool="mood-tracker"]');
        if (moodTrackerBtn) {
            moodTrackerBtn.addEventListener('click', () => this.openMoodTracker());
        }
    }

    initFocusTimer() {
        const focusTimerBtn = document.querySelector('[data-tool="focus-timer"]');
        if (focusTimerBtn) {
            focusTimerBtn.addEventListener('click', () => this.openFocusTimer());
        }
    }

    initBreathingGuide() {
        const breathingBtn = document.querySelector('[data-tool="breathing-guide"]');
        if (breathingBtn) {
            breathingBtn.addEventListener('click', () => this.openBreathingGuide());
        }
    }

    openMoodTracker() {
        this.createModal('Mood Tracker', this.createMoodTrackerContent());
    }

    openFocusTimer() {
        this.createModal('Focus Timer', this.createFocusTimerContent());
    }

    openBreathingGuide() {
        this.createModal('Breathing Exercise', this.createBreathingGuideContent());
    }

    createModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    createMoodTrackerContent() {
        return `
            <div class="mood-tracker">
                <p>How are you feeling today?</p>
                <div class="mood-options">
                    <button class="mood-btn" data-mood="great">😊 Great</button>
                    <button class="mood-btn" data-mood="good">🙂 Good</button>
                    <button class="mood-btn" data-mood="okay">😐 Okay</button>
                    <button class="mood-btn" data-mood="struggling">😔 Struggling</button>
                    <button class="mood-btn" data-mood="difficult">😢 Difficult</button>
                </div>
                <div class="mood-notes">
                    <textarea placeholder="Add any notes about your day..." rows="4"></textarea>
                    <button class="btn btn-primary save-mood">Save Entry</button>
                </div>
                <div class="mood-history">
                    <h3>Recent Entries</h3>
                    <div class="mood-entries">
                        <p class="no-entries">No entries yet. Start tracking your mood!</p>
                    </div>
                </div>
            </div>
        `;
    }

    createFocusTimerContent() {
        return `
            <div class="focus-timer">
                <div class="timer-display">
                    <span class="timer-minutes">25</span>:<span class="timer-seconds">00</span>
                </div>
                <div class="timer-controls">
                    <button class="btn btn-primary timer-start">Start</button>
                    <button class="btn btn-secondary timer-pause" disabled>Pause</button>
                    <button class="btn btn-outline timer-reset">Reset</button>
                </div>
                <div class="timer-settings">
                    <label for="timer-duration">Session Duration (minutes):</label>
                    <input type="number" id="timer-duration" value="25" min="1" max="60">
                </div>
                <div class="timer-tips">
                    <h4>Focus Tips</h4>
                    <ul>
                        <li>Eliminate distractions before starting</li>
                        <li>Take short breaks between sessions</li>
                        <li>Stay hydrated and comfortable</li>
                        <li>Focus on one task at a time</li>
                    </ul>
                </div>
            </div>
        `;
    }

    createBreathingGuideContent() {
        return `
            <div class="breathing-guide">
                <div class="breathing-circle">
                    <div class="breathing-text">Ready to begin?</div>
                </div>
                <div class="breathing-controls">
                    <button class="btn btn-primary breathing-start">Start Exercise</button>
                    <select id="breathing-pattern">
                        <option value="4-7-8">4-7-8 Relaxation</option>
                        <option value="box">Box Breathing</option>
                        <option value="4-2-4">4-2-4 Calming</option>
                    </select>
                </div>
                <div class="breathing-instructions">
                    <h3>Breathing Patterns</h3>
                    <div class="pattern-info">
                        <h4>4-7-8 Relaxation:</h4>
                        <p>Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds</p>

                        <h4>Box Breathing:</h4>
                        <p>Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds</p>

                        <h4>4-2-4 Calming:</h4>
                        <p>Inhale for 4 seconds, hold for 2 seconds, exhale for 4 seconds</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize tool manager
const toolManager = new ToolManager();

// Add modal styles
const modalStyles = `
<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: var(--text-dark);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
    padding: 0.5rem;
    line-height: 1;
}

.modal-close:hover {
    color: var(--text-dark);
}

.modal-body {
    padding: 1.5rem;
}

.mood-options {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.mood-btn {
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-color);
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    font-size: 1.5rem;
}

.mood-btn:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

.mood-btn.selected {
    border-color: var(--primary-color);
    background: var(--primary-color);
}

.mood-notes textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin: 1rem 0;
    resize: vertical;
}

.timer-display {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0;
    color: var(--primary-color);
    font-family: 'Courier New', monospace;
}

.timer-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.timer-settings {
    text-align: center;
    margin: 1rem 0;
}

.timer-settings input {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    text-align: center;
}

.breathing-circle {
    width: 150px;
    height: 150px;
    border: 3px solid var(--primary-color);
    border-radius: 50%;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.breathing-circle.active {
    animation: breathe 8s infinite;
}

@keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.breathing-controls {
    text-align: center;
    margin: 2rem 0;
}

.breathing-controls select {
    margin-left: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.timer-tips, .breathing-instructions {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
}

.timer-tips h4, .breathing-instructions h3, .breathing-instructions h4 {
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.timer-tips ul, .pattern-info {
    color: var(--text-light);
}

.timer-tips li {
    margin-bottom: 0.5rem;
}

.pattern-info {
    margin-top: 1rem;
}

.pattern-info h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
}

@media (max-width: 480px) {
    .modal-overlay {
        padding: 10px;
    }

    .timer-display {
        font-size: 2rem;
    }

    .mood-options {
        justify-content: center;
    }

    .timer-controls {
        flex-direction: column;
        align-items: center;
    }
}
</style>
`;

// Inject modal styles
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Add data attributes to tool buttons
document.addEventListener('DOMContentLoaded', () => {
    const toolButtons = document.querySelectorAll('.tool-card .btn');
    if (toolButtons[0]) toolButtons[0].setAttribute('data-tool', 'mood-tracker');
    if (toolButtons[1]) toolButtons[1].setAttribute('data-tool', 'focus-timer');
    if (toolButtons[2]) toolButtons[2].setAttribute('data-tool', 'breathing-guide');
});

// Form validation and interaction
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Accessibility improvements
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Add skip link styles
const skipLinkStyles = `
<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 3000;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 6px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', skipLinkStyles);

console.log('ADHD & Anxiety Solutions website loaded successfully!');