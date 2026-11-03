<template>
  <footer class="footer">
    <div class="footer-contenido">
      <div class="footer-marca">
        <img src="/Logo.png" alt="Logo de Kiseki" class="footer-logo" />
        <p>Kiseki · Tu universo de anime en un solo lugar.</p>
      </div>

      <nav class="footer-enlaces">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/eventos">Eventos</RouterLink>
        <RouterLink to="/historial">Historial</RouterLink>
        <RouterLink to="/ayuda">Ayuda</RouterLink>
        <RouterLink to="/tienda">Tienda</RouterLink>
      </nav>

      <div class="footer-redes">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" title="X">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        </a>
      </div>
    </div>

    <p class="footer-copy">© {{ anio }} Kiseki. Todos los derechos reservados.</p>
  </footer>
</template>

<script setup lang="ts">
const anio = new Date().getFullYear()
</script>

<style scoped>
.footer {
  margin: 40px auto 20px;
  padding: 24px 30px 16px;
  width: 100%;
  background: var(--color-principal);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  color: #ffffff;
}

.footer-contenido {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-marca {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-marca p {
  margin: 0;
  font-weight: 600;
}

/* El logo va en un recuadro blanco para que se vea sobre el rojo */
.footer-logo {
  height: 48px;
  width: auto;
  padding: 4px 8px;
  border-radius: 12px;
  background: #ffffff;
}

.footer-enlaces {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-enlaces a {
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
}

.footer-enlaces a:hover {
  text-decoration: underline;
}

.footer-redes {
  display: flex;
  gap: 10px;
}

.footer-redes a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: var(--color-principal);
  transition: all 0.3s;
}

.footer-redes a:hover {
  background: var(--texto);
  color: #ffffff;
  transform: scale(1.08);
}

.footer-copy {
  margin: 18px 0 0;
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.9;
}

@media (max-width: 700px) {
  .footer-contenido {
    flex-direction: column;
    text-align: center;
  }

  .footer-marca {
    flex-direction: column;
  }
}
</style>