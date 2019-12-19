<template>
    <Layout>
        <template v-slot:side>
            <Cake :attraction="attraction" :relationship="relationship" :orientation="orientation"/>
            <Url :url="url" :code="code"/>
        </template>

        <template v-slot:col1>
            <ListSelect v-model="attraction" :options="attractionTypes" ref="col0"/>
        </template>

        <template v-slot:col2>
            <ListSelect v-model="relationship" :options="relationshipTypes" ref="col1"/>
        </template>

        <template v-slot:col3>
            <ListSelect v-model="orientation" :options="orientationTypes" ref="col2"/>
        </template>
    </Layout>
</template>

<script>
    import { attractionTypes, relationshipTypes, orientationTypes } from '../options';
    import Layout from './Layout.vue';
    import Cake from './Cake.vue';
    import ListSelect from './ListSelect.vue';
    import Url from './Url.vue';

    export default {
        components: { Layout, Cake, ListSelect, Url },
        data() {
            return {
                attraction: null,
                relationship: null,
                orientation: null,

                attractionTypes, relationshipTypes, orientationTypes,

                activeColumn: 0,
            }
        },
        mounted() {
            window.addEventListener('keydown', this.handleKey, false);
        },
        destroyed() {
            window.removeEventListener('keydown', this.handleKey, false);
        },
        methods: {
            clear() {
                this.attraction = null;
                this.relationship = null;
                this.orientation = null;
            },
            handleKey(e) {
                switch (e.key) {
                    case 'ArrowLeft':
                        this.activeColumn = Math.max(0, this.activeColumn - 1);
                        this.$refs['col' + this.activeColumn].focus();
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        this.activeColumn = Math.min(2, this.activeColumn + 1);
                        this.$refs['col' + this.activeColumn].focus();
                        e.preventDefault();
                        break;
                    case 'ArrowUp':
                        this.$refs['col' + this.activeColumn].move(-1);
                        e.preventDefault();
                        break;
                    case 'ArrowDown':
                        this.$refs['col' + this.activeColumn].move(1);
                        e.preventDefault();
                        break;
                }
            },
        },
        computed: {
            filled() {
                return this.attraction !== null
                    && this.relationship !== null
                    && this.orientation !== null;
            },
            code() {
                return `${this.attraction}${this.relationship}${this.orientation}`;
            },
            url() {
                return this.filled
                    ? `${baseUrl}/${this.code}`
                    : null;
            },
        },
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
