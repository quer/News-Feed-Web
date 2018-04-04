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
    </div>
</template>
<script>
import menucard from './menucard.vue';
export default {
    name: 'Navbar',
    data () {
        return {
            channels: []
        }
    },
    components: {menucard},
    methods: {
        setChannels: function (ajaxData) {
            this.channels = ajaxData;
        },
        loadChannels: function () {
            this.$http.get('http://localhost/News-Feed/api/channels.php').then(response => {
                this.setChannels(response.data);
            });
        }
    },
    mounted: function (){
        this.loadChannels();
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