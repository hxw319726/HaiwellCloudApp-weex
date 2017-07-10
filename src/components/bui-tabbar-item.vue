<template>
    <div :ref="tabId" style="flex: 1;">
        <slot></slot>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {}
        },
        watch: {},
        props: {
            tabId: {},
            currentTab: {}
        },
        methods: {}
    }
</script>
