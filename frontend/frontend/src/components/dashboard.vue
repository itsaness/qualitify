<script setup>
import { ref, computed, onMounted, onUnmounted,watch } from 'vue'
import { authClient } from '@/auth.js'


/* ── Refresh ──────────────────────────────────────────────────── */
const isRefreshing = ref(false)
const refreshedAgo = ref(4)

function handleRefresh() {
  if (isRefreshing.value) return
  isRefreshing.value = true
  refreshedAgo.value = 0
  setTimeout(() => { isRefreshing.value = false }, 700)
}

/* ── Stats ────────────────────────────────────────────────────── */
let statsCount = ref("");
let getordersStats = async()=>{
  try{
    let response =await  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`,{
      method:"GET",
      credentials:"include"

    });
    if(!response.ok){
      return;
    }
     statsCount.value=await response.json();
  }catch(err){
    console.error(err.message);
  }
}
const stats = ref([
  { label: 'overviewPage.metrics.total',   value: statsCount.value.total_orders, color: '#3c90ff' },
  { label: 'overviewPage.metrics.sent',    value: statsCount.value.successful_orders, color: '#4ae176' },
  { label: 'overviewPage.metrics.failed',  value: statsCount.value.failed_order,    color: '#ffb4ab' },
  { label: 'overviewPage.metrics.pending', value: statsCount.value.pending_orders,     color: '#f59e0b' },
])

/* ── Failed events ────────────────────────────────────────────── */
let failedOrders = ref();
const getFailedOrders = async()=>{
  try{
 let response =await  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/failed`,{
      method:"GET",
      credentials:"include"

    });
    if(!response.ok){
      return;
    }
     failedOrders.value = await response.json();
     for(let failedOrder of failedOrders.value){
      failedEvents.value.push({
        id: failedOrder.id, order: failedOrder.order_number, phone: failedOrder.customer_phone, error: failedOrder.meta_error,     status: 'idle', resolved: false
      })
     };
  }catch(err){
    console.error(err.message);
  }
}
const failedEvents = ref([
])

const activeAnomalies = computed(() => failedEvents.value.filter(e => !e.resolved).length)

