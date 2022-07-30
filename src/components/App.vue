<template>
    <div class="app d-flex flex-column">
        <main class="flex-grow-1 p-sm-4">
            <router-view/>
        </main>
        <Footer/>
    </div>
</template>

<script>
    import Footer from './Footer.vue';

    export default {
        components: { Footer },
    }
</script>

<style lang="scss">
    @import '../style';

    .app {
        min-height: 100vh;
    }

    img.emoji {
        height: 1em;
        > + img.emoji {
            margin-left: .1em;
        }
    }
</style>
