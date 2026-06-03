// Wiseflow Premium Dynamic Actions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dashboard Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.dashboard-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                if (targetTab === 'chatbot') {
                    startChatSimulation();
                } else if (targetTab === 'analytics') {
                    animateChart();
                } else if (targetTab === 'roi') {
                    animateRoiCircle();
                }
            }
        });
    });

    // 2. Analytics Panel: Live Metric ticking and Bar updates
    const leadsValue = document.getElementById('metric-leads-val');
    const convValue = document.getElementById('metric-conv-val');
    const chartBars = document.querySelectorAll('.chart-bar');

    function animateChart() {
        chartBars.forEach(bar => {
            const val = bar.getAttribute('data-value');
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = val;
            }, 100);
        });
    }

    // Initialize chart heights
    animateChart();

    // Tick metrics slightly to show real-time changes
    setInterval(() => {
        // Only if analytics panel is visible
        const analyticsPanel = document.getElementById('analytics-panel');
        if (analyticsPanel && analyticsPanel.classList.contains('active')) {
            if (leadsValue) {
                let currentLeads = parseInt(leadsValue.innerText);
                if (Math.random() > 0.4) {
                    currentLeads += 1;
                    leadsValue.innerText = currentLeads;
                    
                    // Slightly modify height of a random bar
                    const randomBarIndex = Math.floor(Math.random() * chartBars.length);
                    const bar = chartBars[randomBarIndex];
                    let currentHeight = parseInt(bar.getAttribute('data-value'));
                    currentHeight = Math.min(95, Math.max(10, currentHeight + (Math.random() > 0.5 ? 5 : -5)));
                    bar.setAttribute('data-value', currentHeight + '%');
                    bar.style.height = currentHeight + '%';
                }
            }
        }
    }, 4000);

    // 3. AI Chat Simulation Logic
    const chatBox = document.getElementById('chat-box');
    let chatInterval = null;
    const conversation = [
        { type: 'user', text: 'Hola, ¿cómo puedo automatizar mis ventas?' },
        { type: 'ai', text: '¡Hola! Puedo configurar un agente de IA en WhatsApp que responda dudas y agende citas 24/7 en tu Google Calendar.' },
        { type: 'user', text: '¿Cuánto tiempo toma la instalación?' },
        { type: 'ai', text: 'El setup inicial toma solo 5 días hábiles. Incluye landing page, bots enlazados a tu CRM y un dashboard en tiempo real.' },
        { type: 'user', text: 'Me interesa. ¿Cuál es el siguiente paso?' },
        { type: 'ai', text: 'Completa el formulario de abajo para agendar una videollamada y diseñaremos tu flujo personalizado.' }
    ];

    function startChatSimulation() {
        if (!chatBox) return;
        chatBox.innerHTML = '';
        clearInterval(chatInterval);

        let index = 0;
        
        function addNextMessage() {
            if (index >= conversation.length) {
                // Restart conversation after a short pause
                setTimeout(startChatSimulation, 5000);
                return;
            }

            const msg = conversation[index];
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${msg.type}`;
            
            if (msg.type === 'ai') {
                // Show typing indicator
                bubble.innerHTML = `<span style="opacity: 0.5;">Escribiendo...</span>`;
                chatBox.appendChild(bubble);
                chatBox.scrollTop = chatBox.scrollHeight;

                setTimeout(() => {
                    bubble.innerHTML = msg.text;
                    chatBox.scrollTop = chatBox.scrollHeight;
                    index++;
                    setTimeout(addNextMessage, 3000);
                }, 1500);
            } else {
                bubble.innerText = msg.text;
                chatBox.appendChild(bubble);
                chatBox.scrollTop = chatBox.scrollHeight;
                index++;
                setTimeout(addNextMessage, 2000);
            }
        }

        addNextMessage();
    }

    // 4. ROI Circular Progress Bar animation
    function animateRoiCircle() {
        const circle = document.querySelector('.circle-progress');
        if (circle) {
            circle.style.strokeDashoffset = '440';
            setTimeout(() => {
                circle.style.strokeDashoffset = '88'; // 80% ROI target visual
            }, 100);
        }
    }

    // 5. Form submission handling with premium Toast notification
    const leadForm = document.getElementById('leadForm');
    const toast = document.getElementById('success-toast');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect details
            const name = document.getElementById('nombre').value;
            
            // Show premium success feedback
            if (toast) {
                const toastTitle = toast.querySelector('h5');
                if (toastTitle) {
                    toastTitle.innerText = `¡Gracias, ${name}!`;
                }
                toast.classList.add('show');
                
                // Hide toast after 5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }

            // Clear inputs
            leadForm.reset();
        });
    }
});
