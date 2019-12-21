import Home from './components/Home.vue';
import Show from './components/Show.vue';
import ShowImage from './components/ShowImage.vue';
import Privacy from './components/Privacy.vue';
import NotFound from './components/NotFound.vue';
import VueRouter from 'vue-router';
import { attractionTypes, relationshipTypes, orientationTypes } from './options';
import languages from './languages';

const codePart = (options) => `[${options.types.map(o => o.code).join('')}]`;
const codePath = `:attraction(${codePart(attractionTypes)}):relationship(${codePart(relationshipTypes)}):orientation(${codePart(orientationTypes)})`;
const localePath = `:locale(${Object.keys(languages).join('|')})`;

export default new VueRouter({
    routes: [
        { name: 'home', path: '/', component: Home },
        { name: 'show', path: '/' + codePath, component: Show },
        { name: 'showImage', path: `/image/${codePath }-:locale(en|pl)`, component: ShowImage },
        { name: 'privacy', path: '/privacy', component: Privacy },
        { path: '*', component: NotFound },
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});
