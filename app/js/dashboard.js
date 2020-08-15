
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
    badgeEditor: (user, project, id, label, value, colorLeft, colorRight) => {
      return `
      <li><div class="badge-editor">
        <input type="text" class="badge-left ${colorLeft}" value="${label}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, this.value)" onchange="hideSaveBadge('${project}')">
        <input type="text" class="badge-right ${colorRight}" value="${value}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, '', this.value)" onchange="hideSaveBadge('${project}')">
        <div class="badge-actions">
          <button onclick="toggleBadgeEditDialog('${project}', ${id})" aria-label="Additional Badge Settings">⚙</button>
          <button class="icon-md" onclick="copyMd('${user}', '${project}', ${id})" aria-label="Copy Markdown"></button>
          <button class="icon-close" onclick="deleteBadge('${project}', ${id})" aria-label="Delete Badge"></button>
        </div>
      </div></li>`
    },
    badgeEditOptions: (project, id) => {
      return `
      <h2>Edit Badge</h2>
      <label for="badge-edit-style">Style</label>
      <select id="badge-edit-style">
        <option value="0">Plastic (Default)</option>
        <option value="1">Flat</option>
      </select>
      <label for="badge-edit-cl">Color (Left)</label>
      <select id="badge-edit-cl">
        <option value="0">Slate</option>
        <option value="1">Savannah</option>
        <option value="2">Sahara</option>
        <option value="3">Sunset</option>
      </select>
      <label for="badge-edit-cr">Color (Right)</label>
      <select id="badge-edit-cr">
        <option value="0">Slate</option>
        <option value="1" selected>Savannah</option>
        <option value="2">Sahara</option>
        <option value="3">Sunset</option>
      </select>
      <button class="badge" onclick="updateBadgeMeta('${project}', ${id})">
        <span class="badge-left">Apply Changes</span>
      </button>`
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
    },
    projectCreate: () => {
      return `
      <h2>New Project</h2>
      <label for="project-create-input">Project Title</label>
      <input id="project-create-input" type="text" placeholder="Title">
      <button class="badge" onclick="createProject()"><span class="badge-left">Create Project</span></button>`
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
    badgesHtml += template.badgeEditor(userName, project.title, badge.id, 
      badge.title, badge.value, badge.titleColor, badge.valueColor);
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

const updateBadge = debounce((project, badgeId, newKey = "", newVal = "") => {
  const params = {
    project: project,
    id: badgeId,
    key: encodeURI(newKey),
    val: encodeURI(newVal),
    keyW: getStringPixelWidth(newKey, "11px Verdana") + 25,
    valW: getStringPixelWidth(newVal, "11px Verdana") + 25
  }
  const paramString = new URLSearchParams(params).toString();
  const saveBadge = document.getElementById(`save-${project}`);
  fetch(`/api/badges/update?${paramString}`)
  .then(res => {
    saveBadge.classList.add("shown");
    saveBadge.innerText = "Saved";
  })
  .catch(ex => {
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error saving!";
    console.error(ex);
  });
}, 1000, false);

function updateBadgeMeta(project, badgeId) {
  const params = {
    project: project,
    id: badgeId,
    style: document.getElementById("badge-edit-style").value,
    colorRight: document.getElementById("badge-edit-cr").value,
    colorLeft: document.getElementById("badge-edit-cl").value
  }
  const paramString = new URLSearchParams(params).toString();
  const saveBadge = document.getElementById(`save-${project}`);
  fetch(`/api/badges/meta?${paramString}`)
  .then(res => {
    saveBadge.classList.add("shown");
    saveBadge.innerText = "Saved";
  })
  .then(hideDialog())
  .catch(ex => {
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error saving!";
    console.error(ex);
  });
}

const hideSaveBadge = debounce((project) => {
  document.getElementById(`save-${project}`).className = "project-save";
}, 2000, false);

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

function hideDialog() {
  document.getElementById("dov").classList.add("collapsed");
}

function toggleCreationDialog() {
  document.getElementById("dov").classList.toggle("collapsed");
  document.getElementById("dialog").innerHTML = template.projectCreate();
}

function toggleBadgeEditDialog(project, id) {
  document.getElementById("dov").classList.toggle("collapsed");
  document.getElementById("dialog").innerHTML = template.badgeEditOptions(project, id);
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

  const saveBadge = document.getElementById(`save-${project}`);
  saveBadge.classList.add("shown");
  try {
    const successful = document.execCommand('copy');
    if (!successful) throw new ErrorEvent("");
    saveBadge.innerText = `Copied!`;
  } catch (err) {
    console.error('Unable to copy', err);
    saveBadge.innerText = `Copy fail`;
  }

  hideSaveBadge(project);

  document.body.removeChild(textArea);
}

function getStringPixelWidth(string, font) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  ctx.font = font;        
  return Math.ceil(ctx.measureText(string).width);
}