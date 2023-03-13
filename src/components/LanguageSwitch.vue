<template>
    <div :class="['dropdown', classes]">
        <a :class="['btn', buttonClasses, 'dropdown-toggle']">
            <Flag :code="$languages[$i18n.locale].code"/>
            {{ $languages[$i18n.locale].name }}
        </a>
        <div class="dropdown-menu shadow">
            <a class="dropdown-item" href="#" @click.prevent="setLanguage(key)" v-for="(language, key) in $languages">
                <Flag :code="language.code"/>
                {{ language.name }}
            </a>
        </div>
    </div>
</template>

<script>
    import Flag from './Flag.vue';
    import Session from '../session';

    export default {
        components: { Flag, },
        props: {
            classes: {'default': ''},
            buttonClasses: {'default': 'btn-outline-secondary'},
        },
        methods: {
            setLanguage(key) {
                this.$loadLanguage(key).then(_ => {
                    Session.set('language', key);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        z-index: 1030;
        margin-top: 0;
    }

    .dropdown:hover .dropdown-menu {
        display: block;
    }
</style>
