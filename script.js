  if (state.casmurroConfirmed) {
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Escolha Confirmada ✓";
    feedback.classList.remove('hidden');
    feedback.innerHTML = `<strong>Veredito Registrado:</strong> Sua interpretação foi salva permanentemente no arquivo do tribunal.`;
  } else {
    confirmBtn.disabled = !state.casmurroSelected;
  }
}

function selectCasmurroOption(id) {
  if (state.casmurroConfirmed) return;
  state.casmurroSelected = id;
  initCasmurro();
}

function confirmCasmurroAnswer() {
  if (!state.casmurroSelected) return;
  state.casmurroConfirmed = true;
  state.casmurroDone = true;
  saveProgress();
  initCasmurro();
}

// MODAL DA CARTA
function openLetterModal() {
  document.getElementById('letter-modal').classList.remove('hidden');
}

function closeLetterModal() {
  document.getElementById('letter-modal').classList.add('hidden');
}

// RHYME GENERATOR
const rhymes = [
  "No ritmo do samba ou no tom do rap, Aelia não aceita gente mal-educada no clap!",
  "Ray Charles no piano, Gambino na voz, a amizade mais forte é a de nós dois e de nós!",
  "Dizem que sou sonso, não posso negar... mas criei esse site pra te impressionar!"
];

function generateRhyme() {
  const output = document.getElementById('rhyme-output');
  const random = rhymes[Math.floor(Math.random() * rhymes.length)];
  output.innerText = `🎤 "${random}"`;
  output.classList.remove('hidden');
}

// UPDATE GLOBAL UI & PROGRESS BAR
function updateUI() {
  const tasks = [state.cursosDone, state.espiaDone, state.padrinhosDone, state.titasDone, state.casmurroDone];
  const completedCount = tasks.filter(Boolean).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  // Update Progress Bars
  document.getElementById('header-progress-bar').style.width = `${percentage}%`;
  document.getElementById('header-progress-text').innerText = `${percentage}% CONCLUÍDO`;

  // Update Badges
  updateBadge('badge-ursos', state.cursosDone);
  updateBadge('badge-espia', state.espiaDone);
  updateBadge('badge-padrinhos', state.padrinhosDone);
  updateBadge('badge-titas', state.titasDone);
  updateBadge('badge-domcasmurro', state.casmurroDone);

  // Letter Reward Card Unlock (Show when 100% finished)
  const letterCard = document.getElementById('letter-reward-card');
  if (completedCount === tasks.length) {
    letterCard.classList.remove('hidden');
  } else {
    letterCard.classList.add('hidden');
  }

  // Mystery Track Unlock
  const mysteryCard = document.getElementById('mystery-track-card');
  if (completedCount === tasks.length) {
    mysteryCard.className = "p-5 rounded-2xl border-2 border-[#39FF14] bg-[#1A3020] text-center space-y-3";
    mysteryCard.innerHTML = `
      <h4 class="font-bold text-[#39FF14]">🎉 Faixa Misteriosa & Carta Desbloqueadas!</h4>
      <p class="text-xs text-[#E0EADF]">Você completou 100% das missões! Aqui está sua recomendação especial e acesso à sua carta.</p>
      <div class="flex flex-wrap justify-center gap-3 pt-2">
        <a href="https://open.spotify.com/playlist/5lEkR5HoInNCc1m2wOKT0u" target="_blank" class="px-4 py-2 bg-[#39FF14] text-[#08120C] font-bold rounded-lg text-xs">Ouvir Faixa no Spotify</a>
        <button onclick="openLetterModal()" class="px-4 py-2 bg-[#2C4A34] text-[#98FF98] border border-[#39FF14] font-bold rounded-lg text-xs">Abrir Carta Pessoal ✉️</button>
      </div>
    `;
  }

  // Update Achievements List
  const achList = document.getElementById('achievements-list');
  if (achList) {
    achList.innerHTML = `
      <div class="p-3 bg-[#0B1C10] rounded-xl border border-[#2C4A34] text-xs flex justify-between items-center">
        <span>🐻 Operação Ursos</span>
        <span class="${state.cursosDone ? 'text-[#39FF14]' : 'text-gray-500'} font-bold">${state.cursosDone ? 'Desbloqueado ✓' : 'Bloqueado'}</span>
      </div>
      <div class="p-3 bg-[#0B1C10] rounded-xl border border-[#2C4A34] text-xs flex justify-between items-center">
        <span>🕵️‍♀️ Missão WOOHP</span>
        <span class="${state.espiaDone ? 'text-[#39FF14]' : 'text-gray-500'} font-bold">${state.espiaDone ? 'Desbloqueado ✓' : 'Bloqueado'}</span>
      </div>
      <div class="p-3 bg-[#0B1C10] rounded-xl border border-[#2C4A34] text-xs flex justify-between items-center">
        <span>✨ Desejo Mágico</span>
        <span class="${state.padrinhosDone ? 'text-[#39FF14]' : 'text-gray-500'} font-bold">${state.padrinhosDone ? 'Desbloqueado ✓' : 'Bloqueado'}</span>
      </div>
      <div class="p-3 bg-[#0B1C10] rounded-xl border border-[#2C4A34] text-xs flex justify-between items-center">
        <span>🍕 Caos na Torre</span>
        <span class="${state.titasDone ? 'text-[#39FF14]' : 'text-gray-500'} font-bold">${state.titasDone ? 'Desbloqueado ✓' : 'Bloqueado'}</span>
      </div>
      <div class="p-3 bg-[#0B1C10] rounded-xl border border-[#2C4A34] text-xs flex justify-between items-center">
        <span>📖 Veredito Machado</span>
        <span class="${state.casmurroDone ? 'text-[#39FF14]' : 'text-gray-500'} font-bold">${state.casmurroDone ? 'Desbloqueado ✓' : 'Bloqueado'}</span>
      </div>
    `;
  }
}

function updateBadge(id, isDone) {
  const el = document.getElementById(id);
  if (!el) return;
  if (isDone) {
    el.innerText = "Concluído ✓";
    el.className = "status-badge bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40 px-2.5 py-1 rounded-full text-xs font-bold";
  } else {
    el.innerText = "Pendente";
    el.className = "status-badge bg-[#2C4A34] text-[#B0C4B1] px-2.5 py-1 rounded-full text-xs font-bold";
  }
}

// RESET PROGRESS
function promptResetProgress() {
  if (confirm("Tem certeza de que deseja reiniciar todo o seu progresso no site?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = {
      cursosDone: false,
      espiaDone: false,
      padrinhosDone: false,
      titasDone: false,
      casmurroSelected: null,
      casmurroConfirmed: false,
      casmurroDone: false
    };
    initUrsos();
    initEspia();
    initPadrinhos();
    initTitas();
    initCasmurro();
    saveProgress();
    alert("Progresso reiniciado com sucesso!");
  }
}

// INITIALIZE EVERYTHING ON LOAD
window.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initUrsos();
  initEspia();
  initPadrinhos();
  initTitas();
  initCasmurro();
});
