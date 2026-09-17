<script setup>
import { ref, computed, watch } from 'vue';
import { authClient } from '@/auth';
import { useMediaQuery } from '@vueuse/core';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
let router = useRouter();

const features = [
  'pricingPage.features.livreOnly',
  'pricingPage.features.serverSide',
  'pricingPage.features.realTimeRetry',
  'pricingPage.features.platforms',
  'pricingPage.features.dashboard',
  'pricingPage.features.prioritySupport',
]

const faqs = [
  { q: 'pricingPage.faqs.pay.q', a: 'pricingPage.faqs.pay.a' },
  { q: 'pricingPage.faqs.trial.q', a: 'pricingPage.faqs.trial.a' },
  { q: 'pricingPage.faqs.duration.q', a: 'pricingPage.faqs.duration.a' },
]

/* better-auth*/
let session = authClient.useSession();
let handleSignout = async() => {
  try {
   const {error} =  await authClient.signOut();
   if(error) {
    return;
   }
   window.location.href="/";
  } catch(err) {
    console.error(err.message);
  }
}

/* responsive menu */
let isLargeScreen = useMediaQuery('(min-width:768px)');
watch(isLargeScreen, (newVal) => {
  if(newVal) {
    menuOpen.value=false;
  }
}, {immediate:true});

