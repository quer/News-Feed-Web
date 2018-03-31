<template>
    <div id="menu">
        <div class="roomListLogo" v-on:click="chanceChannel('')">
            <div class="roomListLogoInner">
                <span class="badge badge-primary">10</span>
            </div>
        </div>
        <div class="roomListLogo" v-for="channel in channels" v-on:click="chanceChannel(channel.name)">
            <div class="roomListLogoInner" :style="'background-image: url(\'' +channel.icon + '\');'" :alt ="channel.name">
                <span class="badge badge-primary">5</span>
            </div>
        </div>
        <div class="roomSebrat">
            
        </div>
    </div>
</template>
<script>
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
        }
    },
    mounted: function (){
        this.loadChannels()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>