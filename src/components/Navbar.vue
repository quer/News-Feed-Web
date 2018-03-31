<template>
    <div id="menu">
        <div class="roomListLogo" v-on:click="chanceChannel('')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary">10</span>
            </div>
        </div>
        <div class="roomListLogo" v-for="channel in channels" v-on:click="chanceChannel(channel.name)">
            <div class="roomListLogoInner" :style="'background-image: url(\'' +channel.icon + '\');'" :alt ="channel.name">
                <span class="badge badge-primary" v-if="'badge' in channel">{{ channel.badge }}</span>
            </div>
        </div>
        <div class="roomSebrat">
            
        </div>
    </div>
</template>
<script>
import { EventBus } from './fun/event-bus.js';
export default {
    name: 'Navbar',
    data () {
        return {
            channels: []
        }
    },
    methods: {
        loadChannels: function () {
            this.$http.get('http://localhost/News-Feed/api/channels.php').then(response => {
                this.channels = response.data;
            });
        },
        chanceChannel: function (channel) {
            this.$router.push(channel);
        },
        getChannel: function (name) {
            while(name.charAt(0) === '/')
            {
                name = name.substr(1);
            }
            for (var i = 0; i < this.channels.length; i++) {
                if(this.channels[i].name == name){
                    return this.channels[i];
                }
            }
            return null;
        },
        getChannelIndex: function (name) {
            while(name.charAt(0) === '/')
            {
                name = name.substr(1);
            }
            for (var i = 0; i < this.channels.length; i++) {
                if(this.channels[i].name == name){
                    return i;
                }
            }
            return null;
        },
        setChannelBadge: function (channel, number) {
            console.log(channel, number);
            var channelIndex = this.getChannelIndex(channel);
            if(channelIndex != null){
                this.$set(this.channels[channelIndex], 'badge', number);
            }else{
                console.error("error update badge")
            }
        }
    },
    mounted: function (){
        this.loadChannels();
        EventBus.$on('updateNrOnChannel', (channel, nr) => {
            this.setChannelBadge(channel, nr);
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>