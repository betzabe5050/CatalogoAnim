<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-logo">🎌 Catálogo Anime</RouterLink>

    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/registro" class="nav-icon" title="Registrarse">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 14px 30px;
  background: linear-gradient(145deg, #f5efe8, #e8dccc);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.25);
  position: sticky;
  top: 10px;
  z-index: 100;
}

.nav-logo {
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #5c4033;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #5c4033;
  text-decoration: none;
  font-weight: 600;
}

.nav-link:hover {
  color: #b8957a;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #b8957a;
  color: #f5efe8;
  transition: all 0.3s;
}

.nav-icon:hover {
  background: #5c4033;
  transform: scale(1.08);
}
</style>