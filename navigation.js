// navigation.js
// Centralized navigation config + renderer

window.APP_NAV = {
  links: [
    { label: "Capture", href: "./capture.html" },
    { label: "Search", href: "./search.html" },
    { label: "Container", href: "./container.html" }
  ],

  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = "";

    for (const link of this.links) {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.className = "link-btn";
      el.appendChild(a);
    }
  }
};
