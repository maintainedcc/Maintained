
function templator() {
  return {
    badge: function (title, value, link) {
      return `
      <a href="${link}" class="badge badge-link">
        <span class="badge-left">${title}</span>
        <span class="badge-right">${value}</span>
      </a>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pathParams = window.location.pathname.split("/");
  // Build dashboard using fetched user data
  fetch(`/api/user/project?name=${pathParams[1]}&project=${pathParams[2]}`)
  .then(res => res.text())
  .then(res => {
    const template = templator();

    const data = JSON.parse(res);

    document.getElementById("project-title").innerText = `${pathParams[1]}/${data.title}`;
    document.getElementById("user-github").href = `https://github.com/${pathParams[1]}`;
    
    const badges = document.getElementById("badges");
    let shouldClear = true;
    data.badges.forEach((badge) => {
      if (badge.redirect) {
        if (shouldClear) {
          badges.innerHTML = "";
          shouldClear = false;
        }
        badges.innerHTML += template.badge(badge.title, badge.value, badge.redirect);
      }
    })
  })
  .then(document.getElementById("loader").remove());
});