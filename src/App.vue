<template>
    <div id="app">
        <app-navbar/>
        <div id="content">            
            <router-view/>
        </div>
    </div>
</template>

<script>
import SideNavbar from './components/SideNavbar.vue';
import { EventBus, RrsData, BaseUrl } from './components/fun/event-bus.js';

export default {
    name: 'App',
    data () {
        return {  
            intervalMain: null,
            mainLoopIndex: null,
            intervalSecond: null,
            secondLoopIndex: null,
            intervalThird: null,
            thirdLoopIndex: null
        }
    },
    components: {
        'app-navbar': SideNavbar
    },
    methods: {
        activeView: function (to, from) {
            var path = to.path.split('/');
            console.log("activeView", path)
            var path1 = null;
            if(path[1] !== void 0){
                path1 = path[1];
            }
            var path2 = null;
            if(path[2] !== void 0){
                path2 = path[2];
            }
            EventBus.$emit('activeChannel', path1, path2);
        },
        fromPathToName:function (name) {
            while(name.charAt(0) === '/')
            {
                name = name.substr(1);
            }
            return name;
        },
        loadChannelsFeeds: function (ajaxData) {
            for (var i = 0; i < ajaxData.length; i++) {
                    this.loadChannelsFeedsAjex("f/"+ajaxData[i].name, ajaxData[i]);
                    console.log("f/"+ajaxData[i].name);
                    for (var j = 0; j < ajaxData[i].childFeeds.length; j++) {
                            this.loadChannelsFeedsAjex("f/" + ajaxData[i].name + "/" + ajaxData[i].childFeeds[j].name, ajaxData[i].childFeeds[j]);
                            console.log("f/" + ajaxData[i].name + "/" + ajaxData[i].childFeeds[j].name);
                            for (var k = 0; k < ajaxData[i].childFeeds[j].childFeeds.length; k++) {
                                    this.loadChannelsFeedsAjex("f/" + ajaxData[i].name + "/" + ajaxData[i].childFeeds[j].name + "/" + ajaxData[i].childFeeds[j].childFeeds[k].name, ajaxData[i].childFeeds[j].childFeeds[k]);
                                    console.log("f/"+ajaxData[i].name + "/" + ajaxData[i].childFeeds[j].name + "/" + ajaxData[i].childFeeds[j].childFeeds[k].name);
                            }
                    }
            }
        },
        loadChannelsFeedsAjex: function (name, channel) {
            this.$http.get(BaseUrl + "/api/rrsfeed.php?link=" + encodeURIComponent(channel.rssFeedUrl)).then(response => {
                var feedData = RrsData.decodeRssData(response.bodyText, channel, channel.LastFetchDateTime);
                console.log("feed ajax - " + name + " -- " + feedData.rrsData.length + " -- " + feedData.lastFetchData);
                if(feedData.rrsData.length > 0){

                    this.$store.commit('updateChannel', { feedData: feedData, name: name });
                }
            });
        },
        setChannels: function (ajaxData) {
            this.$store.commit('addChannels', ajaxData);
            this.loadChannelsFeeds(ajaxData);
            this.startLoop();
        },
        loadChannels: function () {
            this.$http.get(BaseUrl + '/api/channels.php').then(response => {
                console.log(response.data);
                this.setChannels(response.data);
            });
        },
        startLoop: function () {
            const self = this;
            if(this.intervalMain == null){
                this.intervalMain = setInterval(function(){
                    self.intervalMainFun();
                }.bind(this), this.feedTime.main);
            }
            if(this.intervalSecond == null){
                this.intervalSecond = setInterval(function(){
                    self.intervalSecondFun();
                }.bind(this), this.feedTime.second);
            }
            if(this.intervalThird == null){
                this.intervalThird = setInterval(function(){
                    self.intervalThirdFun();
                }.bind(this), this.feedTime.third);
            }
        },
        intervalMainFun: function () {
            console.log("Main " + this.mainLoopIndex, this.MainLoopsToIndex);
            var nextIndex = this.getNextIndex(this.mainLoopIndex, this.MainLoopsToIndex);
            console.log("runloop main" + nextIndex);

            if(nextIndex !== null){
                var channelObjectForLoop = this.$store.getters.GetLoopObjectForMain(nextIndex);
                if(channelObjectForLoop != null){
                    this.loadChannelsFeedsAjex(channelObjectForLoop.name, channelObjectForLoop.channel);
                }
                this.mainLoopIndex = nextIndex;
            }
        },
        intervalSecondFun: function () {
            console.log("Second " + this.secondLoopIndex, this.SecondLoopsToIndex);
            var nextIndex = this.getNextIndex(this.secondLoopIndex, this.SecondLoopsToIndex);
            console.log("runloop second" + nextIndex);

            if(nextIndex !== null){
                var channelObjectForLoop = this.$store.getters.GetLoopObjectForSecond(nextIndex);
                if(channelObjectForLoop != null){
                    this.loadChannelsFeedsAjex(channelObjectForLoop.name, channelObjectForLoop.channel);
                }
                this.secondLoopIndex = nextIndex;
            }
        },
        intervalThirdFun: function () {
            console.log("Third " + this.thirdLoopIndex, this.ThirdLoopsToIndex);
            var nextIndex = this.getNextIndex(this.thirdLoopIndex, this.ThirdLoopsToIndex);
            console.log("runloop third" + nextIndex);

            if(nextIndex !== null){
                var channelObjectForLoop = this.$store.getters.GetLoopObjectForThird(nextIndex);
                if(channelObjectForLoop != null){
                    this.loadChannelsFeedsAjex(channelObjectForLoop.name, channelObjectForLoop.channel);
                }
                this.thirdLoopIndex = nextIndex;
            }
        },
        getNextIndex: function (currentIndex, maxIndexs) {
            if(maxIndexs > 0){
                if(currentIndex === null){
                    return 0;
                }else{
                    if(currentIndex + 1 == maxIndexs){
                        return 0;
                    }else{
                        return ++currentIndex;
                    }
                }
            }else{
                return null;
            }
        }
    },
    watch: {
        '$route': 'activeView'
    },
    computed: {
        feedTime(){
            return this.$store.getters.GetLoopTime;
        },
        MainLoopsToIndex(){
            return this.$store.getters.GetMainLoopIndexs;
        },
        SecondLoopsToIndex(){
            return this.$store.getters.GetSecondLoopIndexs;
        },
        ThirdLoopsToIndex(){
            return this.$store.getters.GetThirdLoopIndexs;
        }
    },
    mounted: function () {
        EventBus.$on('route-chance', function (path) {
            this.$store.commit('setActiveChannel', path);
            this.$router.push({ path: "../../" + path });
        }.bind(this));
        this.loadChannels();
        this.$store.commit('setActiveChannel', this.fromPathToName(this.$route.path));
    }
}
</script>

