<template>
    <div class="row">
        <rsscard v-for="(item, index) in rrsData" :key="index" :text="item.text" :image="item.image">
        </rsscard>
    </div>
</template>

<script>
    import { EventBus } from '../../fun/event-bus.js';
    import rsscard from './rsscard.vue';
    export default {
        name: 'Channel',
        props: ['name', 'icon', 'rssFeedUrl', 'decode'],
        data () {
            return {
                rrsData: []
            }
        },
        components: { rsscard },
        methods: {
            updateRrs: function () {
                console.log(this.rssFeedUrl);
                this.$http.get(this.rssFeedUrl).then(response => {
                    this.decodeRssData(response.bodyText);
                });
            },
            decodeRssData: function (urlData) {
                //console.info(urlData);
                for (var i = 0; i < 18; i++) {
                    this.rrsData.push({
                        image: 'http://imbo2.tv2.dk/users/editorial/images/fc04f0ed-a087-47ad-ac13-7b9ffdab0c28.jpg?t%5b%5d=tv2cropping:width=960,height=540&accessToken=28df2e554cef35de88133d9ef7c8dd83590b897f526e58a11ddd5ee123eaaec2',
                        text: i+' - '+ this.name +' Afhøringen af vidner i retssagen mod Peter Madsen fortsatte tirsdag i Københavns Byret.'
                        +'Og for første gang var de vidner, som forsvaret har indkaldt, på listen. Et af forsvarets vidner er Peter Mad...'
                    })
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
