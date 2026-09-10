import gsap from 'gsap';
import { findBestTopic, getDeflection } from './knowledgeBase.js';

const WORKER_URL = 'https://laxmi-portfolio-ai.laxmi-ai-portfolio.workers.dev';

export function initChatPanel() {
  const aiDrawer = document.getElementById('aiDrawer');
  const aiFabBtn = document.getElementById('aiFabBtn');
  const closeAiDrawer = document.getElementById('closeAiDrawer');
  const chatMessagesContainer = document.getElementById('chatMessagesContainer');
  const suggestedButtons = document.querySelectorAll('.suggested-prompt-btn');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendChatBtn');

  if (!aiDrawer) return;

  let hasTypedGreeting = false;

  function toggleAiDrawer(open) {
    const shouldOpen = open !== undefined ? open : aiDrawer.classList.contains('translate-x-full');
    if (shouldOpen) {
      aiDrawer.classList.remove('translate-x-full');
      aiDrawer.classList.add('translate-x-0');
      if (aiFabBtn) {
        aiFabBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
      }
      
      if (!hasTypedGreeting) {
        startGreetingSequence();
        hasTypedGreeting = true;
      }
    } else {
      aiDrawer.classList.add('translate-x-full');
      aiDrawer.classList.remove('translate-x-0');
      if (aiFabBtn) {
        aiFabBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
      }
    }
  }

  if (aiFabBtn) aiFabBtn.addEventListener('click', () => toggleAiDrawer(true));
  if (closeAiDrawer) closeAiDrawer.addEventListener('click', () => toggleAiDrawer(false));

  // Typewriter effect function
  function typeText(element, text, speed = 20, callback = null) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      } else {
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);
  }

  function startGreetingSequence() {
    const greetingBox = document.getElementById('aiGreetingMsg');
    
    if (greetingBox) {
      const text = "Hello! I'm an AI assistant trained on Laxmi's portfolio and experience. How can I help you today?";
      typeText(greetingBox, text, 20, () => {
        if (suggestedButtons.length > 0) {
          gsap.fromTo(suggestedButtons,
            { opacity: 0, y: 15, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.7)'
            }
          );
        }
      });
    }
  }

  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bg-primary-container text-on-primary-container p-3 rounded-lg self-end max-w-[85%] text-sm font-label-caps border border-primary/20 shadow-md animate-fade-in';
    msgDiv.textContent = text;
    chatMessagesContainer.appendChild(msgDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  // Show temporary loading indicator bubble
  function showLoadingBubble() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bg-surface-container p-4 rounded-lg self-start max-w-[85%] text-sm ghost-border shadow-md flex items-center gap-2 text-on-surface-variant/70 italic';
    loadingDiv.id = 'aiLoadingBubble';
    loadingDiv.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
      <span>Thinking...</span>
    `;
    chatMessagesContainer.appendChild(loadingDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    return loadingDiv;
  }

  async function appendAiResponse(questionText) {
    const loadingBubble = showLoadingBubble();

    let finalReply = null;

    // 1. Try fetching Cloudflare Worker API with 8s timeout
    if (WORKER_URL && WORKER_URL !== 'YOUR_DEPLOYED_WORKER_URL_HERE') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: questionText }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            finalReply = data.reply;
          }
        }
      } catch (err) {
        // Silent fallback on network error or timeout
        console.warn('Worker API unavailable, using local knowledge base fallback.', err);
      }
    }

    // 2. Local Fallback if Worker fetch fails or times out
    if (!finalReply) {
      finalReply = findBestTopic(questionText) || getDeflection();
    }

    // Remove loading indicator bubble
    if (loadingBubble && loadingBubble.parentNode) {
      loadingBubble.parentNode.removeChild(loadingBubble);
    }

    // Render AI response with typewriter animation
    const aiDiv = document.createElement('div');
    aiDiv.className = 'bg-surface-container p-4 rounded-lg self-start max-w-[85%] text-sm ghost-border shadow-md';
    chatMessagesContainer.appendChild(aiDiv);
    
    typeText(aiDiv, finalReply, 20);
  }

  suggestedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const qText = btn.textContent.trim();
      appendUserMessage(qText);
      setTimeout(() => {
        appendAiResponse(qText);
      }, 300);
    });
  });

  function handleSend() {
    const val = chatInput.value.trim();
    if (!val) return;
    appendUserMessage(val);
    chatInput.value = '';
    setTimeout(() => {
      appendAiResponse(val);
    }, 300);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}
