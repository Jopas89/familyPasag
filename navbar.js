// ======================================================
// NAVBAR.JS — Handles navbar, dropdowns, and modal logic
// ======================================================

// ======================================================
//  DROPDOWN MENU (CONTACT US)
// ======================================================
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const button = dropdown.querySelector(".dropbtn");

  // Toggle dropdown open/close on click
  button.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });

  // Reference contact modal + message container
  const contactModal = document.getElementById("contactModal");
  const modalMessage = contactModal?.querySelector(".modal-message");

  // Handle Contact Us menu options
  dropdown.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (contactModal && modalMessage) {
        const action = link.dataset.action;
        const message = window.getContactMessage(action);

        modalMessage.innerHTML = "";

        // Header lines
        message.header.forEach((line) => {
          const p = document.createElement("p");
          p.textContent = line;
          modalMessage.appendChild(p);
        });

        // Bullet list body
        if (message.body?.length) {
          const ul = document.createElement("ul");
          message.body.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          modalMessage.appendChild(ul);
        }

        contactModal.hidden = false;
      }

      dropdown.classList.remove("active");
    });
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// ======================================================
// HOME MODAL
// ======================================================
const homeModal = document.getElementById("homeModal");
const homeLink = document.getElementById("homeLink");
const closeHomeBtn = document.getElementById("closeHome");

window.applyHomeContent = function () {
  const modal = homeModal;
  if (!modal) return;

  const h2 = modal.querySelector("h2");
  h2.textContent = window.GlobalContent.home.title;

  const messageContainer = modal.querySelector(".modal-message");
  messageContainer.innerHTML = "";

  // Home Description — BULLETS
  const ulDesc = document.createElement("ul");
  window.GlobalContent.home.description.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ulDesc.appendChild(li);
  });
  messageContainer.appendChild(ulDesc);

  // Stats
  const statsBox = modal.querySelector(".stats");
  statsBox.innerHTML = `
    ${window.GlobalContent.home.stats.totalMembers} Family Members<br>
    ${window.GlobalContent.home.stats.generations} Generations<br>
    ${window.GlobalContent.home.stats.newMembers} New Members This Year<br>
  `;

  // Recent updates — BULLETS
  const updatesEl = modal.querySelector("#recentUpdates");
  updatesEl.innerHTML = "";
  window.GlobalContent.home.recentUpdates.forEach(update => {
    const li = document.createElement("li");
    li.textContent = update;
    updatesEl.appendChild(li);
  });

  // Attention — BULLETS
  const attentionEl = modal.querySelector("#attentionMessage");
  attentionEl.innerHTML = "";
  window.GlobalContent.home.attention.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    attentionEl.appendChild(li);
  });
};

homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  homeModal.hidden = false;
});

closeHomeBtn.addEventListener("click", () => {
  homeModal.hidden = true;
});

homeModal.addEventListener("click", (e) => {
  if (e.target === homeModal) homeModal.hidden = true;
});

// ======================================================
// ABOUT MODAL
// ======================================================
const aboutModal = document.getElementById("aboutModal");
const aboutLink = document.getElementById("aboutLink");
const closeAboutBtn = document.getElementById("closeAbout");

window.applyAboutContent = function () {
  const modal = aboutModal;

  const h2 = modal.querySelector("h2");
  h2.textContent = window.GlobalContent.about.title;

  const messageContainer = modal.querySelector(".modal-message");
  messageContainer.innerHTML = "";

  // About Description — BULLETS
  const ul = document.createElement("ul");
  window.GlobalContent.about.description.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
  messageContainer.appendChild(ul);
};

aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  aboutModal.hidden = false;
});

closeAboutBtn.addEventListener("click", () => {
  aboutModal.hidden = true;
});

aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) aboutModal.hidden = true;
});

// ======================================================
// HOW TO USE MODAL — NOW HANDLED HERE
// ======================================================
const howToUseModal = document.getElementById("howToUseModal");
const howToUseLink = document.getElementById("howToUse");
const closeHowToUseBtn = document.getElementById("closeHowToUse");

window.applyHowToUseContent = function () {

  const modal = howToUseModal;
  if (!modal) return;

  // description01 — BULLETS
  const desc01 = modal.querySelector("#description01");
  desc01.innerHTML = "";
  window.GlobalContent.howToUse.description01.forEach(text => {
    const li = document.createElement("li");
    li.innerHTML = text;
    desc01.appendChild(li);
  });

  // description02 — BULLETS
  const desc02 = modal.querySelector("#description02");
  desc02.innerHTML = "";
  window.GlobalContent.howToUse.description02.forEach(text => {
    const li = document.createElement("li");
    li.innerHTML = text;
    desc02.appendChild(li);
  });
};

howToUseLink.addEventListener("click", (e) => {
  e.preventDefault();
  howToUseModal.hidden = false;
});

closeHowToUseBtn.addEventListener("click", () => {
  howToUseModal.hidden = true;
});

howToUseModal.addEventListener("click", (e) => {
  if (e.target === howToUseModal) howToUseModal.hidden = true;
});

// ======================================================
// CONTACT MODAL CLOSE
// ======================================================
const contactModalRef = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContact");

closeContactBtn.addEventListener("click", () => {
  contactModalRef.hidden = true;
});

contactModalRef.addEventListener("click", (e) => {
  if (e.target === contactModalRef) contactModalRef.hidden = true;
});
