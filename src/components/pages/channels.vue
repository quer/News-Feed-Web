<template>
    <div class="row" ref="channel">
    </div>
</template>

<script>
    import { EventBus } from '../fun/event-bus.js';
    import Channel from './component/channel.vue';
    export default {
        name: 'Channels',
        data () {
            return {
                rooms: [],
                activeRoomIndex: 0,
                loadet: false
            }
        },
        methods: {
            setChannels: function (roomsData) {
                console.log("setChannels");
                console.log(roomsData);
                this.rooms = [];
                for (var i = 0; i < roomsData.length; i++) {
                    var room = roomsData[i];
                    this.addChannel(room.name, room.icon, room.rssFeedUrl, room.decode);
                }
            },
            addChannel: function (name, icon, rssFeedUrl, decode) {
                var ComponentClass = Vue.extend(Channel)
                var instance = new ComponentClass({
                    propsData: { name, icon, rssFeedUrl, decode }
                })
                instance.$mount()
                this.rooms.push({name: name, instance, instance})
                this.$refs.channel.appendChild(instance.$el)
            },
            chanceChannel: function () {
                var channelName = this.getCleanRoutePath();
                console.log("chanceChannel", channelName);
                var channelInstance = this.getRoomInstance(channelName);
                if(channelInstance != null){
                    this.$refs.channel.innerHTML = "";
                    this.$refs.channel.appendChild(channelInstance.$el)
                }
            },
            getRoomInstance: function (channelName) {
                for (var i = 0; i < this.rooms.length; i++) {
                    if(this.rooms[i].name == channelName){
                        return this.rooms[i].instance;
                    }
                }
                return null;
            },
            getCleanRoutePath: function () {
                var path = this.$route.path;
                while(path.charAt(0) === '/')
                {
                    path = path.substr(1);
                }
                return path;
            }
        },
        mounted: function (){
            EventBus.$on('updateChannels', (ajaxData) => {
                this.setChannels(ajaxData)
            })
        },
        watch: {
            '$route': 'chanceChannel'
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
