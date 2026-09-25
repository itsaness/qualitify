<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { watch } from 'vue';

const isLargeScreen = useMediaQuery('(min-width:768px)');
const menuOpen = ref(false);
const activeSection = ref('overview');
const activeCarrierTab = ref('yalidine');

watch(isLargeScreen, (newVal) => {
  if (newVal) {
    menuOpen.value = false;
  }
}, { immediate: true });

// Tab switching
function switchTab(carrier) {
  activeCarrierTab.value = carrier;
}

// Copy to clipboard
async function copySnippet(text, event) {
  const button = event.currentTarget;
  const originalHtml = button.innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    button.innerHTML = `<span class="copied-text">✓ Copied</span>`;
    setTimeout(() => {
      button.innerHTML = originalHtml;
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err.message);
  }
}

// Scroll spy
function handleScroll() {
  const sections = document.querySelectorAll('section[id], div[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  if (current) activeSection.value = current;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function isActive(section) {
  return activeSection.value === section;
}

// Code snippets
const codeOrderSnippet = `const res = await fetch('https://api.qualitify.app/api/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  },
  body: JSON.stringify({
    first_name: 'Yacine',
    family_name: 'Benali',
    address: '12 Rue Didouche Mourad',
    wilaya: 'Alger',
    commune: 'Hussein Dey',
    order_number: 'ORD-00421',
    amount: 4500,
    customer_phone: '+213555000111',
    client_ip: req.ip,
    user_agent: req.headers['user-agent'],
    fbp: req.cookies._fbp ?? null,
    fbc: req.cookies._fbc ?? null,
    product_list: [
      { id: 'SKU-01', name: 'Leather Wallet', quantity: 1, price: 4500 }
    ]
  })
})`;

const codeTrackingSnippet = `// POST /api/orders/ORD-00421/tracking
await fetch('https://api.qualitify.app/api/orders/ORD-00421/tracking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  },
  body: JSON.stringify({
    tracking_number: 'YAL-789456',
    carrier: 'yalidine'
  })
})`;

const codeQuickstart = `// Quick Start
// 1. Configure credentials in Settings
// 2. Call /api/order on checkout
// 3. Push tracking 
// 4. Carrier webhook fires events automatically`;
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

<template >
<div class="page-wrapper">

    <!-- ── Top Header ─────────────────────────────────────────── -->
    <header class="header">
      <div class="header-inner">

        <!-- Left: Brand -->
        <div class="header-left">
          <div class="brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <span class="brand-name">
              {{ $t('docsPage.header.brandName') }}
              <span class="brand-badge">{{ $t('docsPage.header.brandBadge') }}</span>
            </span>
          </div>

          <div class="divider-vertical"></div>

         
        </div>

        <!-- Right: Actions -->
        <div class="header-right">
          <button class="icon-btn" @click="switchLanguage"><Globe :size="18"/></button>

          <a href="#quick-reference" class="header-link">{{ $t('docsPage.header.apiRef') }}</a>

          <router-link to="/dashboard" class="btn-dashboard">
            {{ $t('docsPage.header.btnDashboard') }}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>

          <button
            class="burger"
            @click="menuOpen = !menuOpen"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
          >
            <span class="material-symbols-outlined burger-icon">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div class="mobile-nav" :class="{ 'mobile-nav--open': menuOpen }">
        <a href="#overview" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.overview') }}</a>
        <a href="#quick-start" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.quickStart') }}</a>
        <a href="#meta-pixel-setup" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.metaPixel') }}</a>
        <a href="#api-key" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.apiKey') }}</a>
        <a href="#endpoint-order" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.endpointOrder') }}</a>
        <a href="#endpoint-tracking" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.endpointTrack') }}</a>
        <a href="#quick-reference" class="mobile-nav-link" @click="menuOpen = false">{{ $t('docsPage.mobileNav.cheatsheet') }}</a>
        <a href="https://s2stracking.com/dashboard" class="mobile-nav-link mobile-nav-link--accent" @click="menuOpen = false">
          {{ $t('docsPage.mobileNav.toDashboard') }}
        </a>
        <button class="mobilenav-icon" @click="switchLanguage"><Globe :size="18"/></button>
      </div>
    </header>

    <!-- ── Three-Column Layout ────────────────────────────────── -->
    <div class="layout">

      <!-- ── LEFT SIDEBAR ──────────────────────────────────────── -->
      <aside class="sidebar-left">

        <!-- Getting Started -->
        <div class="nav-group">
          <div class="nav-group-label">{{ $t('docsPage.sidebar.groupStart') }}</div>
          <nav>
            <a href="#overview" class="nav-item" :class="{ 'nav-item--active': isActive('overview') }">
              {{ $t('docsPage.sidebar.itemOverview') }}
            </a>
            <a href="#quick-start" class="nav-item" :class="{ 'nav-item--active': isActive('quick-start') }">
              {{ $t('docsPage.sidebar.itemQuickStart') }}
            </a>
          </nav>
        </div>

        <!-- Credentials -->
        <div class="nav-group">
          <div class="nav-group-label">{{ $t('docsPage.sidebar.groupCreds') }}</div>
          <nav>
            <a href="#meta-pixel-setup" class="nav-item" :class="{ 'nav-item--active': isActive('meta-pixel-setup') }">
              {{ $t('docsPage.sidebar.itemMeta') }}
            </a>
            <a href="#api-key" class="nav-item" :class="{ 'nav-item--active': isActive('api-key') }">
              {{ $t('docsPage.sidebar.itemApi') }}
            </a>
            <a href="#carrier-webhook" class="nav-item" :class="{ 'nav-item--active': isActive('carrier-webhook') }">
              {{ $t('docsPage.sidebar.itemWebhook') }}
            </a>
          </nav>
        </div>

        <!-- Endpoints -->
        <div class="nav-group">
          <div class="nav-group-label">{{ $t('docsPage.sidebar.groupEndpoints') }}</div>
          <nav>
            <a href="#endpoint-order" class="nav-item nav-item--mono" :class="{ 'nav-item--active': isActive('endpoint-order') }">
              <span>POST /api/order</span>
              <span class="nav-badge nav-badge--indigo">{{ $t('docsPage.sidebar.badgeBuy') }}</span>
            </a>
            <a href="#endpoint-tracking" class="nav-item nav-item--mono" :class="{ 'nav-item--active': isActive('endpoint-tracking') }">
              <span class="nav-item-truncate">POST /api/orders/.../trk</span>
              <span class="nav-badge nav-badge--blue">{{ $t('docsPage.sidebar.badgeTrk') }}</span>
            </a>
            <a href="#endpoint-webhook" class="nav-item nav-item--mono" :class="{ 'nav-item--active': isActive('endpoint-webhook') }">
              <span>POST /api/tracking/update</span>
              <span class="nav-badge nav-badge--amber">{{ $t('docsPage.sidebar.badgeManual') }}</span>
            </a>
          </nav>
        </div>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="sidebar-footer-status">
            <span class="sidebar-status-dot"></span>
            {{ $t('docsPage.sidebar.footerStatus') }}
          </div>
          <div class="sidebar-footer-meta">{{ $t('docsPage.sidebar.footerMeta') }}</div>
        </div>
      </aside>

      <!-- ── MAIN CONTENT ──────────────────────────────────────── -->
      <main class="content">

        <!-- Overview -->
        <section id="overview" class="section-block">
          <div class="section-eyebrow">{{ $t('docsPage.content.overview.eyebrow') }}</div>
          <h1 class="page-title">{{ $t('docsPage.content.overview.title') }}</h1>
          <p class="page-subtitle">
            {{ $t('docsPage.content.overview.subtitle') }}
          </p>
          <div class="tag-row">
            <span class="tag tag--indigo">{{ $t('docsPage.content.overview.tagVer') }}</span>
            <span class="tag tag--zinc">{{ $t('docsPage.content.overview.tagRest') }}</span>
            <span class="tag tag--emerald">{{ $t('docsPage.content.overview.tagCapi') }}</span>
          </div>
        </section>

        <!-- Quick Start -->
        <section id="quick-start" class="section-block">
          <div class="info-card">
            <div class="info-card-header">
              <span class="info-dot"></span>
              {{ $t('docsPage.content.quickStart.header') }}
            </div>
            <p class="info-card-body">
              {{ $t('docsPage.content.quickStart.body') }}
            </p>
            <div class="stat-grid">
              <div class="stat-item">
                <div class="stat-value stat-value--indigo">98%</div>
                <div class="stat-label">{{ $t('docsPage.content.quickStart.statMatch') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value stat-value--emerald">< 5 min</div>
                <div class="stat-label">{{ $t('docsPage.content.quickStart.statSetup') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value stat-value--white">DZ COD</div>
                <div class="stat-label">{{ $t('docsPage.content.quickStart.statLocal') }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── SECTION 1: CREDENTIALS ──────────────────────────── -->
        <section id="credentials" class="section-block">
          <div class="section-divider">
            <div class="section-number">{{ $t('docsPage.content.credentials.sectionNum') }}</div>
            <h2 class="section-title">{{ $t('docsPage.content.credentials.title') }}</h2>
          </div>

          <!-- Meta Pixel Setup -->
          <div id="meta-pixel-setup" class="subsection">
            <h3 class="subsection-title">{{ $t('docsPage.content.credentials.meta.title') }}</h3>
            <p class="subsection-body">
              {{ $t('docsPage.content.credentials.meta.desc1') }}
              <strong class="text-bright">{{ $t('docsPage.content.credentials.meta.descStrong') }}</strong>.
            </p>

            <div class="step-list">
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.meta.step1a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.meta.step1Strong') }}</strong> {{ $t('docsPage.content.credentials.meta.step1b') }}
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.meta.step2a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.meta.step2Strong') }}</strong> — {{ $t('docsPage.content.credentials.meta.step2b') }}
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.meta.step3a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.meta.step3Strong') }}</strong> — {{ $t('docsPage.content.credentials.meta.step3b') }}
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.meta.step4a') }} <strong class="text-indigo">{{ $t('docsPage.content.credentials.meta.step4Strong') }}</strong> {{ $t('docsPage.content.credentials.meta.step4b') }}
                </div>
              </div>
            </div>

            <div class="callout callout--indigo">
              <div class="callout-icon callout-icon--indigo">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                  <line x1="12" y1="16" x2="12" y2="12" stroke-width="2"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"></line>
                </svg>
              </div>
              <div class="callout-text">
                {{ $t('docsPage.content.credentials.meta.callout') }}
              </div>
            </div>
          </div>

          <!-- API Key -->
          <div id="api-key" class="subsection">
            <h3 class="subsection-title">{{ $t('docsPage.content.credentials.api.title') }}</h3>
            <p class="subsection-body">
              {{ $t('docsPage.content.credentials.api.desc1') }}
              <code class="inline-code">x-api-key</code> {{ $t('docsPage.content.credentials.api.desc2') }}
              <strong class="text-bright">{{ $t('docsPage.content.credentials.api.descStrong') }}</strong>.
            </p>

            <div class="code-block">
              <div class="code-block-header">
                <div class="code-dots">
                  <span class="code-dot code-dot--red"></span>
                  <span class="code-dot code-dot--yellow"></span>
                  <span class="code-dot code-dot--green"></span>
                  <span class="code-block-label">{{ $t('docsPage.codePanel.headerReq') }}</span>
                </div>
                <button class="copy-btn" @click="copySnippet('x-api-key: YOUR_API_KEY', $event)">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {{ $t('docsPage.codePanel.copyBtn') }}
                </button>
              </div>
              <div class="code-body">
                <span class="c-muted">x-api-key:</span>
                <span class="c-emerald"> s2s_live_9f83a042e128b9c48731...</span>
              </div>
            </div>

            <div class="callout callout--amber">
              <div class="callout-icon callout-icon--amber">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="callout-text callout-text--amber">
                <strong class="c-amber-strong">{{ $t('docsPage.content.credentials.api.warningTitle') }}</strong> 
                {{ $t('docsPage.content.credentials.api.warningBody') }}
              </div>
            </div>
          </div>

          <!-- Carrier Webhook Secret -->
          <div id="carrier-webhook" class="subsection">
            <h3 class="subsection-title">{{ $t('docsPage.content.credentials.carrier.title') }}</h3>
            <p class="subsection-body">
              {{ $t('docsPage.content.credentials.carrier.desc') }}
            </p>

            <div class="step-list">
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-text">{{ $t('docsPage.content.credentials.carrier.step1a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.carrier.step1Strong') }}</strong></div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.carrier.step2a') }}
                  (<span class="c-indigo">Yalidine</span>,
                  <span class="c-indigo">Maystro</span>)
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-text">{{ $t('docsPage.content.credentials.carrier.step3a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.carrier.step3bStrong') }}</strong></div>
              </div>
              <div class="step-item">
                <div class="step-number">4</div>
                <div class="step-text">{{ $t('docsPage.content.credentials.carrier.step3a') }} <strong class="text-bright">{{ $t('docsPage.content.credentials.carrier.step3cStrong') }}</strong></div>
              </div>
              <div class="step-item">
                <div class="step-number">5</div>
                <div class="step-text">
                  {{ $t('docsPage.content.credentials.carrier.step4a') }}
                  <code class="inline-code">https://api.qualitify.app/webhook/courier/?sec=whsec_...</code>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">6</div>
                <div class="step-text">{{ $t('docsPage.content.credentials.carrier.step5') }}</div>
              </div>
            </div>

            <div class="callout callout--indigo">
              <div class="callout-icon callout-icon--indigo">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                  <polyline points="12 6 12 12 14 14" stroke-width="2"></polyline>
                </svg>
              </div>
              <div class="callout-text">
                {{ $t('docsPage.content.credentials.carrier.callout') }}
              </div>
            </div>
          </div>
        </section>

        <!-- ── SECTION 2: ENDPOINTS ────────────────────────────── -->
        <section id="endpoints" class="section-block">
          <div class="section-divider">
            <div class="section-number">{{ $t('docsPage.content.endpoints.sectionNum') }}</div>
            <h2 class="section-title">{{ $t('docsPage.content.endpoints.title') }}</h2>
            <p class="section-subtitle">
              {{ $t('docsPage.content.endpoints.subtitle1') }}
              <code class="inline-code">x-api-key</code> {{ $t('docsPage.content.endpoints.subtitle2') }}
            </p>
          </div>

          <!-- Endpoint: POST /api/order -->
          <div id="endpoint-order" class="subsection">
            <div class="endpoint-header">
              <div class="endpoint-left">
                <span class="method-badge method-badge--post">POST</span>
                <span class="endpoint-path">/api/order</span>
              </div>
              <span class="endpoint-tag endpoint-tag--emerald">{{ $t('docsPage.content.endpoints.order.tag') }}</span>
            </div>

            <p class="subsection-body">
              {{ $t('docsPage.content.endpoints.order.desc1') }} <strong class="text-bright">{{ $t('docsPage.content.endpoints.order.descStrong') }}</strong>
              {{ $t('docsPage.content.endpoints.order.desc2') }}
            </p>

            <div class="table-label">{{ $t('docsPage.table.thHeader') }}</div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>{{ $t('docsPage.table.thHeader') }}</th>
                    <th>{{ $t('docsPage.table.thType') }}</th>
                    <th>{{ $t('docsPage.table.thReq') }}</th>
                    <th>{{ $t('docsPage.table.thDesc') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="c-indigo mono">x-api-key</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.apiKey') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">Content-Type</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.contentType') }} <code class="inline-code">application/json</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-label">{{ $t('docsPage.table.thReqBody') }}</div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>{{ $t('docsPage.table.thField') }}</th>
                    <th>{{ $t('docsPage.table.thType') }}</th>
                    <th>{{ $t('docsPage.table.thReq') }}</th>
                    <th>{{ $t('docsPage.table.thDesc') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="c-indigo mono">first_name</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.fname') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">family_name</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.lname') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">address</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.addr') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">wilaya</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.wilaya') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">commune</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.commune') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">order_number</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.orderNum') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">amount</td>
                    <td class="c-muted mono">number</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.amount') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">customer_phone</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.phone') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">client_ip</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.ip') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">user_agent</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.ua') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">fbp</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-muted">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.fbp') }} <code class="inline-code">_fbp</code> {{ $t('docsPage.tableRows.fbpEnd') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">fbc</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-muted">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.fbc') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">product_list</td>
                    <td class="c-muted mono">array</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqOpt') }}</td>
                    <td>{{ $t('docsPage.tableRows.prodList') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Endpoint: POST /api/orders/:id/tracking -->
          <div id="endpoint-tracking" class="subsection">
            <div class="endpoint-header">
              <div class="endpoint-left">
                <span class="method-badge method-badge--post">POST</span>
                <span class="endpoint-path">/api/orders/:order_number/tracking</span>
              </div>
              <span class="endpoint-tag endpoint-tag--blue">{{ $t('docsPage.content.endpoints.tracking.tag') }}</span>
            </div>

            <p class="subsection-body">
              {{ $t('docsPage.content.endpoints.tracking.desc') }}
            </p>

            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>{{ $t('docsPage.table.thField') }}</th>
                    <th>{{ $t('docsPage.table.thType') }}</th>
                    <th>{{ $t('docsPage.table.thReq') }}</th>
                    <th>{{ $t('docsPage.table.thDesc') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="c-indigo mono">tracking_number</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.trkNum') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">carrier</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>
                      <code class="inline-code">Ayor</code> /
                      <code class="inline-code">Maystro</code> 
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Endpoint: POST /api/tracking/update -->
          <div id="endpoint-webhook" class="subsection">
            <div class="endpoint-header">
              <div class="endpoint-left">
                <span class="method-badge method-badge--purple">POST</span>
                <span class="endpoint-path">/api/tracking/update</span>
              </div>
              <span class="endpoint-tag endpoint-tag--amber">{{ $t('docsPage.content.endpoints.manual.tag') }}</span>
            </div>

            <p class="subsection-body">
              {{ $t('docsPage.content.endpoints.manual.desc') }}
            </p>
             <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>{{ $t('docsPage.table.thField') }}</th>
                    <th>{{ $t('docsPage.table.thType') }}</th>
                    <th>{{ $t('docsPage.table.thReq') }}</th>
                    <th>{{ $t('docsPage.table.thDesc') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="c-indigo mono">tracking_number</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>{{ $t('docsPage.tableRows.trkNum') }}</td>
                  </tr>
                  <tr>
                    <td class="c-indigo mono">status</td>
                    <td class="c-muted mono">string</td>
                    <td class="c-emerald">{{ $t('docsPage.table.reqYes') }}</td>
                    <td>
                      <code class="inline-code">completed</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
       
            <div class="table-wrap">
            
            </div>
          </div>
        </section>

        <!-- ── SECTION 3: EXPRESS INTEGRATION ─────────────────── -->
        
      </main>

      <!-- ── RIGHT SIDEBAR: Code Panel ────────────────────────── -->
      <aside class="sidebar-right">

        <div class="code-panel-header">
          <div class="code-panel-title">
            <span class="code-panel-dot"></span>
            {{ $t('docsPage.codePanel.panelTitle') }}
          </div>
          <span class="code-panel-lang">{{ $t('docsPage.codePanel.panelLang') }}</span>
        </div>

        <!-- Quick Start Snippet -->
        <div class="code-block">
          <div class="code-block-header">
            <div class="code-dots">
              <span class="code-dot code-dot--red"></span>
              <span class="code-dot code-dot--yellow"></span>
              <span class="code-dot code-dot--green"></span>
              <span class="code-block-label">QuickStart.js</span>
            </div>
            <button class="copy-btn" @click="copySnippet(codeQuickstart, $event)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {{ $t('docsPage.codePanel.copyBtn') }}
            </button>
          </div>
          <!-- Hardcoded rendering of snippet to preserve format without running i18n inside JS variable -->
          <div class="code-body code-body--comment">
            <div>// {{ $t('docsPage.codePanel.qsLine1') }}</div>
            <div>// {{ $t('docsPage.codePanel.qsLine2') }}</div>
            <div>// {{ $t('docsPage.codePanel.qsLine3') }}</div>
            <div>// {{ $t('docsPage.codePanel.qsLine4') }}</div>
            <div>// {{ $t('docsPage.codePanel.qsLine5') }}</div>
          </div>
        </div>

        <!-- POST /api/order Snippet -->
        <div class="code-block">
          <div class="code-block-header">
            <div class="code-dots">
              <span class="c-emerald mono" style="font-size:10px;font-weight:600;">POST</span>
              <span class="c-muted mono" style="font-size:10px;">/api/order</span>
            </div>
            <button class="copy-btn" @click="copySnippet(codeOrderSnippet, $event)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {{ $t('docsPage.codePanel.copyBtn') }}
            </button>
          </div>
          <div class="code-body code-body--scroll">
            <div><span class="c-indigo">const</span> res = <span class="c-indigo">await</span> fetch(<span class="c-emerald-str">'https://api.qualitify.app/api/order'</span>, {</div>
            <div>&nbsp;&nbsp;method: <span class="c-emerald-str">'POST'</span>,</div>
            <div>&nbsp;&nbsp;headers: {</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-emerald-str">'Content-Type'</span>: <span class="c-emerald-str">'application/json'</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-emerald-str">'x-api-key'</span>: process.env.API_KEY</div>
            <div>&nbsp;&nbsp;},</div>
            <div>&nbsp;&nbsp;body: JSON.stringify({</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;first_name: <span class="c-emerald-str">'Yacine'</span>  ?? <span class="c-indigo">null</span>, </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;family_name: <span class="c-emerald-str">'Benali'</span> ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;address: <span class="c-emerald-str">'12 Rue Didouche Mourad'</span> ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;wilaya: <span class="c-emerald-str">'Alger'</span> ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;commune: <span class="c-emerald-str">'Hussein Dey'</span> ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;order_number: <span class="c-emerald-str">'ORD-00421'</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;amount: <span class="c-amber">4500</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;customer_phone: <span class="c-emerald-str">'+213555000111'</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;client_ip: req.ip,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;user_agent: req.headers[<span class="c-emerald-str">'user-agent'</span>],</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;fbp: req.cookies._fbp ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;fbclid: req.cookies._fbclid ?? <span class="c-indigo">null</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;product_list: [</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ id: <span class="c-emerald-str">'SKU-01'</span>, name: <span class="c-emerald-str">'Leather Wallet'</span>, quantity: <span class="c-amber">1</span>, price: <span class="c-amber">4500</span> }</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;] ?? <span class="c-indigo">null</span></div>
            <div>&nbsp;&nbsp;})</div>
            <div>})</div>
          </div>
        </div>

        <!-- Response Block -->
        <div class="code-block">
          <div class="code-block-header">
            <span class="c-muted" style="font-size:10px;font-family:monospace;">{{ $t('docsPage.codePanel.resOk') }}</span>
            <span class="c-emerald" style="font-size:10px;font-family:monospace;">JSON</span>
          </div>
          <div class="code-body">
            <pre class="response-pre">{
  <span class="c-indigo">"success"</span>: <span class="c-emerald">true</span>,
<span class="c-indigo">"order_number"</span>: <span class="c-emerald-str">"ORD-00421"</span>,
}</pre>
          </div>
        </div>

        <!-- Tracking Snippet -->
        <div class="code-block">
          <div class="code-block-header">
            <span class="c-muted" style="font-size:10px;font-family:monospace;">{{ $t('docsPage.codePanel.manPush') }}</span>
            <button class="copy-btn" @click="copySnippet(codeTrackingSnippet, $event)">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {{ $t('docsPage.codePanel.copyBtn') }}
            </button>
          </div>
          <div class="code-body code-body--scroll">
            <pre class="response-pre"><span class="c-muted">// POST /api/orders/ORD-00421/tracking</span>
<span class="c-indigo">await</span> fetch(<span class="c-emerald-str">'https://api.qualitify.app/api/orders/ORD-00421/tracking'</span>, {
  method: <span class="c-emerald-str">'POST'</span>,
  headers: {
    <span class="c-emerald-str">'Content-Type'</span>: <span class="c-emerald-str">'application/json'</span>,
    <span class="c-emerald-str">'x-api-key'</span>: process.env.API_KEY
  },
  body: JSON.stringify({
    tracking_number: <span class="c-emerald-str">'YAL-789456'</span>,
    carrier: <span class="c-emerald-str">'yalidine'</span>
  })
})</pre>
          </div>
        </div>

      </aside>

    </div>
  </div>
</template>
<style scoped>

/* ─── Reset & Base ─────────────────────────────────────────────────────────── */
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

button {
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
}

/* ─── Custom Scrollbar ─────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0f0f11; }
::-webkit-scrollbar-thumb { background: #2a2a32; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #474755; }

/* ─── CSS Variables & Page Wrapper ────────────────────────────────────────── */
.page-wrapper {
  --bg:        #0f0f11;
  --surface:   #1a1a1f;
  --surface-code: #12121a;
  --surface-sidebar: #0d0d10;
  --surface-hover: #1f1f28;
  --border:    #2a2a32;
  --border-sub: rgba(42, 42, 50, 0.6);
  --indigo:    #6366f1;
  --indigo-dk: #4f46e5;
  --indigo-lt: #818cf8;
  --emerald:   #34d399;
  --amber:     #f59e0b;
  --red:       #f87171;
  --blue:      #60a5fa;
  --muted:     #71717a;
  --dim:       #52525b;
  --text:      #f4f4f5;
  --text-sub:  #a1a1aa;
  --text-faint: #71717a;

  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ─── Header ───────────────────────────────────────────────────────────────── */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 56px;
  border-bottom: 1px solid var(--border);
  background-color: rgba(15, 15, 17, 0.90);
  backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 1580px;
  margin: 0 auto;
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}


/* Brand */
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.3);
  flex-shrink: 0;
}

.brand-icon svg {
  width: 16px;
  height: 16px;
}

.brand-name {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #fff;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.brand-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #27272a;
  color: #a1a1aa;
  border: 1px solid #3f3f46;
  font-weight: 400;
}

.divider-vertical {
  width: 1px;
  height: 16px;
  background-color: var(--border);
}

/* Node Indicator */
.node-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #4ade80;
  background-color: rgba(4, 120, 87, 0.15);
  border: 1px solid rgba(4, 120, 87, 0.4);
  padding: 4px 10px;
  border-radius: 9999px;
  white-space: nowrap;
}

.node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4ade80;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Header Right */
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.icon-btn{
  display: flex;
  align-items: center;
  color: white;
}

/* Search */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: var(--dim);
  display: flex;
  align-items: center;
}

.search-icon svg { width: 14px; height: 14px; }

.search-input {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 32px 6px 32px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: #d4d4d8;
  width: 260px;
  transition: border-color 0.15s;
  outline: none;
}

.search-input::placeholder { color: var(--dim); }
.search-input:focus { border-color: var(--indigo); }

.search-kbd {
  position: absolute;
  right: 8px;
  font-size: 10px;
  background-color: var(--border);
  color: #a1a1aa;
  padding: 1px 4px;
  border-radius: 3px;
  font-family: 'JetBrains Mono', monospace;
}

.header-link {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: #a1a1aa;
  transition: color 0.15s;
  white-space: nowrap;
}

.header-link:hover { color: #fff; }

.btn-dashboard {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: var(--indigo);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 6px;
  transition: background-color 0.15s;
  white-space: nowrap;
}

.btn-dashboard:hover { background-color: var(--indigo-dk); }
.btn-dashboard svg { width: 12px; height: 12px; }

/* Burger */
.burger {
  display: none;
  padding: 6px;
  color: #a1a1aa;
}

.burger-icon { font-size: 22px; }

/* Mobile Nav */
.mobile-nav {
  display: none;
  flex-direction: column;
  border-top: 1px solid var(--border);
  background-color: var(--surface-sidebar);
  padding: 8px 16px 16px;
  gap: 2px;
}

.mobile-nav--open { display: flex; }

.mobile-nav-link {
  display: block;
  font-size: 13px;
  color: var(--text-sub);
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: color 0.15s;
}

.mobile-nav-link:hover { color: var(--text); }
.mobile-nav-link--accent { color: var(--indigo); border-bottom: none; }

/* ─── Layout ───────────────────────────────────────────────────────────────── */
.layout {
  max-width: 1580px;
  margin: 0 auto;
  display: flex;
  width: 100%;
}

/* ─── Left Sidebar ─────────────────────────────────────────────────────────── */
.sidebar-left {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  border-right: 1px solid var(--border);
  background-color: var(--surface-sidebar);
  padding: 24px 12px;
  font-size: 12px;
  user-select: none;
}

.nav-group { margin-bottom: 24px; }

.nav-group-label {
  padding: 0 12px;
  margin-bottom: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--text-faint);
  transition: background-color 0.15s, color 0.15s;
  margin-bottom: 2px;
  border-left: 3px solid transparent;
  font-size: 12px;
}

.nav-item:hover {
  background-color: var(--surface-hover);
  color: #e4e4e7;
}

.nav-item--active {
  border-left-color: var(--indigo);
  background-color: var(--surface-hover);
  color: #fff;
  font-weight: 500;
}

.nav-item--mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
}

.nav-item-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-badge {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 500;
  flex-shrink: 0;
}

.nav-badge--indigo { background-color: rgba(99, 102, 241, 0.15); color: #818cf8; }
.nav-badge--blue   { background-color: rgba(59, 130, 246, 0.15); color: #93c5fd; }
.nav-badge--amber  { background-color: rgba(245, 158, 11, 0.15); color: #fcd34d; }

.sidebar-footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  padding-left: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
}

.sidebar-footer-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #d4d4d8;
  margin-bottom: 4px;
}

.sidebar-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4ade80;
  flex-shrink: 0;
}

.sidebar-footer-meta { color: var(--muted); }

/* ─── Main Content ─────────────────────────────────────────────────────────── */
.content {
  flex: 1;
  min-width: 0;
  max-width: 720px;
  padding: 40px 48px;
}

/* ─── Section Blocks ───────────────────────────────────────────────────────── */
.section-block {
  margin-bottom: 64px;
  scroll-margin-top: 80px;
}

.section-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--indigo-lt);
  margin-bottom: 8px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 20px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 3px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
}

.tag--indigo {
  background-color: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.5);
}

