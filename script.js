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

function setupCompetenceButtons() {
  const crossButtons = document.querySelectorAll(".cross-btn");
  crossButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = btn.getAttribute("href") || "diaporama-competences.pdf";
      const competence = btn.getAttribute("data-competence") || "Compétence validée";
      const realisation = btn.getAttribute("data-realisation") || "Réalisation professionnelle";

      try {
        const response = await fetch(href, { method: "HEAD" });
        if (response.ok) {
          window.open(href, "_blank");
          return;
        }
      } catch (err) {
        // En cas d'absence temporaire du fichier PDF
      }

      showCyberToast(
        "JUSTIFICATIF E6 // DIAPORAMA",
        `<strong>${competence}</strong><br><em>${realisation}</em><br><br>Le bouton est pré-configuré pour ouvrir <code>${href}</code>. Dès que vous déposez votre diaporama au format PDF, il s'ouvrira immédiatement au clic !`
      );
    });
  });
}

