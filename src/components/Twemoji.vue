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
                        this.$refs.target.innerHTML = twemoji.parse(this.$refs.source.innerHTML);
                    }
                }, 100); // TODO
            },
        },
    };
</script>