.tag--zinc {
  background-color: #27272a;
  color: #d4d4d8;
  border: 1px solid #3f3f46;
}

.tag--emerald {
  background-color: rgba(4, 120, 87, 0.2);
  color: #4ade80;
  border: 1px solid rgba(4, 120, 87, 0.5);
}

/* ─── Info Card (Quick Start) ──────────────────────────────────────────────── */
.info-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
}

.info-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--indigo);
  flex-shrink: 0;
}

.info-card-body {
  font-size: 14px;
  color: #a1a1aa;
  line-height: 1.7;
  margin-bottom: 16px;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-item {
  background-color: var(--surface-code);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
}

.stat-value {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
}

.stat-value--indigo { color: var(--indigo-lt); }
.stat-value--emerald { color: #4ade80; }
.stat-value--white { color: #fff; }

.stat-label {
  font-size: 10px;
  color: var(--dim);
}

/* ─── Section Divider ──────────────────────────────────────────────────────── */
.section-divider {
  border-top: 1px solid var(--border);
  padding-top: 32px;
  margin-bottom: 24px;
}

.section-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--indigo-lt);
  margin-bottom: 4px;
}

.section-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 15px;
  color: var(--muted);
  margin-top: 6px;
}

/* ─── Subsection ───────────────────────────────────────────────────────────── */
.subsection {
  margin-bottom: 40px;
  scroll-margin-top: 80px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 8px;
}

