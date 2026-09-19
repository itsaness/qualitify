<script setup>
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { watch } from 'vue';
import { authClient } from '@/auth';


const isLargeScreen = useMediaQuery('(min-width:768px)');
 
const menuOpen = ref(false);

watch(isLargeScreen,(newVal)=>{
  if(newVal){
      menuOpen.value=false;
  }

},{immediate:true});
/* better-auth */
let session =  authClient.useSession();
let handleSignout = async()=>{
  try{
   const {error} =  await authClient.signOut();
   if(error){
    return;
   }
   window.location.href="/";
  }catch(err){
    console.error(err.message);
  }
}
/* i18n */
import { useI18n } from 'vue-i18n';
import {Globe} from "lucide-vue-next";
const {t,locale}=useI18n();
let switchLanguage=()=>{
  if(locale.value=="en"){
    locale.value="ar"
    localStorage.setItem("locale",locale.value);
    
  }else{
    locale.value="en";
    localStorage.setItem("locale",locale.value);

  }
}
watch(locale,(newVal)=>{
  if(newVal=='ar'){
    document.documentElement.dir="rtl";
  }else{
    document.documentElement.dir="ltr";
  }
},{immediate:true});
</script>
<template>


<div class="page-wrapper">
  <!-- Header -->
  <header class="header">
    <div class="header-inner">
      <!-- Left: Logo + Node Indicator -->
      <div class="header-left">
        <a href="#" class="logo-link">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <span class="logo-text">{{ $t('brand.name') }}</span>
        </a>

       
      </div>

      <!-- Center: Nav -->
      <nav class="main-nav">
        <router-link to="/docs" class="nav-link">{{ $t('nav.docs') }}</router-link>
        <router-link to="/pricing" class="nav-link">{{ $t('nav.pricing') }}</router-link>
        <router-link to="/contact" class="nav-link" active-class="active-navlink">
          {{ $t('nav.contact') }}
        </router-link>
      </nav>

      <!-- Right: Actions -->
      <div class="header-actions">
        <button @click="switchLanguage()" class="icon-btn"><Globe :size="18" /></button>
        <router-link to="/login" class="btn-login" v-if="!session.data">{{ $t('nav.signIn') }}</router-link>
        <span class="btn-login" v-if="session.data" @click="handleSignout()">{{ $t('nav.signOut') }}</span>
      </div>
       <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle menu">
        <span class="burger__line material-symbols-outlined"  :class="{ open: menuOpen }">
          menu
          </span>
      </button>
    </div>
      <div class="mobile-nav" :class="{ 'mobile-nav--open': menuOpen }">
      <router-link to="/docs" class="mobile-nav__link" @click="menuOpen = false">{{ $t('nav.docs') }}</router-link>
      <router-link to="/pricing" class="mobile-nav__link" @click="menuOpen = false">{{ $t('nav.pricing') }}</router-link>
      <router-link class="mobile-nav__link" @click="menuOpen = false" to="/contact">{{ $t('nav.contact') }}</router-link>
      <router-link to="/login" class="mobile-nav__link" v-if="!session.data">{{ $t('nav.signIn') }}</router-link>
      <span class="mobile-nav__link" v-if="session.data">{{ $t('nav.signOut') }}</span>
      <button @click="switchLanguage()" class="mobileicon-btn"><Globe :size="18" /></button>

      
    </div>
  </header>

  <!-- Main -->
  <main class="main">

    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-badge">
        <span class="badge-dot"></span>
        <span>{{ $t('contact.badge') }}</span>
      </div>
      <h1 class="page-title">{{ $t('contact.title') }}</h1>
      <p class="page-subtitle">
        {{ $t('contact.subtitle') }}
      </p>
    </div>

    <!-- Contact Card -->
    <div class="contact-card">

      <!-- Direct Channels -->
      <div class="section">
        <span class="section-label">{{ $t('contact.channels.title') }}</span>
        <div class="channels-list">

          <!-- Email -->
          <div class="channel-row">
            <div class="channel-icon">📧</div>
            <div class="channel-info">
              <div class="channel-type">{{ $t('contact.channels.email') }}</div>
              <a href="mailto:support@qualitify.app" class="channel-value channel-value--link">
                support@qualitify.app
              </a>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="channel-row">
            <div class="channel-icon">💬</div>
            <div class="channel-info">
              <div class="channel-type-row">
                <span class="channel-type">{{ $t('contact.channels.whatsapp') }}</span>
                <span class="badge-preferred">{{ $t('contact.channels.preferred') }}</span>
              </div>
              <div class="channel-value">+213 555 62 40 31</div>
            </div>
          </div>

          <!-- Response Time -->
          <div class="channel-row">
            <div class="channel-icon">🕐</div>
            <div class="channel-info">
              <div class="channel-type">{{ $t('contact.channels.responseTimeTitle') }}</div>
              <div class="channel-value channel-value--plain">
                {{ $t('contact.channels.responseTimeValue') }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Before You Write -->
      <div class="section">
        <span class="section-label">{{ $t('contact.tips.title') }}</span>
        <div class="tips-list">

          <div class="tip-row">
            <span class="tip-arrow">→</span>
            <div>
              <span class="tip-bold">{{ $t('contact.tips.setup.bold') }}</span>
              <span class="tip-muted"> {{ $t('contact.tips.setup.muted1') }} <router-link to="/docs" class="tip-link">{{ $t('contact.tips.setup.link') }}</router-link> {{ $t('contact.tips.setup.muted2') }}</span>
            </div>
          </div>

          <div class="tip-row">
            <span class="tip-arrow">→</span>
            <div>
              <span class="tip-bold">{{ $t('contact.tips.billing.bold') }}</span>
              <span class="tip-muted"> {{ $t('contact.tips.billing.muted') }}</span>
            </div>
          </div>

          <div class="tip-row">
          </div>

        </div>
      </div>

    </div>

    <!-- Trust Strip -->
    <div class="trust-strip">
      <div class="trust-item">
        <span class="trust-dot trust-dot--green"></span>
        <span>{{ $t('contact.trust.local') }}</span>
      </div>
      <span class="trust-separator">|</span>
      <div class="trust-item">
        <span class="trust-dot trust-dot--blue"></span>
        <span>{{ $t('contact.trust.speed') }}</span>
      </div>
      <span class="trust-separator">|</span>
      <div class="trust-item">
        <span class="trust-dot trust-dot--gray"></span>
        <span>{{ $t('contact.trust.human') }}</span>
      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">

      <div class="footer-logo">
        <div class="footer-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <span class="footer-logo-text">{{ $t('brand.name') }}</span>
      </div>

      <div class="footer-nav">
        <router-link to="/docs" class="footer-link">{{ $t('nav.docs') }}</router-link>
        <router-link to="/pricing" class="footer-link">{{ $t('nav.pricing') }}</router-link>
        <router-link to="/contact" class="footer-link footer-link--active">{{ $t('nav.contact') }}</router-link>
      </div>

      <div class="footer-copy">
        {{ $t('footer.copy') }}
      </div>

    </div>
  </footer>
</div>
</template>
<style scoped>
/* ─── Reset & Base ─────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

/* ─── CSS Variables ────────────────────────────────────────────── */
.page-wrapper {
  --bg:        #111318;
  --surface:   #1a1a1a;
  --border:    #27272a;
  --accent:    #0082FB;
  --success:   #22c55e;
  --muted:     #9ca3af;
  --dim:       #6b7280;
  --text:      #f3f4f6;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ─── Header ───────────────────────────────────────────────────── */
.header {
  width: 100%;
  border-bottom: 1px solid var(--border);
  background-color: rgba(17, 19, 24, 0.90);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Logo */
.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
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

/* Node indicator */
.node-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 9999px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
}

.node-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--success);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.node-label {
  color: var(--success);
  font-weight: 500;
}

/* Nav */
.main-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 0.875rem;
}
.burger { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
.burger__line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-muted);
  border-radius: 2px;
  position: relative;
  transition: background .15s;
  color: white;
}
.burger__line::before,
.burger__line::after {
  content: '';
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-muted);
  border-radius: 2px;
  position: absolute;
  left: 0;
  transition: transform .2s;
}
.burger__line::before { top: -7px; }
.burger__line::after { top: 7px; }
 

