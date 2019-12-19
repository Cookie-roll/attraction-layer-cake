<template>
    <div class="container">
        <Title link/>
        <Twemoji>
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
                <a href="mailto:andre@avris.it" target="_blank" rel="noopener">✉ andre@avris.it</a>
            </p>
            <p>
                <router-link :to="{name: 'home'}">
                    🏠 {{ $t('privacy.home') }}
                </router-link>
            </p>
        </Twemoji>
    </div>
</template>

<script>
    import Title from './Title.vue';

    export default {
        components: { Title },
    }
</script>
