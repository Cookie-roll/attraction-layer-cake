<template>
    <div class="container">
        <Twemoji>
            <h1 class="mb-3">
                <router-link :to="{name: 'home'}">
                    {{ $t('title') }}
                </router-link>
            </h1>
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
    export default {
    }
</script>
