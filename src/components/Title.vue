<template>
    <h1 :class="classes">
        <router-link :to="{name: 'home'}" v-if="link">{{ $t('title') }}</router-link>
        <span v-else>{{ $t('title') }}</span>
        <LanguageSwitch/>
    </h1>
</template>

<script>
    import LanguageSwitch from './LanguageSwitch.vue';

    export default {
        components: { LanguageSwitch },
        props: {
            link: { type: Boolean },
            classes: { 'default': 'mb-3' },
        },
    }
</script>