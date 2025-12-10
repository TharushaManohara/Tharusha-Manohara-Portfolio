// Force scroll to top on page load/refresh
window.onload = function() {
    window.scrollTo(0, 0);
};

particlesJS("particles-js", {
    particles: { number: { value: 80, density: { enable: true, value_area: 800 } }, color: { value: "#6366f1" }, shape: { type: "circle" }, opacity: { value: 0.3, random: true }, size: { value: 2, random: true }, line_linked: { enable: true, distance: 150, color: "#6366f1", opacity: 0.1, width: 1 }, move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" } },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

const typewriter = document.getElementById('typewriter');
const words = ['Student', 'Innovator', 'Developer', 'Specialist'];
let wordIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
type();

const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // ScrollSpy Logic
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function reveal() {
    document.querySelectorAll('.reveal, .timeline-item, .project-card, .contact-info, .contact-form, .service-card, .skills-container, .horizontal-section').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
            el.classList.add('animate', 'active');
        }
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelectorAll('.project-card').forEach((card, i) => { card.style.animationDelay = `${i * 0.15}s`; });
document.querySelectorAll('.timeline-item').forEach((item, i) => { item.style.animationDelay = `${i * 0.2}s`; });

/* --- Form Submission Handler --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                submitBtn.style.background = '#22c55e'; // Green success color
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = ''; // Revert color
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
            submitBtn.style.background = '#ef4444'; // Red error color
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

/* --- Interactive Terminal Logic (Chatbot & System) --- */
const terminal = document.getElementById('quake-terminal');
const termInput = document.getElementById('terminalInput');
const termOutput = document.getElementById('terminalOutput');
const terminalToggle = document.getElementById('terminalToggle');
const closeTerminal = document.getElementById('closeTerminal');

function toggleTerminal() {
    terminal.classList.toggle('open');
    if (terminal.classList.contains('open')) {
        setTimeout(() => termInput.focus(), 100);
        document.addEventListener('click', handleOutsideClick);
    } else {
        document.removeEventListener('click', handleOutsideClick);
    }
}

function handleOutsideClick(event) {
    if (terminal.classList.contains('open') && 
        !terminal.contains(event.target) && 
        event.target !== terminalToggle && 
        !terminalToggle.contains(event.target)) {
        toggleTerminal();
    }
}

terminalToggle.addEventListener('click', (e) => { e.preventDefault(); toggleTerminal(); });
closeTerminal.addEventListener('click', toggleTerminal);

document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') { e.preventDefault(); toggleTerminal(); }
    if (e.key === 'Escape' && terminal.classList.contains('open')) { toggleTerminal(); }
});

// System Commands
const sysCommands = {
    ls: () => "Directory listing of <span class='highlight-cmd'>~/portfolio</span>:<br>" +
              "drwxr-xr-x  user  staff   <span style='color:#6366f1'>#about</span><br>" +
              "drwxr-xr-x  user  staff   <span style='color:#6366f1'>#certifications</span><br>" +
              "drwxr-xr-x  user  staff   <span style='color:#6366f1'>#skills</span><br>" +
              "drwxr-xr-x  user  staff   <span style='color:#6366f1'>#projects</span><br>" +
              "drwxr-xr-x  user  staff   <span style='color:#6366f1'>#contact</span>",
    
    go: (args) => {
        if (!args || args.length === 0) return "Usage: go [section] (e.g., 'go projects')";
        const sectionId = args[0].replace('#', '');
        const section = document.getElementById(sectionId);
        if (section) {
            toggleTerminal();
            section.scrollIntoView({behavior: 'smooth'});
            return `Navigating to <span class='highlight-cmd'>${sectionId}</span>...`;
        }
        return `Error: Directory '${sectionId}' not found.`;
    },

    matrix: () => {
        const canvas = document.getElementById('binary-canvas');
        if (canvas.dataset.mode === 'matrix') {
            canvas.dataset.mode = 'waves';
            return "Visualizer switched to: <span class='highlight-cmd'>Signal Waves</span>";
        } else {
            canvas.dataset.mode = 'matrix';
            return "Visualizer switched to: <span class='highlight-cmd'>Matrix Rain</span>";
        }
    },

    "theme light": () => { document.body.classList.add('light-mode'); return "Theme: <span style='color:#22c55e'>Light Mode</span> active."; },
    "theme dark": () => { document.body.classList.remove('light-mode'); return "Theme: <span style='color:#a855f7'>Dark Mode</span> active."; },
    status: () => {
        const uptime = Math.floor(performance.now() / 1000);
        return `STATUS: OK<br>System Uptime: ${uptime} seconds<br>Core Services: Online`;
    },
    clear: () => {
        termOutput.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">user@tharusha:~$</span> Welcome to Tharusha's System Control.
            </div>
            <div class="terminal-line">
                <span class="prompt">user@tharusha:~$</span> Type 'help' for commands, or just ask me anything!
            </div>
        `;
        return ""; // Don't print "Command not found" after clear
    },
    help: () => "Available System Commands:<br>" +
                "<span class='highlight-cmd'>ls</span>             - List site sections<br>" +
                "<span class='highlight-cmd'>go [section]</span>   - Navigate to a section (available: about, certifications, skills, projects, contact)<br>" +
                "<span class='highlight-cmd'>matrix</span>         - Toggle Matrix Rain effect<br>" +
                "<span class='highlight-cmd'>theme light</span>    - Switch to Light Mode<br>" +
                "<span class='highlight-cmd'>theme dark</span>     - Switch to Dark Mode<br>" +
                "<span class='highlight-cmd'>status</span>         - Check system status<br>" +
                "<span class='highlight-cmd'>clear</span>          - Clear terminal output<br>" +
                "<span class='highlight-cmd'>chat</span>           - Ask general questions about me"
};



if(termInput) {
    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const fullInput = this.value.trim();
            if (!fullInput) return;

            const inputParts = fullInput.split(' ');
            const cmd = inputParts[0].toLowerCase();
            const args = inputParts.slice(1);
            
            // History Line
            const historyLine = document.createElement('div');
            historyLine.classList.add('terminal-line');
            historyLine.innerHTML = `<span class="prompt">user@tharusha:~$</span> ${fullInput}`;
            termOutput.appendChild(historyLine);

            // Process
            let output = "";
            const fullCmd = inputParts.length > 1 && (cmd === 'theme') ? fullInput.toLowerCase() : cmd;

            if (cmd === 'clear') {
                sysCommands.clear(); // Call clear function directly
            } else if (sysCommands[fullCmd]) {
                // System Command
                output = typeof sysCommands[fullCmd] === 'function' ? sysCommands[fullCmd](args) : sysCommands[fullCmd];
            } else if (sysCommands[cmd] && typeof sysCommands[cmd] === 'function') {
                // System Command with args
                output = sysCommands[cmd](args);
            } else {
                // --- Chatbot Logic ---
                const botKnowledge = [
                    { keys: ['who', 'name', 'developer', 'author'], answer: "I am **Tharusha Manohara**, a Computer Engineering undergraduate at KDU." },
                    { keys: ['university', 'college', 'campus', 'study', 'education', 'kdu', 'degree'], answer: "I study Computer Engineering at **General Sir John Kotelawala Defence University (KDU)**." },
                    { keys: ['skill', 'skills', 'stack', 'tech', 'technologies', 'language', 'languages', 'program', 'coding'], answer: "My main stack includes **React, JavaScript, C++, Arduino, and Python**. Type 'go skills' to see the full graph." },
                    { keys: ['contact', 'email', 'reach', 'message', 'call'], answer: "You can email me at **tharushamanohara2003@gmail.com** or use the contact form. Type 'go contact' to jump there." },
                    { keys: ['project', 'projects', 'work', 'works', 'build', 'portfolio'], answer: "I have built IoT systems, Web Apps, and this portfolio! Type 'go projects' to view them." },
                    { keys: ['age', 'old'], answer: "I am 22 years old." },
                    { keys: ['hobby', 'hobbies', 'fun', 'like', 'interest', 'interests'], answer: "I love coding, exploring IoT hardware, and designing futuristic UIs." },
                    { keys: ['hi', 'hello', 'hey', 'greetings'], answer: "Hello! I am Tharusha's virtual assistant. Ask me anything about his work!" }
                ];

                let found = false;
                const lowerInput = fullInput.toLowerCase();

                for (let entry of botKnowledge) {
                    if (entry.keys.some(k => new RegExp("\\b" + k + "\\b").test(lowerInput))) {
                        output = entry.answer;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    output = `Command not recognized. I'm a simple bot! Try asking about my <span class='highlight-cmd'>skills</span>, <span class='highlight-cmd'>education</span>, or <span class='highlight-cmd'>contact</span> info. Type <span class='highlight-cmd'>help</span> for commands.`;
                }
            }

            if (output) { // Only print output if not empty (e.g., after clear)
                const responseLine = document.createElement('div');
                responseLine.classList.add('command-output');
                responseLine.innerHTML = output;
                termOutput.appendChild(responseLine);
            }

            this.value = '';
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });
}

