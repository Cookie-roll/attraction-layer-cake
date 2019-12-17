<template>
    <div>
        <div v-if="url" class="input-group">
            <input v-model="url" readonly class="form-control" id="url">
            <div class="input-group-append">
                <button class="btn btn-primary btn-copy" data-clipboard-target="#url" :title="$t('url.copy')">
                    <Twemoji>📋</Twemoji>
                </button>
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
        },
        mounted() {
            new ClipboardJS('.btn-copy');
        },
    }
</script>
