// ========= NAVIGATION =========
function showSection(sectionId) {
  const sections = ["home", "how-it-works", "quiz", "pricing", "testimonials", "signup"];
  sections.forEach((id) => {
    const el = document.getElementById(`${id}-section`);
    if (el) el.classList.toggle("hidden", id !== sectionId);
  });

  if (sectionId === "quiz") {
    currentQuestion = 0;
    quizAnswers = {};
    renderQuizQuestion();
  }

  document.getElementById("app-wrapper").scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  menu.classList.toggle("active");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
}

// ========= TOAST =========
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  const bg =
    type === "success" ? "bg-green-600/90" : type === "error" ? "bg-red-600/90" : "bg-blue-600/90";

  toast.className = `toast ${bg} text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] border border-white/10 backdrop-blur`;
  toast.innerHTML = `
    <span class="text-xl">${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
    <span class="font-medium">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ========= QUIZ DATA =========
const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal sleep schedule? 🌙",
    emoji: "😴",
    options: [
      { label: "Early bird (before 10pm)", value: "early", emoji: "🌅" },
      { label: "Night owl (after midnight)", value: "late", emoji: "🦉" },
      { label: "Flexible - depends on the day", value: "flexible", emoji: "🔄" },
      { label: "I'm a vampire (sleep during day)", value: "vampire", emoji: "🧛" },
    ],
  },
  {
    id: 2,
    question: "How do you feel about guests/visitors? 🚪",
    emoji: "👥",
    options: [
      { label: "The more the merrier!", value: "social", emoji: "🎉" },
      { label: "Occasional visitors are fine", value: "moderate", emoji: "👋" },
      { label: "Prefer to keep it private", value: "private", emoji: "🤫" },
      { label: "Only with advance notice", value: "planned", emoji: "📅" },
    ],
  },
  {
    id: 3,
    question: "How would you describe your cleanliness? 🧹",
    emoji: "✨",
    options: [
      { label: "Marie Kondo level neat freak", value: "neat", emoji: "✨" },
      { label: "Clean but not obsessive", value: "moderate", emoji: "👍" },
      { label: "Organized chaos works for me", value: "casual", emoji: "🌀" },
      { label: "I'll clean when I notice", value: "relaxed", emoji: "😅" },
    ],
  },
  {
    id: 4,
    question: "What's your study/work style? 📚",
    emoji: "💻",
    options: [
      { label: "Complete silence please", value: "silent", emoji: "🤫" },
      { label: "Background music/noise is fine", value: "background", emoji: "🎵" },
      { label: "I study best in cafes/public", value: "public", emoji: "☕" },
      { label: "I can focus through anything", value: "flexible", emoji: "🧘" },
    ],
  },
  {
    id: 5,
    question: "How do you handle shared expenses? 💰",
    emoji: "🧾",
    options: [
      { label: "Split everything 50/50 exactly", value: "exact", emoji: "⚖️" },
      { label: "Take turns paying, it evens out", value: "turns", emoji: "🔄" },
      { label: "Keep separate, minimal sharing", value: "separate", emoji: "📊" },
      { label: "Flexible - whatever works", value: "flexible", emoji: "🤝" },
    ],
  },
];

let currentQuestion = 0;
let quizAnswers = {};

function renderQuizQuestion() {
  const container = document.getElementById("quiz-content");
  const stepEl = document.getElementById("quiz-step");
  const progressEl = document.getElementById("quiz-progress");

  if (!container || !stepEl || !progressEl) return;

  if (currentQuestion >= quizQuestions.length) {
    renderQuizResults();
    return;
  }

  const q = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  stepEl.textContent = `${currentQuestion + 1} of ${quizQuestions.length}`;
  progressEl.style.width = `${progress}%`;

  container.innerHTML = `
    <div class="text-center mb-8">
      <div class="text-5xl mb-4">${q.emoji}</div>
      <h3 class="font-display font-bold text-xl sm:text-2xl text-white">${q.question}</h3>
    </div>

    <div class="space-y-3">
      ${q.options
        .map(
          (opt) => `
        <div
          class="quiz-option p-4 sm:p-5 rounded-2xl flex items-center gap-4 ${
            quizAnswers[q.id] === opt.value ? "selected" : ""
          }"
          onclick="selectQuizOption(${q.id}, '${opt.value}')"
        >
          <span class="text-2xl">${opt.emoji}</span>
          <span class="font-medium text-white/90">${opt.label}</span>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="flex gap-4 mt-8">
      ${
        currentQuestion > 0
          ? `
        <button onclick="prevQuestion()" class="flex-1 btn-glass py-4 rounded-xl font-bold border-white/15">
          ← Back
        </button>
      `
          : ""
      }

      <button
        onclick="nextQuestion()"
        class="flex-1 btn-glass py-4 rounded-xl font-bold ${!quizAnswers[q.id] ? "opacity-50 cursor-not-allowed" : ""}"
        ${!quizAnswers[q.id] ? "disabled" : ""}
      >
        ${currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next →"}
      </button>
    </div>
  `;
}

function selectQuizOption(questionId, value) {
  quizAnswers[questionId] = value;
  renderQuizQuestion();
}

function nextQuestion() {
  if (!quizAnswers[quizQuestions[currentQuestion].id]) return;
  currentQuestion++;
  renderQuizQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuizQuestion();
  }
}

function renderQuizResults() {
  const container = document.getElementById("quiz-content");
  const stepEl = document.getElementById("quiz-step");
  const progressEl = document.getElementById("quiz-progress");

  if (!container || !stepEl || !progressEl) return;

  stepEl.textContent = "Complete!";
  progressEl.style.width = "100%";

  const sleepType =
    quizAnswers[1] === "early"
      ? "Early Bird 🌅"
      : quizAnswers[1] === "late"
      ? "Night Owl 🦉"
      : quizAnswers[1] === "vampire"
      ? "Vampire Mode 🧛"
      : "Flexible Sleeper 🔄";

  container.innerHTML = `
    <div class="text-center">
      <div class="text-6xl mb-4">🎉</div>
      <h3 class="font-display font-bold text-2xl sm:text-3xl text-white mb-4">Your Roommate Profile!</h3>
      <p class="text-white/70 mb-8">Based on your answers, here’s your vibe:</p>

      <div class="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left">
        <p class="text-white/70 mb-2">Sleep style:</p>
        <p class="font-bold text-white">${sleepType}</p>
      </div>

      <button onclick="showSection('signup')" class="w-full btn-glass py-5 rounded-xl font-bold text-lg mb-4">
        Get Early Access to See Matches! 🚀
      </button>

      <button onclick="currentQuestion = 0; quizAnswers = {}; renderQuizQuestion();" class="text-white/60 hover:text-white font-medium">
        ↺ Retake Quiz
      </button>
    </div>
  `;
}

// ========= SIGNUP (demo) =========
async function handleSignup(e) {
  e.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const university = document.getElementById("university")?.value.trim();

  if (!email || !university) {
    showToast("Please fill in all fields", "error");
    return;
  }

  const btn = document.getElementById("signup-btn");
  const btnText = document.getElementById("signup-btn-text");
  const spinner = document.getElementById("signup-spinner");

  btn.disabled = true;
  btnText.textContent = "Signing up...";
  spinner.classList.remove("hidden");

  await new Promise((r) => setTimeout(r, 700));

  btn.disabled = false;
  btnText.textContent = "Join the Waitlist 🚀";
  spinner.classList.add("hidden");

  document.getElementById("email").value = "";
  document.getElementById("university").value = "";

  showToast("You're on the list! Check your email soon.", "success");
}

// Init
showSection("home");
