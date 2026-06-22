document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            const isVisible = chatWindow.style.display === 'flex';
            chatWindow.style.display = isVisible ? 'none' : 'flex';
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
    }

    // AI Response System
    const knowledgeBase = [
        { keywords: ['membership', 'join', 'apply'], response: 'You can become a member by visiting our "Join Us" page. Standard membership is $50/month, while corporate is $200/month.' },
        { keywords: ['investment', 'invest', 'shares', 'shareholder'], response: 'We offer various investment opportunities in agriculture, tech, and renewable energy. Visit the Shareholder Portal to view our growth reports and buy shares.' },
        { keywords: ['projects', 'portfolio', 'doing'], response: 'Our current projects include the Smart Irrigation Hub, UAI Mobile Wallet, and Village Solar Grid. Check the "Projects" page for full details.' },
        { keywords: ['hello', 'hi', 'hey'], response: 'Hello! I am the UAI Innovation Assistant. How can I help you build tomorrow, today?' },
        { keywords: ['contact', 'email', 'phone', 'address'], response: 'You can reach us at info@uai-innovation.org or call +237 123 456 789. Our office is in Yaounde, Cameroon.' },
        { keywords: ['election', 'vote', 'candidate'], response: 'Elections for organization leadership are held annually. Check the "Elections" page for current announcements and candidate profiles.' },
        { keywords: ['finance', 'report', 'profit', 'transparency'], response: 'We prioritize transparency. Annual reports and financial policies are available on our "Finance" page.' }
    ];

    function getAIResponse(userText) {
        const text = userText.toLowerCase();
        for (const entry of knowledgeBase) {
            if (entry.keywords.some(keyword => text.includes(keyword))) {
                return entry.response;
            }
        }
        return "That's an interesting question! While I don't have a specific answer right now, our team would be happy to discuss it. Would you like our contact details?";
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';

            // Artificial delay for "typing"
            setTimeout(() => {
                const response = getAIResponse(text);
                addMessage(response, 'ai');
            }, 600);
        }
    }

    if (chatSend) {
        chatSend.addEventListener('click', handleSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
