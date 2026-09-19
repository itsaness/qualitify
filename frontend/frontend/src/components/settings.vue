 <script setup>
import { ref, computed,onMounted,watch } from 'vue'
import { authClient } from '@/auth.js'

/* ── Auth ─────────────────────────────────────────────────────── */
let session = authClient.useSession()
let profilePicture = computed(() => session.value?.data?.user?.image)

let handleSignout = async () => {
  try {
    const { error } = await authClient.signOut()
    if (error) return
  } catch (err) {
    console.error(err.message)
  }
}

/* ── Credentials ─────────────────────────────────────────────────────── */
let metaCredentials = ref({})
let credentials = ref({});
let getCredentials = async(provider)=>{
  if(!provider){
    return;
  }
  try{
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/accessCredentials/${provider}`,{
      method:"GET",
      credentials:"include"
    });
    if(!response.ok){
      return;
    }
    if(provider=="Meta"){
      metaCredentials.value=await response.json();
    }else{
      credentials.value=await response.json();
    }
  }catch(err){
    console.error(err.message);
  }
}
onMounted(()=>{
  getCredentials("Meta");
});

/* ── Meta Config ──────────────────────────────────────────────── */
const pixelId = computed(()=>metaCredentials.value?.meta_pixel_id);
const metaToken = computed(()=>metaCredentials.value?.meta_access_token);
const metaTokenVisible = ref(false)
const metaSaved = ref(false)

function toggleMetaToken() {
  metaTokenVisible.value = !metaTokenVisible.value
}

async function saveMetaConfig() {
  let options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      provider:"Meta",
      credentials:{
         meta_pixel_id:pixelId.value,
      meta_access_token:metaToken.value
      }
    })
  };
  try{
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credentials`,options);
    if(!response.ok){
      return;
    }
    metaSaved.value = true
  setTimeout(() => { metaSaved.value = false }, 2000)
  }catch(err){
    console.error(err.message);
  }
}

/* ── API Key ──────────────────────────────────────────────────── */
const apiKeyDisplay = ref('s2s_live_••••••••••••••••••••')
const apiKeyCopied = ref(false)
const fullApiKey = ref('');

function copyApiKey() {
  navigator.clipboard.writeText(fullApiKey.value).then(() => {
    apiKeyCopied.value = true
    setTimeout(() => { apiKeyCopied.value = false }, 2000)
  })
}

async function  regenerateApiKey() {
  if (confirm('Regenerate API credential? This will immediately invalidate existing webhook senders.')) {
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/key`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    if(!response.ok){
      return;
    }
    let data = await response.json();
    fullApiKey.value=data.apiKey;
    apiKeyCopied.value = false;
  }
}

/* ── Express Integration ──────────────────────────────────────── */
const selectedCarrier = ref('Yalidine');
const webhookSecret = computed(()=>credentials.value?.webhook_secret);

let webhookURL = computed(()=>{
  let token = credentials.value?.webhook_token;
  let carrier = selectedCarrier.value.toLowerCase();
  return token ? `${import.meta.env.VITE_API_BASE_URL}/webhook/${carrier}/${token}`:""
});

const webhookSecretVisible = ref(false)
const expressTokenVisible = ref(false);
const expressSaved = ref(false)

function toggleExpressToken() {
  expressTokenVisible.value = !expressTokenVisible.value
}
function toggleWebhookSecret() {
  webhookSecretVisible.value = !webhookSecretVisible.value
}

async function createWebhookToken(){
  let options={
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      provider:selectedCarrier.value
    })
  }
  try{
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/webhooktoken`,options);
    if(!response.ok){
      return;
    }
    let data = await response.json();
     webhookURL.value = `${import.meta.env.VITE_API_BASE_URL}/api/webhook/yalidine/${data.webhook_token}`;
  }catch(err){
    console.error(err.message);
  }
}

