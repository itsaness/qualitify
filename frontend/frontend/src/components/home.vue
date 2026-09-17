<script setup>
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'; 
import { watch } from 'vue';
import { authClient } from '@/auth';


const isLargeScreen = useMediaQuery('(min-width:768px)');
const menuOpen = ref(false);

const specs = [
  { label: 'landingPage.specs.compatible.label', value: 'landingPage.specs.compatible.value' },
  { label: 'landingPage.specs.region.label', value: 'landingPage.specs.region.value' },
  { label: 'landingPage.specs.protocol.label', value: 'landingPage.specs.protocol.value' },
]

const stats = [
  { label: 'landingPage.stats.total', value: '24,892', color: '#0082FB' },
  { label: 'landingPage.stats.sent', value: '24,510', color: '#22c55e' },
  { label: 'landingPage.stats.failed', value: '312', color: '#ef4444', valueColor: '#ef4444' },
  { label: 'landingPage.stats.pending', value: '70', color: '#f59e0b', valueColor: '#f59e0b' },
]

const streamRows = [
  { order: '#ORD-98425', phone: '+213 550 ••• •••', statusText: 'landingPage.stream.statusOk', statusColor: '#22c55e', status: 'ok' },
  { order: '#ORD-98424', phone: '+213 770 ••• •••', statusText: 'landingPage.stream.statusOk', statusColor: '#22c55e', status: 'ok' },
  { order: '#ORD-98421', phone: '+213 661 ••• •••', statusText: 'landingPage.stream.statusRetry', statusColor: '#ef4444', status: 'retry' },
]

const problems = [
  'landingPage.problems.0',
  'landingPage.problems.1',
  'landingPage.problems.2',
]

const steps = [
  {
    num: '01',
    title: 'landingPage.steps.0.title',
    body: 'landingPage.steps.0.body',
    metaLabel: 'landingPage.steps.0.metaLabel',
    meta: 'landingPage.steps.0.meta',
    color: '#0082FB',
  },
  {
    num: '02',
    title: 'landingPage.steps.1.title',
    body: 'landingPage.steps.1.body',
    metaLabel: 'landingPage.steps.1.metaLabel',
    meta: 'landingPage.steps.1.meta',
    color: '#0082FB',
  },
  {
    num: '03',
    title: 'landingPage.steps.2.title',
    body: 'landingPage.steps.2.body',
    metaLabel: 'landingPage.steps.2.metaLabel',
    meta: 'landingPage.steps.2.meta',
    color: '#22c55e',
  },
]

const metrics = [
  { value: '98%', label: 'landingPage.metrics.0.label', color: '#0082FB', desc: 'landingPage.metrics.0.desc' },
  { value: '< 5 min', label: 'landingPage.metrics.1.label', color: '#22c55e', desc: 'landingPage.metrics.1.desc' },
  { value: 'DZ COD', label: 'landingPage.metrics.2.label', color: '#d1d5db', desc: 'landingPage.metrics.2.desc' },
]

const features = [
  {
    num: '01', color: '#0082FB',
    tag: 'landingPage.features.0.tag', tagColor: '#22c55e', tagBorder: 'rgba(34,197,94,.2)', tagBg: 'rgba(34,197,94,.08)',
    title: 'landingPage.features.0.title',
    body: 'landingPage.features.0.body',
  },
  {
    num: '02', color: '#f59e0b',
    tag: 'landingPage.features.1.tag', tagColor: '#f59e0b', tagBorder: 'rgba(245,158,11,.2)', tagBg: 'rgba(245,158,11,.08)',
    title: 'landingPage.features.1.title',
    body: 'landingPage.features.1.body',
  },
  {
    num: '03', color: '#0082FB',
    tag: 'landingPage.features.2.tag', tagColor: '#9ca3af', tagBorder: '#27272a', tagBg: '#111318',
    title: 'landingPage.features.2.title',
    body: 'landingPage.features.2.body',
  },
  {
    num: '04', color: '#22c55e',
    tag: 'landingPage.features.3.tag', tagColor: '#0082FB', tagBorder: 'rgba(0,130,251,.2)', tagBg: 'rgba(0,130,251,.08)',
    title: 'landingPage.features.3.title',
    body: 'landingPage.features.3.body',
  },
]

watch(isLargeScreen,(newVal)=>{
  if(newVal){
      menuOpen.value=false;
  }

},{immediate:true});

