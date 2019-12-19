<template>
    <div class="flex-grow-1 p-4">
        <div class="row">
            <div class="col-12 d-xl-none">
                <Title :link="linkTitle"/>
            </div>
            <div class="col-12 col-sm-6 col-xl-3 offset-xl-0 sticky-top bg-white border-xs-bottom pb-3 h-100">
                <Title classes="mb-3 d-none d-xl-block" :link="linkTitle"/>
                <slot name="side"></slot>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
                <slot name="col1"></slot>
            </div>
            <div class="col-12 col-sm-6 offset-sm-6 col-xl-3 offset-xl-0">
                <slot name="col2"></slot>
            </div>
            <div class="col-12 col-sm-6 offset-sm-6 col-xl-3 offset-xl-0">
                <slot name="col3"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './Title.vue';

    export default {
        components: { Title },
        props: {
            linkTitle: { type: Boolean },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style';

    @media (max-width: #{map-get($grid-breakpoints, sm)}) {
        .border-xs-bottom {
            border-bottom: $border-width solid $border-color !important;
        }
    }
</style>
