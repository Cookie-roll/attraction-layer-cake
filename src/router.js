import Home from './components/Home.vue';
import Show from './components/Show.vue';
import Privacy from './components/Privacy.vue';
import NotFound from './components/NotFound.vue';
import VueRouter from 'vue-router';
import { attractionTypes, relationshipTypes, orientationTypes } from './options';

const codePart = (options) => `[${options.types.map(o => o.code).join('')}]`;
const codePath = `/:attraction(${codePart(attractionTypes)}):relationship(${codePart(relationshipTypes)}):orientation(${codePart(orientationTypes)})`;

export default new VueRouter({
    routes: [
        { name: 'home', path: '/', component: Home },
        { name: 'show', path: codePath, component: Show },
        { name: 'privacy', path: '/privacy', component: Privacy },
        { path: '*', component: NotFound },
    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});