/* better-auth */
let session = authClient.useSession();
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
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="container header__inner">
        <div class="header__logo">
           <a href="#" class="logo-link">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <span class="logo-text">{{ $t('landingPage.header.brand') }}</span>
          </a>
        
        </div>

        <nav class="header__nav">
          <a href="#how-it-works" class="nav-link">{{ $t('landingPage.nav.howItWorks') }}</a>
          <a href="#features" class="nav-link">{{ $t('landingPage.nav.features') }}</a>
          <a href="#stats" class="nav-link">{{ $t('landingPage.nav.performance') }}</a>
          <router-link class="nav-link" to="/pricing">{{ $t('landingPage.nav.pricing') }}</router-link>
        </nav>

        <div class="header__actions">
          <button @click="switchLanguage()" class="icon-btn"> <Globe :size="18"/> </button>
          <router-link to="/login" class="link-muted" v-if="!session.data">{{ $t('landingPage.nav.signIn') }}</router-link>
          <span class="link-muted" v-if="session.data" @click="handleSignout()">{{ $t('landingPage.nav.signOut') }}</span>
        </div>

        <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle menu">
          <span class="burger__line material-symbols-outlined"  :class="{ open: menuOpen }">
            menu
            </span>
        </button>
      </div>

      <div class="mobile-nav" :class="{ 'mobile-nav--open': menuOpen }">
        <a href="#how-it-works" class="mobile-nav__link" @click="menuOpen = false">{{ $t('landingPage.nav.howItWorks') }}</a>
        <a href="#features" class="mobile-nav__link" @click="menuOpen = false">{{ $t('landingPage.nav.features') }}</a>
        <a href="#stats" class="mobile-nav__link" @click="menuOpen = false">{{ $t('landingPage.nav.performance') }}</a>
        <router-link class="mobile-nav__link" @click="menuOpen = false" to="/pricing">{{ $t('landingPage.nav.pricing') }}</router-link>
        <router-link to="/login" class="mobile-nav__link" v-if="!session.data">{{ $t('landingPage.nav.signIn') }}</router-link>
        <span class="mobile-nav__link" @click="handleSignout()" v-if="session.data">{{ $t('landingPage.nav.signOut') }}</span>
        <button @click="switchLanguage()" class="mobilenav-icon"> <Globe :size="18"/> </button>

      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__copy">
          <div class="pill">
            <span class="pill__dot pill__dot--blue"></span>
            {{ $t('landingPage.hero.pill') }}
          </div>

          <h1 class="hero__headline">{{ $t('landingPage.hero.headline') }}</h1>

          <p class="hero__sub">
            {{ $t('landingPage.hero.sub') }}
          </p>

          <div class="hero__specs">
            <div class="spec" v-for="spec in specs" :key="spec.label">
              <div class="spec__label">{{ $t(spec.label) }}</div>
              <div class="spec__value">{{ $t(spec.value) }}</div>
            </div>
          </div>
        </div>

        <div class="hero__mockup">
          <div class="mockup">
            <div class="mockup__bar">
              <div class="mockup__dots">
                <span class="mockup__dot"></span>
                <span class="mockup__dot"></span>
                <span class="mockup__dot"></span>
              </div>
              <span class="mockup__url">{{ $t('landingPage.hero.mockupUrl') }}</span>
              <span class="mockup__live">
                <span class="badge-dot badge-dot--green"></span> {{ $t('landingPage.hero.mockupLive') }}
              </span>
            </div>

            <div class="mockup__body">
              <div class="stat-cards">
                <div class="stat-card" v-for="stat in stats" :key="stat.label">
                  <div class="stat-card__header">
                    <span class="stat-card__label">{{ $t(stat.label) }}</span>
                    <span class="stat-card__dot" :style="{ background: stat.color }"></span>
                  </div>
                  <div class="stat-card__value" :style="{ color: stat.valueColor || '#fff' }">{{ stat.value }}</div>
                </div>
              </div>

              <div class="stream">
                <div class="stream__header">
                  <span class="stream__title">
                    <span class="stream__indicator">●</span> {{ $t('landingPage.stream.title') }}
                  </span>
                  <span class="stream__node">{{ $t('landingPage.stream.node') }}</span>
                </div>
                <div class="stream__rows">
                  <div class="stream__row" v-for="row in streamRows" :key="row.order" :class="row.status === 'retry' ? 'stream__row--error' : ''">
                    <span class="stream__order">{{ row.order }}</span>
                    <span class="stream__phone">{{ row.phone }}</span>
                    <span class="stream__status" :style="{ color: row.statusColor }">{{ $t(row.statusText) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Bar -->
    <section class="problem-bar">
      <div class="container problem-bar__inner">
        <div class="problem-item" v-for="p in problems" :key="p">
          <span class="problem-item__icon">❌</span>
          <span>{{ $t(p) }}</span>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-header__headline">{{ $t('landingPage.howItWorks.headline') }}</h2>
          <p class="section-header__sub">{{ $t('landingPage.howItWorks.sub') }}</p>
        </div>

        <div class="steps">
          <div class="step-card" v-for="step in steps" :key="step.num">
            <div class="step-card__num" :style="{ color: step.color }">{{ step.num }}</div>
            <h3 class="step-card__title">{{ $t(step.title) }}</h3>
            <p class="step-card__body">{{ $t(step.body) }}</p>
            <div class="step-card__meta">{{ $t(step.metaLabel) }}: <span :style="{ color: step.color }">{{ $t(step.meta) }}</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section id="stats" class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-block" v-for="metric in metrics" :key="metric.value">
            <div class="stat-block__value">{{ metric.value }}</div>
            <div class="stat-block__label" :style="{ color: metric.color }">{{ $t(metric.label) }}</div>
            <p class="stat-block__desc">{{ $t(metric.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-header__headline">{{ $t('landingPage.featuresSection.headline') }}</h2>
          <p class="section-header__sub">{{ $t('landingPage.featuresSection.sub') }}</p>
        </div>

        <div class="features-grid">
          <div class="feature-card" v-for="feat in features" :key="feat.num">
            <div class="feature-card__top">
              <div class="feature-card__num" :style="{ color: feat.color }">{{ feat.num }}</div>
              <span class="feature-card__tag" :style="{ color: feat.tagColor, borderColor: feat.tagBorder, background: feat.tagBg }">{{ $t(feat.tag) }}</span>
            </div>
            <h3 class="feature-card__title">{{ $t(feat.title) }}</h3>
            <p class="feature-card__body">{{ $t(feat.body) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section id="cta" class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="pill pill--green">
            <span class="pill__dot pill__dot--green"></span>
            {{ $t('landingPage.cta.pill') }}
          </div>
          <h2 class="cta-card__headline">{{ $t('landingPage.cta.headline') }}</h2>
          <p class="cta-card__sub">{{ $t('landingPage.cta.sub') }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__logo">
          <div class="logo-mark logo-mark--sm">
            <span class="logo-mark__dot"></span>
            <span class="logo-mark__dot logo-mark__dot--2"></span>
          </div>
          <span class="footer__brand">{{ $t('landingPage.footer.brand') }}</span>
        </div>
        <div class="footer__links">
          <router-link to="/docs" class="footer__link">{{ $t('landingPage.footer.docs') }}</router-link>
          <router-link class="footer__link" to="/pricing">{{ $t('landingPage.footer.pricing') }}</router-link>
          <router-link to="/contact" class="footer__link">{{ $t('landingPage.footer.contact') }}</router-link>
        </div>
        <div class="footer__copy">{{ $t('landingPage.footer.copy') }}</div>
      </div>
    </footer>
  </div>
</template>
<style scoped>
/* ─── Design tokens ─── */
:root {
  --bg: #111318;
  --surface: #1a1a1a;
  --surface-muted: #14161b;
  --border: #27272a;
  --blue: #0082FB;
  --green: #22c55e;
  --red: #ef4444;
  --amber: #f59e0b;
  --text: #f3f4f6;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
}
 
/* ─── Reset & base ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
a { text-decoration: none; }
 
.app {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
 
/* ─── Layout ─── */
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
  font-weight: 500;
  border-radius: 6px;
  transition: background 0.15s, opacity 0.15s;
  cursor: pointer;
  border: none;
  white-space: nowrap;
}
.btn--primary { background: var(--blue); color: #fff; }
.btn--primary:hover { background: #0073de; }
.btn--sm { font-size: 13px; padding: 8px 16px; }
.btn--lg { font-size: 15px; padding: 14px 28px; }
.link-muted { font-size: 13px; color: var(--text-muted); font-weight: 500; transition: color .15s; }
.link-muted:hover { color: var(--text); }
 
/* ─── Pill badge ─── */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 100px;
  background: var(--surface);
  border: 1px solid var(--border);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--blue);
}
.pill--green { color: var(--green); }
.pill__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); }
.pill__dot--blue { background: var(--blue); }
.pill__dot--green { background: var(--green); }
 
/* ─── Header ─── */
.header {
  border-bottom: 1px solid var(--border);
  background: rgba(17,19,24,.92);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}
.header__inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
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
.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-mark {
  width: 28px;
  height: 28px;
  background: var(--blue);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
.logo-mark--sm { width: 22px; height: 22px; border-radius: 4px; }
.logo-mark__dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; }
.logo-mark__dot--2 { opacity: 0.5; }
.header__brand { font-weight: 700; font-size: 16px; color: #fff; letter-spacing: -0.02em; }
.header__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--green);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 100px;
}
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
.badge-dot--green { background: var(--green); }
.header__nav { display: flex; align-items: center; gap: 32px; }
.nav-link { font-size: 13px; color: var(--text-muted); transition: color .15s; }
.nav-link:hover { color: var(--text); }
.icon-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.header__actions { display: flex; align-items: center; gap: 16px; }
.header__actions span{
  cursor:pointer;
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
 
/* Mobile nav */
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
 
/* ─── Hero ─── */
.hero {
  padding: 72px 0 80px;
  border-bottom: 1px solid var(--border);
}
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.hero__copy { display: flex; flex-direction: column; gap: 20px; }
.hero__headline {
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #fff;
}
.hero__sub { font-size: 17px; color: var(--text-muted); line-height: 1.65; max-width: 480px; }
.hero__cta-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.hero__disclaimer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-dim);
  font-family: 'JetBrains Mono', monospace;
}
.check-icon { width: 14px; height: 14px; color: var(--green); flex-shrink: 0; }
.hero__specs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--border);
  padding-top: 20px;
  margin-top: 4px;
}
.spec { padding-right: 16px; }
.spec__label { font-size: 10px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
.spec__value { font-size: 13px; font-weight: 500; color: #d1d5db; }
 
/* Mockup */
.mockup {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  overflow: hidden;
}
.mockup__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.mockup__dots { display: flex; gap: 5px; }
.mockup__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
.mockup__url { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--text-dim); flex: 1; }
.mockup__live {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--green);
  background: rgba(34,197,94,.08);
  border: 1px solid rgba(34,197,94,.2);
  padding: 2px 8px;
  border-radius: 100px;
}
.mockup__body { padding: 14px; background: var(--bg); display: flex; flex-direction: column; gap: 12px; }
 
/* Stat cards inside mockup */
.stat-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px;
}
.stat-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.stat-card__label { font-size: 9px; color: var(--text-dim); }
.stat-card__dot { width: 6px; height: 6px; border-radius: 50%; }
.stat-card__value { font-size: 15px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: #fff; }
 
/* Stream */
.stream { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; }
.stream__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}
.stream__title { font-size: 11px; font-weight: 500; color: #fff; display: flex; align-items: center; gap: 6px; }
.stream__indicator { color: var(--blue); font-size: 10px; }
.stream__node { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); }
.stream__rows { padding: 8px; display: flex; flex-direction: column; gap: 5px; }
.stream__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: var(--bg);
  border: 1px solid rgba(39,39,42,.6);
  border-radius: 4px;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
}
.stream__row--error { border-color: rgba(239,68,68,.2); }
.stream__order { color: var(--blue); }
.stream__phone { color: var(--text-muted); }
 
