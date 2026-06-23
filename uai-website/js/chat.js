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

    // AI Response System - Enhanced Knowledge Base
    const knowledgeBase = [
        { keywords: ['membership', 'join', 'apply', 'become', 'member'], response: 'To join the UAI Network, visit our "Join Us" page. Membership tiers include Individual ($50/mo), Premium ($120/mo), and Corporate ($500/mo). Membership grants access to our investment pipeline and voting rights.' },
        { keywords: ['investment', 'invest', 'shares', 'shareholder', 'profit', 'dividends', 'equity'], response: 'UAI provides institutional-grade equity opportunities. Shareholders participate in profit distribution from our diversified portfolio. Current unit price is $5.00. Detailed reports are available in your Dashboard.' },
        { keywords: ['agriculture', 'farming', 'irrigation', 'agro'], response: 'Our Agricultural sector focuses on sustainable systems like the Smart Irrigation Hub, which uses solar power to assist smallholder farmers in increasing yields.' },
        { keywords: ['technology', 'tech', 'software', 'fintech', 'mobile'], response: 'UAI Technology develops solutions like the UAI Mobile Wallet to drive financial inclusion in rural communities, and agritech tools for project management.' },
        { keywords: ['energy', 'renewable', 'solar', 'clean'], response: 'We are committed to clean energy. Our Village Solar Grid project provides modular solar kits to off-grid communities, ensuring sustainable power access.' },
        { keywords: ['education', 'training', 'learn', 'workshop'], response: 'Through our Education initiatives, we provide training programs and workshops to equip African youth with innovation and entrepreneurship skills.' },
        { keywords: ['commerce', 'trade', 'business', 'supply chain'], response: 'UAI Commerce facilitates regional trade by establishing efficient supply chains and supporting local entrepreneurs in scaling their businesses.' },
        { keywords: ['real estate', 'property', 'building', 'infrastructure'], response: 'Our Real Estate division develops modern, eco-friendly infrastructure for both residential and commercial sectors across the region.' },
        { keywords: ['hello', 'hi', 'hey', 'greetings'], response: 'Greetings! I am the UAI Innovation Assistant. I can help you with information about our sectors, membership, investments, and more. How can I assist you today?' },
        { keywords: ['contact', 'email', 'phone', 'address', 'whatsapp', 'location', 'where'], response: 'UAI is headquartered at the Innovation Tower, 123 Excellence Blvd, Yaoundé, Cameroon. You can reach us at info@uai-innovation.org or via our secure WhatsApp channel +237 600 000 000.' },
        { keywords: ['election', 'vote', 'candidate', 'governance', 'president'], response: 'UAI follows a democratic governance model. Members vote for leadership roles like President, Treasurer, and Secretary General. Current announcements are on the Elections page.' },
        { keywords: ['finance', 'report', 'transparency', 'annual', 'audit', 'statement'], response: 'We maintain high transparency. You can download our annual reports, financial statements, and audit logs from the Finance page.' },
        { keywords: ['who', 'what', 'uai', 'about', 'organization'], response: 'United Agro Innovation (UAI) is a multi-sector innovation and investment firm dedicated to building a sustainable future through African excellence and global impact.' },
        { keywords: ['vision', 'mission', 'motto'], response: 'Our motto is "Innovating Today, Building Tomorrow." Our vision is to be the leading catalyst for sustainable development in Africa.' },
        { keywords: ['values', 'integrity', 'excellence', 'transparency'], response: 'Our core values are Integrity, Innovation, Transparency, Accountability, Excellence, and Sustainability.' },
        { keywords: ['president', 'leadership', 'board'], response: 'UAI is led by a Board of Directors and an executive team including the President, Vice President, and Secretary General.' },
        { keywords: ['dashboard', 'portal', 'login', 'access'], response: 'Members can access their personalized portal through the "Members" link to manage profiles, contributions, and share certificates.' },
        { keywords: ['thank', 'thanks', 'bye', 'goodbye'], response: 'You are welcome! Feel free to ask if you have more questions. Building tomorrow, today!' }
    ];

    function getAIResponse(userText) {
        const text = userText.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            entry.keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 1;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }

        if (bestMatch && highestScore > 0) {
            return bestMatch.response;
        }

        return "I'm not sure I have a specific answer for that. You might find more information on our About or Finance pages, or you can contact our support team at info@uai-innovation.org.";
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
