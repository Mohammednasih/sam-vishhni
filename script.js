document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("curtainVideo");
    const playOverlay = document.getElementById("playOverlay");

    const music = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicIcon = document.getElementById("musicIcon");

    let isPlaying = false;
    let wasPlayingBeforeHidden = false;
    let experienceStarted = false;

    // Disable scrolling initially
    document.body.style.overflow = "hidden";

    // =========================
    // START EXPERIENCE
    // =========================

    function startExperience(e) {

        e.preventDefault();

        if (experienceStarted) return;
        experienceStarted = true;

        // Start music first
        if (music) {
            music.volume = 0.3;
            music.currentTime = 0;

            music.play()
                .then(() => {
                    isPlaying = true;
                    musicIcon.textContent = "🔊";
                })
                .catch(console.error);
        }

        // Play curtain video
        video.play().catch(console.error);

        // Hide overlay
        playOverlay.style.opacity = "0";

        setTimeout(() => {
            playOverlay.style.display = "none";
        }, 500);
    }

    // Use only ONE click event (important for Android)
    playOverlay.addEventListener("click", startExperience);

    // =========================
    // VIDEO END
    // =========================

    video.addEventListener("ended", () => {

        const heroSection = document.querySelector(".hero-section");
        const firstInvitationImage = document.querySelector(".image-stack .img-wrap:first-child img");
        const gettingMarriedText = document.querySelector(".getting-married-text");
        const invitationNameBlock = document.querySelector(".first-image-text");
        const invitationDate = document.querySelector(".invitation-date");
        const scrollPrompt = document.querySelector(".scroll-prompt");

        if (firstInvitationImage) {
            firstInvitationImage.classList.add("zoom-in");
        }

        if (gettingMarriedText) {
            gettingMarriedText.classList.add("show");
        }

        if (invitationNameBlock) {
            invitationNameBlock.classList.add("fade-in");
        }

        if (invitationDate) {
            invitationDate.classList.add("show");
        }

        setTimeout(() => {
            if (scrollPrompt) {
                scrollPrompt.classList.add("show");
            }
        }, 4000);

        heroSection.classList.add("hide");

        setTimeout(() => {

            heroSection.style.display = "none";

            document.body.style.overflow = "auto";

            window.scrollTo(0, 0);

        }, 1500);

    });
const weddingDate = new Date("2026-11-11T10:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
    // =========================
    // MUSIC TOGGLE
    // =========================

    musicToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        if (!music) return;

        if (isPlaying) {

            music.pause();
            isPlaying = false;
            musicIcon.textContent = "🔇";

        } else {

            music.play()
                .then(() => {
                    isPlaying = true;
                    musicIcon.textContent = "🔊";
                })
                .catch(console.error);

        }

    });

    // =========================
    // TAB VISIBILITY
    // =========================

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            wasPlayingBeforeHidden = isPlaying;

            if (isPlaying) {
                music.pause();
            }

        } else if (wasPlayingBeforeHidden) {

            music.play()
                .then(() => {
                    isPlaying = true;
                    musicIcon.textContent = "🔊";
                })
                .catch(console.error);

        }

    });

    // =========================
    // WINDOW BLUR / FOCUS
    // =========================

    window.addEventListener("blur", () => {

        wasPlayingBeforeHidden = isPlaying;

        if (isPlaying) {
            music.pause();
        }

    });

    window.addEventListener("focus", () => {

        if (wasPlayingBeforeHidden) {

            music.play()
                .then(() => {
                    isPlaying = true;
                    musicIcon.textContent = "🔊";
                })
                .catch(console.error);

        }

    });
setupScratchCards();
function onAllScratched() {
    const countdownSection = document.querySelector(".countdown-section");

    if (countdownSection) {
        countdownSection.classList.add("show-countdown");
    }

    const scratchContainer = document.querySelector(".scratch-container");

    let origin = { x: 0.5, y: 0.5 };

    if (scratchContainer) {
        const rect = scratchContainer.getBoundingClientRect();

        origin = {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
        };
    }

    // Main explosion
    confetti({
        particleCount: 180,
        spread: 90,
        startVelocity: 50,
        gravity: 0.9,
        scalar: 1.2,
        origin,
        colors: [
            "#ffffff",
            "#EAF7FF",
            "#C6E9FF",
            "#8ED0FF",
            "#4DB8FF"
        ]
    });

    // Left cannon
    setTimeout(() => {
        confetti({
            particleCount: 120,
            angle: 60,
            spread: 70,
            startVelocity: 60,
            origin: {
                x: origin.x - 0.2,
                y: origin.y
            },
            colors: [
                "#ffffff",
                "#D7F1FF",
                "#7BCBFF"
            ]
        });
    }, 120);

    // Right cannon
    setTimeout(() => {
        confetti({
            particleCount: 120,
            angle: 120,
            spread: 70,
            startVelocity: 60,
            origin: {
                x: origin.x + 0.2,
                y: origin.y
            },
            colors: [
                "#ffffff",
                "#D7F1FF",
                "#7BCBFF"
            ]
        });
    }, 120);

    // Luxury falling confetti
    setTimeout(() => {
        confetti({
            particleCount: 220,
            spread: 150,
            startVelocity: 20,
            gravity: 0.45,
            ticks: 350,
            scalar: 0.9,
            origin: {
                x: 0.5,
                y: 0.05
            },
            colors: [
                "#ffffff",
                "#EEF9FF",
                "#D4F0FF",
                "#8FD7FF",
                "#59C2FF"
            ]
        });
    }, 350);

    // Sparkle finale
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 360,
            startVelocity: 25,
            gravity: 0.6,
            scalar: 0.6,
            origin,
            colors: [
                "#ffffff",
                "#ffffff",
                "#DFF4FF"
            ]
        });
    }, 900);
}