/* checkout */
let getCheckout = async(planId) => {
  let options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
       planId:planId
    })
  }
  if(!session?.value.data) {
       router.push("/login?redirect=/pricing");
       return;
    }
  try {
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/checkout`,options);
    if(!response.ok){
      return;
    }
    let data = await response.json();
    window.location.href=data.checkoutURL;
  } catch(err) {
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
  <div class="app">

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
            <span class="logo-text">{{ $t('pricingPage.header.brand') }}</span>
          </a>

         
        </div>

        <!-- Center: Nav -->
        <nav class="main-nav">
          <router-link to="/docs" class="nav-link">{{ $t('pricingPage.nav.docs') }}</router-link>
          <router-link to="/pricing" class="nav-link" active-class="active-navlink">{{ $t('pricingPage.nav.pricing') }}</router-link>
          <router-link to="/contact" class="nav-link">{{ $t('pricingPage.nav.contact') }}</router-link>
        </nav>

        <!-- Right: Actions -->

        <div class="header-actions">
                 <button @click="switchLanguage()" class="icon-btn"> <Globe :size="18"/> </button>

          <router-link to="/login" class="btn-login" v-if="!session.data">{{ $t('pricingPage.nav.signIn') }}</router-link>
          <button @click="handleSignout()" class="btn-login" v-if="session.data">{{ $t('pricingPage.nav.signOut') }}</button>
        </div>
         <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle menu">
          <span class="burger__line material-symbols-outlined"  :class="{ open: menuOpen }">
            menu
            </span>
        </button>
      </div>
      <div class="mobile-nav" :class="{ 'mobile-nav--open': menuOpen }">
        <router-link to="/docs" class="mobile-nav__link" @click="menuOpen = false">{{ $t('pricingPage.nav.docs') }}</router-link>
        <router-link to="/pricing" class="mobile-nav__link" @click="menuOpen = false">{{ $t('pricingPage.nav.pricing') }}</router-link>
        <router-link class="mobile-nav__link" @click="menuOpen = false" to="/contact">{{ $t('pricingPage.nav.contact') }}</router-link>
        <router-link to="/login" class="mobile-nav__link" v-if="!session.data">{{ $t('pricingPage.nav.signIn') }}</router-link>
        <span  class="mobile-nav__link" @click="handleSignout()" v-if="session.data">{{ $t('pricingPage.nav.signOut') }}</span>
                  <button @click="switchLanguage()" class="mobilenav-icon"> <Globe :size="18"/> </button>

      </div>
    </header>

    <!-- Main -->
    <main class="main">

      <!-- Page Header -->
      <div class="page-header">
        <div class="pill">
          <span class="dot dot--blue"></span>
          {{ $t('pricingPage.hero.pill') }}
        </div>
        <h1 class="page-header__title">{{ $t('pricingPage.hero.title') }}</h1>
        <p class="page-header__sub">{{ $t('pricingPage.hero.subtitle') }}</p>
      </div>

      <!-- Pricing Card -->
      <div class="pricing-card">
        <div class="pricing-card__top">
          <div>
            <div class="pricing-card__tier">{{ $t('pricingPage.card.tier') }}</div>
            <div class="pricing-card__plan">{{ $t('pricingPage.card.planName') }}</div>
          </div>
          <span class="tag tag--green">{{ $t('pricingPage.card.badge') }}</span>
        </div>

        <div class="pricing-card__price">
          <div class="price-row">
            <span class="price-amount">{{ $t('pricingPage.card.price') }}</span>
            <span class="price-currency">{{ $t('pricingPage.card.currency') }}</span>
          </div>
          <p class="price-period">{{ $t('pricingPage.card.period') }}</p>
        </div>

        <p class="pricing-card__tagline">{{ $t('pricingPage.card.tagline') }}</p>

        <div class="divider"></div>

        <ul class="feature-list">
          <li class="feature-item" v-for="feat in features" :key="feat">
            <svg class="feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{{ $t(feat) }}</span>
          </li>
        </ul>

        <button class="btn btn--primary btn--full" @click.prevent="getCheckout(1)">
          <span>{{ $t('pricingPage.card.btnLabel') }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <p class="pricing-card__note">{{ $t('pricingPage.card.note') }}</p>
      </div>

      <!-- FAQ -->
      <div class="faq">
        <div class="faq__heading">{{ $t('pricingPage.faq.heading') }}</div>
        <div class="faq__list">
          <div class="faq__item" v-for="item in faqs" :key="item.q">
            <span class="faq__q">{{ $t(item.q) }}</span>
            <span class="faq__a">{{ $t(item.a) }}</span>
          </div>
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__logo">
          <div class="logo-mark logo-mark--sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <span class="footer__brand">{{ $t('pricingPage.footer.brand') }}</span>
        </div>
        <div class="footer__links">
          <router-link to="/docs" class="footer__link">{{ $t('pricingPage.footer.docs') }}</router-link>
          <router-link to="/pricing" class="footer__link" active-class="mobilenav_active">{{ $t('pricingPage.footer.pricing') }}</router-link>
          <router-link to="/contact" class="footer__link">{{ $t('pricingPage.footer.contact') }}</router-link>
        </div>
        <div class="footer__copy">{{ $t('pricingPage.footer.copy') }}</div>
      </div>
    </footer>

  </div>
</template>
<style scoped>
/* ─── Tokens ─── */
:root {
  --bg: #111318;
  --surface: #1a1a1a;
  --border: #27272a;
  --blue: #0082FB;
  --green: #22c55e;
  --text: #ffffff;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
}
 
/* ─── Reset ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
a { text-decoration: none; }
button { cursor: pointer; font-family: inherit; }
ul { list-style: none; }
 
/* ─── Base ─── */
.app {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
 
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
 
/* ─── Buttons ─── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  transition: background 0.15s;
  white-space: nowrap;
}
.btn--primary { background: var(--blue); color: #fff; }
.btn--primary:hover { background: #0070d8; }
.btn--sm { font-size: 13px; padding: 8px 16px; }
.btn--full { width: 100%; font-size: 14px; padding: 14px; }
.btn--full svg { width: 16px; height: 16px; }
.link-muted { font-size: 13px; color: var(--text-muted); font-weight: 500; transition: color .15s; }
.link-muted:hover { color: var(--text); }
 
/* ─── Dot ─── */
.dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dot--green { background: var(--green); }
.dot--blue { background: var(--blue); }
 
/* ─── Pill ─── */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(0,130,251,.08);
  border: 1px solid rgba(0,130,251,.2);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--blue);
  text-transform: uppercase;
  letter-spacing: .05em;
}
 
/* ─── Tag ─── */
.tag { font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 500; padding: 4px 10px; border-radius: 4px; border: 1px solid; }
.tag--green { color: var(--green); background: rgba(34,197,94,.08); border-color: rgba(34,197,94,.2); }
 
/* ─── Header ─── */
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

.nav-link--active {
  color: var(--accent);
  font-weight: 500;
  position: relative;
  padding-bottom: 4px;
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
 .footer__link.mobilenav_active{
  color: #0070d8;
 }

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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

 
/* ─── Main ─── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px 96px;
  width: 100%;
}
 
/* ─── Page header ─── */
.page-header {
  text-align: center;
  max-width: 480px;
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.page-header__title { font-size: 48px; font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1.1; }
.page-header__sub { font-size: 17px; color: var(--text-muted); }
 
/* ─── Pricing card ─── */
.pricing-card {
  width: 100%;
  max-width: 440px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 24px 64px rgba(0,0,0,.4);
}
.pricing-card__top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
.pricing-card__tier { font-size: 10px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .1em; color: var(--blue); font-weight: 600; margin-bottom: 4px; }
.pricing-card__plan { font-size: 24px; font-weight: 700; color: #fff; }
 
.pricing-card__price { margin-bottom: 16px; }
.price-row { display: flex; align-items: baseline; gap: 8px; }
.price-amount { font-family: 'JetBrains Mono', monospace; font-size: 52px; font-weight: 800; letter-spacing: -0.04em; color: #fff; line-height: 1; }
.price-currency { font-family: 'JetBrains Mono', monospace; font-size: 26px; font-weight: 700; color: var(--blue); }
.price-period { font-size: 13px; color: var(--text-muted); margin-top: 6px; }
 
.pricing-card__tagline { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }
 
.divider { width: 100%; height: 1px; background: var(--border); margin-bottom: 24px; }
 
/* Feature list */
.feature-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
.feature-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #fff; line-height: 1.4; }
.feature-check { width: 16px; height: 16px; color: var(--green); flex-shrink: 0; margin-top: 2px; }
 
.pricing-card__note {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-dim);
  text-align: center;
  margin-top: 14px;
}
 
/* ─── FAQ ─── */
.faq { width: 100%; max-width: 620px; margin-top: 72px; }
.faq__heading {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--text-dim);
  text-align: center;
  margin-bottom: 32px;
}
.faq__list { display: flex; flex-direction: column; gap: 0; }
.faq__item {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
}
.faq__item:last-child { border-bottom: none; }
.faq__q { font-size: 14px; font-weight: 500; color: #fff; flex: 0 0 48%; }
.faq__a { font-size: 14px; color: var(--text-muted); flex: 0 0 48%; text-align: right; }
 
/* ─── Footer ─── */
.footer { border-top: 1px solid var(--border); padding: 32px 0; }
.footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.footer__logo { display: flex; align-items: center; gap: 8px; }
.footer__brand { font-weight: 700; font-size: 13px; color: #fff; }
.footer__links { display: flex; gap: 24px; }
.footer__link { font-size: 12px; color: var(--text-muted); transition: color .15s; }
.footer__link:hover { color: var(--text); }
.footer__link--active { color: #fff; font-weight: 500; }
.footer__copy { font-size: 11px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
 
/* ════════════════════════════════
   MEDIA QUERIES
   ════════════════════════════════ */
 
@media (max-width: 768px) {
  /* Header */
  .header__nav { display: none; }
  .header__actions { display: none; }
  .icon-btn{
    display: none;
  }
  .mobilenav-icon{
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
  }
  .burger { display: flex; }
  .header__badge { display: none; }
  .header-actions button{display: none;
  }
 
  /* Main */
  .main { padding: 48px 16px 72px; }
 
  /* Page header */
  .page-header__title { font-size: 36px; }
  .page-header__sub { font-size: 15px; }
 
  /* Pricing card */
  .pricing-card { padding: 24px; }
  .price-amount { font-size: 44px; }
  .price-currency { font-size: 22px; }
 
  /* FAQ */
  .faq { margin-top: 52px; }
  .faq__item { flex-direction: column; gap: 6px; }
  .faq__q { flex: unset; }
  .faq__a { flex: unset; text-align: left; }
 
  /* Footer */
  .footer__inner { flex-direction: column; text-align: center; gap: 16px; }
}
 
@media (max-width: 480px) {
  .page-header__title { font-size: 30px; }
  .pricing-card { padding: 20px; }
  .price-amount { font-size: 40px; }
  .pricing-card__top { flex-direction: column; gap: 12px; }
  .footer__links { gap: 16px; }
}

</style>