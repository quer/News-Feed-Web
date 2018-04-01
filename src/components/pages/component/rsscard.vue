<template>
    <div class="col-md-2 nopadding">
        <div class="newsItem">
            <div class="image" :style="'background-image: url(\'' + image+ '\');'"></div>
            <div class="headline">{{ text }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'rsscard',
        props: ['text', 'image'],
        data () {
            return {
                index: 0
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
