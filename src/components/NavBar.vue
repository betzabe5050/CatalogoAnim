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
      <RouterLink
        v-for="item in menu"
        :key="item.ruta"
        :to="item.ruta"
        class="nav-link"
      >
        {{ item.etiqueta }}
      </RouterLink>


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
import { useRouter } from 'vue-router'
import { menu } from '../data/menu'
import { useSesion } from '../composables/useSesion'
import { useLoginModal } from '../composables/useLoginModal'
import { useCarrito } from '../composables/useCarrito'


const menuAbierto = ref(false)
const router = useRouter()
const { usuarioActual, estaLogueado, cerrarSesion } = useSesion()
const { abrirLogin } = useLoginModal()
const { totalArticulos } = useCarrito()

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
  background: linear-gradient(145deg, #f5efe8, #e8dccc);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.25);
  position: sticky;
  top: 10px;
  z-index: 100;
}

.nav-logo {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.8rem;
  color: #5c4033;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-logo-img {
  display: block;
  height: 40px;
  width: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 30px;
  color: #5c4033;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.nav-link:hover {
  background: rgba(184, 149, 122, 0.2);
}

.nav-link.router-link-exact-active {
  background: #b8957a;
  color: #f5efe8;
}

.nav-usuario {
  margin-left: 8px;
  color: #5c4033;
  font-weight: 600;
}

.nav-salir {
  padding: 8px 16px;
  background: none;
  border: 2px solid #b8957a;
  border-radius: 30px;
  color: #5c4033;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-salir:hover {
  background: #b8957a;
  color: #f5efe8;
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
  background: #b8957a;
  color: #f5efe8;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-icon:hover {
  background: #5c4033;
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
  background: #b3392f;
  color: #fff;
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
  background: #b8957a;
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  height: 3px;
  border-radius: 2px;
  background: #f5efe8;
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
  }

  .nav-link {
    text-align: center;
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