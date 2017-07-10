<template>
    <div :class="['flex-row', 'row-center-left', 'bui-searchbar', 'bui-search-bg-'+type]" @click="onfocusFn()">
        <div :class="['flex-row', 'row-center-left', 'span1', 'bui-input']">
            <div class="flex-row center" :class="[!searchstatus ? 'span1':'']">
                <bui-icon v-if="!deletestatus" :name="'icon-search'" @click="onfocusFn()"></bui-icon>
                <text class="bui-search-icon-box-text" v-if="!searchstatus">搜索</text>
            </div>
            <input class="span1 bui-search-input-text" v-if="searchstatus" @focus="onfocus($event)" @blur="onblur($event)" @input="oninput($event)" :value="value" :autofocus="autofocus" type="text" :placeholder="placeholder"/>
            <bui-icon class="bui-search-icon-delete" @click="clear()" v-if="deletestatus" :name="'icon-delete-little'"></bui-icon>
        </div>
        <text :class="['bui-search-search', 'bui-search-text-color-'+type]" @click="search()" v-if="searchstatus">搜索</text>
    </div>
</template>

<style lang="sass" src="../css/layout.scss"></style>
<style lang="sass" src="../css/searchbar.scss"></style>

<script>
    module.exports = {
        props: {
            "type": {
                type: String,
                default: 'default'
            },
            "placeholder": {
                type: String,
                default: "请输入用户名"
            },
            "deletestatus": {
                type: Boolean,
                default: false
            },
            "searchstatus": {
                type: Boolean,
                default: false
            },
            "value": {
                type: String,
                default: ""
            },
            "autofocus": {
                type: Boolean,
                default: false
            }
        },
        methods: {
            //搜索框触发输入焦点
            "onfocusFn": function () {
                this.searchstatus = true;
                this.autofocus = true;
            },
            //搜索获得输入焦点
            "onfocus": function (event) {
                console.log(event);
                this.$emit("focus", event);
            },
            //搜索失去输入焦点
            "onblur": function (event) {
                console.log("blur");
                this.value = "";
                this.searchstatus = false;
                this.deletestatus = false;
                this.autofocus = false;
                this.$emit('blur', event);

            },
            //搜索输入值更改
            "oninput": function (event) {
                this.value = event.value;
                this.deletestatus = true;
                this.$emit('input', event);
            },
            //清除搜索输入值
            "clear": function () {
                console.log("clear");
                this.value = "";
                this.deletestatus = false;
                console.log('value:' +this.value);
                this.autofocus = true;
                this.$emit('clear');
            },
//            //取消搜索
//            "cancel": function () {
//                this.value = "";
//                this.cancelstatus = false;
//                this.deletestatus = false;
//                this.autofocus = false;
//            },
            //搜索
            "search": function () {
                console.log(this.value);
                this.$emit("search",this.value);
            }

        }
    }
</script>