/* --- Digital Signal Waves & Matrix Hybrid --- */
const canvas = document.getElementById('binary-canvas');
const ctx = canvas.getContext('2d');
canvas.dataset.mode = 'waves'; // Default mode

let width, height;
let waveStep = 0;

// Matrix config
const binaryChars = '01';
const fontSize = 14;
let drops = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Reset matrix drops
    const columns = width / fontSize;
    drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;
}
resize();
window.addEventListener('resize', resize);

// Signal Waves config
const waves = [
    { frequency: 0.005, amplitude: 150, speed: 0.02, color: 'rgba(99, 102, 241, 0.5)' },
    { frequency: 0.01, amplitude: 100, speed: 0.03, color: 'rgba(168, 85, 247, 0.4)' },
    { frequency: 0.02, amplitude: 50, speed: 0.04, color: 'rgba(6, 182, 212, 0.3)' }
];

function animate() {
    requestAnimationFrame(animate);
    
    if (canvas.dataset.mode === 'matrix') {
        // Draw Matrix Rain
        ctx.fillStyle = 'rgba(3, 0, 20, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            ctx.fillStyle = '#0F0'; // Matrix Green
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > height && Math.random() > 0.975)
                drops[i] = 0;
            
            drops[i]++;
        }

    } else {
        // Draw Signal Waves
        ctx.clearRect(0, 0, width, height);
        waveStep += 0.05;
        
        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 2;
            for (let x = 0; x < width; x += 5) {
                const y = height / 2 + 
                         Math.sin(x * wave.frequency + waveStep * wave.speed) * wave.amplitude +
                         Math.sin(x * wave.frequency * 2 + waveStep) * (wave.amplitude * 0.2);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
        });
    }
}
animate();

