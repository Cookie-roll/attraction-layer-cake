<template>
    <div class="container">
        <Title link/>
        <h2>
            🔒 {{ $t('privacy.header') }}
        </h2>
        <p>
            {{ $t('privacy.noData') }}
        </p>
        <p>
            {{ $t('privacy.tracking') }}
        </p>
        <p>
            {{ $t('privacy.contact') }}
            <a href="mailto:andrea@avris.it" target="_blank" rel="noopener">✉ andrea@avris.it</a>
        </p>
        <p>
            <router-link :to="{name: 'home'}">
                🏠 {{ $t('privacy.home') }}
            </router-link>
        </p>
    </div>
</template>

<script>
    import Title from './Title.vue';

    export default {
        components: { Title },
    }
</script>
