<template>
    <div id="menu">
        <div class="roomListLogo" v-on:click="chanceChannel('/')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary">10</span>
            </div>
        </div>
        <menucard v-for="(channel, index) in channels" :key="index" :name="channel.name" :icon="channel.icon" :rssFeedUrl="channel.rssFeedUrl" :loopTag="channel.loopTag" :decode="channel.decode"/>
        
        <div class="roomSebrat">
            
        </div>
        <div class="roomListLogo" v-on:click="chanceChannel('start')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary">1</span>
            </div>
        </div>
        <div class="roomListLogo" v-on:click="chanceChannel('stop')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary">-1</span>
            </div>
        </div>
    </div>
</template>
<script>
import menucard from './menucard.vue';
import { EventBus } from './fun/event-bus.js';

export default {
    name: 'Navbar',
    data () {
        return {
            channels: [],
            interval: null,
            channelsLoopQue: [],
            activeChannel: "",
            loopInterval: (3*1000)
        }
    },
    components: {menucard},
    methods: {
        chanceChannel: function (page) {
            if(page == "start"){
                this.startInterval();
            }else if (page == "stop") {
                this.stopInterval();
            }else{
                this.$router.push(page);
            }
        },
        setChannels: function (ajaxData) {
            EventBus.$emit('setChannels', ajaxData)
            this.channels = ajaxData;
            var loopList = [];
            for (var i = 0; i < ajaxData.length; i++) {
                loopList.push(ajaxData[i].name);
            }
            this.channelsLoopQue = loopList;
        },
        loadChannels: function () {
            this.$http.get('http://localhost/News-Feed/api/channels.php').then(response => {
                this.setChannels(response.data);
            });
        },
        setActiveChannel: function (name) {
            this.activeChannel = name;
        },
        intervalLoop: function () {
            var intervalToElement = this.channelsLoopQue.shift();
            console.log("loop", intervalToElement);
            EventBus.$emit('activeChannelFeedUpdate-' + intervalToElement);
            this.channelsLoopQue.push(intervalToElement);
        },
        startInterval: function () {
            console.log("start loop", this.interval);
            if(this.interval == null){
                this.interval = setInterval(function(){
                    this.intervalLoop();
                }.bind(this), this.loopInterval);
            }
        },
        stopInterval: function () {
            if(this.interval != null){
                clearInterval(this.interval);
            }
        }
    },
    mounted: function (){
        this.loadChannels();
        EventBus.$emit('activeChannelName', this.name);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<!--
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
            var channel = this.getChannel(channel);
            if(channel != null){
                this.$set(channel, 'badge', number);
            }else{
                console.error("error update badge")
            }
        }-->