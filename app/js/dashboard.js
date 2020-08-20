
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

// Global auth object to stop auth being passed around
const auth = {
  userId: ""
}

document.addEventListener("DOMContentLoaded", () => {
  // Build dashboard using fetched user data
  fetch("/api/user/data")
  .then(res => res.text())
  .then(res => {
    const data = JSON.parse(res);
    auth.userId = data.name;
    buildDashboard(data);
  });

  document.addEventListener("click", hideProfileDropdown);
});

function templator() {
  // Matches the BadgeColor enum
  function colorMap(color) {
    switch(color) {
      case 0: // Simple
        return "#555";
      case 1: // Slate
        return "#556";
      case 2: // Seabed
        return "#013";
      case 3: // Subterranean
        return "#111";
      case 4: // Savannah
        return "#AB2";
      case 5: // Sahara
        return "#F80";
      case 6: // Sunset
        return "#F20";
      default: // Assume a hex code was provided
        return color;
    }
  }

  return {
    badgeEditor: (project, id, label, value, colorLeft, colorRight, style, mono) => {
      return `
      <li id="badge-${project}-${id}"><div class="badge-editor">
        <input id="badge-${project}-${id}-title" type="text" class="badge-left" style="background-color:${colorMap(colorLeft)}" value="${label}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, this.value)" onchange="hideSaveBadge('${project}')">
        <input id="badge-${project}-${id}-value" type="text" class="badge-right ${mono ? "hidden" : ""}" style="background-color:${colorMap(colorRight)}" value="${value}" spellcheck="false" 
          oninput="updateBadge('${project}', ${id}, '', this.value)" onchange="hideSaveBadge('${project}')">
        <div class="badge-actions">
          <button onclick="toggleBadgeEditDialog('${project}', ${id}, ${style}, ${mono}, ${colorLeft}, ${colorRight})" aria-label="Additional Badge Settings">⚙</button>
          <button class="icon-md" onclick="copyMd('${project}', ${id})" aria-label="Copy Markdown"></button>
          <button class="icon-close" onclick="toggleDeleteDialog('Delete badge ${id}?', 'Delete', 'deleteBadge(\\'${project}\\', ${id})')" aria-label="Delete Badge"></button>
        </div>
      </div></li>`
    },
    badgeEditOptions: (project, id, mono) => {
      return `
      <h2>Edit Badge</h2>
      <label for="badge-edit-style">Style</label>
      <select id="badge-edit-style">
        <option value="0">Plastic</option>
        <option value="1">Flat</option>
      </select>
      <label for="badge-edit-mono">Mono</label>
      <select id="badge-edit-mono">
        <option value="false">Full Badge</option>
        <option value="true">Mono</option>
      </select>
      <label for="badge-edit-cl">Color (Title)</label>
      <select id="badge-edit-cl">
        <option value="0">Simple</option>
        <option value="1">Slate</option>
        <option value="2">Seabed</option>
        <option value="3">Subterranean</option>
      </select>
      <label for="badge-edit-cr" class="${mono ? "hidden" : ""}">Color (Value)</label>
      <select id="badge-edit-cr" class="${mono ? "hidden" : ""}">
        <option value="4">Savannah</option>
        <option value="5">Sahara</option>
        <option value="6">Sunset</option>
      </select>
      <button class="badge" onclick="updateBadgeMeta('${project}', ${id})">
        <span class="badge-left">Apply Changes</span>
      </button>`
    },
    project: (user, title, badges) => {
      return `
      <section id="project-${title}" class="dashboard-section project">
      <div class="project-header">
        <h2><span class="droplet"></span>${user}/${title} <span id="save-${title}" class="project-save">Saved</span></h2>
        <div class="project-actions">
          <button class="icon-close" title="Delete Project" onclick="toggleDeleteDialog('Delete ${user}/${title}?', 'Delete', 'deleteProject(\\'${title}\\')')"></button>
          <button class="icon-add" title="Add Badge" onclick="createBadge('${title}')"></button>
        </div>
      </div>
      <ul id="badge-group-${title}" class="badges">
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
    },
    deleteDialog: (title, actionName, action) => {
      return `
      <h2>${title}</h2>
      <p>Are you sure you want to delete this item?</p>
      <button class="badge" onclick="${action}"><span class="badge-left">${actionName}</span></button>`
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
  
  // Display welcome if first time user
  if (data.firstTime)
    document.getElementById("welcome").classList.add("shown");
}

function getBadges(project) {
  let badgesHtml = "";
  project.badges.forEach(badge => {
    badgesHtml += template.badgeEditor(project.title, badge.id, badge.title, 
      badge.value, badge.titleColor, badge.valueColor, badge.style, badge.isMono);
  });
  return badgesHtml;
}

function createBadge(project) {
  fetch(`/api/badges/create?project=${project}`)
  .then(res => res.text())
  .then(res => {
    res = JSON.parse(res);
    const badgeGroup = document.getElementById(`badge-group-${project}`);
    badgeGroup.innerHTML += template.badgeEditor(project, res.id,
      res.title, res.value, res.titleColor, res.valueColor, res.style, res.isMono);
  })
  .catch(ex => {
    const saveBadge = document.getElementById(`save-${project}`);
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error!";
    console.error(ex);
  });
}

function deleteBadge(project, badgeId) {
  fetch(`/api/badges/delete?project=${project}&id=${badgeId}`)
  .then(document.getElementById(`badge-${project}-${badgeId}`).remove())
  .then(hideDialog())
  .catch(ex => {
    const saveBadge = document.getElementById(`save-${project}`);
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error!";
    console.error(ex);
  });
}

const updateBadge = debounce((project, badgeId, newKey = "", newVal = "") => {
  // This code updates the html value= tag on the badge
  // When the DOM is updated, badges will revert to the old value= tag
  // This means that even if a badge saved, it will visually revert.
  const badgeIdString = `badge-${project}-${badgeId}`;
  if (newKey)
    document.getElementById(`${badgeIdString}-title`).setAttribute("value", newKey);
  if (newVal) {
    document.getElementById(`${badgeIdString}-value`).setAttribute("value", newVal);
  }

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
  .then(() => {
    saveBadge.classList.add("shown");
    saveBadge.innerText = "Saved";
  })
  .catch(ex => {
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error saving!";
    console.error(ex);
  });
}, 300, false);

function updateBadgeMeta(project, badgeId) {
  const params = {
    project: project,
    id: badgeId,
    style: document.getElementById("badge-edit-style").value,
    isMono: document.getElementById("badge-edit-mono").value,
    colorRight: document.getElementById("badge-edit-cr").value,
    colorLeft: document.getElementById("badge-edit-cl").value
  }
  const paramString = new URLSearchParams(params).toString();
  const saveBadge = document.getElementById(`save-${project}`);
  fetch(`/api/badges/meta?${paramString}`)
  .then(res => res.text())
  .then(res => {
    res = JSON.parse(res);
    const updatedBadge = template.badgeEditor(project, res.id,
      res.title, res.value, res.titleColor, res.valueColor, res.style, res.isMono);
    // TODO: Temp solution for parsing HTML strings (IE9+)
    // Has good browser compat, but probably want to replace with appendChild sometime
    const fragment = document.createRange().createContextualFragment(updatedBadge);
    const currentBadge = document.getElementById(`badge-${project}-${badgeId}`);
    currentBadge.parentNode.replaceChild(fragment, currentBadge);
  })
  .then(() => {
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
  .then(res => res.text())
  .then(res => {
    res = JSON.parse(res);
    // TODO//REVIEW: Should this be sorted when it's created?
    const newProj = template.project(auth.userId, res.title, getBadges(res));
    const projects = document.getElementById("projects");
    projects.innerHTML = newProj + projects.innerHTML;
  })
  .then(toggleCreationDialog())
  .then(projName.value = "");
}

function deleteProject(project) {
  fetch(`/api/projects/delete?project=${project}`)
  .then(document.getElementById(`project-${project}`).remove())
  .then(hideDialog())
  .catch(ex => {
    const saveBadge = document.getElementById(`save-${project}`);
    saveBadge.classList.add("shown");
    saveBadge.classList.add("error");
    saveBadge.innerText = "Error!";
    console.error(ex);
  });
}

function hideDialog() {
  document.getElementById("dov").classList.add("collapsed");
}

function toggleCreationDialog() {
  document.getElementById("dov").classList.toggle("collapsed");
  document.getElementById("dialog").innerHTML = template.projectCreate();
}

function toggleBadgeEditDialog(project, id, style, mono, cL, cR) {
  document.getElementById("dov").classList.toggle("collapsed");
  document.getElementById("dialog").innerHTML = template.badgeEditOptions(project, id, mono);

  document.getElementById("badge-edit-style").value = style;
  document.getElementById("badge-edit-mono").value = mono;
  document.getElementById("badge-edit-cl").value = cL;
  document.getElementById("badge-edit-cr").value = cR;
}

function toggleDeleteDialog(title, actionName, action) {
  document.getElementById("dov").classList.toggle("collapsed");
  document.getElementById("dialog").innerHTML = template.deleteDialog(title, actionName, action);
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

function copyMd(project, id) {
  const url = `https://${window.location.host}/${auth.userId}/${project}/${id}`;
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