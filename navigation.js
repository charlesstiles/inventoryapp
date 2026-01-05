// navigation.js
// Responsive navigation: inline links on desktop, hamburger menu on mobile.

window.APP_NAV = {
  links: [
    { label: "Capture", href: "./capture.html" },
    { label: "Search", href: "./search.html" },
    { label: "Container", href: "./container.html" }
  ],

  render(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;

    // Detect current page to highlight
    const current = (location.pathname.split("/").pop() || "").toLowerCase();

    host.innerHTML = `
      <div class="navWrap">
        <button class="navBurger" type="button" aria-label="Menu" aria-expanded="false">
          ☰
        </button>
        <div class="navInline"></div>
        <div class="navMenu hidden" role="menu"></div>
      </div>
    `;

    const wrap = host.querySelector(".navWrap");
    const burger = host.querySelector(".navBurger");
    const inline = host.querySelector(".navInline");
    const menu = host.querySelector(".navMenu");

    const makeLink = (link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.className = "navLink";
      const target = (link.href.split("/").pop() || "").toLowerCase();
      if (target === current) a.classList.add("active");
      return a;
    };

    // Inline links (desktop)
    for (const link of this.links) inline.appendChild(makeLink(link));

    // Dropdown links (mobile)
    for (const link of this.links) {
      const a = makeLink(link);
      a.setAttribute("role", "menuitem");
      menu.appendChild(a);
    }

    function closeMenu() {
      menu.classList.add("hidden");
      burger.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      const isHidden = menu.classList.contains("hidden");
      if (isHidden) {
        menu.classList.remove("hidden");
        burger.setAttribute("aria-expanded", "true");
      } else {
        closeMenu();
      }
    }

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", () => closeMenu());

    // Close after selecting a link
    menu.addEventListener("click", () => closeMenu());
  }
};
