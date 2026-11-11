<script setup>
import { useRouter } from 'vue-router'
import { authClient } from '@/auth.js';
import { ref } from 'vue';
let isLoading=ref(false);
let errorMessage=ref(null);
const router = useRouter()
let FRONTEND_URL = process.meta.env.VITE_API_FRONTEND_URL;
let handleLogin = async()=>{
  try{
   isLoading.value=true;
   errorMessage.value=null;
   await authClient.signIn.social({
    provider:"google",
    callbackURL:`${FRONTEND_URL}/dashboard`
   });
  }catch(err){
    errorMessage.value=err.message;
  }finally{
    isLoading.value=false;
  }
}
</script>

<template>
  <div class="login-root">
    <main class="login-main">
      <div class="login-card">
        <div class="login-logo-wrap">
          <a href="#" class="logo-link">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          </a>
        </div>
        <h1 class="login-title">{{ $t('loginPage.title') }}</h1>
        <button class="google-btn" type="button" :disabled="isLoading" @click="handleLogin()">
          <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true" >
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>{{ $t('loginPage.continueGoogle') }}</span>
        </button>
        <p v-if="errorMessage!=null">{{ errorMessage }}</p>
      </div>
    </main>
  </div>
</template>




<style scoped>
/* ─── Login Page ──────────────────────────────────────────────────── */
.login-root {
  width: 100%;
  min-height: 100dvh;
  background-color: var(--color-surface);
}

.login-main {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-md);
}

.login-card {
  width: 100%;
  max-width: 340px;
  background-color: #1a1a1a;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: var(--sp-xl) var(--sp-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.3),
    0 20px 40px rgba(0,0,0,0.5);
}

.login-logo-wrap {
  margin-bottom: var(--sp-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: rgba(0, 130, 251, 0.10);
  border: 1px solid rgba(0, 130, 251, 0.40);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.logo-icon svg {
  width: 16px;
  height: 16px;
}

.logo-text {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

.login-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 24px;
  color: var(--color-on-surface);
  margin-bottom: var(--sp-xl);
}

.google-btn {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-sm);
  background-color: #14151a;
  border: 1px solid #27272a;
  border-radius: 8px;
  color: var(--color-on-surface);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: background-color 0.15s, box-shadow 0.15s;
}

.google-btn:hover {
  background-color: #222226;
}

.google-btn:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary);
}

.google-btn:active {
  transform: scale(0.98);
}

.google-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ── Media Queries ────────────────────────────────────────────── */
@media (min-width: 480px) {
  .login-card {
    max-width: 380px;
    padding: var(--sp-xl) calc(var(--sp-xl) * 1.25);
  }

  .login-title {
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  .login-card {
    max-width: 400px;
    padding: var(--sp-xl) calc(var(--sp-xl) * 1.5);
  }
}

@media (min-width: 1024px) {
  .login-card {
    max-width: 420px;
  }
}
</style>