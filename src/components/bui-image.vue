<template>
    <image v-bind:src="imagePath"
           v-bind:placeholder="placeholder"
           v-bind:style="{'border-radius':radius, 'width': width, 'height': height}"
           v-bind:resize="resize"
           @click="_click($event)"
           @load="_load()"></image>
</template>

<script>
    module.exports = {
        computed: {
            "imagePath": function () {
                if (this.src.indexOf("http") >= 0) {
                    return this.src;
                }
                var bundleUrl = weex.config.bundleUrl;
                var url = bundleUrl.split('/').slice(0, -1).join('/');
                if (bundleUrl.indexOf("weex.html") > 0) {
                    url += "/dist/";
                }
                return url + this.src;
            }
        },
        props: {
            width: {default: '0px'},
            height: {default: '0px'},
            src: {
                type: String
            },
            resize: {
                type: String,
                default: "stretch"
            },
            placeholder: {
                type: String
            },
            radius: {
                default: "0px"
            }
        },
        data: function(){
            return {
            }
        },
        methods: {
            "_click": function (event) {
                this.$emit('click',event);
            },
            "_load": function () {
                this.$emit('load');
            }
        }
    }
</script>
