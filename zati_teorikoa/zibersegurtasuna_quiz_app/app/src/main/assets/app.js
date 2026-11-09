// KriptoQuiz 2026 - Logika Interaktiboa
// Goierri Eskola - 2MG3 Zibersegurtasuna

(function() {
  'use strict';

  // Egoera globala
  let allQuestions = [];
  let currentQuestions = [];
  let currentIndex = 0;
  let userAnswers = {}; // { questionId: selectedOptionIndex }
  let currentMode = 'exam'; // 'exam', 'practice', 'block', 'mistakes'
  let selectedBlock = null;
  let timerInterval = null;
  let timerSeconds = 0;
  let soundEnabled = true;

  // Blokeen izenak
  const BLOCK_NAMES = {
    1: '1. Oinarrizko Kontzeptuak',
    2: '2. Zifratze Simetrikoa',
    3: '3. Zifratze Asimetrikoa',
    4: '4. Hash Funtzioak',
    5: '5. Sinadura Digitala eta PKI',
    6: '6. Gako-Kudeaketa eta Erasoak',
    7: '7. Zabaltzea eta Etorkizuna'
  };

  // DOM elementuak
  const homeView = document.getElementById('homeView');
  const quizView = document.getElementById('quizView');
  const resultsView = document.getElementById('resultsView');
  const practicalView = document.getElementById('practicalView');
  const blockModal = document.getElementById('blockModal');
  const confirmExitModal = document.getElementById('confirmExitModal');
  const cancelExitBtn = document.getElementById('cancelExitBtn');
  const confirmExitBtn = document.getElementById('confirmExitBtn');
  const homeBtn = document.getElementById('homeBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const navPracticalBtn = document.getElementById('navPracticalBtn');
  const btnOpenPractical = document.getElementById('btnOpenPractical');
  const closePracticalBtn = document.getElementById('closePracticalBtn');
  const practicalSearchInput = document.getElementById('practicalSearchInput');
  const practicalFilterPills = document.getElementById('practicalFilterPills');
  const practicalListContainer = document.getElementById('practicalListContainer');

  let currentPracticalFilter = 'guztiak';
  let practicalSearchQuery = '';

  // Stats
  const statTotalQuestions = document.getElementById('statTotalQuestions');
  const statExamsDone = document.getElementById('statExamsDone');
  const statAvgScore = document.getElementById('statAvgScore');
  const mistakesCountEl = document.getElementById('mistakesCount');

  // Quiz UI
  const quizModeBadge = document.getElementById('quizModeBadge');
  const quizBlockBadge = document.getElementById('quizBlockBadge');
  const quizTimer = document.getElementById('quizTimer');
  const quizCounter = document.getElementById('quizCounter');
  const progressBar = document.getElementById('progressBar');
  const questionCategory = document.getElementById('questionCategory');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const explanationBox = document.getElementById('explanationBox');
  const explanationHeader = document.getElementById('explanationHeader');
  const explanationText = document.getElementById('explanationText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Emaitzak UI
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const scoreLarge = document.getElementById('scoreLarge');
  const scoreDetail = document.getElementById('scoreDetail');
  const resultStatusPill = document.getElementById('resultStatusPill');
  const retryExamBtn = document.getElementById('retryExamBtn');
  const reviewExamDetailsBtn = document.getElementById('reviewExamDetailsBtn');
  const backHomeBtn = document.getElementById('backHomeBtn');
  const reviewDetailsSection = document.getElementById('reviewDetailsSection');
  const reviewItemsList = document.getElementById('reviewItemsList');

  // Web Audio Soinu efektuak (Sintesia)
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.frequency.setValueAtTime(freq, now + i * 0.08);
          g.gain.setValueAtTime(0.12, now + i * 0.08);
          g.gain.linearRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
          o.start(now + i * 0.08);
          o.stop(now + i * 0.08 + 0.2);
        });
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Biltegiratze lokala (LocalStorage)
  function getStorageData() {
    try {
      const raw = localStorage.getItem('kripto_quiz_data');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { examsDone: 0, totalScores: 0, mistakes: [] };
  }

  function saveStorageData(data) {
    try {
      localStorage.setItem('kripto_quiz_data', JSON.stringify(data));
    } catch(e) {}
    updateDashboardStats();
  }

  function addMistake(id) {
    const data = getStorageData();
    if (!data.mistakes.includes(id)) {
      data.mistakes.push(id);
      saveStorageData(data);
    }
  }

  function removeMistake(id) {
    const data = getStorageData();
    data.mistakes = data.mistakes.filter(m => m !== id);
    saveStorageData(data);
  }

  function recordExamScore(scoreOutOfTen) {
    const data = getStorageData();
    data.examsDone += 1;
    data.totalScores += scoreOutOfTen;
    saveStorageData(data);
  }

  function updateDashboardStats() {
    const data = getStorageData();
    statTotalQuestions.textContent = allQuestions.length || 108;
    statExamsDone.textContent = data.examsDone;
    if (data.examsDone > 0) {
      const avg = (data.totalScores / data.examsDone).toFixed(1);
      statAvgScore.textContent = `${avg} / 10`;
    } else {
      statAvgScore.textContent = '-';
    }
    mistakesCountEl.textContent = data.mistakes.length;
  }

  // Galderak kargatu (Lehenik questions_data.js-ko window.KRIPTO_GALDERAK, bestela fetch)
  async function loadQuestions() {
    if (window.KRIPTO_GALDERAK && Array.isArray(window.KRIPTO_GALDERAK) && window.KRIPTO_GALDERAK.length > 0) {
      allQuestions = window.KRIPTO_GALDERAK;
      updateDashboardStats();
      return;
    }
    try {
      const res = await fetch('galderak.json');
      if (res.ok) {
        allQuestions = await res.json();
        updateDashboardStats();
      }
    } catch(err) {
      console.warn('Fetch fallback errorea:', err);
    }
  }

  // Ausaz nahasteko metodoa (Fisher-Yates)
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Test aktiboaren segurtasun kontrola (nahi gabe ez irteteko)
  let pendingExitAction = null;

  function isQuizActive() {
    return quizView && quizView.classList.contains('active') && currentQuestions.length > 0;
  }

  function requestExitConfirmation(action) {
    if (isQuizActive()) {
      pendingExitAction = action;
      if (confirmExitModal) {
        confirmExitModal.classList.remove('hidden');
      } else if (confirm("⚠️ Test-a egiten ari zara une honetan. Irtenez gero, uneko galderak eta erantzunak galduko dira.\n\nZiur zaude irten nahi duzula?")) {
        action();
      }
    } else {
      action();
    }
  }

  // Ikuspegia aldatu
  function switchView(viewName) {
    const appHeader = document.querySelector('.app-header');
    [homeView, quizView, resultsView, practicalView].forEach(v => {
      if (v) v.classList.remove('active');
    });
    if (viewName === 'home') {
      if (appHeader) appHeader.classList.remove('hidden');
      homeView.classList.add('active');
      homeBtn.classList.add('hidden');
      stopTimer();
      updateDashboardStats();
    } else if (viewName === 'quiz') {
      if (appHeader) appHeader.classList.remove('hidden');
      quizView.classList.add('active');
      homeBtn.classList.remove('hidden');
      try {
        history.pushState({ page: 'quiz' }, '');
      } catch (err) {}
    } else if (viewName === 'results') {
      if (appHeader) appHeader.classList.remove('hidden');
      resultsView.classList.add('active');
      homeBtn.classList.remove('hidden');
      stopTimer();
    } else if (viewName === 'practical') {
      if (appHeader) appHeader.classList.add('hidden');
      if (practicalView) practicalView.classList.add('active');
      homeBtn.classList.remove('hidden');
      stopTimer();
      renderPracticalItems();
    }
  }

  // Tenporizadorea
  function startTimer() {
    stopTimer();
    timerSeconds = 0;
    quizTimer.textContent = '⏱️ 00:00';
    timerInterval = setInterval(() => {
      timerSeconds++;
      const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const secs = String(timerSeconds % 60).padStart(2, '0');
      quizTimer.textContent = `⏱️ ${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Galdera baten 4 aukerak ausaz nahastu (A, B, C, D probabilitate berdina izateko)
  function prepareQuestionWithShuffledOptions(orig) {
    const optsWithMeta = orig.aukerak.map((opt, idx) => ({
      text: opt,
      isCorrect: (idx === orig.zuzena)
    }));
    const shuffledOpts = shuffle(optsWithMeta);
    const newZuzena = shuffledOpts.findIndex(o => o.isCorrect);
    return {
      ...orig,
      aukerak: shuffledOpts.map(o => o.text),
      zuzena: newZuzena
    };
  }

  // AZTERKETA MODUA HASI (20 galdera ausaz)
  function startExamMode() {
    if (!allQuestions || allQuestions.length === 0) {
      loadQuestions();
    }
    if (!allQuestions || allQuestions.length === 0) {
      alert("Galderak oraindik kargatzen ari dira. Mesedez, itxaron segundo bat eta sakatu berriro.");
      return;
    }
    currentMode = 'exam';
    selectedBlock = null;
    userAnswers = {};
    currentIndex = 0;

    // 20 galdera ausaz hartu eta bakoitzaren aukerak dinamikoki nahastu
    const shuffled = shuffle(allQuestions);
    currentQuestions = shuffled.slice(0, Math.min(20, shuffled.length)).map(prepareQuestionWithShuffledOptions);

    quizModeBadge.textContent = 'Azterketa Simulatua (20 Galdera)';
    quizBlockBadge.textContent = 'Gai Guztiak';
    startTimer();
    renderQuestion();
    switchView('quiz');
  }

  // IKASKETA LIBREA HASI (Guztiak edo aukeratuak berehalako feedbackarekin)
  function startPracticeMode(filteredList = null, blockTitle = 'Gai Guztiak') {
    if (!allQuestions || allQuestions.length === 0) {
      loadQuestions();
    }
    currentMode = 'practice';
    userAnswers = {};
    currentIndex = 0;

    const baseList = filteredList || allQuestions;
    currentQuestions = shuffle(baseList).map(prepareQuestionWithShuffledOptions);

    quizModeBadge.textContent = 'Ikasketa Librea';
    quizBlockBadge.textContent = blockTitle;
    startTimer();
    renderQuestion();
    switchView('quiz');
  }

  // HUTS EGINDAKO GALDERAK HASI
  function startMistakesMode() {
    const data = getStorageData();
    if (!data.mistakes || data.mistakes.length === 0) {
      alert("Ez duzu huts egindako galderarik erregistratuta! Egin azterketa bat lehenik.");
      return;
    }
    const filtered = allQuestions.filter(q => data.mistakes.includes(q.id));
    startPracticeMode(filtered, `Huts Egindakoak (${filtered.length})`);
    currentMode = 'mistakes';
    quizModeBadge.textContent = 'Hutsak Berrikusten';
  }

  // GALDERA MARRAZTU
  function renderQuestion() {
    if (!currentQuestions.length) return;
    const q = currentQuestions[currentIndex];

    // Counter & Progress
    quizCounter.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    const progressPercent = ((currentIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Data
    questionCategory.textContent = `${BLOCK_NAMES[q.blokea] || q.kategoria} · #${q.id}`;
    questionText.innerHTML = highlightSyntax(q.galdera);

    // Garbitu
    optionsContainer.innerHTML = '';
    explanationBox.classList.add('hidden');

    const letters = ['A', 'B', 'C', 'D'];
    const hasAnswered = userAnswers[q.id] !== undefined;

    q.aukerak.forEach((optText, idx) => {
      const btn = document.createElement('div');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-letter">${letters[idx]}</span> <span class="option-text">${highlightSyntax(optText)}</span>`;

      if (currentMode === 'exam') {
        // Azterketa modua: bakarrik aukeratua markatu, ez erakutsi oraindik zuzena/okerra
        if (hasAnswered && userAnswers[q.id] === idx) {
          btn.classList.add('selected');
        }
        btn.addEventListener('click', () => {
          playSound('click');
          userAnswers[q.id] = idx;
          renderQuestion();
        });
      } else {
        // Practice / Mistakes modua: Berehalako feedbacka
        if (hasAnswered) {
          btn.classList.add('locked');
          if (idx === q.zuzena) {
            btn.classList.add('correct');
          } else if (userAnswers[q.id] === idx) {
            btn.classList.add('incorrect');
          }
        } else {
          btn.addEventListener('click', () => {
            userAnswers[q.id] = idx;
            const isCorrect = (idx === q.zuzena);
            if (isCorrect) {
              playSound('correct');
              removeMistake(q.id);
            } else {
              playSound('wrong');
              addMistake(q.id);
            }
            renderQuestion();
          });
        }
      }

      optionsContainer.appendChild(btn);
    });

    // Azalpena bistaratu Practice moduan erantzun ondoren
    if (currentMode !== 'exam' && hasAnswered) {
      const isCorrect = userAnswers[q.id] === q.zuzena;
      explanationBox.classList.remove('hidden');
      explanationBox.className = `explanation-box ${isCorrect ? 'correct-box' : 'wrong-box'}`;
      explanationHeader.innerHTML = isCorrect ? 
        `<span class="exp-icon">✅</span> <span class="exp-title">Bikain, zuzena da!</span>` : 
        `<span class="exp-icon">❌</span> <span class="exp-title">Ez da zuzena. Zuzena: ${letters[q.zuzena]} aukera da.</span>`;
      explanationText.innerHTML = highlightSyntax(q.azalpena);
    }

    // Aurrekoa / Hurrengoa kontrolak
    prevBtn.disabled = (currentIndex === 0);
    if (currentIndex === currentQuestions.length - 1) {
      nextBtn.textContent = (currentMode === 'exam') ? 'Azterketa Amaitu 🏁' : 'Amaitu 🏁';
    } else {
      nextBtn.textContent = 'Hurrengoa →';
    }
  }

  // Hurrengoa / Amaitu sakatzean
  nextBtn.addEventListener('click', () => {
    playSound('click');
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      // Azterketa amaitu da
      finishExam();
    }
  });

  // Aurrekoa sakatzean
  prevBtn.addEventListener('click', () => {
    playSound('click');
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });

  // AZTERKETA AMAITU ETA EMAITZAK ERAKUTSI
  function finishExam() {
    stopTimer();
    let correctCount = 0;

    currentQuestions.forEach(q => {
      const selected = userAnswers[q.id];
      if (selected === q.zuzena) {
        correctCount++;
        removeMistake(q.id);
      } else {
        addMistake(q.id);
      }
    });

    const total = currentQuestions.length;
    const scoreOutOfTen = ((correctCount / total) * 10).toFixed(1);
    const percent = Math.round((correctCount / total) * 100);

    scoreLarge.textContent = scoreOutOfTen;
    scoreDetail.textContent = `${total}tik ${correctCount} galdera zuzen asmatu dituzu (%${percent}). Denbora: ${quizTimer.textContent.replace('⏱️ ', '')}`;

    if (scoreOutOfTen >= 5.0) {
      resultIcon.textContent = scoreOutOfTen >= 8.5 ? '🏆' : '🎉';
      resultTitle.textContent = scoreOutOfTen >= 8.5 ? 'Bikain! Zorionak!' : 'Azterketa Gainditua!';
      resultStatusPill.textContent = 'GAINDITUA';
      resultStatusPill.className = 'result-status-pill pass';
      playSound('win');
    } else {
      resultIcon.textContent = '📚';
      resultTitle.textContent = 'Ez duzu gainditu, jarraitu ikasten!';
      resultStatusPill.textContent = 'EZ GAINDITUA';
      resultStatusPill.className = 'result-status-pill fail';
      playSound('wrong');
    }

    if (currentMode === 'exam') {
      recordExamScore(parseFloat(scoreOutOfTen));
    }

    // Berrikuspen xehea prestatu
    renderReviewDetails();
    switchView('results');
  }

  // Berrikuspen xehea sortu emaitzen orrian
  function renderReviewDetails() {
    reviewItemsList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    currentQuestions.forEach((q, i) => {
      const userSel = userAnswers[q.id];
      const isCorrect = (userSel === q.zuzena);

      const card = document.createElement('div');
      card.className = `review-card ${isCorrect ? 'correct-item' : 'incorrect-item'}`;

      const userText = userSel !== undefined ? `${letters[userSel]}) ${q.aukerak[userSel]}` : 'Erantzun gabe';
      const correctText = `${letters[q.zuzena]}) ${q.aukerak[q.zuzena]}`;

      card.innerHTML = `
        <div class="review-q-num">Galdera ${i + 1} · ${BLOCK_NAMES[q.blokea] || q.kategoria}</div>
        <div class="review-q-text">${highlightSyntax(q.galdera)}</div>
        <div class="review-answers">
          <div class="review-ans-row">
            <strong>Zure erantzuna:</strong>
            <span style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'};">${highlightSyntax(userText)}</span>
          </div>
          ${!isCorrect ? `
          <div class="review-ans-row">
            <strong>Zuzeneko erantzuna:</strong>
            <span style="color: var(--success); font-weight: 600;">${highlightSyntax(correctText)}</span>
          </div>
          ` : ''}
        </div>
        <div class="review-exp">
          <strong>Azalpena:</strong> ${highlightSyntax(q.azalpena)}
        </div>
      `;
      reviewItemsList.appendChild(card);
    });
  }

  // Berrikuspen botoiaren toggle-a
  reviewExamDetailsBtn.addEventListener('click', () => {
    playSound('click');
    reviewDetailsSection.classList.toggle('hidden');
    if (!reviewDetailsSection.classList.contains('hidden')) {
      reviewDetailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  retryExamBtn.addEventListener('click', () => {
    playSound('click');
    startExamMode();
  });

  backHomeBtn.addEventListener('click', () => {
    playSound('click');
    switchView('home');
  });

  // Segurtasun modalaren gertaerak
  if (cancelExitBtn) {
    cancelExitBtn.addEventListener('click', () => {
      playSound('click');
      if (confirmExitModal) confirmExitModal.classList.add('hidden');
      pendingExitAction = null;
    });
  }

  if (confirmExitBtn) {
    confirmExitBtn.addEventListener('click', () => {
      playSound('click');
      if (confirmExitModal) confirmExitModal.classList.add('hidden');
      if (pendingExitAction) {
        const act = pendingExitAction;
        pendingExitAction = null;
        act();
      }
    });
  }

  if (confirmExitModal) {
    confirmExitModal.addEventListener('click', (e) => {
      if (e.target === confirmExitModal) {
        confirmExitModal.classList.add('hidden');
        pendingExitAction = null;
      }
    });
  }

  homeBtn.addEventListener('click', () => {
    playSound('click');
    requestExitConfirmation(() => {
      switchView('home');
    });
  });

  // Soinua toggle
  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
  });

  // Moduen kudeaketa
  document.getElementById('btnStartExam').addEventListener('click', () => {
    playSound('click');
    startExamMode();
  });

  document.getElementById('btnStartPractice').addEventListener('click', () => {
    playSound('click');
    startPracticeMode(null, 'Gai Guztiak');
  });

  document.getElementById('btnReviewMistakes').addEventListener('click', () => {
    playSound('click');
    startMistakesMode();
  });

  // Blokeka aukeratzeko modala
  document.getElementById('btnFilterBlock').addEventListener('click', () => {
    playSound('click');
    const container = document.getElementById('blockListContainer');
    container.innerHTML = '';

    Object.keys(BLOCK_NAMES).forEach(blockId => {
      const bNum = parseInt(blockId);
      const bQuestions = allQuestions.filter(q => q.blokea === bNum);
      const btn = document.createElement('div');
      btn.className = 'block-btn';
      btn.innerHTML = `
        <span class="block-btn-title">${BLOCK_NAMES[bNum]}</span>
        <span class="block-btn-count">${bQuestions.length} galdera</span>
      `;
      btn.addEventListener('click', () => {
        playSound('click');
        blockModal.classList.add('hidden');
        startPracticeMode(bQuestions, BLOCK_NAMES[bNum]);
      });
      container.appendChild(btn);
    });

    blockModal.classList.remove('hidden');
  });

  document.getElementById('closeBlockModalBtn').addEventListener('click', () => {
    playSound('click');
    blockModal.classList.add('hidden');
  });

  const qrMobileBtn = document.getElementById('qrMobileBtn');
  const qrModal = document.getElementById('qrModal');
  const qrImage = document.getElementById('qrImage');
  const qrUrlText = document.getElementById('qrUrlText');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');

  if (qrMobileBtn) {
    qrMobileBtn.addEventListener('click', () => {
      playSound('click');
      // Uneko host edo IP erabili
      const currentHost = window.location.hostname;
      const port = window.location.port || '3000';
      // Lokalean localhost bada, Wi-Fi IP-a iradoki edo fallback eman
      let targetUrl = window.location.href;
      if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
        targetUrl = `http://192.168.1.17:${port}/`;
      }
      qrUrlText.textContent = targetUrl;
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}`;
      qrModal.classList.remove('hidden');
    });
  }

  if (closeQrModalBtn) {
    closeQrModalBtn.addEventListener('click', () => {
      playSound('click');
      qrModal.classList.add('hidden');
    });
  }

  // ZATI PRAKTIKOAREN KUDEAKETA
  function renderPracticalItems() {
    if (!practicalListContainer) return;
    practicalListContainer.innerHTML = '';

    const data = window.PRAKTIKA_DATUAK || [];
    const query = practicalSearchQuery.toLowerCase().trim();

    const filtered = data.filter(item => {
      const matchesFilter = (currentPracticalFilter === 'guztiak') || (item.kategoria === currentPracticalFilter);
      if (!matchesFilter) return false;

      if (!query) return true;
      const titleMatch = item.izenburua.toLowerCase().includes(query);
      const descMatch = item.azalpena.toLowerCase().includes(query);
      const noteMatch = item.kontuz && item.kontuz.toLowerCase().includes(query);
      const cmdMatch = item.pausoak.some(p => 
        (p.titulua && p.titulua.toLowerCase().includes(query)) ||
        (p.komandoa && p.komandoa.toLowerCase().includes(query)) ||
        (p.parametroak && p.parametroak.toLowerCase().includes(query))
      );
      return titleMatch || descMatch || noteMatch || cmdMatch;
    });

    if (filtered.length === 0) {
      practicalListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <p>Ez da emaitzarik aurkitu bilaketa honekin: <strong>"${escapeHtml(practicalSearchQuery)}"</strong></p>
          <button class="btn btn-secondary" style="margin-top: 12px;" id="btnResetPracticalSearch">Garbitu Bilaketa</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetPracticalSearch');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          practicalSearchQuery = '';
          if (practicalSearchInput) practicalSearchInput.value = '';
          renderPracticalItems();
        });
      }
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pract-card';

      let stepsHtml = '';
      item.pausoak.forEach(p => {
        stepsHtml += `
          <div class="pract-step-block">
            <div class="pract-step-title">${escapeHtml(p.titulua)}</div>
            <div class="pract-code-row">
              <pre class="pract-code-text"><code>${highlightSyntax(p.komandoa)}</code></pre>
              <button class="btn-copy" data-code="${escapeHtmlAttr(p.komandoa)}">
                <span>📋</span> Kopiatu
              </button>
            </div>
            ${p.parametroak ? `<div class="pract-param-note">${highlightSyntax(p.parametroak)}</div>` : ''}
            ${p.emaitza ? `
              <div style="font-size: 0.75rem; color: #6ee7b7; margin-top: 4px; font-weight: 600;">Emaitza adibidea:</div>
              <pre class="pract-output-box">${escapeHtml(p.emaitza)}</pre>
            ` : ''}
          </div>
        `;
      });

      card.innerHTML = `
        <div class="pract-card-header">
          <div class="pract-card-title">${escapeHtml(item.izenburua)}</div>
          <span class="pract-card-badge">${escapeHtml(item.kategoriaIzena)}</span>
        </div>
        <p class="pract-card-desc">${highlightSyntax(item.azalpena)}</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${stepsHtml}
        </div>
        ${item.kontuz ? `
          <div class="pract-trap-box">
            <span style="font-size: 1.1rem; flex-shrink: 0;">⚠️</span>
            <div><strong>Kontuz azterketan:</strong> ${highlightSyntax(item.kontuz)}</div>
          </div>
        ` : ''}
      `;

      card.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const code = btn.getAttribute('data-code');
          copyToClipboard(code, btn);
        });
      });

      practicalListContainer.appendChild(card);
    });
  }

  function copyToClipboard(text, btnElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopiedFeedback(btnElement);
      }).catch(() => {
        fallbackCopy(text, btnElement);
      });
    } else {
      fallbackCopy(text, btnElement);
    }
  }

  function fallbackCopy(text, btnElement) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopiedFeedback(btnElement);
    } catch (err) {
      alert("Ezin izan da kopiatu: " + text);
    }
    document.body.removeChild(textarea);
  }

  function showCopiedFeedback(btn) {
    playSound('click');
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span>✓</span> Kopiatuta!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = origHtml;
      btn.classList.remove('copied');
    }, 1800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeHtmlAttr(str) {
    if (!str) return '';
    return str.replace(/"/g, '&quot;');
  }

  // SINTAXIAREN NABARMENDURA ETA KODE-KOLOREZTAPENA (SYNTAX HIGHLIGHTING)
  function highlightSyntax(raw) {
    if (!raw) return '';
    let escaped = String(raw)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const tokens = [];
    function addToken(html) {
      const id = '___TOK_' + tokens.length + '___';
      tokens.push({ id, html });
      return id;
    }

    // A. Backticks: `kodea`
    escaped = escaped.replace(/`([^`]+)`/g, (m, code) => {
      return addToken('<code class="inline-code-box">' + code + '</code>');
    });

    // B. Kakatxo arteko kode/testu zatiak: 'whoami', 'getuid', '1\' OR \'1\'=\'1', '/dev/urandom', 'uname -a'
    escaped = escaped.replace(/&#39;([^&#39;\n]{1,60})&#39;|'([^'\n]{1,60})'/g, (m, g1, g2) => {
      const val = g1 || g2;
      if (/[\-\/\_\=\*\$\#\(\)\.\s]|^[a-z0-9_]{3,25}$/i.test(val)) {
        return addToken('<span class="code-snippet">&apos;' + val + '&apos;</span>');
      }
      return m;
    });

    // C. Funtzioak eta metodoak: rand(), time(), getuid(), malloc(), system()
    escaped = escaped.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*\(\))/g, (m, fn) => {
      return addToken('<span class="code-fn">' + fn + '</span>');
    });

    // D. CVE-ak eta ahultasunak: CVE-2011-2523, vsftpd 2.3.4, Samba 3.0.20, usermap_script
    escaped = escaped.replace(/\b(CVE-\d{4}-\d{4,7}|vsftpd\s*2\.3\.4|Samba\s*3\.0\.20|UnrealIRCd\s*[0-9\.]*|usermap_script|bindshell|Meterpreter|vsftpd_234_backdoor)\b/gi, (m) => {
      return addToken('<span class="code-vuln">' + m + '</span>');
    });

    // E. IP helbideak, portuak eta sareak: 192.168.56.104, 192.168.56.0/24, 127.0.0.1, 21/tcp
    escaped = escaped.replace(/\b(192\.168\.\d+\.\d+(?:\/\d+)?|127\.0\.0\.1|localhost(?::\d+)?|\d+\/tcp|\d+\/udp)\b/gi, (m) => {
      return addToken('<span class="code-ip">' + m + '</span>');
    });

    // F. Metasploit parametroak: RHOSTS, LHOST, LPORT, PAYLOAD
    escaped = escaped.replace(/\b(RHOSTS|LHOST|LPORT|PAYLOAD)\b/g, (m) => {
      return addToken('<span class="code-meta-param">' + m + '</span>');
    });

    // G. Nmap eta komando banderak / parametroak: -sS, -sV, -sC, -O, -p-, -T4, -aes-256-cbc, -salt, -in, -out, -inkey, -pubin, -pubout, -decrypt, -encrypt, -sign, -verify, -signature, -dgst, -hmac
    escaped = escaped.replace(/(^|[\s\(\[])(-[a-zA-Z0-9_\-]{1,16})(?=[,\s\.\)\]]|$)/g, (m, sp, flag) => {
      return sp + addToken('<span class="code-flag">' + flag + '</span>');
    });

    // H. Komando nagusiak: openssl, nmap, msfconsole, ping, arp, nc, netcat, ifconfig, iptables, chmod, sudo, docker, sha256sum, md5sum, mysql, telnet, ssh, whoami, uname
    escaped = escaped.replace(/\b(openssl|nmap|msfconsole|netcat|nc|ping|arp|ifconfig|iptables|chmod|sudo|docker|sha256sum|md5sum|john|hashcat|telnet|ssh|whoami|uname)\b/gi, (m) => {
      return addToken('<span class="code-cmd">' + m + '</span>');
    });

    // I. Kriptografia algoritmoak eta protokoloak: AES-256-CBC, AES-256, RSA-2048, Diffie-Hellman, SHA-256, HMAC, etc.
    escaped = escaped.replace(/\b(AES-256(?:-CBC|-GCM|-CTR|-ECB)?|AES-128|AES|RSA-2048|RSA-4096|RSA|Diffie-Hellman|ECDH|ECDSA|Ed25519|SHA-256|SHA-512|SHA-3|SHA-1|MD5|HMAC(?:-SHA256)?|DES|3DES|Blowfish|ChaCha20|Poly1305|PBKDF2|bcrypt|argon2|DSA|ElGamal|TLS\s*1\.[23]|SSLv[23]|IPsec|X\.509|PKCS#?[0-9]+|CSPRNG)\b/g, (m) => {
      return addToken('<span class="code-algo">' + m + '</span>');
    });

    // J. Kripto kontzeptu teknikoak: ECB, CBC, CTR, GCM, CFB, OFB, IV, PKI, CA, CSR, CRL, OCSP, SYN/ACK, SYN, RST
    escaped = escaped.replace(/\b(ECB|CBC|CTR|GCM|CFB|OFB|IV|PKI|CA|CSR|CRL|OCSP|SYN\/ACK|SYN|RST|3-way handshake)\b/g, (m) => {
      return addToken('<span class="code-concept">' + m + '</span>');
    });

    tokens.forEach(t => {
      escaped = escaped.split(t.id).join(t.html);
    });

    return escaped;
  }

  // Praktika gertaerak
  if (btnOpenPractical) {
    btnOpenPractical.addEventListener('click', () => {
      playSound('click');
      switchView('practical');
    });
  }

  if (navPracticalBtn) {
    navPracticalBtn.addEventListener('click', () => {
      playSound('click');
      requestExitConfirmation(() => {
        switchView('practical');
      });
    });
  }

  if (closePracticalBtn) {
    closePracticalBtn.addEventListener('click', () => {
      playSound('click');
      switchView('home');
    });
  }

  if (practicalSearchInput) {
    practicalSearchInput.addEventListener('input', (e) => {
      practicalSearchQuery = e.target.value;
      renderPracticalItems();
    });
  }

  if (practicalFilterPills) {
    practicalFilterPills.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        playSound('click');
        practicalFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentPracticalFilter = pill.getAttribute('data-filter') || 'guztiak';
        renderPracticalItems();
      });
    });
  }

  // NABIGAZIOAREN ETA ATZERA EGITEAREN BABESAK (popstate eta beforeunload)
  window.addEventListener('popstate', (e) => {
    if (isQuizActive()) {
      // Android atzera keinuak edo nabigatzaileko atzera botoiak aplikaziotik ez irteteko
      try {
        history.pushState({ page: 'quiz' }, '');
      } catch (err) {}
      requestExitConfirmation(() => {
        switchView('home');
      });
    }
  });

  window.addEventListener('beforeunload', (e) => {
    if (isQuizActive()) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  });

  // Hasieratu galderak berehala
  loadQuestions();
  document.addEventListener('DOMContentLoaded', loadQuestions);

  // PWA Service Worker erregistratu eta automatikoki eguneratu
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(reg => {
        reg.update();
      }).catch(err => {
        console.log('SW registration failed:', err);
      });
    });
  }

})();
