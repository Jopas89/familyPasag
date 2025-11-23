/*******************************************************
 *  GLOBAL EXPANSION DEPTH
 *******************************************************/
const GLOBAL_DEPTH = 1; // Default depth

/*******************************************************
 *  GLOBAL FAMILY DATA STORAGE
 *******************************************************/
window.GlobalData = {
  raw: null,       // Raw JSON data
  members: [],     // Array of member PDF filenames
  isLoaded: false, // Flag to indicate if JSON is loaded
};

/*******************************************************
 *  GLOBAL SETTINGS
 *******************************************************/
window.GlobalSettings = {
  jsonFile: "pasagFamily.json", // Path to family JSON
  bgImage: "images/IMG_0740.JPG", // Background image
};

/*******************************************************
 *  GLOBAL CONTENT
 *******************************************************/
window.GlobalContent = {
  homeTitle: "Welcome to the Pasag Family Tree",
  homeDescription: [
    "Explore your family lineage, connect with relatives, and discover your heritage through our interactive family tree.",
    "If you find any discrepancies, please send an email to webmaster.pasag@yahoo.com.",
  ],
  stats: { totalMembers: 0, generations: 5, newMembers: 3 },
  recentUpdates: [
    "New members: Ciriaco Pasag and siblings added on Nov 2025.",
    "New members: Ciriaco Pasag and family added on Nov 2025.",
  ],
  attention: [
    "Please be encouraged to design and develop software or webpages to preserve our family data, and make it accessible to our future generations.",
  ],
  about: {
    title: "Pasag Family Tree",
    paragraphs: [
      "This family tree lets you explore relationships interactively, but it is still in the development stage.",
      "Click nodes to expand, drag to pan, or scroll to zoom.",
      "Developed by Jojo C. Pasag (2025) — Source data: Family Records and Emails.",
    ],
  },
};

/*******************************************************
 *  GLOBAL CONTROL BUTTONS
 *******************************************************/
window.GlobalControls = [
  { label: "Reset View", action: "resetViewAndRoot", nodeId: "1" },
  { label: "Grandfather", action: "loadNewNode", nodeId: "2" },
  { label: "Ciriaco Pasag", action: "loadNewNode", nodeId: "3" },
  { label: "Eugenio Pasag", action: "loadNewNode", nodeId: "5" },
  { label: "Benito Pasag", action: "loadNewNode", nodeId: "4" },
  { label: "Valeriana Pasag", action: "loadNewNode", nodeId: "6" },
  { label: "Pedro Pasag", action: "loadNewNode", nodeId: "7" },
];

/*******************************************************
 *  GLOBAL CONFIG
 *******************************************************/
window.GlobalConfig = window.GlobalConfig || {};
window.GlobalConfig.unwantedNodes = [
  "Folks",
  "Forefather II",
  "Forefather III",
  "Grandfather I",
  "Grandfather II",
];

/*******************************************************
 *  GLOBAL CONTACT MESSAGE
 *******************************************************/
window.getContactMessage = function(action) {
  let header = [
    "Send an email to webmaster.pasag@yahoo.com"
  ];
  let body = [];

  switch (action) {
    case "suggest":
      header.push("Subject: Suggestion and Recommendations");
      body = [
        "Include any comments or suggestions to improve our family tree. Thank you"
      ];
      break;
    case "add":
      header.push("Subject: Add a Member");
      body = [
        "Full name (including maiden name)",
        "Great grandparents full names (if known)",
        "Grandparents full names (if known)",
        "Parents full names",
        "Location",
        "Birth year",
        "Death year (if applicable)",
        "Spouse name (if applicable)",
        "Spouse birth year (if applicable)",
        "Spouse death year (if applicable)"
      ];
      break;
    case "remove":
      header.push("Subject: Remove a Member");
      body = [
        "State only the full name of the member to be removed. Thank You"
      ];
      break;
  }

  return { header, body };
};

/*******************************************************
 *  GLOBAL HOW TO USE TEXT 
 *******************************************************/
window.HOW_TO_USE_TEXT = `
<p>
  Using computer browser: Click <strong>(name)</strong> to expand or collapse, drag to pan, or scroll to zoom.<br>
  Using iPad: Tap <strong>(name)</strong> to expand or collapse, drag to pan, or scroll to zoom.
</p>
`;

/*******************************************************
 *  GLOBAL ABOUT TEXT 
 *******************************************************/
window.ABOUT_TEXT = `
<h2>About This Project</h2>
<p>This family tree visualizer was created to explore and document your family history.</p>
`;

/*******************************************************
 *  RENDER CONTROL BUTTONS
 *******************************************************/
window.renderControlButtons = function () {
  const container = document.querySelector("#controls .control-buttons");
  if (!container) return;

  container.innerHTML = ""; // Clear existing buttons

  window.GlobalControls.forEach((btn) => {
    const button = document.createElement("button");
    button.className = "button-gradient";
    button.textContent = btn.label;

    button.addEventListener("click", () => {
      if (typeof window[btn.action] === "function") {
        window[btn.action](btn.nodeId);
      } else {
        console.warn(`Function ${btn.action} is not defined`);
      }
    });

    container.appendChild(button);
  });
};

/*******************************************************
 *  JSON LOADER
 *******************************************************/