function setupScratchCards() {
    const canvases = document.querySelectorAll('.scratch-canvas');
    let completedCount = 0;

    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        let isDrawing = false;
        let isCompleted = false;
        let lastX = 0;
        let lastY = 0;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        let gradient;

        if (ctx.createConicGradient) {
            gradient = ctx.createConicGradient(0, cx, cy);

            gradient.addColorStop(0, "#97b7cf");
            gradient.addColorStop(0.16, "#f8fcff");
            gradient.addColorStop(0.32, "#d7e2ea");
            gradient.addColorStop(0.5, "#7fa6c3");
            gradient.addColorStop(0.68, "#ffffff");
            gradient.addColorStop(0.84, "#c9d3dc");
            gradient.addColorStop(1, "#95b9d5");
        } else {
            gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, cx);

            gradient.addColorStop(0, "#ffffff");
            gradient.addColorStop(0.5, "#d5e1ea");
            gradient.addColorStop(1, "#8baec7");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,0.12)";
        for (let i = 0; i < 400; i++) {
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                1,
                1
            );
        }

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 18;

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let clientX = e.clientX;
            let clientY = e.clientY;

            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function scratch(e) {
            if (!isDrawing || isCompleted) return;

            e.preventDefault();

            const pos = getMousePos(e);

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();

            lastX = pos.x;
            lastY = pos.y;

            checkCompletion();
        }

        canvas.addEventListener("mousedown", e => {
            isDrawing = true;
            const pos = getMousePos(e);
            lastX = pos.x;
            lastY = pos.y;
        });

        canvas.addEventListener("mousemove", scratch);

        window.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        canvas.addEventListener("touchstart", e => {
            isDrawing = true;
            const pos = getMousePos(e);
            lastX = pos.x;
            lastY = pos.y;
        }, { passive: false });

        canvas.addEventListener("touchmove", scratch, { passive: false });

        window.addEventListener("touchend", () => {
            isDrawing = false;
        });

        function checkCompletion() {
            if (isCompleted) return;

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );

            let transparentPixels = 0;
            const totalPixels = imageData.data.length / 4;

            for (let i = 3; i < imageData.data.length; i += 16) {
                if (imageData.data[i] < 50) {
                    transparentPixels++;
                }
            }

            const ratio = transparentPixels / (totalPixels / 4);

            if (ratio > 0.05) {
                isCompleted = true;

                canvas.style.transition = "opacity .3s ease";
                canvas.style.opacity = "0";

                canvas.parentElement
                    .querySelector(".scratch-base")
                    .classList.add("scratched-pop");

                setTimeout(() => {
                    canvas.style.display = "none";
                }, 300);

                completedCount++;

                if (completedCount === canvases.length) {
    onAllScratched();
}
            }
        }
    });
}

    const giftCopyButtons = document.querySelectorAll(".gift-copy-btn");

    giftCopyButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const textToCopy = button.dataset.copy;
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                const originalText = button.textContent;
                button.textContent = "Copied";
                button.classList.add("copied");

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove("copied");
                }, 1400);
            } catch (error) {
                console.error(error);
            }
        });
    });

    const giftDetails = document.querySelectorAll(".gift-accordion details");
    giftDetails.forEach(targetDetail => {
        targetDetail.addEventListener("toggle", () => {
            if (targetDetail.open) {
                giftDetails.forEach(detail => {
                    if (detail !== targetDetail) {
                        detail.open = false;
                    }
                });
            }
        });
    });

    // =========================
    // RSVP FORM HANDLER
    // =========================

    const RSVP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFVb2WpitRZwp471lh1tDo9qf81n8-dDCj0_MTn8GWa1WK9IKXWY9xu8gjnf46gTj_/exec";

    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpGuestName = document.getElementById("rsvpGuestName");
    const rsvpGuestCount = document.getElementById("rsvpGuestCount");
    const rsvpSubmitBtn = document.getElementById("rsvpSubmitBtn");
    const rsvpStatus = document.getElementById("rsvpStatus");
    // Custom Select Component Logic
    const customWrapper = document.getElementById("customGuestCountWrapper");
    const customTrigger = document.getElementById("customGuestCountTrigger");
    const customLabel = document.getElementById("customGuestCountLabel");
    const customOptions = document.querySelectorAll("#customGuestCountOptions .custom-option");
    const hiddenGuestCount = document.getElementById("rsvpGuestCount");

    if (customTrigger && customWrapper) {
        customTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = customWrapper.classList.toggle("open");
            customTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        customOptions.forEach(option => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();
                const val = option.dataset.value;
                const text = option.textContent;

                if (hiddenGuestCount) hiddenGuestCount.value = val;
                if (customLabel) customLabel.textContent = text;

                customOptions.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");

                customWrapper.classList.remove("open");
                customTrigger.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (e) => {
            if (!customWrapper.contains(e.target)) {
                customWrapper.classList.remove("open");
                customTrigger.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (rsvpStatus) {
                rsvpStatus.className = "rsvp-status-message";
                rsvpStatus.textContent = "";
            }

            const guestName = rsvpGuestName ? rsvpGuestName.value.trim() : "";
            if (!guestName) {
                if (rsvpStatus) {
                    rsvpStatus.className = "rsvp-status-message error";
                    rsvpStatus.textContent = "Please enter your guest or family name.";
                }
                if (rsvpGuestName) rsvpGuestName.focus();
                return;
            }

            if (typeof navigator !== "undefined" && navigator.onLine === false) {
                if (rsvpStatus) {
                    rsvpStatus.className = "rsvp-status-message error";
                    rsvpStatus.textContent = "You appear to be offline. Please check your internet connection and try again.";
                }
                return;
            }

            const guestCount = rsvpGuestCount ? (parseInt(rsvpGuestCount.value, 10) || 1) : 1;
            const receptionRadio = document.querySelector('input[name="reception"]:checked');
            const reception = receptionRadio ? receptionRadio.value : "Yes";

            if (rsvpSubmitBtn) {
                rsvpSubmitBtn.disabled = true;
                rsvpSubmitBtn.classList.add("loading");
            }

            const payload = {
                guestName: guestName,
                guestCount: guestCount,
                Reception: reception === "No" ? "No" : "Yes"
            };

            const timestamp = Date.now() + "_" + Math.random().toString(36).substring(2, 7);
            const targetUrl = RSVP_SCRIPT_URL + (RSVP_SCRIPT_URL.includes("?") ? "&" : "?") + "t=" + timestamp;
            const jsonPayload = JSON.stringify(payload);

            // 1. Single background dispatch (fetch with keepalive, or sendBeacon fallback)
            let dispatched = false;

            if (typeof fetch === "function") {
                try {
                    fetch(targetUrl, {
                        method: "POST",
                        mode: "no-cors",
                        cache: "no-store",
                        keepalive: true,
                        body: jsonPayload
                    }).catch(errFetch => console.warn("Background fetch notice:", errFetch));
                    dispatched = true;
                } catch (err) {
                    console.warn("Fetch invocation notice:", err);
                }
            }

            if (!dispatched && typeof navigator !== "undefined" && navigator.sendBeacon) {
                try {
                    const blob = new Blob([jsonPayload], { type: "text/plain" });
                    navigator.sendBeacon(targetUrl, blob);
                } catch (errBeacon) {
                    console.warn("sendBeacon dispatch notice:", errBeacon);
                }
            }

            // 2. Instant user confirmation feedback (300ms smooth UI transition)
            setTimeout(() => {
                if (rsvpStatus) {
                    rsvpStatus.className = "rsvp-status-message success";
                    rsvpStatus.textContent = "Thank you! Your RSVP has been saved successfully.";
                }

                rsvpForm.reset();

                if (customLabel) customLabel.textContent = "1 Person";
                if (hiddenGuestCount) hiddenGuestCount.value = "1";
                if (customOptions) {
                    customOptions.forEach((opt, idx) => {
                        if (idx === 0) opt.classList.add("selected");
                        else opt.classList.remove("selected");
                    });
                }

                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.75 },
                        colors: ["#ffffff", "#EAF7FF", "#C6E9FF", "#8ED0FF", "#4DB8FF"]
                    });
                }

                if (rsvpSubmitBtn) {
                    rsvpSubmitBtn.disabled = false;
                    rsvpSubmitBtn.classList.remove("loading");
                }
            }, 300);
        });
    }

    // =========================
    // PAGE HIDE
    // =========================

    window.addEventListener("pagehide", () => {

        if (isPlaying) {
            music.pause();
        }

    });

});
