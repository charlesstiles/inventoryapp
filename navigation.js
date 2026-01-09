// navigation.js
(function(){
  function qs(id){ return document.getElementById(id); }

  async function getUser(){
    const sb = window.getSupabase();
    const { data } = await sb.auth.getUser();
    return data?.user || null;
  }

  function buildNavHTML(user){
    return `
      <div class="navWrap">
        <div class="navTitle">Inventory App</div>
        <button class="hamburger" id="navBtn" aria-label="Menu">☰</button>
      </div>
      <div class="menu" id="navMenu" style="display:none;">
        ${user ? `
          <a href="capture.html">Capture</a>
          <a href="search.html">Search</a>
          <a href="container.html">Container</a>
          <a href="location_detail.html">Locations</a>
          <div class="muted">Signed in as<br>${user.email || "(email hidden)"}</div>
          <button id="navLogout" class="danger">Logout</button>
        ` : `
          <a href="capture.html">Sign In</a>
          <div class="muted">Sign in to access Search/Container.</div>
        `}
      </div>
    `;
  }

  function attachMenuHandlers(){
    const btn = qs("navBtn");
    const menu = qs("navMenu");
    if(!btn || !menu) return;

    btn.addEventListener("click", () => {
      menu.style.display = (menu.style.display === "none") ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.style.display = "none";
      }
    });
  }

  async function attachLogout(){
    const logoutBtn = qs("navLogout");
    if(!logoutBtn) return;
    logoutBtn.addEventListener("click", async () => {
      const sb = window.getSupabase();
      await sb.auth.signOut();
      window.location.href = "capture.html";
    });
  }

  window.APP_NAV = {
    async render(targetId){
      const el = document.getElementById(targetId);
      if(!el) return;

      let user = null;
      try { user = await getUser(); } catch(e){ /* ignore */ }

      el.innerHTML = buildNavHTML(user);
      attachMenuHandlers();
      await attachLogout();

      // If logged out, hide nav links by removing them (already handled by buildNavHTML)
    }
  };
})();
