<template>
	<div class="container">
	    <div class="row">
            <div class="roomListLogo" v-for="(channel, index) in channels" v-on:click="chanceChannel(channel.name)" >
                <div class="roomListLogoInner" :style="'background-image: url(\'' +channel.icon + '\');'" :alt ="channel.name">
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import { EventBus } from '../fun/event-bus.js';
    export default {
        name: 'Home',
        data () {
            return {
            	test: "test",
                channels: []
            }
        },
        methods: {
        	chanceChannel: function (name) {
        		this.$router.push(name);
        	},
            setChannels: function (dataList) {
                var list = []; 
                for (var i = 0; i < dataList.length; i++) {
                    list.push(
                        {
                            name: dataList[i].name,
                            icon: dataList[i].icon,
                        });
                }
                this.channels = list;
            }
        },
        mounted: function () {
            EventBus.$on('setChannels', function (dataList) {
                this.setChannels(dataList)
            }.bind(this))
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.roomListLogo .roomListLogoInner{
    height: 200px;
    width: 200px;
    background-size: 200px 200px;
}
.roomListLogo{
    width: auto;
    height: auto;
    padding: auto;
}
</style>
