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

const routes = [];
routes.push({ name: 'home', path: '/', component: Home });
routes.push({ name: 'show', path: '/' + codePath, component: Show });
if (process.env.NODE_ENV !== 'production') {
    routes.push({name: 'showImage', path: `/image/${codePath }-:locale(en|pl)`, component: ShowImage});
}
routes.push({ name: 'privacy', path: '/privacy', component: Privacy });
routes.push({ path: '*', component: NotFound });

export default new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});