/* ─── Problem bar ─── */
.problem-bar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 16px 0; }
.problem-bar__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}
.problem-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #e5e7eb;
  padding: 10px 16px;
  border-right: 1px solid var(--border);
}
.problem-item:last-child { border-right: none; }
.problem-item__icon { font-size: 14px; }
 
/* ─── Section base ─── */
.section { padding: 80px 0; border-bottom: 1px solid var(--border); }
.section-header { text-align: center; max-width: 600px; margin: 0 auto 56px; }
.section-header__headline {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.025em;
  line-height: 1.2;
}
.section-header__sub { font-size: 14px; color: var(--text-muted); margin-top: 10px; line-height: 1.6; }
 
/* ─── Steps ─── */
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.step-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color .15s;
}
.step-card:hover { border-color: #37393f; }
.step-card__num { font-size: 22px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
.step-card__title { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.01em; }
.step-card__body { font-size: 13px; color: var(--text-muted); line-height: 1.65; flex: 1; }
.step-card__meta { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-dim); margin-top: 4px; }
 
/* ─── Stats ─── */
.stats-section { background: var(--surface); border-bottom: 1px solid var(--border); padding: 64px 0; }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  text-align: center;
}
.stat-block { padding: 16px 32px; border-right: 1px solid var(--border); }
.stat-block:last-child { border-right: none; }
.stat-block__value { font-size: 48px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: #fff; letter-spacing: -0.03em; line-height: 1; }
.stat-block__label { font-size: 13px; font-weight: 500; margin-top: 8px; }
.stat-block__desc { font-size: 12px; color: var(--text-muted); margin-top: 8px; max-width: 240px; margin-left: auto; margin-right: auto; line-height: 1.55; }
 
/* ─── Features ─── */
.features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color .15s;
}
.feature-card:hover { border-color: #37393f; }
.feature-card__top { display: flex; align-items: center; justify-content: space-between; }
.feature-card__num {
  width: 32px; height: 32px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
}
.feature-card__tag {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  padding: 3px 8px;
  border-radius: 100px;
  border: 1px solid;
}
.feature-card__title { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.01em; }
.feature-card__body { font-size: 13px; color: var(--text-muted); line-height: 1.65; }
 
/* ─── CTA ─── */
.cta-section { padding: 80px 0; }
.cta-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 64px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.cta-card__headline { font-size: 40px; font-weight: 700; color: #fff; letter-spacing: -0.03em; line-height: 1.1; max-width: 700px; }
.cta-card__sub { font-size: 16px; color: var(--text-muted); max-width: 520px; line-height: 1.6; }
.cta-card__note { font-size: 11px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; margin-top: -4px; }
 
/* ─── Footer ─── */
.footer { border-top: 1px solid var(--border); padding: 40px 0; }
.footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.footer__logo { display: flex; align-items: center; gap: 8px; }
.footer__brand { font-weight: 700; font-size: 14px; color: #fff; }
.footer__links { display: flex; gap: 32px; }
.footer__link { font-size: 13px; color: var(--text-muted); font-weight: 500; transition: color .15s; }
.footer__link:hover { color: var(--text); }
.footer__copy { font-size: 11px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
 
/* ════════════════════════════════════
   MEDIA QUERIES — placed at the end
   ════════════════════════════════════ */
 
@media (max-width: 1024px) {
  .hero__headline { font-size: 40px; }
  .stat-block__value { font-size: 36px; }
}
 
@media (max-width: 768px) {
  /* Header */
  .header__nav { display: none; }
  .header__actions { display: none; }
  .burger { display: block; }
  .icon-btn{
    display:none;
  }
  .mobilenav-icon{
    display: flex;
    align-items: center;
    padding:10px 0;
    gap: 8px;
    color: white;
  }
 
  /* Hero */
  .hero { padding: 48px 0 56px; }
  .hero__inner { grid-template-columns: 1fr; gap: 40px; }
  .hero__headline { font-size: 34px; }
  .hero__sub { font-size: 15px; }
  .hero__cta-row { flex-direction: column; align-items: flex-start; gap: 12px; }
  .hero__specs { grid-template-columns: 1fr 1fr; }
  .hero__mockup { order: -1; }
 
  /* Mockup: hide on small screens to save space */
  .stat-cards { grid-template-columns: repeat(2, 1fr); }
 
  /* Problem bar */
  .problem-bar__inner { grid-template-columns: 1fr; }
  .problem-item { justify-content: flex-start; border-right: none; border-bottom: 1px solid var(--border); padding: 12px 0; }
  .problem-item:last-child { border-bottom: none; }
 
  /* Steps */
  .steps { grid-template-columns: 1fr; gap: 16px; }
 
  /* Stats */
  .stats-grid { grid-template-columns: 1fr; }
  .stat-block { border-right: none; border-bottom: 1px solid var(--border); padding: 24px 16px; }
  .stat-block:last-child { border-bottom: none; }
  .stat-block__value { font-size: 40px; }
 
  /* Features */
  .features-grid { grid-template-columns: 1fr; gap: 16px; }
 
  /* CTA */
  .cta-card { padding: 40px 24px; }
  .cta-card__headline { font-size: 28px; }
  .cta-card__sub { font-size: 14px; }
 
  /* Footer */
  .footer__inner { flex-direction: column; text-align: center; gap: 20px; }
  .footer__links { gap: 24px; }
 
  /* Section */
  .section { padding: 56px 0; }
  .section-header { margin-bottom: 36px; }
  .section-header__headline { font-size: 26px; }
}
 
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .hero__headline { font-size: 28px; }
  .hero__specs { grid-template-columns: 1fr; gap: 12px; }
  .spec { border-bottom: 1px solid var(--border); padding-bottom: 12px; }
  .spec:last-child { border-bottom: none; }
  .stat-cards { grid-template-columns: repeat(2, 1fr); }
  .cta-card { padding: 32px 16px; }
  .cta-card__headline { font-size: 24px; }
  .stream__row { flex-wrap: wrap; gap: 4px; }
  .mockup__url { display: none; }
}

</style>