.subsection-body {
  font-size: 15px;
  color: var(--text-sub);
  line-height: 1.7;
  margin-bottom: 20px;
}

/* ─── Text Utilities ───────────────────────────────────────────────────────── */
.text-bright { color: #e4e4e7; }
.text-indigo { color: var(--indigo-lt); }

.c-indigo    { color: #a5b4fc; }
.c-emerald   { color: #4ade80; }
.c-emerald-str { color: #86efac; }
.c-amber     { color: #fcd34d; }
.c-amber-strong { color: #fbbf24; }
.c-red       { color: #f87171; }
.c-blue      { color: #93c5fd; }
.c-muted     { color: var(--muted); }
.c-dim       { color: var(--dim); }
.c-bright    { color: #fff; }

.mono { font-family: 'JetBrains Mono', monospace; }

/* ─── Inline Code ──────────────────────────────────────────────────────────── */
.inline-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #a5b4fc;
  background-color: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 1px 6px;
  border-radius: 4px;
}

/* ─── Step List ────────────────────────────────────────────────────────────── */
.step-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: border-color 0.15s;
}

.step-item:hover {
  border-color: rgba(99, 102, 241, 0.4);
}

.step-number {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #818cf8;
  font-size: 11px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-text {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.6;
}

/* ─── Callouts ─────────────────────────────────────────────────────────────── */
.callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 8px;
}

.callout--indigo {
  background-color: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.callout--amber {
  background-color: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.callout-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.callout-icon svg {
  width: 100%;
  height: 100%;
}

.callout-icon--indigo { color: #818cf8; }
.callout-icon--amber  { color: #fbbf24; }

.callout-text {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.65;
}

.callout-text--amber {
  color: #d4d4d8;
}

/* ─── Code Blocks ──────────────────────────────────────────────────────────── */
.code-block {
  background-color: var(--surface-code);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-cdween;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  background-color: rgba(255, 255, 255, 0.02);
}

.code-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.code-dot--red    { background-color: #ef4444; }
.code-dot--yellow { background-color: #eab308; }
.code-dot--green  { background-color: #22c55e; }

.code-block-label {
  font-size: 11px;
  color: var(--muted);
  margin-left: 4px;
}

.code-body {
  padding: 14px 16px;
  line-height: 1.8;
  color: #d4d4d8;
  font-size: 12px;
}

.code-body--comment {
  color: var(--muted);
}

.code-body--scroll {
  overflow-x: auto;
  white-space: nowrap;
}

/* ─── Copy Button ──────────────────────────────────────────────────────────── */
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--muted);
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background-color: transparent;
  transition: color 0.15s, border-color 0.15s, background-color 0.15s;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
}

.copy-btn:hover {
  color: #e4e4e7;
  border-color: #52525b;
  background-color: var(--surface-hover);
}

.copy-btn svg {
  width: 12px;
  height: 12px;
}

.copied-text {
  color: #4ade80;
}

/* ─── Response Pre ─────────────────────────────────────────────────────────── */
.response-pre {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.8;
  white-space: pre;
  overflow-x: auto;
  color: #d4d4d8;
}

/* ─── Tables ───────────────────────────────────────────────────────────────── */
.table-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 8px;
  margin-top: 20px;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.data-table thead {
  background-color: rgba(255, 255, 255, 0.03);
}

.data-table th {
  padding: 10px 14px;
  text-align: left;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.data-table td {
  padding: 10px 14px;
  color: var(--text-sub);
  border-bottom: 1px solid var(--border-sub);
  vertical-align: top;
  line-height: 1.5;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr {
  transition: background-color 0.12s;
}

.data-table tbody tr:hover {
  background-color: var(--surface-hover);
}

/* ─── Endpoint Header ──────────────────────────────────────────────────────── */
.endpoint-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
  padding: 14px 16px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.endpoint-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.endpoint-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #e4e4e7;
  letter-spacing: -0.01em;
}

.endpoint-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  flex-shrink: 0;
}

.endpoint-tag--emerald {
  background-color: rgba(4, 120, 87, 0.2);
  color: #4ade80;
  border: 1px solid rgba(4, 120, 87, 0.4);
}

.endpoint-tag--blue {
  background-color: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.35);
}

.endpoint-tag--amber {
  background-color: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.35);
}

/* ─── Method Badges ────────────────────────────────────────────────────────── */
.method-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  flex-shrink: 0;
}

.method-badge--post {
  background-color: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.method-badge--purple {
  background-color: rgba(168, 85, 247, 0.15);
  color: #c4b5fd;
  border: 1px solid rgba(168, 85, 247, 0.4);
}

/* ─── Mode Grid ────────────────────────────────────────────────────────────── */
.mode-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.mode-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  scroll-margin-top: 80px;
  transition: border-color 0.2s;
}

.mode-card:hover {
  border-color: #3f3f46;
}

.mode-card--featured {
  border-color: rgba(99, 102, 241, 0.4);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.06) 0%,
    var(--surface) 100%
  );
}

.mode-card--featured:hover {
  border-color: rgba(99, 102, 241, 0.65);
}

.mode-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.mode-icon svg {
  width: 20px;
  height: 20px;
}

.mode-icon--zinc {
  background-color: #27272a;
  color: #a1a1aa;
}

.mode-icon--indigo {
  background-color: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.mode-title {
  font-size: 14px;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 8px;
}

.mode-body {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 14px;
}

.mode-badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}

.mode-badge--zinc {
  background-color: #27272a;
  color: #a1a1aa;
  border: 1px solid #3f3f46;
}

.mode-badge--indigo {
  background-color: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

/* ─── Tabs ─────────────────────────────────────────────────────────────────── */
.tabs-section {
  margin-bottom: 32px;
}

.tabs-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 12px;
}

.tabs-header {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.tab-btn {
  padding: 8px 16px;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: -1px;
  border-radius: 0;
}

.tab-btn:hover {
  color: #d4d4d8;
}

.tab-btn--active {
  color: #fff;
  border-bottom-color: var(--indigo);
}

.tab-content {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tab-intro {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.65;
  margin-bottom: 14px;
}

/* ─── Pipeline Section ─────────────────────────────────────────────────────── */
.pipeline-section {
  margin-bottom: 24px;
}

.pipeline-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
}

.pipeline-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: max-content;
}

.pipeline-node {
  background-color: var(--surface-code);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  min-width: 140px;
  transition: border-color 0.15s;
}

.pipeline-node:hover {
  border-color: #52525b;
}

.pipeline-node--indigo {
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.07);
}

.pipeline-node--emerald {
  border-color: rgba(4, 120, 87, 0.4);
  background: rgba(4, 120, 87, 0.07);
}

.pipeline-node-label {
  font-size: 11px;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 4px;
  white-space: nowrap;
}

.pipeline-node-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--muted);
  white-space: nowrap;
}

.pipeline-arrow {
  font-size: 18px;
  color: var(--dim);
  flex-shrink: 0;
  padding: 0 2px;
}

/* ─── Cheatsheet Card ──────────────────────────────────────────────────────── */
.cheatsheet-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.cheatsheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background-color: rgba(255, 255, 255, 0.02);
  font-size: 12px;
  font-weight: 600;
  color: #d4d4d8;
}

.cheatsheet-base {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  font-weight: 400;
}

/* ─── Bottom Grid ──────────────────────────────────────────────────────────── */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.bottom-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.bottom-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #e4e4e7;
  margin-bottom: 8px;
}

.bottom-card-body {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 14px;
}

.bottom-card-link {
  font-size: 12px;
  color: var(--indigo-lt);
  transition: color 0.15s;
}

.bottom-card-link:hover {
  color: #fff;
}

/* ─── Changelog ────────────────────────────────────────────────────────────── */
.changelog {
  font-size: 13px;
}

.changelog-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.changelog-version {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #4ade80;
  font-weight: 600;
}

.changelog-date {
  font-size: 11px;
  color: var(--muted);
}

.changelog-text {
  font-size: 12px;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-sub);
}

.changelog-row--muted {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--muted);
}