async function saveExpressConfig() {
   let options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      provider:selectedCarrier.value,
      credentials:{
         webhook_secret:webhookSecret.value,
      }
    })
  };
   
  try{
    if(selectedCarrier.value=="Yalidine"){
       let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credentials`,options);
    if(!response.ok){
      return;
    }
    }
    if(!credentials.value.webhook_token){
     await createWebhookToken(); 
    }
    
    await getCredentials(selectedCarrier.value);
     expressSaved.value = true;
     setTimeout(() => { expressSaved.value = false }, 2000);
    }catch(err){
      console.error(err.message);
    }
  }

/* ── JS Snippet ───────────────────────────────────────────────── */
const snippetCopied = ref(false)
const snippet = `<script src="https://cdn.s2stracker.io/v1/events.js" data-pixel="849204918204912" async><\/script>`

function copySnippet() {
  navigator.clipboard.writeText(snippet).then(() => {
    snippetCopied.value = true
    setTimeout(() => { snippetCopied.value = false }, 2000)
  })
}

watch(selectedCarrier,(newVal)=>{
  credentials.value={isConfigured:false};
  getCredentials(newVal);
},{immediate:true});
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
  <div class="settings-root">

    <!-- ── Header ─────────────────────────────────────────────── -->
    <header class="app-header">
      <div class="header-inner">
        <div class="header-left">
          <div class="brand">
           <a href="#" class="logo-link">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <span class="logo-text">{{ $t('settingsPage.header.brand') }}</span>
          </a>
          </div>
          <nav class="desktop-nav">
            <router-link to="/dashboard" class="nav-link" active-class="nav-link--active">{{ $t('settingsPage.header.navDashboard') }}</router-link>
            <router-link to="/settings"  class="nav-link" active-class="nav-link--active">{{ $t('settingsPage.header.navSettings') }}</router-link>
          </nav>
        </div>
        <div class="header-right">
          <div class="navlogin">
                      <button @click="switchLanguage()" class="icon-btn"> <Globe :size="18"/> </button>

            <button v-if="!session.data" class="nav-link" @click="$router.push('/login')">{{ $t('settingsPage.header.signIn') }}</button>
            <button v-else class="nav-link" @click="handleSignout()">{{ $t('settingsPage.header.signOut') }}</button>
          </div>
          <img
            v-if="profilePicture"
            :src="profilePicture"
            :alt="$t('settingsPage.header.profileAlt')"
            class="avatar"
          />
        </div>
      </div>
    </header>

    <!-- ── Main ───────────────────────────────────────────────── -->
    <main class="settings-main">
      <div class="settings-container">

        <!-- Page title -->
        <div class="page-header">
          <div class="page-eyebrow">
            <span>{{ $t('settingsPage.pageHeader.eyebrowSystem') }}</span>
            <span>/</span>
            <span class="eyebrow-accent">{{ $t('settingsPage.pageHeader.eyebrowConfig') }}</span>
          </div>
          <h1 class="page-title">{{ $t('settingsPage.pageHeader.title') }}</h1>
          <p class="page-subtitle">{{ $t('settingsPage.pageHeader.subtitle') }}</p>
        </div>

        <!-- Sections -->
        <div class="sections-stack">

          <!-- ── Meta Configuration ────────────────────────── -->
          <section class="card">
            <div class="card-header">
              <div class="card-header-left">
                <h2 class="card-title">{{ $t('settingsPage.metaCard.title') }}</h2>
                <span class="card-subtitle">{{ $t('settingsPage.metaCard.subtitle') }}</span>
              </div>
              <span class="badge badge--ready">{{ $t('settingsPage.metaCard.badge') }}</span>
            </div>

            <form class="form-stack" @submit.prevent="saveMetaConfig">
              <!-- Pixel ID -->
              <div class="field">
                <label class="field-label" for="meta-pixel-id">{{ $t('settingsPage.metaCard.pixelIdLabel') }}</label>
                <div class="input-wrap">
                  <input
                    id="meta-pixel-id"
                    v-model="pixelId"
                    class="field-input"
                    type="text"
                    :placeholder="$t('settingsPage.metaCard.pixelIdPlaceholder')"
                  />
                  <span class="input-suffix">{{ $t('settingsPage.metaCard.suffixId') }}</span>
                </div>
              </div>

              <!-- Access Token -->
              <div class="field">
                <div class="field-label-row">
                  <label class="field-label" for="meta-access-token">{{ $t('settingsPage.metaCard.tokenLabel') }}</label>
                  <button class="reveal-btn" type="button" @click="toggleMetaToken">
                    <span class="material-symbols-outlined icon-14">
                      {{ metaTokenVisible ? 'visibility_off' : 'visibility' }}
                    </span>
                    <span>{{ metaTokenVisible ? $t('settingsPage.metaCard.hide') : $t('settingsPage.metaCard.reveal') }}</span>
                  </button>
                </div>
                <div class="input-wrap">
                  <input
                    id="meta-access-token"
                    v-model="metaToken"
                    class="field-input field-input--mono"
                    :type="metaTokenVisible ? 'text' : 'password'"
                  />
                </div>
                <p class="field-hint">
                  {{ $t('settingsPage.metaCard.tokenHint1') }}
                  <code class="inline-code">ads_management</code>
                  {{ $t('settingsPage.metaCard.tokenHint2') }}
                </p>
              </div>

              <!-- Save -->
              <div class="form-footer">
                <button
                  class="btn-primary"
                  :class="{ 'btn-primary--saved': metaSaved }"
                  type="submit"
                >
                  <span v-if="metaSaved" class="material-symbols-outlined icon-16">check</span>
                  <span>{{ metaSaved ? $t('settingsPage.metaCard.saved') : $t('settingsPage.metaCard.saveBtn') }}</span>
                </button>
              </div>
            </form>
          </section>

          <!-- ── API Key ───────────────────────────────────── -->
          <section class="card">
            <div class="card-header">
              <div class="card-header-left">
                <h2 class="card-title">{{ $t('settingsPage.apiCard.title') }}</h2>
                <span class="card-subtitle">{{ $t('settingsPage.apiCard.subtitle') }}</span>
              </div>
              <span class="badge badge--prod">{{ $t('settingsPage.apiCard.badge') }}</span>
            </div>

            <div class="form-stack">
              <!-- Key display row -->
              <div class="apikey-row">
                <div class="apikey-display">
                  <span class="material-symbols-outlined icon-18 text-outline">key</span>
                  <span class="apikey-text">{{ apiKeyDisplay }}</span>
                </div>
                <div class="apikey-actions">
                  <button class="btn-secondary" type="button" @click="copyApiKey">
                    <span class="material-symbols-outlined icon-16">content_copy</span>
                    <span>{{ apiKeyCopied ? $t('settingsPage.apiCard.copied') : $t('settingsPage.apiCard.copyBtn') }}</span>
                  </button>
                  <button class="btn-danger" type="button" @click="regenerateApiKey">
                    <span class="material-symbols-outlined icon-16">refresh</span>
                    <span>{{ $t('settingsPage.apiCard.regenerateBtn') }}</span>
                  </button>
                </div>
              </div>

              <!-- Warning -->
              <div class="info-row">
                <span class="material-symbols-outlined icon-16 text-error">info</span>
                <span>{{ $t('settingsPage.apiCard.warning') }}</span>
              </div>
            </div>
          </section>

          <!-- ── Express Integration ───────────────────────── -->
          <section class="card card--bordered">
            <div class="card-header card-header--bordered">
              <div class="card-header-left">
                <h2 class="card-title">{{ $t('settingsPage.expressCard.title') }}</h2>
                <span class="card-subtitle">{{ $t('settingsPage.expressCard.subtitle') }}</span>
              </div>
              <span class="badge badge--connected">{{ $t('settingsPage.expressCard.badge') }}</span>
            </div>

            <form class="form-stack" @submit.prevent="saveExpressConfig">
              <!-- Carrier select -->
              <div class="field">
                <label class="field-label field-label--mono" for="carrier-select">{{ $t('settingsPage.expressCard.carrierLabel') }}</label>
                <div class="select-wrap">
                  <select id="carrier-select" v-model="selectedCarrier" class="field-select">
                    <option value="Yalidine">Yalidine</option>
                    <option value="Maystro">Maystro</option>
                    <option value="Ayor">Ayor</option>
                  </select>
                  <span class="material-symbols-outlined select-arrow">expand_more</span>
                </div>
              </div>

              <!-- Auto fields -->
              <div>
                <!-- Webhook Secret -->
                <div class="field" v-if="selectedCarrier=='Yalidine'">
                  <div class="field-label-row">
                    <label class="field-label" for="webhook-secret">{{ $t('settingsPage.expressCard.webhookSecretLabel') }}</label>
                    <button class="reveal-btn" type="button" @click="toggleWebhookSecret">
                      <span class="material-symbols-outlined icon-14">
                        {{ webhookSecretVisible ? 'visibility_off' : 'visibility' }}
                      </span>
                      <span>{{ webhookSecretVisible ? $t('settingsPage.expressCard.hide') : $t('settingsPage.expressCard.reveal') }}</span>
                    </button>
                  </div>
                  <div class="input-wrap">
                    <input
                      id="webhook-secret"
                      v-model="webhookSecret"
                      class="field-input field-input--mono field-input--bordered"
                      :type="webhookSecretVisible ? 'text' : 'password'"
                    />
                  </div>
                </div>

                <!-- Webhook URL -->
                <div class="field">
                  <div class="field-label-row">
                    <label class="field-label" for="webhook-url">{{ $t('settingsPage.expressCard.webhookUrlLabel') }}</label>
                  </div>
                  <div class="input-wrap">
                    <input
                      id="webhook-url"
                      v-model="webhookURL"
                      class="field-input field-input--mono field-input--bordered"
                      :disabled="true"
                    />
                  </div>
                  <p class="field-hint">{{ $t('settingsPage.expressCard.urlHint') }}</p>
                </div>
              </div>

              <!-- Save -->
              <div class="form-footer">
                <button
                  class="btn-primary"
                  :class="{ 'btn-primary--saved': expressSaved }"
                  type="submit"
                >
                  <span v-if="expressSaved" class="material-symbols-outlined icon-16">check</span>
                  <span>{{ expressSaved ? $t('settingsPage.expressCard.saved') : $t('settingsPage.expressCard.saveBtn') }}</span>
                </button>
              </div>
            </form>
          </section>

        

        </div>
      </div>
    </main>

    <!-- ── Footer ─────────────────────────────────────────────── -->
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-left">
        </div>
        <div class="footer-copy">{{ $t('settingsPage.footer.copy') }}</div>
      </div>
    </footer>

    <!-- ── Mobile Bottom Nav ───────────────────────────────────── -->
    <nav class="mobile-nav" aria-label="Main navigation">
      <div class="mobile-nav-inner">
        <router-link to="/dashboard" class="mobile-nav-item" active-class="mobile-nav-item--active">
          <span class="material-symbols-outlined mobile-nav-icon">monitoring</span>
          <span class="mobile-nav-label">{{ $t('settingsPage.header.navDashboard') }}</span>
        </router-link>
        <router-link to="/settings" class="mobile-nav-item" active-class="mobile-nav-item--active">
          <span class="material-symbols-outlined mobile-nav-icon">settings_suggest</span>
          <span class="mobile-nav-label">{{ $t('settingsPage.header.navSettings') }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>

/* ─── Layout shell ────────────────────────────────────────────────── */

.settings-root {

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

  background-color: rgba(17, 19, 24, 0.90);

  backdrop-filter: blur(14px);

  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid rgba(65, 71, 84, 0.35);

}

.icon-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}


.header-inner {

  height: var(--header-h);

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 var(--sp-md);

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


.nav-link {

  font-size: 12px;

  font-weight: 500;

  letter-spacing: 0.01em;

  line-height: 16px;

  padding: var(--sp-xs) var(--sp-sm);

  border-radius: 0.25rem;

  color: var(--color-on-surface-variant);

  background: none;

  border: none;

  cursor: pointer;

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


.navlogin { display: flex; align-items: center; }


.avatar {

  width: 32px;

  height: 32px;

  border-radius: 50%;

  object-fit: cover;

  border: 1px solid rgba(65, 71, 84, 0.40);

  flex-shrink: 0;

}


/* ─── Main ────────────────────────────────────────────────────────── */

.settings-main {

  flex: 1;

  width: 100%;

  padding-top: var(--header-h);

  padding-bottom: calc(var(--nav-h) + var(--sp-xl));

}


.settings-container {

  width: 100%;

  max-width: 880px;

  margin: 0 auto;

  padding: var(--sp-xl) var(--sp-md);

  display: flex;

  flex-direction: column;

  gap: var(--sp-xl);

}


/* ─── Page header ─────────────────────────────────────────────────── */

.page-header {

  display: flex;

  flex-direction: column;

  gap: var(--sp-xs);

}


.page-eyebrow {

  display: flex;

  align-items: center;

  gap: var(--sp-xs);

  font-family: var(--font-mono);

  font-size: 11px;

  line-height: 16px;

  color: var(--color-outline);

  text-transform: uppercase;

  letter-spacing: 0.08em;

}


.eyebrow-accent { color: var(--color-primary); }


.page-title {

  font-size: 24px;

  font-weight: 600;

  letter-spacing: -0.015em;

  line-height: 32px;

  color: var(--color-on-surface);

}


.page-subtitle {

  font-size: 14px;

  line-height: 20px;

  color: var(--color-on-surface-variant);

}


/* ─── Sections stack ──────────────────────────────────────────────── */

.sections-stack {

  display: flex;

  flex-direction: column;

  gap: var(--sp-lg);

}


/* ─── Card ────────────────────────────────────────────────────────── */

.card {

  background-color: var(--color-surface-container-low);

  border-radius: 0.75rem;

  padding: var(--sp-lg);

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.20);

}


.card--bordered {

  border: 1px solid rgba(65, 71, 84, 0.30);

}


/* ─── Card header ─────────────────────────────────────────────────── */

.card-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: var(--sp-sm);

  padding-bottom: var(--sp-md);

  margin-bottom: var(--sp-md);

}


.card-header--bordered {

  border-bottom: 1px solid rgba(65, 71, 84, 0.20);

}


.card-header-left {

  display: flex;

  flex-direction: column;

  gap: 2px;

}


.card-title {

  font-size: 16px;

  font-weight: 600;

  letter-spacing: -0.005em;

  line-height: 22px;

  color: var(--color-on-surface);

}


.card-subtitle {

  font-size: 13px;

  line-height: 18px;

  color: var(--color-outline);

}


/* ─── Badges ──────────────────────────────────────────────────────── */

.badge {

  padding: 2px var(--sp-sm);

  border-radius: 0.125rem;

  font-family: var(--font-mono);

  font-size: 11px;

  line-height: 16px;

  white-space: nowrap;

  flex-shrink: 0;

}


.badge--ready {

  background-color: rgba(74, 225, 118, 0.10);

  color: var(--color-tertiary);

}


.badge--prod {

  background-color: var(--color-surface-container);

  color: var(--color-on-surface-variant);

}


.badge--connected {

  background-color: rgba(34, 197, 94, 0.10);

  color: #22c55e;

  border: 1px solid rgba(34, 197, 94, 0.30);

}


/* ─── Form stack ──────────────────────────────────────────────────── */

.form-stack {

  display: flex;

  flex-direction: column;

  gap: var(--sp-md);

}


/* ─── Field ───────────────────────────────────────────────────────── */

.field {

  display: flex;

  flex-direction: column;

  gap: var(--sp-xs);

}


.field-label {

  font-size: 12px;

  font-weight: 500;

  letter-spacing: 0.01em;

  line-height: 16px;

  color: var(--color-on-surface-variant);

}


.field-label--mono {

  font-family: var(--font-mono);

  font-size: 11px;

  text-transform: uppercase;

  letter-spacing: 0.08em;

  color: #9ca3af;

}


.field-label-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

}


.field-hint {

  font-size: 11px;

  line-height: 14px;

  letter-spacing: 0.02em;

  color: var(--color-outline);

}


/* ─── Input ───────────────────────────────────────────────────────── */

.input-wrap {

  position: relative;

  display: flex;

  align-items: center;

}


.field-input {

  width: 100%;

  height: 40px;

  padding: 0 var(--sp-md);

  background-color: var(--color-surface-container-lowest);

  color: var(--color-on-surface);

  font-size: 13px;

  line-height: 18px;

  border-radius: 0.75rem;

  border: none;

  outline: none;

  transition: background-color 0.15s;

}


.field-input:focus {

  background-color: var(--color-surface-container-high);

}


.field-input--mono {

  font-family: var(--font-mono);

  letter-spacing: 0.04em;

}


.field-input--bordered {

  border: 1px solid rgba(65, 71, 84, 0.40);

}


.input-suffix {

  position: absolute;

  right: var(--sp-md);

  font-family: var(--font-mono);

  font-size: 11px;

  line-height: 16px;

  color: var(--color-outline);

  user-select: none;

  pointer-events: none;

}


/* ─── Select ──────────────────────────────────────────────────────── */

.select-wrap {

  position: relative;

}


.field-select {

  width: 100%;

  height: 40px;

  padding: 0 var(--sp-md);

  padding-right: 2.5rem;

  background-color: var(--color-surface-container-lowest);

  color: var(--color-on-surface);

  font-family: var(--font-mono);

  font-size: 13px;

  border-radius: 0.75rem;

  border: 1px solid rgba(65, 71, 84, 0.40);

  outline: none;

  appearance: none;

  cursor: pointer;

  transition: border-color 0.15s;

}


.field-select:focus {

  border-color: var(--color-primary);

}


.select-arrow {

  position: absolute;

  right: var(--sp-sm);

  top: 50%;

  transform: translateY(-50%);

  font-size: 20px;

  color: var(--color-outline);

  pointer-events: none;

}


/* ─── Mode toggle ─────────────────────────────────────────────────── */

.mode-toggle {

  display: flex;

  align-items: center;

  gap: var(--sp-sm);

}


.mode-btn {

  padding: 6px 16px;

  border-radius: 0.5rem;

  font-size: 12px;

  font-weight: 500;

  cursor: pointer;

  border: none;

  background-color: #27272a;

  color: #9ca3af;

  transition: background-color 0.15s, color 0.15s;

}


.mode-btn:hover:not(.mode-btn--active) {

  color: var(--color-on-surface);

}


.mode-btn--active {

  background-color: var(--color-primary-container);

  color: var(--color-on-primary-container);

}


/* ─── Reveal button ───────────────────────────────────────────────── */

.reveal-btn {

  display: inline-flex;

  align-items: center;

  gap: 4px;

  font-size: 11px;

  font-weight: 500;

  color: var(--color-primary);

  background: none;

  border: none;

  cursor: pointer;

  transition: color 0.15s;

}


.reveal-btn:hover { color: var(--color-primary-fixed-dim, #a9c7ff); }


/* ─── Form footer ─────────────────────────────────────────────────── */

.form-footer {

  display: flex;

  align-items: center;

  justify-content: flex-end;

  padding-top: var(--sp-xs);

}


/* ─── Primary button ──────────────────────────────────────────────── */

.btn-primary {

  display: inline-flex;

  align-items: center;

  gap: var(--sp-xs);

  height: 36px;

  padding: 0 var(--sp-lg);

  border-radius: 0.75rem;

  background-color: var(--color-primary-container);

  color: var(--color-on-primary-container);

  font-size: 12px;

  font-weight: 500;

  letter-spacing: 0.01em;

  border: none;

  cursor: pointer;

  transition: background-color 0.15s, transform 0.1s;

}


.btn-primary:hover { background-color: rgba(60, 144, 255, 0.85); }

.btn-primary:active { transform: scale(0.98); }


.btn-primary--saved {

  background-color: var(--color-tertiary);

  color: var(--color-on-tertiary, #003915);

}


/* ─── Secondary button ────────────────────────────────────────────── */

.btn-secondary {

  display: inline-flex;

  align-items: center;

  gap: var(--sp-xs);

  height: 36px;

  padding: 0 var(--sp-md);

  border-radius: 0.75rem;

  background-color: var(--color-surface-container);

  color: var(--color-on-surface);

  font-size: 12px;

  font-weight: 500;

  border: none;

  cursor: pointer;

  transition: background-color 0.15s, transform 0.1s;

  white-space: nowrap;

}


.btn-secondary:hover { background-color: var(--color-surface-variant); }

.btn-secondary:active { transform: scale(0.98); }


.btn-secondary--sm { height: 32px; }


/* ─── Danger button ───────────────────────────────────────────────── */

.btn-danger {

  display: inline-flex;

  align-items: center;

  gap: var(--sp-xs);

  height: 36px;

  padding: 0 var(--sp-md);

  border-radius: 0.75rem;

  background-color: rgba(255, 180, 171, 0.10);

  color: var(--color-error);

  font-size: 12px;

  font-weight: 500;

  border: none;

  cursor: pointer;

  transition: background-color 0.15s, transform 0.1s;

  white-space: nowrap;

}


.btn-danger:hover { background-color: rgba(255, 180, 171, 0.20); }

.btn-danger:active { transform: scale(0.98); }


/* ─── API Key row ─────────────────────────────────────────────────── */

.apikey-row {

  display: flex;

  flex-direction: column;

  align-items: stretch;

  gap: var(--sp-md);

  padding: var(--sp-md);

  background-color: var(--color-surface-container-lowest);

  border-radius: 0.75rem;

}


.apikey-display {

  display: flex;

  align-items: center;

  gap: var(--sp-sm);

  overflow: hidden;

}


.apikey-text {

  font-family: var(--font-mono);

  font-size: 13px;

  letter-spacing: 0.06em;

  color: var(--color-on-surface);

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  user-select: all;

}


.apikey-actions {

  display: flex;

  align-items: center;

  gap: var(--sp-sm);

  flex-shrink: 0;

}


/* ─── Info row ────────────────────────────────────────────────────── */

.info-row {

  display: flex;

  align-items: flex-start;

  gap: var(--sp-sm);

  font-size: 11px;

  line-height: 14px;

  letter-spacing: 0.02em;

  color: var(--color-outline);

}


/* ─── Manual info ─────────────────────────────────────────────────── */

.manual-info {

  display: flex;

  align-items: center;

  gap: var(--sp-sm);

  font-family: var(--font-mono);

  font-size: 12px;

  color: #9ca3af;

  background-color: rgba(17, 19, 24, 0.50);

  padding: var(--sp-sm) var(--sp-md);

  border-radius: 0.75rem;

  border: 1px solid rgba(65, 71, 84, 0.40);

}


/* ─── Snippet ─────────────────────────────────────────────────────── */

.snippet-stack {

  display: flex;

  flex-direction: column;

  gap: var(--sp-sm);

}


.snippet-block {

  background-color: var(--color-surface-container-lowest);

  border-radius: 0.75rem;

  padding: var(--sp-md);

  overflow-x: auto;

  -webkit-overflow-scrolling: touch;

}


.snippet-pre {

  font-family: var(--font-mono);

  font-size: 13px;

  line-height: 1.6;

  white-space: pre;

  margin: 0;

}


/* Snippet syntax colours */

.s-outline  { color: var(--color-outline); }

.s-primary  { color: var(--color-primary); }

.s-variant  { color: var(--color-on-surface-variant); }

.s-tertiary { color: var(--color-tertiary); }

.s-container{ color: var(--color-primary-container); }


/* ─── Inline code ─────────────────────────────────────────────────── */

.inline-code {

  font-family: var(--font-mono);

  font-size: 11px;

  color: var(--color-on-surface-variant);

}


/* ─── Icon helpers ────────────────────────────────────────────────── */

.icon-14 { font-size: 14px; line-height: 1; }

.icon-15 { font-size: 15px; line-height: 1; }

.icon-16 { font-size: 16px; line-height: 1; }

.icon-18 { font-size: 18px; line-height: 1; }

.text-outline { color: var(--color-outline); }

.text-error   { color: var(--color-error); }

.text-primary { color: var(--color-primary); }


/* ─── Status bar ──────────────────────────────────────────────────── */

.status-bar {

  display: flex;

  align-items: center;

  justify-content: space-between;

  flex-wrap: wrap;

  gap: var(--sp-sm);

  padding: var(--sp-md);

  border-radius: 0.75rem;

  background-color: var(--color-surface-container-lowest);

  font-size: 11px;

  line-height: 14px;

  letter-spacing: 0.02em;

  font-weight: 500;

  color: var(--color-outline);

}


.status-bar-left {

  display: flex;

  align-items: center;

  gap: var(--sp-sm);

}


.status-dot {

  width: 8px;

  height: 8px;

  border-radius: 50%;

  background-color: var(--color-tertiary);

  flex-shrink: 0;

}


.status-bar-right {

  display: flex;

  align-items: center;

  gap: var(--sp-md);

}


/* ─── Footer ──────────────────────────────────────────────────────── */

.app-footer {

  width: 100%;

  background-color: var(--color-surface-container-lowest);

  border-top: 1px solid rgba(65, 71, 84, 0.30);

  padding: var(--sp-lg) 0;

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


.footer-node { font-family: var(--font-mono); font-size: 11px; color: var(--color-outline); }

.footer-sep  { color: var(--color-outline); }

.footer-copy { color: var(--color-outline); }


/* ─── Mobile bottom nav ───────────────────────────────────────────── */

.mobile-nav {

  position: fixed;

  bottom: 0; left: 0; right: 0;

  z-index: 50;

  background-color: rgba(17, 19, 24, 0.92);

  backdrop-filter: blur(16px);

  -webkit-backdrop-filter: blur(16px);

  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.50);

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

.mobile-nav-item--active .mobile-nav-icon { transform: scale(1.1); }


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


/* ══════════════════════════════════════════════════════════════════

   MEDIA QUERIES — mobile-first, ascending

══════════════════════════════════════════════════════════════════ */


/* 480px */

@media (min-width: 480px) {

  .apikey-row {

    flex-direction: row;

    align-items: center;

    justify-content: space-between;

  }

}


/* 640px */

@media (min-width: 640px) {

  .settings-container { padding: var(--sp-xl) var(--sp-lg); }

  .page-title { font-size: 28px; }

}


/* 768px */

@media (min-width: 768px) {

  .desktop-nav  { display: flex; align-items: center; gap: var(--sp-md); }

  .mobile-nav   { display: none; }


  .header-inner { padding: 0 var(--sp-lg); }

  .brand-logo   { height: 32px; }


  .settings-main  { padding-bottom: var(--sp-xl); }


  .app-footer { padding-bottom: var(--sp-lg); }


  .footer-inner {

    padding: 0 var(--sp-lg);

    flex-direction: row;

    justify-content: space-between;

  }


  .page-title { font-size: 32px; }

}


/* 1024px */

@media (min-width: 1024px) {

  .header-inner       { padding: 0 var(--sp-xl); }

  .settings-container { padding: var(--sp-xl) var(--sp-xl); }

  .page-title         { font-size: 36px; }

  .footer-inner       { padding: 0 var(--sp-xl); }

}

</style> 