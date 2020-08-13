
// Debouncer, MIT License
// Underscore.js https://github.com/jashkenas/underscore
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

document.addEventListener("DOMContentLoaded", () => {
  // Build dashboard using refresh function
  refresh();

  document.addEventListener("click", hideProfileDropdown);
});

function templator() {
  return {
    badgeEditor: (user, project, id, label, value) => {
      return `
      <li><div class="badge-editor">
        <input type="text" class="badge-left" value="${label}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, this.value)" onchange="hideSaveBadge('${project}')">
        <input type="text" class="badge-right" value="${value}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, '', this.value)" onchange="hideSaveBadge('${project}')">
        <div class="badge-actions">
          <button>⚙</button>
          <button onclick="copyMd('${user}', '${project}', ${id})">&lt;&gt;</button>
          <button class="icon-close" onclick="deleteBadge('${project}', ${id})"></button>
        </div>
      </div></li>`
    },
    project: (user, title, badges) => {
      return `
      <section class="dashboard-section project">
      <div class="project-header">
        <h2><span class="droplet"></span>${user}/${title} <span id="save-${title}" class="project-save">Saved</span></h2>
        <div class="project-actions">
          <button class="icon-close" title="Delete Project" onclick="deleteProject('${title}')"></button>
          <button class="icon-add" title="Add Badge" onclick="createBadge('${title}')"></button>
        </div>
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
    projectsHtml += template.project(data.name, project.title, getBadges(data.name, project));
  });
  document.getElementById("projects").innerHTML = projectsHtml;

  // Kill loader
  document.getElementById("loader").style.display = "none";
  
  // Display welcome if first time user
  if (data.firstTime)
    document.getElementById("welcome").classList.add("shown");
}

function getBadges(userName, project) {
  let badgesHtml = "";
  project.badges.forEach(badge => {
    badgesHtml += template.badgeEditor(userName, project.title, badge.id, badge.title, badge.value);
  });
  return badgesHtml;
}

function createBadge(project) {
  fetch(`/api/badges/create?project=${project}`)
  .then(refresh());
}

function deleteBadge(project, badgeId) {
  fetch(`/api/badges/delete?project=${project}&id=${badgeId}`)
  .then(refresh());
}

function updateBadge(project, badgeId, newKey = "", newVal = "") {
  debounce(() => {
    const params = {
      project: project,
      id: badgeId,
      key: encodeURI(newKey),
      val: encodeURI(newVal),
      keyW: getStringPixelWidth(newKey, "11px Verdana") + 25,
      valW: getStringPixelWidth(newVal, "11px Verdana") + 25
    }
    const paramString = new URLSearchParams(params).toString();
    fetch(`/api/badges/update?${paramString}`)
    .then(document.getElementById(`save-${project}`).classList.add("shown"));
  }, 1000, false)();
}

function hideSaveBadge(project) {
  debounce(() => {
    document.getElementById(`save-${project}`).classList.remove("shown");
  }, 2000, false)();
}

function createProject() {
  const projName = document.getElementById("project-create-input");
  fetch(`/api/projects/create?project=${projName.value}`)
  .then(refresh())
  .then(toggleCreationDialog())
  .then(projName.value = "");
}

function deleteProject(project) {
  fetch(`/api/projects/delete?project=${project}`)
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

function hideWelcome() {
  // Endpoint to hide welcome message in the future
  fetch("/api/user/welcome");
  document.getElementById("welcome").classList.remove("shown");
}

function stopPropagation(e) {
  e.stopPropagation();
}

function copyMd(userName, project, id) {
  const url = `http://localhost:8000/${userName}/${project}/${id}`;
  const md = `![${url}](${url})`;

  let textArea = document.createElement("textarea");
  textArea.value = md;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.error('Unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function getStringPixelWidth(string, font) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  ctx.font = font;        
  return Math.ceil(ctx.measureText(string).width);
}