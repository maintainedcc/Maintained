
function templator() {
  return {
    badge: function (title, value, link) {
      return `
      <a href="${link}" class="badge badge-link">
        <span class="badge-left">${title}</span>
        <span class="badge-right">${value}</span>
      </a>
      <br>
      <p>Links to: <b>${link}</b></p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pathParams = window.location.pathname.split("/");
  // Build dashboard using fetched user data
  fetch(`/${pathParams[1]}/${pathParams[2]}/${pathParams[3]}/json`)
  .then(res => res.text())
  .then(res => {
    const template = templator();
    const badges = document.getElementById("badges");

    const data = JSON.parse(res);

    document.getElementById("project-title").innerText = `${pathParams[1]}/${pathParams[2]}`;
    document.getElementById("user-github").href = `https://github.com/${pathParams[1]}`;

    if (!data.redirect) {
      badges.innerHTML += "<p>Badge does not exist or does not have a redirect URL.</p>";
      return;
    }
    
    badges.innerHTML = "";
    badges.innerHTML += template.badge(data.title, data.value, data.redirect);
  })
  .then(document.getElementById("loader").remove());
});