import './assets/style.css';
import {router} from "../router/index.js";

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

import english from "../locale/en.js";
import arabic from "../locale/ar.js";

const i18n = createI18n({
     legacy:false,
     locale:localStorage.getItem("locale"),
     messages:{
        en:english,
        ar:arabic
     }

})
const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
