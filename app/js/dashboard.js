
document.addEventListener("DOMContentLoaded", () => {
  // Fetches user data
  fetch("/api/data")
  .then(res => res.text())
  .then(res => buildDashboard(JSON.parse(res)));

  document.addEventListener("click", hideProfileDropdwown);
});

function templator() {
  return {
    badgeEditor: (label, value) => {
      return `
      <li><div class="badge-editor">
        <span class="badge-left">${label}</span>
        <input type="text" class="badge-right" value="${value}" spellcheck="false">
        <div class="badge-actions">
          <button>⚙</button>
          <button>&lt;&gt;</button>
          <button>X</button>
        </div>
      </div></li>`
    },
    project: (title, badges) => {
      return `
      <section class="dashboard-section project">
      <h2><span class="droplet"></span>${title}</h2>
      <ul class="badges">
      ${badges}
      </ul>
      </section>`
    }
  }
}

function buildDashboard(data) {
  const template = templator();
  let projectsHtml = "";
  data.projects.forEach(project => {
    projectsHtml += template.project(project.title, getBadges(project));
  });
  document.getElementById("projects").innerHTML = projectsHtml;

  // Kill loader
  document.getElementById("loader").style.display = "none";
}

function getBadges(project) {
  const template = templator();
  let badgesHtml = "";
  project.badges.forEach(badge => {
    badgesHtml += template.badgeEditor(badge.title, badge.value);
  });
  return badgesHtml;
}

function refresh() {
  // Fetches user data
  fetch("/api/data")
  .then(res => res.text())
  .then(res => buildDashboard(JSON.parse(res)));
}

function toggleCreationDialog() {
  document.getElementById("dov").classList.toggle("collapsed");
}

function toggleProfileDropdown() {
  document.getElementById("profileDropdown").classList.toggle("collapsed");
}

function hideProfileDropdwown() {
  const profileDropdown = document.getElementById("profileDropdown");
  if (!profileDropdown.classList.contains("collapsed"))
    profileDropdown.classList.add("collapsed");
}

function preventDefault(e) {
  e.preventDefault(e);
  e.stopPropagation();
}