<template>
    <div class="row">
        <rsscard v-for="(item, index) in rrsData" :key="index" :text="item.text" :image="item.image">
        </rsscard>
    </div>
</template>

<script>
    import { EventBus, XmlPaster } from '../../fun/event-bus.js';
    import rsscard from './rsscard.vue';
    export default {
        name: 'Channel',
        props: ['name', 'icon', 'rssFeedUrl', 'decode', 'loopTag'],
        data () {
            return {
                rrsData: []
            }
        },
        components: { rsscard },
        methods: {
            updateRrs: function () {
                this.$http.get("http://localhost/News-Feed/api/rrsfeed.php?link=" + encodeURIComponent(this.rssFeedUrl)).then(response => {
                    this.decodeRssData(response.bodyText);
                });
            },
            decodeRssData: function (urlData) {
                //console.info(urlData);
                var parser = new DOMParser();
                var xmlDom = parser.parseFromString(urlData, "text/xml");
                var loops = XmlPaster.GetElementsByTagNames(xmlDom, this.loopTag, 'loops');
                for (var i = 0; i < loops.length; i++) {
                    var loopItem = loops[i];
                    var title = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.decode.title.fieldValue, this.decode.title.attrTag, 'title');
                    var image = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.decode.image.fieldValue, this.decode.image.attrTag, 'image');
                    var link = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.decode.link.fieldValue, this.decode.link.attrTag, 'link');
                    var DateObj = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.decode.DateFiled.fieldValue, this.decode.DateFiled.attrTag, 'DateObj');

                    for (var i = 0; i < 18; i++) {
                        this.rrsData.push({
                            image: image,
                            text: title,
                            link: link,
                            DateObj: DateObj
                        })
                    }
                }
            }
        },
        mounted: function (){
            this.updateRrs()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
