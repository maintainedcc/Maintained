
document.addEventListener("DOMContentLoaded", () => {
  // Build dashboard using refresh function
  refresh();

  document.addEventListener("click", hideProfileDropdown);
});

function templator() {
  return {
    badgeEditor: (label, value) => {
      return `
      <li><div class="badge-editor">
          <input type="text" class="badge-left" value="${label}" spellcheck="false">
        <input type="text" class="badge-right" value="${value}" spellcheck="false">
        <div class="badge-actions">
          <button>⚙</button>
          <button>&lt;&gt;</button>
          <button>x</button>
        </div>
      </div></li>`
    },
    project: (user, title, badges) => {
      return `
      <section class="dashboard-section project">
      <div class="project-header">
        <h2><span class="droplet"></span>${user}/${title}</h2>
        <button class="project-add" onclick="createBadge('${title}')">+</button>
      </div>
      <ul class="badges">
      ${badges}
      </ul>
      </section>`
    }
  }
}

const template = templator();

function buildDashboard(data) {
  let projectsHtml = "";
  data.projects.forEach(project => {
    projectsHtml += template.project(data.name, project.title, getBadges(project));
  });
  document.getElementById("projects").innerHTML = projectsHtml;

  // Kill loader
  document.getElementById("loader").style.display = "none";
}

function getBadges(project) {
  let badgesHtml = "";
  project.badges.forEach(badge => {
    badgesHtml += template.badgeEditor(badge.title, badge.value);
  });
  return badgesHtml;
}

function createBadge(project) {
  fetch(`/api/badges/create?project=${project}`)
  .then(refresh());
}

function refresh() {
  // Fetches user data
  fetch("/api/user/data")
  .then(res => res.text())
  .then(res => buildDashboard(JSON.parse(res)));
}

function toggleCreationDialog() {
  document.getElementById("dov").classList.toggle("collapsed");
}

function toggleProfileDropdown() {
  document.getElementById("profileDropdown").classList.toggle("collapsed");
}

function hideProfileDropdown() {
  const profileDropdown = document.getElementById("profileDropdown");
  if (!profileDropdown.classList.contains("collapsed"))
    profileDropdown.classList.add("collapsed");
}

function stopPropagation(e) {
  e.stopPropagation();
}