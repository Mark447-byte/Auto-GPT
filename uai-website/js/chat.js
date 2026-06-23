document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    const responses = {
        'investment': 'UAI offers diverse investment opportunities in Agriculture, Tech, and Renewable Energy. Check our Finance page for guidelines.',
        'membership': 'To become a member, you need to fill out the application form on our Join Us page. Annual fees vary by tier.',
        'projects': 'We currently have 8 active projects including the Smart Irrigation Hub and UAI Pay.',
        'shares': 'Equity units can be purchased through the Shareholder Portal after your membership is approved.',
        'default': 'Thank you for your message. A UAI representative will get back to you soon. How else can I help?'
    };

    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    function addMessage(text, isAi) {
        const msg = document.createElement('div');
        msg.className = `message ${isAi ? 'ai-message' : 'user-message'}`;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim().toLowerCase();
        if (!text) return;

        addMessage(chatInput.value, false);
        chatInput.value = '';

        setTimeout(() => {
            let reply = responses.default;
            for (let key in responses) {
                if (text.includes(key)) {
                    reply = responses[key];
                    break;
                }
            }
            addMessage(reply, true);
        }, 800);
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
