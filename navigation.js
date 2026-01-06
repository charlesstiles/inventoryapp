/* =========================
   navigation.js (FULL FILE)
   =========================
   - Hides Search + Container links when logged out
   - Shows Logout only when logged in
   - Requires pages to set: window.APP_SUPABASE = supabaseClient;
*/

window.APP_NAV = {
  links: [
    { label: "Capture", href: "./capture.html" },
    { label: "Search", href: "./search.html", requiresAuth: true },
    { label: "Container", href: "./container.html", requiresAuth: true }
  ],

  async render(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;

    const current = (location.pathname.split("/").pop() || "").toLowerCase();
    const sb = window.APP_SUPABASE || null;

    // Determine session (controls link visibility + Logout)
    let isAuthed = false;
    try {
      if (sb) {
        const { data } = await sb.auth.getSession();
        isAuthed = !!data?.session;
      }
    } catch (_) {
      isAuthed = false;
    }

    host.innerHTML = `
      <div class="navWrap">
        <button class="navBurger" type="button" aria-label="Menu" aria-expanded="false">☰</button>
        <div class="navInline"></div>
        <div class="navMenu hidden" role="menu"></div>
      </div>
    `;

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

    const makeAction = ({ label, onClick }) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.className = "navLink";
      b.style.cursor = "pointer";
      b.addEventListener("click", onClick);
      return b;
    };

    // Filter links by auth requirement
    const visibleLinks = this.links.filter(l => !l.requiresAuth || isAuthed);

    // Desktop inline
    for (const link of visibleLinks) inline.appendChild(makeLink(link));

    // Mobile menu
    for (const link of visibleLinks) {
      const a = makeLink(link);
      a.setAttribute("role", "menuitem");
      menu.appendChild(a);
    }

    // Logout only when authenticated
    if (isAuthed) {
      const doLogout = async () => {
        try {
          if (sb) await sb.auth.signOut();
        } finally {
          location.href = "./capture.html?v=" + Date.now();
        }
      };

      inline.appendChild(makeAction({ label: "Logout", onClick: doLogout }));

      const mobLogout = makeAction({ label: "Logout", onClick: doLogout });
      mobLogout.setAttribute("role", "menuitem");
      menu.appendChild(mobLogout);
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

    burger.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
    document.addEventListener("click", () => closeMenu());
    menu.addEventListener("click", () => closeMenu());
  }
};
