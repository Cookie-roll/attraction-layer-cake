import Vue from 'vue';
import App from './components/App.vue';
import Twemoji from './components/Twemoji.vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import router from './router';
import translationsFallback from './translations/en';
import { VuePlausible } from 'vue-plausible'
import Session from './session';
import languages from './languages';

Vue.config.productionTip = false;

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
    Vue.use(VuePlausible, {
        domain: 'cake.avris.it',
        apiHost: 'https://plausible.avris.it',
    })
}

Vue.component('Twemoji', Twemoji);

Vue.prototype.$eventHub = new Vue();

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
