<template>
    <div class="flex-grow-1 p-4">
        <div class="row">
            <div class="col-12 d-sm-none">
                <h1 class="mb-3">{{ $t('title') }}</h1>
            </div>
            <div class="col-12 col-md-6 col-xl-3 offset-xl-0 sticky-top bg-white border-xs-bottom pb-3">
                <h1 class="mb-3 d-none d-sm-block">
                    <router-link :to="{name: 'home'}" v-if="linkTitle">
                        {{ $t('title') }}
                    </router-link>
                    <span v-else>
                        {{ $t('title') }}
                    </span>
                </h1>
                <slot name="side"></slot>
            </div>
            <div class="col-12 col-md-6 col-xl-3">
                <slot name="col1"></slot>
            </div>
            <div class="col-12 col-md-6 offset-md-6 col-xl-3 offset-xl-0">
                <slot name="col2"></slot>
            </div>
            <div class="col-12 col-md-6 offset-md-6 col-xl-3 offset-xl-0">
                <slot name="col3"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
