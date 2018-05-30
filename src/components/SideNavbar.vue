<template>
    <div id="menu">
        <div class="roomListLogo" v-on:click="chanceChannel('/')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary"></span>
            </div>
        </div>
        <menucard v-for="(channel, index) in channels" :key="index" :channel="channel"/>
        <div class="roomListLogo" v-on:click="chanceChannel('../../f/create')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary"></span>
            </div>
        </div>
    </div>
</template>
<script>
import menucard from './SideNavbar/menucard.vue';
import { EventBus, BaseUrl } from './fun/event-bus.js';

export default {
    name: 'SideNavbar',
    data () {
        return {
        }
    },
    components: { menucard },
    methods: {
        chanceChannel: function (page) {
            EventBus.$emit('route-chance', page);
        },   
    },
    computed: {
        channels () {
            return this.$store.getters.channels;
        }
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