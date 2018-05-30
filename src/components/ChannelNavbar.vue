<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="instanceList.length > 1">
            <a class="navbar-brand" href="#">{{ channel.name }}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <subInstanceListComponet v-for="(instance, index) in instanceList" :key="index" :name="instance.name" :mainLink="channel.name" :link="instance.name" />
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import { EventBus, BaseFeedUrlTag } from './fun/event-bus.js';
    import subInstanceListComponet from './ChannelNavbar/subChannelsMenu.vue';
    export default {
        name: 'ChannelNavbar',
        props: ['channel'],
        data () {
            return {
                instanceList: [],
                activeChannel: null
            }
        },
        components: { subInstanceListComponet },
        methods: {
            
            activeView: function (base, sub) {
                console.log(base, sub);
                console.log(this.channel.name, this.activeChannel);
                if(base == this.channel.name){
                    if(sub != null){
                        if(this.activeChannel != sub){
                            this.activeTheChannel(sub);
                        }
                    }
                    if(this.activeChannel != base){
                        this.activeTheChannel(base);
                    }
                }
            },
            activeTheChannel: function (name) {
                var instance;
                for (var i = 0; i < this.instanceList.length; i++) {
                    instance = this.instanceList[i];
                    if(instance.name == name){
                        this.activeChannel = name;
                        EventBus.$emit('activeChannelObj', instance.instance);
                        return;
                    }
                }
            },
            chanceChannel: function () {
                EventBus.$emit('route-chance', BaseFeedUrlTag + this.mainLink + "/" + this.link);
            }
        },
        mounted: function () {
            this.createFeeds();
            EventBus.$on('activeChannel', function (base, sub) {
                this.activeView(base, sub);
            }.bind(this));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
