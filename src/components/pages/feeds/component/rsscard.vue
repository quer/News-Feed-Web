<template>
    <div class="col-md-2 nopadding" v-on:click="ToNews">
        <div class="newsItem">
            <div class="image" :style="'background-image: url(\'' + convertImage() + '\');'"></div>
            <div class="headline">{{ text }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Rsscard',
        props: ['text', 'image', 'convertImageValue', 'link'],
        data () {
            return {
                test:"test"
            }
        },
        methods: {
            convertImage: function () {
                if(this.convertImageValue == "1"){
                    return "http://stojier.dk/api/imageConverter.php?url=" + this.image;
                }
                else{
                    return this.image;
                }
            },
            ToNews: function() {
                window.open(this.link);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.col-md-2.nopadding{
    cursor: pointer;
}
</style>
