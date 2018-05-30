<template>
    <div class="roomListLogo" :class="active? 'active' : ''" v-on:click="chanceChannel()">
        <div class="roomListLogoInner" :style="'background-image: url(\'' +channel.icon + '\');'" :alt ="channel.name">
            <span class="badge badge-primary" v-if="channel.badge && channel.badge > 0">{{ channel.badge }}</span>
        </div>
        <i class="fa fa-spinner fa-spin spinnerCss" aria-hidden="true" v-if="channel.loading"></i>
    </div>
</template>

<script>
    import { EventBus, RrsData, BaseUrl, BaseFeedUrlTag } from '../fun/event-bus.js';
    import channelNavbar from '../channelNavbar.vue';
    export default {
        name: 'menucard',
        props: ['channel'], //['name', 'icon', 'rssFeedUrl', 'loopTag', 'decode', 'convertImage', 'childFeeds']
        data () {
            return {}
        },
        methods: {
            chanceChannel: function () {
                EventBus.$emit('route-chance', BaseFeedUrlTag + this.channel.name);
            }
        },
        computed: {
            active () {
                return this.$store.getters.channelActiveMainStatus(BaseFeedUrlTag + this.channel.name);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.spinnerCss {
    position: absolute;
    top: 13px;
    left: 12px;
    font-size: 46px;
    color: #848484;
}
.active{
    background-color: gray;
}
</style>
