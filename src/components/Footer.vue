<template>
    <footer class="border-top p-4 text-center d-md-flex justify-content-between bg-light">
        <div>
            <Twemoji>
                {{ $t('footer.author') }}
                <a href="https://avris.it" target="_blank" rel="noopener" class="text-nowrap">Avris 🇪🇺 🏳️‍🌈</a>
                {{ $t('footer.base') }}
                <a href="https://imgur.com/gallery/YAGLE" target="_blank" rel="noopener" class="text-nowrap">💡 {{ $t('footer.diagram') }}</a>.
            </Twemoji>
        </div>
        <div class="mt-3 mt-md-0">
            <Twemoji>
                <router-link :to="{name: 'privacy'}" class="text-nowrap mx-2">
                    🔒 {{ $t('privacy.header') }}
                </router-link>
                <a href="https://gitlab.com/Avris/Cake" target="_blank" rel="noopener" class="text-nowrap mx-2">
                    👨🏽‍💻 {{ $t('footer.source') }}
                </a>
                <a href="https://paypal.me/AndreAvris" target="_blank" rel="noopener" class="text-nowrap mx-2">
                    🍺 {{ $t('footer.donate') }}
                </a>
            </Twemoji>
        </div>
    </footer>
</template>
