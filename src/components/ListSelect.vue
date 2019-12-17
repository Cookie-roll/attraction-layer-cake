<template>
    <div>
        <h2 class="mt-3 mt-sm-0 mb-3">{{ $t(`${options.label}.label`) }}</h2>
        <div class="list-group">
            <a href :class="['list-group-item list-group-item-action', {active: v === o.code, disabled}]"
               v-for="o in options.types"
               @click.prevent="update(o.code)"
            >
                <h3 class="h5 font-weight-bold">
                    {{ o.label || o.code }} – {{ $t(`${options.label}.${o.code}.name`) }}
                </h3>
                <p class="mb-0">
                    {{ $t(`${options.label}.${o.code}.description`) }}
                </p>
            </a>
        </div>
    </div>
</template>

<script>
    import { attractionTypes, relationshipTypes, orientationTypes } from '../options';

    export default {
        props: {
            value: {required: true},
            options: {required: true},
            disabled: {type: Boolean},
        },
        data() {
            return {
                v: this.value,
            };
        },
        methods: {
            update(v) {
                if (!this.disabled) {
                    this.$emit('input', v === this.value ? null : v);
                }
            },
        },
        watch: {
            value(v) {
                this.v = v;
            }
        },
    }
</script>
