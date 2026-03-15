// Update: Unified floating navigation across the app.
// Revision: 2026-03-15.v3
(function(){
  function qs(id){ return document.getElementById(id); }

  async function getUser(){
    const sb = window.getSupabase();
    const { data } = await sb.auth.getUser();
    return data?.user || null;
  }

  function buildNavHTML(user){
    return `
      <div class="navBrand">Inventory App</div>
      <button class="hamburger" id="navBtn" aria-label="Menu">☰</button>
      <div class="menu" id="navMenu" style="display:none;">
        ${user ? `
          <a href="index.html">Home</a>
          <a href="capture.html">Capture</a>
          <a href="search.html">Search</a>
          <a href="inventory_report.html">Report</a>
          <a href="container.html">Container</a>
          <a href="location_detail.html">Locations</a>
          <div class="nav-divider"></div>
          <div class="muted">Signed in as<br>${user.email || "(email hidden)"}</div>
          <button id="navLogout" class="danger">Logout</button>
        ` : `
          <a href="index.html">Home</a>
          <a href="index.html">Sign In</a>
          <div class="muted">Sign in to access app features.</div>
        `}
      </div>
    `;
  }

  function attachMenuHandlers(){
    const btn = qs("navBtn");
    const menu = qs("navMenu");
    if(!btn || !menu) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = (menu.style.display === "none") ? "block" : "none";
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== btn) menu.style.display = "none";
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") menu.style.display = "none";
    });
  }

  async function attachLogout(){
    const logoutBtn = qs("navLogout");
    if(!logoutBtn) return;
    logoutBtn.addEventListener("click", async () => {
      const sb = window.getSupabase();
      await sb.auth.signOut();
      window.location.href = "index.html";
    });
  }

  window.APP_NAV = {
    async render(targetId){
      const el = document.getElementById(targetId);
      if(!el) return;
      let user = null;
      try { user = await getUser(); } catch(e){}
      el.innerHTML = buildNavHTML(user);
      attachMenuHandlers();
      await attachLogout();
    }
  };
})();
