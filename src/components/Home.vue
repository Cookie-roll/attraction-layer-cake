<template>
    <Layout>
        <template v-slot:side>
            <Cake :attraction="attraction" :relationship="relationship" :orientation="orientation"/>
            <Url :url="url"/>
        </template>

        <template v-slot:col1>
            <ListSelect v-model="attraction" :options="attractionTypes"/>
        </template>

        <template v-slot:col2>
            <ListSelect v-model="relationship" :options="relationshipTypes"/>
        </template>

        <template v-slot:col3>
            <ListSelect v-model="orientation" :options="orientationTypes"/>
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

                attractionTypes, relationshipTypes, orientationTypes
            }
        },
        methods: {
            clear() {
                this.attraction = null;
                this.relationship = null;
                this.orientation = null;
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