.nav-link {
  color: var(--muted);
  transition: color 0.15s;
}

.nav-link:hover {
  color: #fff;
}
.active-navlink{
  border-bottom:2px solid #0082FB;
  color: #0082FB;
}
.mobile-nav {
  display: none;
  flex-direction: column;
  padding: 12px 24px 20px;
  border-top: 1px solid var(--border);
  gap: 4px;
}
.mobileicon-btn{
  display: flex;
  align-items: center;
  color: white;
  padding: 10px 0;
  cursor:pointer;
  gap: 8px;
  font-size:14px;
}

.mobile-nav span{
  cursor:pointer;
}
.mobile-nav--open { display: flex; }
.mobile-nav__link {
  font-size: 14px;
  color: var(--text-muted);
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: color .15s;
}
.mobile-nav__link:hover { color: var(--text); }
 

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-actions span{
  cursor:pointer;
}
.icon-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}


.btn-login {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  padding: 6px 12px;
  transition: color 0.15s;
}

.btn-login:hover {
  color: #fff;
}

.btn-cta {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--accent);
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.15s;
  white-space: nowrap;
}

.btn-cta:hover {
  background-color: #0072de;
}

/* ─── Main ─────────────────────────────────────────────────────── */
.main {
  flex: 1;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1rem 4rem;
}