window.loadFamilyJSON = async function (jsonPath) {
  try {
    const res = await fetch(jsonPath);
    const data = await res.json();

    window.GlobalData.raw = data;
    window.GlobalData.members = data.map((m) => m.pDFfilename).filter(Boolean);

    window.GlobalContent.stats.totalMembers = data.length;
    countNewMembersThisYear(data);

    const updatesEl = document.querySelector(".recent-updates ul");
    if (updatesEl) {
      updatesEl.innerHTML = "";
      window.GlobalContent.recentUpdates.forEach((update) => {
        const li = document.createElement("li");
        li.textContent = update;
        updatesEl.appendChild(li);
      });
    }

    window.GlobalData.isLoaded = true;
    console.log("✔ JSON loaded:", window.GlobalData);
    return data;
  } catch (err) {
    console.error("Error loading JSON:", err);
  }
};

/*******************************************************
 *  PDF DROPDOWN
 *******************************************************/
window.populatePDFDropdown = function () {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown || !window.GlobalData.members.length) return;
  if (dropdown.dataset.populated === "true") return;

  dropdown.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select member PDF…";
  placeholder.disabled = true;
  placeholder.selected = true;
  dropdown.appendChild(placeholder);

  window.GlobalData.members.forEach((pdf) => {
    const option = document.createElement("option");
    option.value = pdf;
    option.textContent = pdf.replace(".pdf", "").replace(/_/g, " ");
    dropdown.appendChild(option);
  });

  dropdown.dataset.populated = "true";
};

window.openSelectedPDF = function () {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return alert("Dropdown not found");

  const selected = dropdown.value;
  if (!selected) return alert("Please select a member.");

  window.open("pdfs/" + selected, "_blank");
};

/*******************************************************
 *  NAME NORMALIZER
 *******************************************************/
window.normalizeName = function (name) {
  return name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
};

/*******************************************************
 *  BACKGROUND
 *******************************************************/
window.applyGlobalBackground = function () {
  const el = document.getElementById("treeContainer");
  if (!el) return;

  el.style.background = `
        linear-gradient(to top, rgba(12,2,2,0.45) 50%, rgba(11,0,0,0.55) 50%),
        url(${window.GlobalSettings.bgImage})
    `;
  el.style.backgroundPosition = "center";
  el.style.backgroundSize = "cover";
  el.style.backgroundRepeat = "no-repeat";
};

/*******************************************************
 *  HOME CONTENT
 *******************************************************/
window.applyHomeContent = function () {
  const homeSection = document.getElementById("home");
  if (!homeSection) return;

  const h1 = homeSection.querySelector("h1");
  if (h1) h1.textContent = window.GlobalContent.homeTitle;

  const p = homeSection.querySelector("p");
  if (p) {
    p.innerHTML = "";
    window.GlobalContent.homeDescription.forEach((text) => {
      const para = document.createElement("p");
      para.textContent = text;
      p.appendChild(para);
    });
  }

  if (window.GlobalContent.attention.length > 0) {
    const attentionHeading = document.createElement("h3");
    attentionHeading.textContent = "Attention";
    attentionHeading.style.color = "#d9534f";
    attentionHeading.style.marginTop = "20px";
    homeSection.appendChild(attentionHeading);

    window.GlobalContent.attention.forEach((text) => {
      const para = document.createElement("p");
      para.textContent = text;
      para.className = "attention";
      homeSection.appendChild(para);
    });
  }
};

/*******************************************************
 *  ABOUT MODAL CONTENT
 *******************************************************/
window.applyAboutContent = function () {
  const modal = document.getElementById("aboutModal");
  if (!modal) return;

  const h2 = modal.querySelector("h2");
  const modalContent = modal.querySelector(".modal-content");

  if (h2) h2.textContent = window.GlobalContent.about.title;

  modalContent.querySelectorAll("p").forEach((p) => p.remove());

  window.GlobalContent.about.paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    modalContent.appendChild(p);
  });
};

/*******************************************************
 *  FAMILY TREE INITIALIZER
 *******************************************************/
window.startFamilyTree = function () {
  if (window.GlobalData.isLoaded && typeof window.loadNewNode === "function") {
    window.members = window.GlobalData.members;
    window.loadNewNode("1");
    console.log("✔ Family tree initialized");
    return true;
  }
  return false;
};

/*******************************************************
 *  DISPLAY MEMBER COUNT
 *******************************************************/
function displayMemberCount() {
  const data = window.GlobalData.raw;
  if (!data || !data.length) return;
  document.getElementById("numberOfMember").textContent = data.length;
}

/*******************************************************
 *  COUNT NEW MEMBERS THIS YEAR
 *******************************************************/
function countNewMembersThisYear(data) {
  const currentYear = new Date().getFullYear();

  const newMembers = data.filter((member) => {
    if (!member["dateSubmitted"]) return false;
    const year = new Date(member["dateSubmitted"]).getFullYear();
    return year === currentYear;
  });

  document.getElementById("newMembersCount").textContent = newMembers.length;
}

/*******************************************************
 *  AUTO-START ON PAGE LOAD
 *******************************************************/
document.addEventListener("DOMContentLoaded", () => {
  window.applyGlobalBackground();
  window.applyHomeContent();
  window.applyAboutContent();
  window.renderControlButtons();

  window.loadFamilyJSON(window.GlobalSettings.jsonFile).then(() => {
    window.populatePDFDropdown();
    if (!window.startFamilyTree()) {
      window.addEventListener("treeJSLoaded", () => window.startFamilyTree());
    }
  });
});
