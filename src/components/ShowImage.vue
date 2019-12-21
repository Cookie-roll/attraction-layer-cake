<template>
    <div class="row">
        <div class="col-6 small">
            <h1 class="my-3">
                {{ $t('title') }}
            </h1>
            <p class="h4 my-3" v-html="$t('share.text.rich', {code: code})"></p>
            <hr/>
            <Cake :attraction="attraction" :relationship="relationship" :orientation="orientation"/>
        </div>
        <div class="col-6 small">
            <ListSelect v-model="attraction" :options="attractionTypes" disabled onlySelected/>
            <ListSelect v-model="relationship" :options="relationshipTypes" disabled onlySelected/>
            <ListSelect v-model="orientation" :options="orientationTypes" disabled onlySelected/>
        </div>
    </div>
</template>

<script>
    import { attractionTypes, relationshipTypes, orientationTypes } from '../options';
    import Cake from './Cake.vue';
    import ListSelect from './ListSelect.vue';

    export default {
        components: { Cake, ListSelect },
        data() {
            return {
                attraction: this.$route.params.attraction,
                relationship: this.$route.params.relationship,
                orientation: this.$route.params.orientation,

                attractionTypes, relationshipTypes, orientationTypes
            }
        },
        mounted() {
            this.$loadLanguage(this.$route.params.locale);
        },
        computed: {
            code() {
                return `${this.attraction}${this.relationship}${this.orientation}`;
            },
        },
    }
</script>
