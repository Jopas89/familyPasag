// ====================== NAVBAR.JS ======================

// ===== DROPDOWN FUNCTIONALITY =====
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const btn = dropdown.querySelector(".dropbtn");

  // Toggle dropdown on click
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });

  // Handle dropdown action links for CONTACT
  const contactModal = document.getElementById("contactModal");
  const modalMessage = contactModal?.querySelector(".modal-message");

  dropdown.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (contactModal && modalMessage) {
        const action = link.dataset.action;
        const msg = window.getContactMessage(action);

        modalMessage.innerHTML = ""; // clear old content

        // Add header lines (normal text)
        msg.header.forEach(line => {
          const p = document.createElement("p");
          p.textContent = line;
          modalMessage.appendChild(p);
        });

        // Add body as bullet points
        if (msg.body && msg.body.length) {
          const ul = document.createElement("ul");
          msg.body.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          modalMessage.appendChild(ul);
        }

        contactModal.hidden = false;
      }

      // Collapse dropdown
      dropdown.classList.remove("active");
    });
  });
});

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// ===== HOME MODAL FUNCTIONALITY =====
const homeModal = document.getElementById("home");
const closeHomeBtn = document.getElementById("closeHome");
const homeLink = document.getElementById("homeLink");

function showHome() {
  homeModal.style.display = "block";
}
function hideHome() {
  homeModal.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  showHome();
});

closeHomeBtn.addEventListener("click", hideHome);

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  showHome();
});

// ===== ABOUT MODAL FUNCTIONALITY =====
const aboutModal = document.getElementById("aboutModal");
const aboutLink = document.getElementById("aboutLink");
const closeAboutBtn = document.getElementById("closeAbout");
const aboutMessage = aboutModal.querySelector(".modal-message");

if (aboutMessage) {
  aboutMessage.innerHTML = window.ABOUT_TEXT;
}

aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.hidden = false;
});

closeAboutBtn.addEventListener("click", () => {
  aboutModal.hidden = true;
});

// Close About modal if clicked outside content
aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.hidden = true;
  }
});

// ===== HOW TO USE MODAL FUNCTIONALITY =====
const howToUseLink = document.getElementById("howToUse");
const howToUseModal = document.getElementById("howToUseModal");
const closeHowToUseBtn = document.getElementById("closeHowToUse");
const howToUseMessage = howToUseModal.querySelector(".modal-message");

if (howToUseMessage) {
  howToUseMessage.innerHTML = window.HOW_TO_USE_TEXT;
}

howToUseLink.addEventListener("click", (e) => {
  e.preventDefault();
  howToUseModal.hidden = false;
});

closeHowToUseBtn.addEventListener("click", () => {
  howToUseModal.hidden = true;
});

// Close How To Use modal if clicked outside content
howToUseModal.addEventListener("click", (e) => {
  if (e.target === howToUseModal) {
    howToUseModal.hidden = true;
  }
});

// ===== CONTACT MODAL FUNCTIONALITY =====
const contactModal = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContact");

if (closeContactBtn) {
  closeContactBtn.addEventListener("click", () => {
    contactModal.hidden = true;
  });
}

// Close contact modal if clicked outside content
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.hidden = true;
    }
  });
}
