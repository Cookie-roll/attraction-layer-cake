<template>
    <div>
        <div v-if="url">
            <div class="input-group">
                <input v-model="url" readonly class="form-control" id="url">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary btn-copy" data-clipboard-target="#url" :title="$t('url.copy')">
                        📋
                    </button>
                </div>
            </div>

            <div class="btn-group btn-block mt-3">
                <a :href="`http://www.facebook.com/sharer.php?t=${encodeURIComponent($t('share.text', {code}))}&amp;u=${encodeURIComponent(url)}`"
                   target="_blank" rel="noopener"
                   class="btn btn-outline-secondary"
                >
                    {{ $t('share.facebook') }}
                </a>
                <a :href="`https://twitter.com/share?text=${encodeURIComponent($t('share.text', {code}))}&amp;url=${encodeURIComponent(url)}`"
                    target="_blank" rel="noopener"
                    class="btn btn-outline-secondary"
                >
                    {{ $t('share.twitter') }}
                </a>
            </div>
        </div>
        <p class="mb-0" v-else>
            {{ $t('url.empty') }}
        </p>
    </div>
</template>

<script>
    import ClipboardJS from 'clipboard';

    export default {
        props: {
            url: {required: true},
            code: {required: true},
        },
        mounted() {
            new ClipboardJS('.btn-copy');
        },
    }
</script>
