<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="channelChildFeeds.length > 0">
            <a class="navbar-brand" v-on:click="chanceChannel()">{{ channelName }}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <subInstanceListComponet v-for="(child, index) in channelChildFeeds" :key="index" :name="child.name" :mainLink="channelName" :link="child.name" />
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import { EventBus, BaseFeedUrlTag } from '../../../fun/event-bus.js';
    import subInstanceListComponet from './ChannelNavbar/subChannelsMenu.vue';
    export default {
        name: 'ChannelNavbar',
        data () {
            return {
            }
        },
        components: { subInstanceListComponet },
        methods: {
            
            chanceChannel: function () {
                event.preventDefault();
                EventBus.$emit('route-chance', BaseFeedUrlTag + this.channelName);
            }
        },
        mounted: function () {  
        },
        computed: {
            channelName () {
                return this.$store.getters.ActiveMainChannelName;
            },
            channelChildFeeds () {
                return this.$store.getters.ActiveMainChannelChildFeeds;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