async function handleRetry(order_number) {
   let options = {
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",

  };
  try{
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/retry/${order_number}`,options);
    if(!response.ok){
      return;
    }
    for(let failedOrder of failedOrder.value){
      if(failedOrder.order_number=order_number){
       order.status='sending'
        setTimeout(() => {
    order.status   = 'dispatched'
    order.resolved = true
  }, 700)
      }
    }
   
 
  }catch(err){
   console.error(err.message);
  }
}
 

 async function retryAll() {
  for(failedOrder of failedOrders.value){
    if(!failedOrder.resolved){
      await handleRetry(failedOrder.order_number);
    }
  }
}

function retryLabel(status) {
  if (status === 'sending')    return 'overviewPage.tableActions.sending'
  if (status === 'dispatched') return 'overviewPage.tableActions.dispatched'
  return 'overviewPage.tableActions.retry'
}
onMounted(()=>{
  getFailedOrders();
})

/* ── Countdown ────────────────────────────────────────────────── */
const countdownSecs = ref(134)
const countdown = computed(() => {
  const m = Math.floor(countdownSecs.value / 60)
  const s = countdownSecs.value % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
})

let timer = null
onMounted(() => {
  timer = setInterval(
    ()=>{
   if(countdownSecs>0){
    countdownSecs--;
  }else{
    countdownSecs.value=123;
    retryAll();
  }
    },1000
  )
})
onUnmounted(() => clearInterval(timer))

/* better-auth user */


let session = authClient.useSession();
let profilePicture = computed(()=>session.value?.data?.user?.image);

let handleSignout = async()=>{
  try{
   const {error} =  await authClient.signOut();
   if(error){
    return;
   }
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
  <div class="dashboard-root">
    <!-- ── Header ─────────────────────────────────────────────── -->
    <header class="app-header">
      <div class="header-inner">
        <div class="header-left">
          <a href="#" class="logo-link">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <span class="logo-text">{{ $t('global.brandName') }}</span>
          </a>
          
          <nav class="desktop-nav">
            <router-link to="/dashboard" class="nav-link" active-class="nav-link--active">{{ $t('mainNav.overview') }}</router-link>
            <router-link to="/settings"  class="nav-link" active-class="nav-link--active">{{ $t('mainNav.config') }}</router-link>
          </nav>
        </div>
        <div class="header-right">
          <button class="icon-btn" @click="switchLanguage"><Globe :size=18 /></button>

          <div class="navlogin">
            <button v-if="!session.data" class="nav-link" @click="$router.push('/login')">{{ $t('mainNav.loginBtn') }}</button>
            <button v-else class="nav-link" @click="handleSignout()">{{ $t('mainNav.logoutBtn') }}</button>
          </div>
          <img v-if="profilePicture"
            :src="profilePicture"
            :alt="$t('mainNav.userAvatarAlt')"
            class="avatar"
          />
        </div>
      </div>
    </header>

    <!-- ── Main ───────────────────────────────────────────────── -->
    <main class="dashboard-main">
      <div class="dashboard-container">

        <!-- Page title row -->
        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">{{ $t('overviewPage.headerTitle') }}</h1>
          </div>
          <div class="page-header-right">
            <span class="refresh-label">{{ $t('overviewPage.timeSinceRefresh', { time: refreshedAgo }) }}</span>
            <button class="btn-secondary" @click="handleRefresh">
              <span
                class="material-symbols-outlined icon-sm"
                :class="{ 'spin-once': isRefreshing }"
              >sync</span>
              <span>{{ $t('overviewPage.refreshDataBtn') }}</span>
            </button>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="stat-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-card-top">
              <span class="stat-label">{{ $t(stat.label) }}</span>
              <span class="stat-dot" :style="{ backgroundColor: stat.color }"></span>
            </div>
            <div class="stat-value">{{ stat.value }}</div>
          </div>
        </div>

        <!-- Failed Events Table -->
        <div class="table-section">

          <!-- Table header bar -->
          <div class="table-topbar">
            <div class="table-topbar-left">
              <h2 class="table-heading">{{ $t('overviewPage.errorList.title') }}</h2>
              <span class="anomaly-badge">{{ $t('overviewPage.errorList.badgeCount', { count: activeAnomalies }) }}</span>
            </div>
            <button class="btn-retry-all" @click="retryAll">{{ $t('overviewPage.errorList.retryAllBtn') }}</button>
          </div>

          <!-- Scrollable table -->
          <div class="table-scroll">
            <table class="events-table">
              <thead>
                <tr>
                  <th scope="col">{{ $t('overviewPage.errorList.colOrder') }}</th>
                  <th scope="col">{{ $t('overviewPage.errorList.colPhone') }}</th>
                  <th scope="col">{{ $t('overviewPage.errorList.colError') }}</th>
                  <th scope="col" class="th-right">{{ $t('overviewPage.errorList.colAction') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="event in failedEvents"
                  :key="event.id"
                  class="table-row"
                  :class="{ 'row--resolved': event.resolved }"
                >
                  <td class="td-order">{{ event.order }}</td>
                  <td class="td-phone">{{ event.phone }}</td>
                  <td class="td-error">
                    <div v-if="!event.resolved" class="error-cell">
                      <span class="error-dot" aria-hidden="true">•</span>
                      <span>{{ event.error }}</span>
                    </div>
                    <span v-else class="acknowledged">{{ $t('overviewPage.errorList.statusAcknowledged') }}</span>
                  </td>
                  <td class="td-action">
                    <button
                      class="btn-retry"
                      :class="{
                        'btn-retry--sending':    event.status === 'sending',
                        'btn-retry--dispatched': event.status === 'dispatched',
                      }"
                      :disabled="event.status !== 'idle'"
                      @click="handleRetry(event)"
                    >
                      <span v-if="event.status === 'sending'" class="spin-char" aria-hidden="true">↻</span>
                      <span>{{ $t(retryLabel(event.status)) }}</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Table footer -->
          <div class="table-footer">
            <span>{{ $t('overviewPage.footer.showingText') }}</span>
            <span class="retry-countdown">{{ $t('overviewPage.footer.nextRetryTimer', { time: countdown }) }}</span>
          </div>
        </div>

      </div>
    </main>

    <!-- ── Footer ─────────────────────────────────────────────── -->
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-left">
        </div>
        <div class="footer-copy">{{ $t('global.copyrightString') }}</div>
      </div>
    </footer>

    <!-- ── Mobile Bottom Nav ───────────────────────────────────── -->
    <nav class="mobile-nav" aria-label="Main navigation">
      <div class="mobile-nav-inner">
        <router-link to="/dashboard" class="mobile-nav-item" active-class="mobile-nav-item--active">
          <span class="material-symbols-outlined mobile-nav-icon">monitoring</span>
          <span class="mobile-nav-label">{{ $t('mainNav.overview') }}</span>
        </router-link>
        <router-link to="/settings" class="mobile-nav-item" active-class="mobile-nav-item--active">
          <span class="material-symbols-outlined mobile-nav-icon">settings_suggest</span>
          <span class="mobile-nav-label">{{ $t('mainNav.config') }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* ─── Login Page ──────────────────────────────────────────────────── */
/* ─── Layout shell ────────────────────────────────────────────────── */
.dashboard-root {
  width: 100%;
  min-height: 100dvh;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
}

/* ─── Header ──────────────────────────────────────────────────────── */
.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  background-color: rgba(17,19,24,0.90);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(65,71,84,0.35);
}

.header-inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--sp-md);
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

.header-left {
  display: flex;
  align-items: center;
  gap: var(--sp-xl);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
}

.brand-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.brand-name {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--color-on-surface);
  white-space: nowrap;
}

.desktop-nav {
  display: none;
}
.icon-btn{
  display: flex;
  color: white;
  align-items: center;
}

.nav-link {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 16px;
  padding: var(--sp-xs) var(--sp-sm);
  border-radius: 0.25rem;
  color: var(--color-on-surface-variant);
  transition: color 0.15s, background-color 0.15s;
}

.nav-link:hover { color: var(--color-on-surface); }

.nav-link--active {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
}

.live-badge {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
  padding: 2px var(--sp-sm);
  border-radius: var(--radius-full);
  border: 1px solid rgba(74,225,118,0.30);
  background-color: rgba(74,225,118,0.10);
  color: var(--color-tertiary);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-tertiary);
  flex-shrink: 0;
  animation: livePulse 2s ease-in-out infinite;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(65,71,84,0.40);
  flex-shrink: 0;
}

/* ─── Main ────────────────────────────────────────────────────────── */
.dashboard-main {
  flex: 1;
  width: 100%;
  padding-top: var(--header-h);
  padding-bottom: calc(var(--nav-h) + var(--sp-xl));
}

.dashboard-container {
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  padding: var(--sp-xl) var(--sp-md);
  display: flex;
  flex-direction: column;
  gap: var(--sp-xl);
}

/* ─── Page header row ─────────────────────────────────────────────── */
.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
}

.page-header-left {
  display: flex;
  flex-direction: column;
  gap: var(--sp-xs);
}

.page-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 16px;
  color: var(--color-outline);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-on-surface);
}

.page-header-right {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
  flex-wrap: wrap;
}

.refresh-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-outline);
}

.btn-secondary {
  height: 36px;
  padding: 0 var(--sp-md);
  display: inline-flex;
  align-items: center;
  gap: var(--sp-xs);
  border-radius: 0.5rem;
  background-color: var(--color-surface-container-high);
  color: var(--color-on-surface);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: background-color 0.15s;
  white-space: nowrap;
}

.btn-secondary:hover { background-color: var(--color-surface-variant); }

.icon-sm { font-size: 18px; line-height: 1; }

.spin-once {
  animation: spinOnce 0.6s linear;
}

@keyframes spinOnce {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ─── Stat grid ───────────────────────────────────────────────────── */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-md);
}

.stat-card {
  background-color: var(--color-surface-container-low);
  border-radius: 0.75rem;
  padding: var(--sp-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 104px;
}

.stat-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 16px;
  color: var(--color-on-surface-variant);
}

.stat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-value {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--color-on-surface);
}

/* ─── Table section ───────────────────────────────────────────────── */
.table-section {
  background-color: var(--color-surface-container-low);
  border-radius: 0.75rem;
  overflow: hidden;
}

.table-topbar {
  padding: var(--sp-md) var(--sp-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-sm);
  flex-wrap: wrap;
}

.table-topbar-left {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
  flex-wrap: wrap;
}

.table-heading {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 22px;
  color: var(--color-on-surface);
}

.anomaly-badge {
  padding: 2px var(--sp-xs);
  border-radius: var(--radius-full);
  background-color: rgba(255,180,171,0.10);
  color: var(--color-error);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
}

.btn-retry-all {
  height: 32px;
  padding: 0 var(--sp-sm);
  border-radius: 0.25rem;
  background-color: var(--color-surface-container);
  color: var(--color-on-surface-variant);
  font-size: 12px;
  font-weight: 500;
  transition: color 0.15s, background-color 0.15s;
  white-space: nowrap;
}

.btn-retry-all:hover {
  background-color: var(--color-surface-variant);
  color: var(--color-on-surface);
}

/* Scroll wrapper */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 520px;
}

.events-table thead tr {
  background-color: var(--color-surface-container-lowest);
}

.events-table th {
  padding: var(--sp-sm) var(--sp-md);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-outline);
  white-space: nowrap;
}

.th-right { text-align: right; }

.events-table tbody tr {
  border-bottom: 1px solid rgba(65,71,84,0.20);
  transition: background-color 0.12s;
}

.events-table tbody tr:last-child { border-bottom: none; }
.events-table tbody tr:hover { background-color: var(--color-surface-container); }

.row--resolved { opacity: 0.65; }

.events-table td {
  padding: var(--sp-md) var(--sp-md);
  font-size: 13px;
  color: var(--color-on-surface);
  vertical-align: middle;
}

.td-order {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary) !important;
  white-space: nowrap;
}

.td-phone {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-on-surface-variant) !important;
  white-space: nowrap;
}

.error-cell {
  display: flex;
  align-items: center;
  gap: var(--sp-xs);
}

.error-dot {
  color: var(--color-error);
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
}

.acknowledged {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-tertiary);
}

.td-action {
  text-align: right;
  white-space: nowrap;
}

.btn-retry {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 32px;
  padding: 0 var(--sp-md);
  border-radius: 0.25rem;
  background-color: var(--color-surface-container-high);
  color: var(--color-on-surface);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: background-color 0.15s, transform 0.1s, opacity 0.15s;
}

.btn-retry:hover:not(:disabled) { background-color: var(--color-surface-variant); }
.btn-retry:active:not(:disabled) { transform: scale(0.95); }

.btn-retry--sending { opacity: 0.7; }

.btn-retry--dispatched {
  background-color: var(--color-tertiary-container);
  color: var(--color-on-tertiary);
}

.spin-char {
  display: inline-block;
  animation: spinChar 0.7s linear infinite;
}

@keyframes spinChar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.table-footer {
  padding: var(--sp-sm) var(--sp-md);
  background-color: var(--color-surface-container-lowest);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-sm);
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 16px;
  color: var(--color-outline);
}

.retry-countdown { color: var(--color-on-surface-variant); }

/* ─── Footer ──────────────────────────────────────────────────────── */
.app-footer {
  width: 100%;
  background-color: var(--color-surface-container-lowest);
  border-top: 1px solid rgba(65,71,84,0.30);
  padding: var(--sp-lg) 0;
  /* on mobile sits above bottom nav */
  padding-bottom: calc(var(--sp-lg) + var(--nav-h));
}

.footer-inner {
  padding: 0 var(--sp-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-sm);
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.02em;
  font-weight: 500;
  color: var(--color-on-surface-variant);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
}

.footer-node {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-outline);
}

.footer-sep { color: var(--color-outline); }
.footer-copy { color: var(--color-outline); }

/* ─── Mobile bottom nav ───────────────────────────────────────────── */
.mobile-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 50;
  background-color: rgba(17,19,24,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 -2px 12px rgba(0,0,0,0.50);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.mobile-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--nav-h);
  padding: 0 var(--sp-md);
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 64px;
  height: 48px;
  color: var(--color-on-surface-variant);
  transition: color 0.15s;
  border-radius: 0.5rem;
}

.mobile-nav-item:hover { color: var(--color-on-surface); }

.mobile-nav-item--active { color: var(--color-primary); }

.mobile-nav-item--active .mobile-nav-icon {
  transform: scale(1.1);
}

.mobile-nav-icon {
  font-size: 22px;
  transition: transform 0.15s;
}

.mobile-nav-label {
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.02em;
}

/* ══════════════════════════════════════════════════════════════════════
   MEDIA QUERIES — mobile-first, ascending breakpoints
══════════════════════════════════════════════════════════════════════ */

/* 480px — large phones landscape */
@media (min-width: 480px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-value { font-size: 28px; }

  .table-topbar {
    padding: var(--sp-md) var(--sp-lg);
  }

  .events-table th,
  .events-table td {
    padding-left: var(--sp-lg);
    padding-right: var(--sp-lg);
  }

  .table-footer {
    padding-left: var(--sp-lg);
    padding-right: var(--sp-lg);
  }
}

/* 640px — small tablets */
@media (min-width: 640px) {
  .dashboard-container { padding: var(--sp-xl) var(--sp-lg); }

  .page-title { font-size: 32px; }
}

/* 768px — tablets */
@media (min-width: 768px) {
  /* Show desktop nav, hide mobile nav */
  .desktop-nav  { display: flex; align-items: center; gap: var(--sp-md); }
  .mobile-nav   { display: none; }

  .header-inner { padding: 0 var(--sp-lg); }

  .brand-logo { height: 32px; }

  /* Page header goes horizontal */
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .page-title { font-size: 36px; }

  /* 4-column stat grid */
  .stat-grid { grid-template-columns: repeat(4, 1fr); }

  .stat-value { font-size: 30px; }

  /* Footer no longer needs mobile-nav offset */
  .app-footer {
    padding-bottom: var(--sp-lg);
  }

  .footer-inner {
    padding: 0 var(--sp-lg);
    flex-direction: row;
    justify-content: space-between;
  }

  /* Main no longer needs mobile-nav offset */
  .dashboard-main {
    padding-bottom: var(--sp-xl);
  }
}

/* 1024px — desktop */
@media (min-width: 1024px) {
  .header-inner { padding: 0 var(--sp-xl); }

  .dashboard-container { padding: var(--sp-xl) var(--sp-xl); }

  .page-title { font-size: 40px; }

  .stat-value { font-size: 32px; }

  .footer-inner { padding: 0 var(--sp-xl); }
}

/* 1280px — large desktop */
@media (min-width: 1280px) {
  .dashboard-container { padding: var(--sp-xl) calc(var(--sp-xl) * 1.5); }
}

/* 1536px — xl screens */
@media (min-width: 1536px) {
  .dashboard-container { padding: var(--sp-xl) calc(var(--sp-xl) * 2); }
}
</style>