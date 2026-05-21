const phrases = ['with pure natural language.', 'at lightspeed.', 'without complex environments.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function animateTypewriter() {
  const currentText = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterElement.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(animateTypewriter, 2000); // Wait before clearing active phrase
      return;
    }
  } else {
    typewriterElement.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(animateTypewriter, isDeleting ? 40 : 80);
}

const dataset = {
  chat: {
    code: `// AI Chat UI Component
const Chat = () => {
  return (
    <div className="chat-box">
      <header className="chat-nav">
        <h4>Aero Assistant</h4>
        <span className="dot" />
      </header>
      <div className="messages">
        <p className="bubble text-bot">
          How can I help you build today?
        </p>
        <p className="bubble text-user">
          Generate a dark-mode card structure.
        </p>
      </div>
    </div>
  );
};`,
    render: `
      <div class="canvas-app">
        <div class="canvas-nav">
          <span style="font-weight:700; font-size:0.8rem; color:#8b5cf6;">✦ Aero AI Assistant</span>
          <span style="width:8px; height:8px; border-radius:50%; background:#27c93f;"></span>
        </div>
        <div class="canvas-body" style="background:#0c0c11; min-height:180px; display:flex; flex-direction:column; justify-content:flex-end; gap:8px;">
          <div style="align-self:flex-start; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); padding:10px 14px; border-radius:12px; font-size:0.75rem; max-width:80%;">
            How can I help you build today?
          </div>
          <div style="align-self:flex-end; background:#6366f1; padding:10px 14px; border-radius:12px; font-size:0.75rem; max-width:80%; color:white; font-weight:500;">
            Generate a dark-mode card structure.
          </div>
        </div>
      </div>`
  },
  saas: {
    code: `// SaaS Analytics Matrix
const Metrics = () => {
  return (
    <div className="grid">
      <div className="card">
        <h5>Total Volume</h5>
        <h3>$142,380</h3>
        <span className="up">+12.4%</span>
      </div>
      <div className="card">
        <h5>Active Node Instances</h5>
        <h3>2,480</h3>
        <span className="stable">Active</span>
      </div>
    </div>
  );
};`,
    render: `
      <div class="canvas-app" style="background:#0c0c11;">
        <div class="canvas-nav">
          <span style="font-weight:700; font-size:0.8rem; color:#d946ef;">📊 SaaS Matrix</span>
        </div>
        <div class="canvas-body" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="canvas-card">
            <span style="font-size:0.65rem; color:#52525b; display:block; margin-bottom:4px;">Revenue Growth</span>
            <span style="font-size:1.1rem; font-weight:800; display:block; margin-bottom:4px;">$142,380</span>
            <span style="font-size:0.65rem; color:#27c93f; background:rgba(39,201,63,0.1); padding:2px 6px; border-radius:4px;">+12.4%</span>
          </div>
          <div class="canvas-card">
            <span style="font-size:0.65rem; color:#52525b; display:block; margin-bottom:4px;">Node Clients</span>
            <span style="font-size:1.1rem; font-weight:800; display:block; margin-bottom:4px;">2,480</span>
            <span style="font-size:0.65rem; color:#8b5cf6; background:rgba(139,92,246,0.1); padding:2px 6px; border-radius:4px;">Active</span>
          </div>
        </div>
      </div>`
  },
  card: {
    code: `// Dynamic Profile Card
const Card = () => {
  return (
    <div className="profile-card">
      <img src="avatar.png" className="avatar" />
      <div className="info">
        <h3>Elena Rostova</h3>
        <p>Aero Core Developer</p>
      </div>
    </div>
  );
};`,
    render: `
      <div class="canvas-app" style="background:#0c0c11; width:260px; border-radius:12px;">
        <div class="canvas-body" style="display:flex; flex-direction:column; align-items:center; text-align:center; padding:32px 20px;">
          <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #6366f1, #d946ef); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.4rem; color:white; margin-bottom:16px; border:2px solid rgba(255,255,255,0.1);">ER</div>
          <h3 style="font-size:0.95rem; font-weight:700; margin-bottom:4px; color:white;">Elena Rostova</h3>
          <p style="font-size:0.75rem; color:#a1a1aa; margin-bottom:16px;">Aero Core Developer</p>
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); width:100%; padding:8px 12px; border-radius:6px; font-size:0.7rem; color:#a1a1aa;">
            📍 Berlin Area, EU
          </div>
        </div>
      </div>`
  }
};

let typingTimer = null;

function loadPrompt(type) {
  document.querySelectorAll('.prompt-card').forEach(card => card.classList.remove('active'));
  document.getElementById(`btn-${type}`).classList.add('active');

  const editorElement = document.getElementById('code-output');
  const previewStage = document.getElementById('sandbox-stage');

  if (typingTimer) clearInterval(typingTimer);

  const targetData = dataset[type];
  let characterIndex = 0;
  editorElement.innerHTML = "";
  previewStage.style.opacity = "0.2";

  typingTimer = setInterval(() => {
    if (characterIndex < targetData.code.length) {
      const currentSlice = targetData.code.substring(0, characterIndex + 1);
      editorElement.innerHTML = applySimpleHighlighting(currentSlice);
      characterIndex += 3; 
      editorElement.scrollTop = editorElement.scrollHeight;
    } else {
      clearInterval(typingTimer);
      editorElement.innerHTML = applySimpleHighlighting(targetData.code);
      previewStage.innerHTML = targetData.render;
      previewStage.style.opacity = "1";
    }
  }, 10);
}
function applySimpleHighlighting(code) {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
    .replace(/(const|return|export|default)/g, '<span class="code-tag">$1</span>')
    .replace(/(className|src|id|onclick)/g, '<span class="code-attr">$1</span>')
    .replace(/("[^"]*")/g, '<span class="code-str">$1</span>')
    .replace(/(&lt;[A-Za-z]+|&lt;\/[A-Za-z]+|&gt;)/g, '<span class="code-class">$1</span>');
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('custom-toast');
  const toastText = document.getElementById('toast-message');
  toastText.textContent = message;
  
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function setupUserInteractions() {
  document.getElementById('nav-get-started').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Starting registration container...');
  });

  document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    showToast('Responsive mobile navigation details active.');
  });

  document.getElementById('btn-chat').addEventListener('click', () => loadPrompt('chat'));
  document.getElementById('btn-saas').addEventListener('click', () => loadPrompt('saas'));
  document.getElementById('btn-card').addEventListener('click', () => loadPrompt('card'));
  document.getElementById('cta-action-btn').addEventListener('click', () => {
    showToast('Spinning up workspace instance sandbox...');
  });
  document.getElementById('footer-privacy-btn').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Legal terms information overlay triggered.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateTypewriter();
  loadPrompt('chat'); // Prime initial layout
  setupUserInteractions();
});