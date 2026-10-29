// STATE MANAGEMENT & LOCAL STORAGE
const STORAGE_KEY = 'aelia_os_progress_v2';

let state = {
  cursosDone: false,
  espiaDone: false,
  padrinhosDone: false,
  titasDone: false,
  casmurroSelected: null,
  casmurroConfirmed: false,
  casmurroDone: false
};

// LOAD PROGRESS ON INIT
function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Erro ao carregar progresso:', e);
    }
  }
  updateUI();
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateUI();
}

// TAB SWITCHING
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active-tab');
    btn.classList.add('inactive-tab');
  });

  document.getElementById(`content-${tabName}`).classList.remove('hidden');
  document.getElementById(`tab-${tabName}`).classList.add('active-tab');
  document.getElementById(`tab-${tabName}`).classList.remove('inactive-tab');
}

// GAME 1: URSOS SEM CURSO
function initUrsos() {
  const body = document.getElementById('ursos-options');
  const text = document.getElementById('ursos-text');

  if (state.cursosDone) {
    text.innerText = "🎉 Missão Concluída! Pardo conseguiu organizar o evento, Panda recuperou seu celular e Polar fez um sorvete de matcha perfeito.";
    body.innerHTML = `<button disabled class="option-btn text-xs">✓ Missão Finalizada com Sucesso</button>`;
    return;
  }

  text.innerText = "Pardo quer fazer uma foto gigante de amizade na praça. O que você faz?";
  body.innerHTML = `
    <button onclick="solveUrsos(1)" class="option-btn">A) Comprar açaí para todos e chamar o Panda</button>
    <button onclick="solveUrsos(2)" class="option-btn">B) Deixar o Polar liderar com suas habilidades de gelo</button>
  `;
}

function solveUrsos(choice) {
  state.cursosDone = true;
  saveProgress();
  initUrsos();
}

// GAME 2: TRÊS ESPIÃS DEMAIS
function initEspia() {
  const body = document.getElementById('espia-options');
  const text = document.getElementById('espia-text');

  if (state.espiaDone) {
    text.innerText = "🕵️‍♀️ Missão Cumprida! O gadgets do WOOHP funcionou perfeitamente e o vilão foi detido.";
    body.innerHTML = `<button disabled class="option-btn text-xs">✓ Caso Resolvido pelo WOOHP</button>`;
    return;
  }

  text.innerText = "Jerry oferece três apetrechos para a missão contra o vilão que odeia gentileza:";
  body.innerHTML = `
    <button onclick="solveEspia(1)" class="option-btn">1) Batom-Laser com aroma de menta</button>
    <button onclick="solveEspia(2)" class="option-btn">2) Mochila a jato em tom verde-militar</button>
  `;
}

function solveEspia(choice) {
  state.espiaDone = true;
  saveProgress();
  initEspia();
}

// GAME 3: PADRINHOS MÁGICOS
function initPadrinhos() {
  const body = document.getElementById('padrinhos-options');
  const text = document.getElementById('padrinhos-text');

  if (state.padrinhosDone) {
    text.innerText = "✨ Desejo Concluído! Cosmo transformou o ambiente em um café literário verde. Wanda corrigiu os detalhes.";
    body.innerHTML = `<button disabled class="option-btn text-xs">✓ Desejo Realizado</button>`;
    return;
  }

  text.innerText = "Você pode fazer um desejo agora. Cosmo está segurando a varinha de ponta-cabeça!";
  body.innerHTML = `
    <button onclick="solvePadrinhos(1)" class="option-btn">"Quero uma biblioteca infinita com café verde!"</button>
    <button onclick="solvePadrinhos(2)" class="option-btn">"Quero um botão para mandar pessoas chatas calarem a boca!"</button>
  `;
}

function solvePadrinhos(choice) {
  state.padrinhosDone = true;
  saveProgress();
  initPadrinhos();
}

// GAME 4: JOVENS TITÃS
function initTitas() {
  const body = document.getElementById('titas-options');
  const text = document.getElementById('titas-text');

  if (state.titasDone) {
    text.innerText = "🍕 Caos Resolvido! A Torre dos Titãs voltou ao normal e Ravena conseguiu ler Machado de Assis em paz.";
    body.innerHTML = `<button disabled class="option-btn text-xs">✓ Torre Pacificada</button>`;
    return;
  }

  text.innerText = "Robin está exigindo um treinamento rigoroso às 6h da manhã. O que fazer?";
  body.innerHTML = `
    <button onclick="solveTitas(1)" class="option-btn">Colocar uma música de Samba para descontrair a equipe</button>
    <button onclick="solveTitas(2)" class="option-btn">Pedir para Ravena usar magia e mandar o alarme para outra dimensão</button>
  `;
}

function solveTitas(choice) {
  state.titasDone = true;
  saveProgress();
  initTitas();
}

// GAME 5: DOM CASMURRO (REQUIREMENT MECHANICS)
const casmurroData = {
  question: "Caso Capitu & Bentinho: Diante dos olhos de ressaca e do ciúme obcecado do narrador, qual é o seu veredito?",
  options: [
    { id: 'a', text: "A) Capitu era livre e inteligente; Bentinho construiu a traição na própria mente de ciumento." },
    { id: 'b', text: "B) Há ambiguidades intencionais; Machado escreveu para nos deixar na dúvida eterna." },
    { id: 'c', text: "C) Bentinho era um 'sonso' que não entendia o mundo ao seu redor." }
  ]
};

function initCasmurro() {
  const qEl = document.getElementById('casmurro-question');
  const container = document.getElementById('casmurro-options-container');
  const confirmBtn = document.getElementById('casmurro-confirm-btn');
  const feedback = document.getElementById('casmurro-result-feedback');

  qEl.innerText = casmurroData.question;
  container.innerHTML = '';

  casmurroData.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = `option-btn ${state.casmurroSelected === opt.id ? 'selected-option' : ''}`;
    btn.innerText = opt.text;
    btn.disabled = state.casmurroConfirmed;
    btn.onclick = () => selectCasmurroOption(opt.id);
    container.appendChild(btn);
  });

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

  // Mystery Track Unlock
  const mysteryCard = document.getElementById('mystery-track-card');
  if (completedCount === tasks.length) {
    mysteryCard.className = "p-5 rounded-2xl border-2 border-[#39FF14] bg-[#1A3020] text-center space-y-3";
    mysteryCard.innerHTML = `
      <h4 class="font-bold text-[#39FF14]">🎉 Faixa Misteriosa Desbloqueada!</h4>
      <p class="text-xs text-[#E0EADF]">Você completou 100% das missões! Aqui está sua recomendação especial de música e um agradecimento pela amizade.</p>
      <a href="https://open.spotify.com/playlist/5lEkR5HoInNCc1m2wOKT0u" target="_blank" class="inline-block px-4 py-2 bg-[#39FF14] text-[#08120C] font-bold rounded-lg text-xs">Ouvir Faixa Especial no Spotify</a>
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
