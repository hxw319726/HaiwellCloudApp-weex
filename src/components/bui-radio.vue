<template>
    <div :class="[flexDirection]">
        <div class="radioBox flex-row" :class="[v.disabled ? 'disabled':'']" v-for="v in radioItem" @click="select(v)">
            <div class="bui-icon-box" v-if="v.select"><bui-icon @click="select(v)" name="icon-radio-on" color="#00cc66"></bui-icon></div>
            <div class="bui-icon-box" v-if="!v.select"><bui-icon @click="select(v)" name="icon-radio" color="#9ea7b4"></bui-icon></div>
            <text :class="['label']">{{v.title}}</text>
        </div>
    </div>


</template>
<style lang="sass" src="../css/radio.scss"></style>

<script>
    module.exports = {
        props: {
            "flexDirection": {
                type: String,
                default: 'flex-row'
            },
            "radioItems": {
                type: Object
            },
            "type": {
                default: 'default'
            }

        },
        data: function () {
            return {
                radioItem: ''
            }
        },
        methods: {
            //选择
            "select": function (v) {
                if(v.disabled) return;
                var self = this;
                self.radioItem.forEach(function (val, index) {
                    val.select = false;
                });

                v.select = true;
                console.log(v.select);
                this.$emit("change", v);
            }
        },
        created: function(){
            var data = JSON.parse(JSON.stringify(this.radioItems));
            this.radioItem = data;
        }
    }
</script>
