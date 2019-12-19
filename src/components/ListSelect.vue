<template>
    <div>
        <h2 class="mt-3 mt-sm-0 mb-3">{{ $t(`${options.label}.label`) }}</h2>
        <div class="list-group" ref="list" tabindex="0">
            <a href :class="['list-group-item list-group-item-action', {active: v === o.code, disabled}]"
               v-for="o in options.types"
               @click.prevent="update(o.code)"
               ref="item"
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
                return this.emit(v === this.value ? null : v);
            },
            emit(v) {
                if (!this.disabled) {
                    this.$emit('input', v);
                }
            },
            move(diff) {
                const next = this.findIndex(this.v) + diff;
                return next < 0 || next >= this.options.types.length
                    ? this.emit(null)
                    : this.emit(this.options.types[next].code);
            },
            findIndex(v) {
                return this.options.types.findIndex(o => o.code === v);
            },
            focus() {
                this.$refs.list.focus();
            },
        },
        watch: {
            value(v) {
                this.v = v;
                if (v) {
                    this.$refs.item[this.findIndex(v)].focus();
                } else {
                    this.$refs.list.focus();
                }
            }
        },
    }
</script>