<style lang="scss">
body, html, #app{
    width: 100%;
    height: 100%;
}
body {
    overflow-x: hidden;
}

#menu {
    position: relative;
    width: 70px;
    height: 100%;
    float: left;
    overflow-y: auto;
    background: #000;
    .roomSebrat {
        background: none;
        height: 2px;
        margin-bottom: 10px;
        position: relative;
        width: 50px;
        ::after{
            background: #2f3136;
            content: " ";
            height: 2px;
            left: 20%;
            position: absolute;
            right: 20%;
            top: 0;
        }
    }
}
.roomListLogo {
    width: 70px;
    height: 70px;
    padding: 10px 0 10px 10px;
    position: relative;
    .roomListLogoInner {
        background-repeat: no-repeat;
        background-size: 50px 50px;
        color: #fff;
        display: block;
        height: 50px;
        width: 50px;
        background-clip: padding-box;
        background-position: 50%;
        cursor: pointer;
        text-decoration: none;
        transition: opacity .5s,color .5s;
        border-radius: 25px;
        position: relative;
        .badge {
            position: absolute;
            bottom: 0px;
            right: 0px;
        }
    }
}
#content {
    position: relative;
    float: left;
    width: calc(100% - 70px);
    height: 100%;
    overflow-y: auto;
}
.container {
    background-color: #F4F9F4;
    height: 100%;
}
</style>
