const quizData = [
  {
    question: "1. Makanan favorit dea",
    choices: ["pizza", "gado-gado ", "nasi goreng", "ga boleh pilih-pilih makanan"],
    correct: "ga boleh pilih-pilih makanan",
  },
  {
    question: "2. Apakah Dea sudah move on?",
    choices: [
      "belum, astaga tadi aja baru chat",
      "udah, fix udah",
      "sebaiknya jangan ditanya",
      "sudah dicoba tapi masih proses",
    ],
    correct: "sudah dicoba tapi masih proses",
  },
  {
    question: "3. Band favorit dea apa?",
    choices: [
      "BITIES(BTS) dong",
      "the 1975",
      "sheila on 7",
      "suka grace sah",
    ],
    correct: "suka grace sah",
  },
  {
    question: "4. Disaat dea lahir, apa yang terjadi?",
    choices: ["petir nyamber genteng rs", "pasukan israel datang menyusup rs", "langsung minta rokok", "none of the above"],
    correct: "none of the above",
  },
    {
    question: "5. Tanggal lahir dea",
    choices: ["17 agustus 1945", "6 agustus 2007", "6 agustus 2006", "dea hanya sebatas imajinasi"],
    correct: "6 agustus 2006",
  },
    {
    question: "6. Dari skala 1 sampe 10, seberapa move on dea?",
    choices: ["10 donggggg", "dea blm bisa move on tapi 5 ada lah", "ada nona ambon disini?", "bawa kasih dea grace do"],
    correct: "bawa kasih dea grace do",
  },
    {
    question: "7. Mapel favorit dea apa?",
    choices: ["FISIKA", "matematika minat", "apa aja yg penting bukan pak will yang ngajar", "seni budaya"],
    correct: "apa aja yg penting bukan pak will yang ngajar",
  },
    {
    question: "8. Finish the lyric: Baru kusadari...",
    choices: ["cintaku bertepuk sebelah tangan", "ternyata badut selama 3 tahun", "crisping up on your backburner", "rupa rupa warna nya"],
    correct: "cintaku bertepuk sebelah tangan",
  },
    {
    question: "9. Alasan dea jatuh hati dengan grace?",
    choices: ["MATA NYA YG BERSINAR DAN SENYUM MANIS NYA", "HUMOR NYA SAMA", "MIXED SIGNALS(dea avoidant jd su paling pas ketipu terus)", "all of the above"],
    correct: "all of the above",
  },
    {
    question: "10. Skala goblok nya dea berapa?",
    choices: ["4 sih, bucin itu normal", "10/10 DEA GOBLOK BGT", "100/10 su tolol goblok le", "cinta tidak bisa dinilai"],
    correct: "cinta tidak bisa dinilai",
  },
     {
    question: "11. Selama 2 tahun OSN apa hal paling mengesankan bagi dea?",
    choices: ["ketidakjelasan hubungan dea selama 2 tahun itu", "materi astronomi", "the fact that she didn't cared about dea at all", "ketidakpuasan kemenangan karna yang menang tetap pacarnya dia"],
    correct: "materi astronomi",
  },
     {
    question: "12. Dream job dea saat kelas 8?",
    choices: ["terlalu banyak sampe pusing sendiri", "film producer", "kerja bareng messi", "koki/chef"],
    correct: "terlalu banyak sampe pusing sendiri",
  },
     {
    question: "13. MBTI dea yang sekarang apa?",
    choices: ["leo", "ENFJ", "INFP", "INTP"],
    correct: "ENFJ",
  },
     {
    question: "14. Is dea still in love with that person?",
    choices: ["yes", "besok", "su move on", "ahhellnahh"],
    correct: "yes",
  },
     {
    question: "15. Will dea move on with her life with/out that person?",
    choices: ["i dont think so", "idk maybe", "of course", "ga"],
    correct: "of course",
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const quizContainer = document.getElementById("quiz");

function startQuiz() {
  showQuestion();
  startTimer();
  nextBtn.style.display = "none";
  resultEl.classList.add("hidden");
}

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  choicesEl.innerHTML = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, q.correct));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const selected = button.textContent;

  Array.from(choicesEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.borderColor = "#00ffcc";
    }
    if (btn.textContent === selected && selected !== correctAnswer) {
      btn.style.borderColor = "#ff4d4d";
    }
  });

  if (selected === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
  resultEl.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 60;
  resultEl.classList.add("hidden");
  restartBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  timeEl.textContent = timeLeft;
  startQuiz();
});

// Start on page load
startQuiz();
