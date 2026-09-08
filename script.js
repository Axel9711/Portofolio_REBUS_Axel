// Application immédiate du thème depuis localStorage pour éviter tout clignotement
(function() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
})();

// 1. Effet Machine à Écrire (Typewriter) pour la page d'accueil
const words = ["Étudiant BTS SIO SISR", "Admin Systèmes & Réseaux", "Futur Ingénieur Cybersécurité"];
let i = 0;
let timer;

function typingEffect() {
  const target = document.getElementById("typewriter");
  if (!target) return;
  
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      target.innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  const target = document.getElementById("typewriter");
  if (!target) return;
  
  let word = target.innerHTML.split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      target.innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      typingEffect();
      return false;
    }
    timer = setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}

// 2. Gestionnaire de Thème (Clair / Sombre)
function updateButtonText(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀️ Mode Light" : "🌙 Mode Dark";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typingEffect();

  const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateButtonText(currentTheme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateButtonText(newTheme);
    });
  }

  // 3. Gestionnaire des boutons de compétences (Croix X vers Diaporama PDF)
  setupCompetenceButtons();

  // 4. Gestionnaire de prévisualisation et téléchargement du PDF officiel E6
  setupPdfModalAndDownloads();

  // 5. Gestionnaire de copie des coordonnées sur la page Contact
  setupContactCopy();
});

function showCyberToast(title, message) {
  let toast = document.getElementById("cyber-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cyber-toast";
    toast.className = "cyber-toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="cyber-toast-header">
      <span>// ${title}</span>
      <button class="cyber-toast-close" aria-label="Fermer">&times;</button>
    </div>
    <div style="font-size: 0.82rem; line-height: 1.4; color: var(--text-main);">
      ${message}
    </div>
  `;

  toast.classList.add("show");

  const closeBtn = toast.querySelector(".cyber-toast-close");
  if (closeBtn) {
    closeBtn.onclick = () => toast.classList.remove("show");
  }

  clearTimeout(window.cyberToastTimer);
  window.cyberToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 6000);
}

const DIAPORAMAS = {
  fanvil: {
    id: "fanvil",
    title: "FANVIL — Déploiement des téléphones Fanvil Pro V66",
    competence: "Travailler en mode projet",
    realisation: "Préparation/configuration de téléphones fix Fanvil",
    pdfUrl: "diaporama-telephones-fanvil.pdf",
    downloadUrl: "/download-diaporama-fanvil",
    slidePrefix: "slide-fanvil-",
    totalSlides: 5
  },
  poste: {
    id: "poste",
    title: "SUPPORT INFORMATIQUE — Rapport d'installation poste utilisateur",
    competence: "Mettre à disposition des utilisateurs un service informatique",
    realisation: "Installation d'un utilisateur après un retour d'arrêt maladie",
    pdfUrl: "diaporama-installation-poste.pdf",
    downloadUrl: "/download-diaporama-poste",
    slidePrefix: "slide-poste-",
    totalSlides: 4
  },
  presence: {
    id: "presence",
    title: "DOSSIER DEV — Présence en ligne & E-Commerce (Ferhan Food)",
    competence: "Développer la présence en ligne de l'organisation",
    realisation: "Création d'une entreprise ainsi qu'un site web avec une présence en ligne",
    pdfUrl: "dossier-presence-en-ligne.pdf",
    downloadUrl: "/download-dossier-presence",
    slidePrefix: "slide-presence-",
    totalSlides: 16
  }
};

let currentDiapoState = {
  activeId: null,
  currentSlide: 1
};

function setupCompetenceButtons() {
  const triggerElements = document.querySelectorAll(".btn-trigger-diapo, .cross-btn");
  triggerElements.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const diapoId = el.getAttribute("data-diapo");
      const competence = el.getAttribute("data-competence") || "Compétence validée";
      const realisation = el.getAttribute("data-realisation") || "Réalisation professionnelle";

      if (diapoId && DIAPORAMAS[diapoId]) {
        openDiaporamaModal(diapoId);
      } else {
        showCyberToast(
          "JUSTIFICATIF E6 // EN ATTENTE",
          `<strong>${competence}</strong><br><em>${realisation}</em><br><br>Le diaporama pour cette compétence est en cours de finalisation.<br><br>Vous pouvez dès à présent consulter les dossiers & diaporamas complets :<br>• <strong>Présence en ligne (Ferhan Food)</strong><br>• <strong>Fanvil Pro V66</strong> (Travailler en mode projet)<br>• <strong>Installation Poste Utilisateur</strong> (Mettre à disposition des utilisateurs)`
        );
      }
    });
  });

  setupDiaporamaModal();
}

function openDiaporamaModal(diapoId) {
  const diapo = DIAPORAMAS[diapoId];
  if (!diapo) return;

  currentDiapoState.activeId = diapoId;
  currentDiapoState.currentSlide = 1;

  const modal = document.getElementById("diaporama-preview-modal");
  const titleEl = document.getElementById("diapo-modal-title");
  if (titleEl) {
    titleEl.textContent = `> DIAPORAMA E6 // ${diapo.title}`;
  }

  updateSlideView();

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function updateSlideView() {
  const diapo = DIAPORAMAS[currentDiapoState.activeId];
  if (!diapo) return;

  const imgEl = document.getElementById("diapo-slide-img");
  const counterEl = document.getElementById("slide-counter");
  const prevBtn = document.getElementById("btn-slide-prev");
  const nextBtn = document.getElementById("btn-slide-next");
  const downloadBtn = document.getElementById("btn-download-active-diapo");

  const slideIndex = currentDiapoState.currentSlide;
  const imgSrc = `${diapo.slidePrefix}${slideIndex}.png`;

  if (imgEl) {
    imgEl.src = imgSrc;
    imgEl.alt = `${diapo.title} - Slide ${slideIndex}`;
  }

  if (counterEl) {
    counterEl.textContent = `Slide ${slideIndex} / ${diapo.totalSlides}`;
  }

  if (prevBtn) {
    prevBtn.disabled = slideIndex <= 1;
  }

  if (nextBtn) {
    nextBtn.disabled = slideIndex >= diapo.totalSlides;
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      downloadFileSafely(diapo.downloadUrl, diapo.pdfUrl);
    };
  }
}

