<template>
    <div>
        <div class="row" v-for="(n, index) in Math.floor(rrsData.length / 6)">
            <div class="col-md-2 nopadding" v-for="item in rrsData.slice((index * 6) ,(index * 6) +6)">
                <div class="newsItem">
                    <div class="image" :style="'background-image: url(\'' + item.image+ '\');'"></div>
                    <div class="headline">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../fun/event-bus.js';
    export default {
        name: 'Channel',
        data () {
            return {
                rssFeedUrl: null,
                decode: null,
                rrsData: []
            }
        },
        methods: {
            loadChannelInfo: function () {
                if(this.rssFeedUrl == null && this.decode == null){
                    console.log("load");
                    this.$http.get('http://localhost/News-Feed/api/channel.php?name='+ this.$route.path).then(response => {
                        this.rssFeedUrl = response.data.rssFeedUrl;
                        this.decode = response.data.decode;
                        this.updateRrs();
                    });
                }
                else{
                    this.updateRrs();
                }
            },
            updateRrs: function () {
                console.log(this.rssFeedUrl);
                /*this.$http.get(this.rssFeedUrl).then(response => {
                    this.decodeUrlData(response.data);
                });*/
                this.decodeRssData();
            },
            decodeRssData: function (urlData) {
                for (var i = 0; i < 18; i++) {
                    this.rrsData.push({
                        image: 'http://imbo2.tv2.dk/users/editorial/images/fc04f0ed-a087-47ad-ac13-7b9ffdab0c28.jpg?t%5b%5d=tv2cropping:width=960,height=540&accessToken=28df2e554cef35de88133d9ef7c8dd83590b897f526e58a11ddd5ee123eaaec2',
                        text: i+' - '+ this.$route.path +' Afhøringen af vidner i retssagen mod Peter Madsen fortsatte tirsdag i Københavns Byret.'
                        +'Og for første gang var de vidner, som forsvaret har indkaldt, på listen. Et af forsvarets vidner er Peter Mad...'
                    })
                }
                EventBus.$emit('updateNrOnChannel', this.$route.path, 18);
            }
        },
        mounted: function (){
            this.loadChannelInfo()
        },
        beforeMount: function () {
            console.log(this.$route.path);
        },
        watch: {
            '$route' (to, from) {
                console.log(to, this.$route.path);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#content {
    position: relative;
    .newsItem {
        position: relative;
        width: 100%;
        height: 400px;
        background: #e1ebf7; /* Old browsers */
        background: -moz-linear-gradient(45deg, #e1ebf7 0%, #ffffff 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(45deg, #e1ebf7 0%,#ffffff 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(45deg, #e1ebf7 0%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e1ebf7', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        .image {
            width: 100%;
            height: 150px;
            background-position: center center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
        .headline {
            width: 100%;
            height: 250px;
            padding: 10px;
            color: #000; 
            word-wrap: break-word;
            font-family: 'Raleway',sans-serif; 
            font-size: 22px; 
            font-weight: 800;  
            margin: 0 0 24px; 
            text-align: center; 
            text-transform: uppercase;
        }
    }
    .row {
        margin: 0px; 
        padding: 0px;
        .nopadding {
            padding: 0 !important;
            margin: 0 !important;
        }
    }
}
</style>