/* ─── Right Sidebar: Code Panel ────────────────────────────────────────────── */
.sidebar-right {
  width: 380px;
  flex-shrink: 0;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  border-left: 1px solid var(--border);
  background-color: var(--surface-sidebar);
  padding: 20px 16px;
}

.code-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.code-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #d4d4d8;
}

.code-panel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4ade80;
  animation: pulse 2s ease-in-out infinite;
}

.code-panel-lang {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 4px;
}

/* ─── Responsive Breakpoints ───────────────────────────────────────────────── */

/* Large screens: hide burger, show search */
@media (min-width: 768px) {
  .burger { display: none; }


  
  
}

/* Medium screens: hide right sidebar */
@media (max-width: 1280px) {
  .sidebar-right { display: none; }
  .content { max-width: 100%; }
}

/* Small-medium: hide left sidebar */
@media (max-width: 900px) {
  .sidebar-left { display: none; }
  .content { padding: 28px 24px; }
}

/* Mobile */
@media (max-width: 768px) {
  .header { height: auto; }
  .icon-btn{
    display: none;
  }
  .mobilenav-icon{
    display: flex;
    align-items: center;
    color: white;
    cursor:pointer;
  }

  
  .node-indicator { display: none; }
  
  .search-wrap { display: none; }
  
  .header-link { display: none; }
  
  .btn-dashboard { display: none; }
  
  .burger { display: flex; }
  
  .content {
    padding: 20px 16px;
  }

  .stat-grid {
    grid-template-columns: 1fr;
  }

  .mode-grid {
    grid-template-columns: 1fr;
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .page-title { font-size: 1.5rem; }

  .pipeline-flow {
    flex-direction: column;
    align-items: stretch;
    min-width: unset;
  }

  .pipeline-arrow {
    transform: rotate(90deg);
    text-align: center;
  }

  .pipeline-node {
    min-width: unset;
    width: 100%;
  }

  .endpoint-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cheatsheet-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Extra small */
@media (max-width: 480px) {
  .brand-name { font-size: 0.8rem; }
  .content { padding: 16px 12px; }
  .section-title { font-size: 1.2rem; }
}
</style>