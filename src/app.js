import Vue from 'vue';
import App from './components/App.vue';
import Twemoji from './components/Twemoji.vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import router from './router';
import translationsFallback from './translations/en';
import VueMatomo from "vue-matomo";

Vue.config.productionTip = false;

class Session {
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const value = localStorage.getItem(key);

        return key === null ? null : JSON.parse(value);
    }

    static has(key) {
        return localStorage.getItem(key) !== null;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}

const languages = {
    en: { code: 'GB', name: 'English' },
};

const selectLanguage = (preferred, available) => {
    for (let p of preferred) {
        const pMain = p.substr(0, 2);
        if (available.includes(pMain)) {
            return pMain;
        }
    }

    return null;
};

const preferredLanguage = selectLanguage(
    window.navigator.languages || [],
    Object.keys(languages)
);
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: translationsFallback,
    },
});
Vue.prototype.$languages = languages;

const loadedLanguages = ['en'];

function loadLanguageAsync(lang) {
    if (i18n.locale === lang || loadedLanguages.includes(lang)) {
        i18n.locale = lang;
        return Promise.resolve(lang);
    }

    return import(/* webpackChunkName: "lang-[request]" */ `./translations/${lang}.js`).then(
        messages => {
            i18n.setLocaleMessage(lang, messages.default);
            i18n.locale = lang;
            loadedLanguages.push(lang);
            return lang;
        }
    )
}
Vue.prototype.$loadLanguage = loadLanguageAsync;

loadLanguageAsync(
    Session.get('language') || preferredLanguage || 'en'
).then(_ => {});

Vue.use(VueRouter);

if (process.env.NODE_ENV === 'production') {
    Vue.use(VueMatomo, {
        host: 'https://matomo.avris.it',
        siteId: 18,
        router: router,
    });
}

Vue.component('Twemoji', Twemoji);

const el = document.createElement('div');
document.body.appendChild(el);

new Vue({
    el: el,
    template: '<App/>',
    components: { App },
    i18n,
    render: h => h(App),
    router,
});