/* --- Blueprint Modal Logic --- */
const modal = document.getElementById('blueprint-modal');
const closeModal = document.querySelector('.close-blueprint');

// Data for projects (Simulating a DB)
const projectData = {
    'Smart Parking System': {
        type: 'IoT / Embedded C++',
        img: 'images/1.jpg',
        desc: 'Engineered a fully automated parking management system using Arduino Mega. Integrated ultrasonic sensors for precise slot detection and servo motors for gate control. The system features a real-time LCD dashboard and optimized logic for high-traffic environments.',
        tech: ['Arduino Mega', 'C++', 'Ultrasonic Sensors', 'Servo Motors', 'Proteus Simulation']
    },
    'Portfolio V2': {
        type: 'Frontend Engineering',
        img: 'images/2.jpg',
        desc: 'Designed a highly performant personal website with WebGL-powered background animations. Implemented a custom "Quake-style" command terminal and GSAP scrolling effects to create an immersive user experience.',
        tech: ['HTML5/CSS3', 'JavaScript', 'Canvas API', 'Particles.js', 'Responsive Design']
    },
    'E-Commerce UI': {
        type: 'React / UX Design',
        img: 'images/3.jpg',
        desc: 'Developed a scalable e-commerce frontend architecture. Focused on component reusability, state management, and a mobile-first approach. Features include a dynamic cart system, product filtering, and a modern glassmorphism aesthetic.',
        tech: ['React.js', 'Tailwind CSS', 'Figma', 'Context API', 'UX Principles']
    }
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const title = card.querySelector('h3').innerText;
        const data = projectData[title];

        if(data) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-type').innerText = data.type;
            document.getElementById('modal-desc').innerText = data.desc;
            document.getElementById('modal-img').src = data.img;
            
            // Render Tech Tags
            const techContainer = document.getElementById('modal-tech');
            techContainer.innerHTML = '';
            data.tech.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.innerText = tech;
                techContainer.appendChild(span);
            });

            modal.classList.add('active');
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.classList.remove('active');
});

// Helper function to write messages to the terminal
function writeTerminalOutput(message) {
    if (!terminal.classList.contains('open')) {
        toggleTerminal(); // Open terminal if not already open
    }
    const responseLine = document.createElement('div');
    responseLine.classList.add('command-output');
    responseLine.innerHTML = message;
    termOutput.appendChild(responseLine);
    termOutput.scrollTop = termOutput.scrollHeight;
}

/* --- Hacker Decryption Effect (Scroll Trigger) --- */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%& উত্ত";

const scrambleText = (element) => {
    let iteration = 0;
    const originalText = element.dataset.value;
    clearInterval(element.interval);

    element.interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)]
            })
            .join("");

        if(iteration >= originalText.length){ 
            clearInterval(element.interval);
        }

        iteration += 1 / 3;
    }, 30);
};

const observerOptions = {
    threshold: 1.0, // Trigger when fully visible
    rootMargin: "0px 0px -50px 0px"
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrambleText(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header h2').forEach(header => {
    header.dataset.value = header.innerText;
    textObserver.observe(header);
});

/* --- Vanilla Tilt Initialization --- */
VanillaTilt.init(document.querySelectorAll(".project-card, .cert-card, .gauge-item, .contact-link"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});

/* --- Radial Gauge Animation --- */
const gaugeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const value = circle.getAttribute('data-value');
            const percentText = circle.nextElementSibling;
            
            // Animate Stroke
            circle.style.strokeDasharray = `${value}, 100`;
            
            // Animate Number
            let count = 0;
            const time = 1000 / value;
            const counter = setInterval(() => {
                count++;
                percentText.textContent = `${count}%`;
                if (count == value) clearInterval(counter);
            }, time);

            observer.unobserve(circle);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.circle').forEach(circle => {
    circle.style.strokeDasharray = "0, 100"; // Reset initially
    gaugeObserver.observe(circle);
});
