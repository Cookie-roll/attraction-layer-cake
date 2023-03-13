<template>
    <footer class="border-top p-4 px-5 text-center d-md-flex justify-content-between bg-light">
        <div>
            {{ $t('footer.author') }}
            <a href="https://avris.it" target="_blank" rel="noopener" class="text-nowrap">Andrea Vos</a>
            {{ $t('footer.base') }}
            <a href="https://www.facebook.com/lunarudd33/posts/10208509451606031" target="_blank" rel="noopener" class="text-nowrap">💡 {{ $t('footer.diagram') }}</a> 😍
        </div>
        <div class="mt-3 mt-md-0">
            <router-link :to="{name: 'privacy'}" class="text-nowrap mx-2">
                🔒 {{ $t('privacy.header') }}
            </router-link>
            <a href="https://gitlab.com/Avris/Cake" target="_blank" rel="noopener" class="text-nowrap mx-2">
                👨🏽‍💻 {{ $t('footer.source') }}
            </a>
            <a href="https://paypal.me/AndreAvris" target="_blank" rel="noopener" class="text-nowrap mx-2">
                🍺 {{ $t('footer.donate') }}
            </a>
            <a href="https://spectrum.avris.it" target="_blank" rel="noopener" class="text-nowrap mx-2">
                <img src="https://spectrum.avris.it/favicon.png" class="emoji" alt=""/>
                {{ $t('otherProjects.spectrum') }}
            </a>
        </div>
    </footer>
</template>
