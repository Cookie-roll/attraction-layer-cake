<template>
    <Layout linkTitle>
        <template v-slot:side>
            <Cake :attraction="attraction" :relationship="relationship" :orientation="orientation"/>
            <router-link :to="{name: 'home'}" class="btn btn-outline-primary btn-block btn-lg">
                <Twemoji>
                    ➕ {{ $t('show.own') }}
                </Twemoji>
            </router-link>
        </template>

        <template v-slot:col1>
            <ListSelect v-model="attraction" :options="attractionTypes" disabled/>
        </template>

        <template v-slot:col2>
            <ListSelect v-model="relationship" :options="relationshipTypes" disabled/>
        </template>

        <template v-slot:col3>
            <ListSelect v-model="orientation" :options="orientationTypes" disabled/>
        </template>
    </Layout>
</template>

<script>
    import { attractionTypes, relationshipTypes, orientationTypes } from '../options';
    import Layout from './Layout.vue';
    import Cake from './Cake.vue';
    import ListSelect from './ListSelect.vue';

    export default {
        components: { Layout, Cake, ListSelect },
        data() {
            return {
                attraction: this.$route.params.attraction,
                relationship: this.$route.params.relationship,
                orientation: this.$route.params.orientation,

                attractionTypes, relationshipTypes, orientationTypes
            }
        },
    }
</script>
