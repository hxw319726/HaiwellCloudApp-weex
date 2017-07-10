<template>
    <div :class="[flexDirection]">
        <div class="radioBox flex-row" :class="[v.disabled ? 'disabled':'']" @click="select(v)" v-for="v in checkboxItem">
            <div v-if="v.select"><bui-icon @click="select(v)" name="icon-checkbox-on" color="#00cc66"></bui-icon></div>
            <div v-if="!v.select"><bui-icon @click="select(v)" name="icon-radio" color="#9ea7b4"></bui-icon></div>
            <text :class="['label']">{{v.title}}</text>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: {
            "flexDirection": {
                type: String
            },
            "checkboxItems": {
                type: Object
            },
            "type": {
                default: 'default'
            },

        },
        data: function () {
            return {
                "selectItems" : [],
                "checkboxItem": ""
            }
        },
        methods: {
            //选择
            "select": function (v) {
                console.log(v);
                var self = this;
                v.select = !v.select;

                //选择组数据
                var newAry = [];
                self.checkboxItem.forEach(function (val, i) {
                    if(val.select) newAry.push(val);
                });
                console.log(newAry);

                this.$emit("change", [v, newAry]);
            }
        },
        created: function () {
            var data = JSON.parse(JSON.stringify(this.checkboxItems));
            this.checkboxItem = data;
        }
    }
</script>
<style lang="sass" src="../css/radio.scss"></style>