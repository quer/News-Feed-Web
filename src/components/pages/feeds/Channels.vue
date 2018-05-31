<template>
    <div>
        <ChannelNavbar />
        <div class="row" v-if="rrsData != null">
            <rsscard v-for="(item, index) in rrsData" :key="index" :text="item.text" :image="item.image" :convertImageValue="convertImage" :link="item.link">
            </rsscard>
        </div>
        <div id="" v-else> 
            <i class="fa fa-spinner fa-spin spinnerCss" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    import { EventBus } from '../../fun/event-bus.js';
    import rsscard from './component/rsscard.vue';
    import ChannelNavbar from './component/ChannelNavbar.vue';
    export default {
        name: 'Channels',
        data () {
            return {
                test:"test"
            }
        },
        components: { rsscard, ChannelNavbar },
        computed: {
            rrsData () {
                return this.$store.getters.ActiveChannelFeed;
            },
            convertImage (){
                return this.$store.getters.ActiveChannelconvertImage;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
