<template>
    <span>
        <span ref="source" v-show="false">
            <slot ref="source"></slot>
        </span>
        <span ref="target"></span>
    </span>
</template>

<script>
    import twemoji from 'twemoji';

    export default {
        mounted() {
            this.update();

            this.$eventHub.$on('update-twemoji', this.update);
        },
        methods: {
            update() {
                setTimeout(_ => {
                    if (this.$refs.source && this.$refs.target) {
                        this.$refs.target.innerHTML = twemoji.parse(this.$refs.source.innerHTML, {
                            // default was https://twemoji.maxcdn.com/v/14.0.2/ but it's down
                            base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/',
                        });
                    }
                }, 100); // TODO
            },
        },
    };
</script>
