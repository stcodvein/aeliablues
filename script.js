const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "note") {
    // The personal note remains accessible at any time; no progress is required.
  }
}

document.getElementById("tuneIn").addEventListener("click", () => {
  showScreen("studio");
  showToast("Transmissão iniciada. O locutor promete tentar se comportar.");
});

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.open));
});
document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => showScreen("studio"));
});

document.getElementById("soundToggle").addEventListener("click", () => {
  document.body.classList.toggle("sound-off");
  const off = document.body.classList.contains("sound-off");
  document.getElementById("soundToggle").textContent = off ? "∅" : "♫";
  showToast(off ? "Animação sonora reduzida." : "Ondas sonoras ativadas.");
});

// Music stations update the featured card. The first recommendation is explicitly Ray Charles & Lionel Richie.
const musicCopy = {
  blues: {
    title: "Blues depois da meia-noite",
    description: "Para ouvir com calma, olhar pela janela e fingir que está num filme independente.",
    artists: "Ray Charles & Lionel Richie",
    note: "Uma sugestão de blues/soul para começar a estação.",
    query: "Ray+Charles+Lionel+Richie+blues"
  },
  samba: {
    title: "Samba sem moderação",
    description: "Uma estação para lembrar que a música brasileira sempre tem espaço na programação.",
    artists: "Samba para acompanhar a tarde",
    note: "Uma seleção para abrir e explorar no seu próprio ritmo.",
    query: "samba+classicos+playlist"
  },
  rap: {
    title: "Frequência do rap",
    description: "Rimas, presença, resposta rápida e argumentos que não sobrevivem a uma boa réplica.",
    artists: "Childish Gambino & batalhas de rap",
    note: "Uma porta de entrada para os sons e as batalhas que você acompanha.",
    query: "Childish+Gambino+best+songs"
  }
};
document.querySelectorAll("[data-genre]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-genre]").forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    const data = musicCopy[button.dataset.genre];
    document.querySelector(".feature-copy h3").textContent = data.title;
    document.querySelector(".feature-copy > p").textContent = data.description;
    document.querySelector(".recommendation strong").textContent = data.artists;
    document.querySelector(".recommendation > span:last-child").textContent = data.note;
    document.querySelector(".text-link").href = `https://www.youtube.com/results?search_query=${data.query}`;
  });
});

// Book interaction
const bookFeedback = document.getElementById("bookFeedback");
document.querySelectorAll("[data-book-choice]").forEach(button => {
  button.addEventListener("click", () => {
    const messages = {
      confia: "Uma decisão corajosa. A emissora recomenda manter o senso crítico e não assinar nada sem ler as letras miúdas.",
      desconfia: "Uma leitora cautelosa. Machado provavelmente aprovaria a desconfiança — ou escreveria um capítulo inteiro fingindo que não."
    };
    bookFeedback.textContent = messages[button.dataset.bookChoice];
  });
});

// Game tabs
const gamePanels = {
  reply: document.getElementById("gameReply"),
  find: document.getElementById("gameFind"),
  rap: document.getElementById("gameRap")
};
document.querySelectorAll("[data-game]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-game]").forEach(tab => tab.classList.toggle("active", tab === button));
    Object.entries(gamePanels).forEach(([key, panel]) => panel.classList.toggle("hidden", key !== button.dataset.game));
  });
});

// Objection mini-game
document.querySelectorAll("[data-reply]").forEach(button => {
  button.addEventListener("click", () => {
    const responses = {
      diplomacia: "Resposta diplomática registrada. O locutor foi encaminhado para um curso básico de educação.",
      olhar: "A emissora reconhece a eficácia do olhar. O réu solicitou representação legal e não encontrou ninguém.",
      caos: "Transformar a falta de educação em reunião é um talento corporativo. Aprovado com ressalvas."
    };
    document.getElementById("replyFeedback").textContent = responses[button.dataset.reply];
  });
});

// Hidden object game
const foundItems = new Set();
document.querySelectorAll("[data-item]").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    const targets = new Set(["record", "book", "mic"]);
    if (!targets.has(item)) {
      document.getElementById("huntFeedback").textContent = "Isso é uma planta/caneca. A emissora agradece sua contribuição decorativa.";
      return;
    }
    if (foundItems.has(item)) return;
    foundItems.add(item);
    button.classList.add("found");
    document.getElementById("huntFeedback").textContent = `Encontrados: ${foundItems.size} de 3`;
    if (foundItems.size === 3) {
      document.getElementById("huntFeedback").textContent = "Estúdio organizado! Você desbloqueou: o locutor admite que precisa de supervisão.";
      showToast("Desafio concluído. +1 ponto de cultura imaginário.");
    }
  });
});
// Rap battle
document.querySelectorAll("[data-rap]").forEach(button => {
  button.addEventListener("click", () => {
    const replies = {
      "1": "Golpe certeiro. O locutor foi retirado do microfone para refletir sobre seus atos.",
      "2": "A comparação foi aceita pela banca. O argumento do réu realmente perdeu o sinal.",
      "3": "Ataque pessoal, porém fundamentado. O locutor concorda que é sonso e pede direito de resposta."
    };
    document.getElementById("rapFeedback").textContent = replies[button.dataset.rap];
  });
});

// Keep in-page navigation predictable if a hash is manually opened.
window.addEventListener("hashchange", () => {
  const target = location.hash.slice(1);
  if (screens.some(screen => screen.id === target)) showScreen(target);
});
