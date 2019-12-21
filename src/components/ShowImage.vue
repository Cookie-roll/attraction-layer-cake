<template>
    <div class="image-container pt-3 pb-3 mb-5">
        <div class="row">
            <div class="col-6 small d-flex flex-column justify-content-center">
                <p class="h4 my-3" v-html="$t('share.text.rich', {code: code})"></p>
                <hr/>
                <Cake :attraction="attraction" :relationship="relationship" :orientation="orientation"/>
            </div>
            <div class="col-6 small d-flex flex-column justify-content-center">
                <ListSelect v-model="attraction" :options="attractionTypes" disabled onlySelected/>
                <ListSelect v-model="relationship" :options="relationshipTypes" disabled onlySelected/>
                <ListSelect v-model="orientation" :options="orientationTypes" disabled onlySelected/>
                <p class="text-right mt-3">
                    <a href="https://cake.avris.it">
                        cake.avris.it
                    </a>
                </p>
            </div>
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

<style lang="scss">
    .image-container {
        width: 920px;
        margin: 0 auto;
    }
</style>