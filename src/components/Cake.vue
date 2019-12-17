<template>
    <svg class="w-100">
        <defs>
            <g id="box">
                <polygon points="0,1 2,0 4,1 2,2" style="fill: hsla(var(--box-h, 0), var(--box-s, 0%), calc(var(--box-l, 80%) + 10%), var(--box-a, 1)); stroke: black; stroke-width: 0.025; stroke-opacity: var(--box-a);"/>
                <polygon points="0,1 2,2 2,4 0,3" style="fill: hsla(var(--box-h, 0), var(--box-s, 0%), var(--box-l, 80%), var(--box-a, 1)); stroke: black; stroke-width: 0.025; stroke-opacity: var(--box-a);"/>
                <polygon points="4,1 2,2 2,4 4,3" style="fill: hsla(var(--box-h, 0), var(--box-s, 0%), calc(var(--box-l, 80%) - 10%), var(--box-a, 1)); stroke: black; stroke-width: 0.025; stroke-opacity: var(--box-a);"/>
            </g>
        </defs>

        <g>
            <!-- Invisible edges -->
            <line :x1="2" :y1="2" :x2="2" :y2="2 + lenA * -2" style="stroke: black; stroke-width: .1;" /> <!-- up -->
            <line :x1="2" :y1="2" :x2="2 + lenB * -2" :y2="2 + lenB" style="stroke: black; stroke-width: .1;" /> <!-- left -->
            <line :x1="2" :y1="2" :x2="2 + lenC * 2" :y2="2 + lenC" style="stroke: black; stroke-width: .1;" /> <!-- right -->
        </g>

        <template v-for="(attractionL, l) in attractionTypes.types">
            <template v-for="(relationshipL, i) in relationshipTypes.types">
                <template v-for="(orientationL, j) in orientationTypes.types">
                    <use xlink:href="#box"
                         :x="i * -2 + j * 2"
                         :y="l * -2 +  i * 1 + j * 1"
                         :style="`
                         --box-h: ${attractionL.colour.h};
                         --box-s: ${attractionL.colour.s}%;
                         --box-l: ${attractionL.colour.l}%;
                         --box-a: ${getBoxOpacity(attractionL.code, relationshipL.code, orientationL.code)};
                     `"
                    />
                </template>
            </template>
        </template>

        <g>
            <template v-for="(attractionL, l) in attractionTypes.types">
                <text :x="svgReachLeft - 5" :y="l * -2 + lenB + 1" font-size="1"
                      :class="{inactive: attraction !== null && attraction !== attractionL.code }">
                    {{ attractionL.label }}
                </text>
            </template>

            <template v-for="(relationshipL, i) in relationshipTypes.types">
                <text :x="i * -2 + 1" :y="lenA * -2 + i + 2" font-size="1" text-anchor="middle"
                      :class="{inactive: relationship !== null && relationship !== relationshipL.code }">
                    {{ relationshipL.code }}
                </text>
            </template>

            <template v-for="(orientationL, j) in orientationTypes.types">
                <text :x="j * 2 + 3" :y="j + -lenC - 3" font-size="1" text-anchor="middle"
                      :class="{inactive: orientation !== null && orientation !== orientationL.code }">
                    {{ orientationL.code }}
                </text>
            </template>
        </g>

        <g>
            <!-- left side -->
            <line :x1="2 + lenB * -2" :y1="2 + lenB - lenA * 2" :x2="2 + lenB * -2" :y2="2 + lenB" style="stroke: black; stroke-width: .1;" /> <!-- left -->
            <line :x1="2 + lenB * -2" :y1="2 + lenB - lenA * 2" :x2="2" :y2="2 + lenA * -2" style="stroke: black; stroke-width: .1;" /> <!-- top -->

            <!-- back side -->
            <line :x1="2 + lenC * 2" :y1="2 + lenC + lenA * -2" :x2="2" :y2="2 + lenA * -2" style="stroke: black; stroke-width: .1;" /> <!-- top -->
            <line :x1="2 + lenC * 2" :y1="2 + lenC + lenA * -2" :x2="2 + lenC * 2" :y2="2 + lenC" style="stroke: black; stroke-width: .1;" /> <!-- right -->

            <!-- bottom side -->
            <line :x1="2 + lenC * 2 + lenB * -2" :y1="2 + lenB + lenC" :x2="2 + lenB * -2" :y2="2 + lenB" style="stroke: black; stroke-width: .1;" /> <!-- left -->
            <line :x1="2 + lenC * 2 + lenB * -2" :y1="2 + lenB + lenC" :x2="2 + lenC * 2" :y2="2 + lenC" style="stroke: black; stroke-width: .1;" /> <!-- right -->

            <!-- bottom side -->
            <line :x1="2 + lenB * -2 + lenC * 2" :y1="2 + lenA * -2 + lenB * 1 + lenC * 1" :x2="2 + lenB * -2" :y2="2 + lenB - lenA * 2" style="stroke: black; stroke-width: .1;" /> <!-- left -->
            <line :x1="2 + lenB * -2 + lenC * 2" :y1="2 + lenA * -2 + lenB * 1 + lenC * 1" :x2="2 + lenC * 2 + lenB * -2" :y2="2 + lenB + lenC" style="stroke: black; stroke-width: .1;" /> <!-- bottom -->
            <line :x1="2 + lenB * -2 + lenC * 2" :y1="2 + lenA * -2 + lenB * 1 + lenC * 1" :x2="2 + lenC * 2" :y2="2 + lenC + lenA * -2" style="stroke: black; stroke-width: .1;" /> <!-- right -->
        </g>
    </svg>
</template>

<script>
    import { attractionTypes, relationshipTypes, orientationTypes } from '../options';

    export default {
        props: {
            attraction: {},
            relationship: {},
            orientation: {},
            animate: { type: Boolean },
        },
        data() {
            return {
                attractionTypes, relationshipTypes, orientationTypes,
                sequence: 0,
            }
        },
        mounted() {
            this.$el.setAttribute('viewBox', this.viewBox);
            if (this.animate) {
                setInterval(_ => {
                    this.sequence = (this.sequence + 1) % 4;
                }, 1000);
            }
        },
        methods: {
            isSelected(attraction, relationship, orientation) {
                return (this.attraction === null || this.attraction === attraction)
                    && (this.relationship === null || this.relationship === relationship)
                    && (this.orientation === null || this.orientation === orientation);
            },
            selectedPlanes(attraction, relationship, orientation) {
                const planes = [];

                if (attraction && this.attraction === attraction) {
                    planes.push(1);
                }

                if (relationship && this.relationship === relationship) {
                    planes.push(2);
                }

                if (orientation && this.orientation === orientation) {
                    planes.push(3);
                }

                return planes;
            },
            getBoxOpacity(attraction, relationship, orientation) {
                if (this.isSelected(attraction, relationship, orientation)) {
                    return 1;
                }

                const planes = this.selectedPlanes(attraction, relationship, orientation);
                if (planes.includes(this.sequence)) {
                    return 1;
                }

                return 0.05;
            },
        },
        computed: {
            viewBox() {
                const x = this.svgReachLeft - 5.5;
                const y = this.svgReachTop - 1.5;
                return `${x} ${y} ${this.svgReachRight - x + 0.5} ${this.svgReachBottom - y + 1}`;
            },
            lenA() {
                return this.attractionTypes.types.length;
            },
            lenB() {
                return this.relationshipTypes.types.length;
            },
            lenC() {
                return this.orientationTypes.types.length;
            },
            svgReachLeft() {
                return (this.lenB - 1) * -2;
            },
            svgReachTop() {
                return (this.lenA - 1) * -2;
            },
            svgReachRight() {
                return (this.lenC - 1) * 2 + 4;
            },
            svgReachBottom() {
                return Math.max(this.lenB, this.lenC) * 2;
            },
        },
    }
</script>

<style lang="scss" scoped>
    text.inactive {
        opacity: .3;
    }
</style>