/* ─── Page Header ──────────────────────────────────────────────── */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 0.75rem;
  line-height: 1.15;
}

.page-subtitle {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.6;
}

/* ─── Contact Card ─────────────────────────────────────────────── */
.contact-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ─── Sections ─────────────────────────────────────────────────── */
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

/* ─── Channels ─────────────────────────────────────────────────── */
.channels-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.channel-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.channel-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.channel-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.channel-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  color: var(--dim);
}

.channel-type-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.channel-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: #fff;
}

.channel-value--link {
  transition: color 0.15s;
}

.channel-value--link:hover {
  color: var(--accent);
}

.channel-value--plain {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
}

/* Preferred badge */
.badge-preferred {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: var(--success);
  letter-spacing: 0.02em;
}

/* ─── Divider ──────────────────────────────────────────────────── */
.divider {
  border-top: 1px solid var(--border);
}

/* ─── Tips ─────────────────────────────────────────────────────── */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tip-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9375rem;
  line-height: 1.55;
}

.tip-arrow {
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  margin-top: 3px;
  flex-shrink: 0;
}

.tip-bold {
  color: #fff;
  font-weight: 600;
}

.tip-muted {
  color: var(--muted);
}

.tip-link {
  color: var(--accent);
  transition: text-decoration 0.15s;
}

.tip-link:hover {
  text-decoration: underline;
}

/* ─── Trust Strip ──────────────────────────────────────────────── */
.trust-strip {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  color: var(--muted);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trust-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.trust-dot--green { background-color: var(--success); }
.trust-dot--blue  { background-color: var(--accent); }
.trust-dot--gray  { background-color: var(--dim); }

.trust-separator {
  display: none;
  color: var(--border);
}

/* ─── Footer ───────────────────────────────────────────────────── */
.footer {
  width: 100%;
  border-top: 1px solid var(--border);
  background-color: var(--bg);
  padding: 2rem 0;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: rgba(0, 130, 251, 0.10);
  border: 1px solid rgba(0, 130, 251, 0.40);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.footer-logo-icon svg {
  width: 14px;
  height: 14px;
}

.footer-logo-text {
  font-weight: 600;
  font-size: 0.875rem;
  color: #fff;
  letter-spacing: -0.02em;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
}

.footer-link {
  color: var(--muted);
  transition: color 0.15s;
}

.footer-link:hover {
  color: #fff;
}

.footer-link--active {
  color: var(--accent);
  font-weight: 500;
}

.footer-copy {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  color: var(--dim);
}

/* ─── Media Queries ────────────────────────────────────────────── */
@media (min-width: 480px) {
  .trust-strip {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }

  .trust-separator {
    display: inline;
  }
}

@media (min-width: 640px) {
  .header-inner {
    padding: 0 1.5rem;
  }

  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  .page-title {
    font-size: 2.75rem;
  }
}

@media (min-width: 768px) {
  .main-nav {
    display: flex;
  }

  .node-indicator {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .header-inner {
    padding: 0 2rem;
  }

  .footer-inner {
    padding: 0 2rem;
  }

  .main {
    padding: 4rem 1rem 5rem;
  }

  .page-title {
    font-size: 3rem;
  }

  .contact-card {
    padding: 2.5rem;
  }
}

@media (max-width: 767px) {
  .main-nav {
    display: none;
  }
 
   .burger { display: block; }
   .icon-btn{
  display: none;
}
  .btn-login{
    display: none;
  }
  .node-indicator {
    display: none;
  }

  .btn-cta {
    font-size: 0.8125rem;
    padding: 7px 12px;
  }

  .page-title {
    font-size: 1.875rem;
  }
}

@media (max-width: 479px) {
  .header-actions {
    gap: 6px;
  }

  .btn-login {
    display: none;
  }

  .contact-card {
    padding: 1.25rem;
  }
}
</style>