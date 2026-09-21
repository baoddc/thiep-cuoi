/**
 * ====================================================================
 * WEDDING MUSIC CONTROLLER (ĐIỀU KHIỂN NHẠC NỀN & ĐĨA THAN QUAY)
 * ====================================================================
 */

(function() {
  let audioElement = null;
  let musicBtn = null;
  let isPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  // Romantic Wedding Melody notes (Canon in D / Wedding Chime progression fallback)
  // Frequencies for: D4, A4, B4, F#4, G4, D4, G4, A4
  const melodyNotes = [
    293.66, 440.00, 493.88, 369.99, 392.00, 293.66, 392.00, 440.00,
    587.33, 554.37, 493.88, 440.00, 392.00, 369.99, 329.63, 293.66
  ];

  function playSynthNote(freq, duration = 1.2) {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine'; // Soft gentle acoustic bell/harp tone
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn("Synth note error:", e);
    }
  }

  function startSynthMelody() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }

    let noteIdx = 0;
    playSynthNote(melodyNotes[noteIdx]);
    synthInterval = setInterval(() => {
      noteIdx = (noteIdx + 1) % melodyNotes.length;
      playSynthNote(melodyNotes[noteIdx]);
    }, 1400);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function updateUI(playing) {
    isPlaying = playing;
    if (musicBtn) {
      if (playing) {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('title', 'Tạm dừng nhạc');
      } else {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('title', 'Phát nhạc');
      }
    }
  }

  const WeddingMusic = {
    init: function() {
      audioElement = document.getElementById('weddingAudio');
      musicBtn = document.getElementById('musicToggle');

      if (musicBtn) {
        musicBtn.addEventListener('click', () => {
          this.toggle();
        });
      }
    },

    play: function() {
      if (isPlaying) return;

      if (audioElement && audioElement.src && !audioElement.error) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            updateUI(true);
          }).catch(err => {
            console.log("Audio file autoplay blocked or failed, starting romantic synth melody:", err);
            startSynthMelody();
            updateUI(true);
          });
        }
      } else {
        startSynthMelody();
        updateUI(true);
      }
    },

    pause: function() {
      if (audioElement) {
        audioElement.pause();
      }
      stopSynthMelody();
      updateUI(false);
    },

    toggle: function() {
      if (isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }
  };

  window.WeddingMusic = WeddingMusic;
})();