function setupDiaporamaModal() {
  const modal = document.getElementById("diaporama-preview-modal");
  if (!modal) return;

  const closeBtns = modal.querySelectorAll(".diapo-close-btn");
  const prevBtn = document.getElementById("btn-slide-prev");
  const nextBtn = document.getElementById("btn-slide-next");

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtns.forEach(btn => btn.addEventListener("click", closeModal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const diapo = DIAPORAMAS[currentDiapoState.activeId];
      if (diapo && currentDiapoState.currentSlide > 1) {
        currentDiapoState.currentSlide--;
        updateSlideView();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const diapo = DIAPORAMAS[currentDiapoState.activeId];
      if (diapo && currentDiapoState.currentSlide < diapo.totalSlides) {
        currentDiapoState.currentSlide++;
        updateSlideView();
      }
    });
  }

  // Navigation au clavier (Flèches gauche/droite et Escape)
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      const diapo = DIAPORAMAS[currentDiapoState.activeId];
      if (diapo && currentDiapoState.currentSlide > 1) {
        currentDiapoState.currentSlide--;
        updateSlideView();
      }
    } else if (e.key === "ArrowRight") {
      const diapo = DIAPORAMAS[currentDiapoState.activeId];
      if (diapo && currentDiapoState.currentSlide < diapo.totalSlides) {
        currentDiapoState.currentSlide++;
        updateSlideView();
      }
    }
  });
}

function downloadFileSafely(url, filename) {
  showCyberToast("TÉLÉCHARGEMENT EN COURS", `Préparation de <code>${filename}</code>...`);
  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error("Fichier introuvable");
      return resp.blob();
    })
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      showCyberToast("TÉLÉCHARGEMENT RÉUSSI", `Le fichier <code>${filename}</code> a été téléchargé sur votre appareil.`);
    })
    .catch(err => {
      // En cas de restriction particulière, repli direct
      window.location.href = url;
    });
}

function setupPdfModalAndDownloads() {
  const openModalBtns = document.querySelectorAll(".btn-open-preview-modal");
  const modal = document.getElementById("pdf-preview-modal");
  const closeModalBtns = document.querySelectorAll(".modal-close-btn, .btn-close-modal");
  const downloadBtns = document.querySelectorAll(".btn-safe-download");

  if (modal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    closeModalBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  downloadBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const url = btn.getAttribute("data-download-url") || btn.getAttribute("href") || "tableau-synthese-axel-rebus.pdf";
      const filename = btn.getAttribute("data-download-name") || "tableau-synthese-axel-rebus.pdf";
      downloadFileSafely(url, filename);
    });
  });
}

function setupContactCopy() {
  const copyBtn = document.getElementById("btn-copy-email");
  const emailLink = document.getElementById("contact-email-link");
  if (!copyBtn || !emailLink) return;

  copyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailLink.textContent.trim();
    
    function onSuccess() {
      copyBtn.textContent = "✓ Copié !";
      showCyberToast("PRESSE-PAPIER", `Adresse copiée : <code>${email}</code>`);
      setTimeout(() => {
        copyBtn.textContent = "Copier";
      }, 2500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(onSuccess)
        .catch(() => fallbackCopy(email, onSuccess));
    } else {
      fallbackCopy(email, onSuccess);
    }
  });

  function fallbackCopy(text, cb) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    if (cb) cb();
  }
}


