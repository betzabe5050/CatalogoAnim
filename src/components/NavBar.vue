<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-logo">
      <img src="/Logo.png" alt="Logo de Kiseki" class="nav-logo-img" />
      <span>Kiseki</span>
    </RouterLink>

    <button
      type="button"
      class="nav-toggle"
      :aria-expanded="menuAbierto"
      aria-label="Abrir menú"
      @click="menuAbierto = !menuAbierto"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" :class="{ abierto: menuAbierto }" @click="menuAbierto = false">
      <div
        v-for="item in menu"
        :key="item.ruta"
        class="nav-item"
      >
        <RouterLink
          :to="item.ruta"
          class="nav-link"
          :class="{ 'nav-link-activo': esActivo(item.ruta) }"
        >
          {{ item.etiqueta }}
          <span v-if="item.submenu" class="flecha">▾</span>
        </RouterLink>

        <ul v-if="item.submenu" class="submenu">
          <li v-for="sub in item.submenu" :key="sub.ruta">
            <RouterLink :to="sub.ruta" class="submenu-link">
              {{ sub.etiqueta }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <RouterLink to="/carrito" class="nav-icon nav-cart" title="Carrito">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
        </svg>
        <span v-if="totalArticulos > 0" class="cart-badge">{{ totalArticulos }}</span>
      </RouterLink>

      <template v-if="estaLogueado">
        <span class="nav-usuario">Hola, {{ usuarioActual?.nombre }}</span>
        <button type="button" class="nav-salir" @click="salir">
          Cerrar sesión
        </button>
      </template>

      <button
        v-else
        type="button"
        class="nav-icon"
        title="Iniciar sesión"
        @click="abrirLogin"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menu } from '../data/menu'
import { useSesion } from '../composables/useSesion'
import { useLoginModal } from '../composables/useLoginModal'
import { useCarrito } from '../composables/useCarrito'

const menuAbierto = ref(false)
const router = useRouter()
const route = useRoute()
const { usuarioActual, estaLogueado, cerrarSesion } = useSesion()
const { abrirLogin } = useLoginModal()
const { totalArticulos } = useCarrito()

// Marca el título como activo también cuando estás dentro de un submenú
const esActivo = (ruta: string) =>
  route.path === ruta || route.path.startsWith(ruta + '/')

const salir = () => {
  cerrarSesion()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 14px 30px;
  background: var(--color-principal);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  position: sticky;
  top: 10px;
  z-index: 100;
}

.nav-logo {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.8rem;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* El logo va en un recuadro blanco para que se vea sobre el rojo */
.nav-logo-img {
  display: block;
  height: 48px;
  width: auto;
  padding: 4px 8px;
  border-radius: 12px;
  background: #ffffff;
}

.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 30px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-exact-active,
.nav-link.nav-link-activo {
  background: #ffffff;
  color: var(--color-principal);
}

.flecha {
  font-size: 0.75rem;
  margin-left: 2px;
}

/* Submenú desplegable (Tienda y Eventos) */
.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 170px;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  z-index: 200;
}

.nav-item:hover .submenu,
.nav-item:focus-within .submenu {
  display: block;
}

.submenu-link {
  display: block;
  padding: 8px 14px;
  border-radius: 12px;
  color: var(--texto);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.submenu-link:hover {
  background: rgba(196, 32, 55, 0.12);
}

.submenu-link.router-link-exact-active {
  background: var(--color-principal);
  color: #ffffff;
}

.nav-usuario {
  margin-left: 8px;
  color: #ffffff;
  font-weight: 600;
}

.nav-salir {
  padding: 8px 16px;
  background: none;
  border: 2px solid #ffffff;
  border-radius: 30px;
  color: #ffffff;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-salir:hover {
  background: #ffffff;
  color: var(--color-principal);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: 8px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  color: var(--color-principal);
  cursor: pointer;
  transition: all 0.3s;
}

.nav-icon:hover {
  background: var(--texto);
  color: #ffffff;
  transform: scale(1.08);
}

.nav-cart {
  position: relative;
  text-decoration: none;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: var(--texto);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
}


.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0 11px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  height: 3px;
  border-radius: 2px;
  background: var(--color-principal);
}

@media (max-width: 900px) {
  .navbar {
    padding: 12px 18px;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding-top: 10px;
  }


  .nav-links.abierto {
    display: flex;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link {
    display: block;
    text-align: center;
  }

  .flecha {
    display: none;
  }

  
  .nav-item .submenu,
  .nav-item:hover .submenu,
  .nav-item:focus-within .submenu {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 6px;
    position: static;
    padding: 4px 0 6px;
    background: transparent;
    box-shadow: none;
  }

  .submenu-link {
    padding: 6px 14px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    color: #ffffff;
    font-size: 0.9rem;
    text-align: center;
  }

  .submenu-link:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .submenu-link.router-link-exact-active {
    background: #ffffff;
    color: var(--color-principal);
  }

  .nav-icon {
    margin-left: 0;
    align-self: center;
  }

  .nav-usuario {
    margin-left: 0;
    text-align: center;
  }
}
</style>