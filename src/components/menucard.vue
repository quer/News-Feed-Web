<template>
    <div class="roomListLogo" :class="active? 'active' : ''" v-on:click="chanceChannel()">
        <div class="roomListLogoInner" :style="'background-image: url(\'' +icon + '\');'" :alt ="name">
            <span class="badge badge-primary" v-if="badge > 0">{{ badge }}</span>
        </div>
        <i class="glyphicon glyphicon-spinner glyphicon-spin" style="font-size:24px"></i>
    </div>
</template>

<script>
    import { EventBus } from './fun/event-bus.js';
    import Channel from './pages/component/channel.vue';
    export default {
        name: 'rsscard',
        props: ['name', 'icon', 'rssFeedUrl', 'loopTag', 'decode'],
        data () {
            return {
                loading: true,
                badge: 0,
                channelObj: null,
                active: false
            }
        },
        methods: {
            loadFeed: function () {
                this.$http.get("http://localhost/News-Feed/api/rrsfeed.php?link=" + encodeURIComponent(this.rssFeedUrl)).then(response => {
                    
                });
            },
            mount: function () {
                var ComponentClass = Vue.extend(Channel)
                var instance = new ComponentClass({
                    propsData: { name: this.name, icon: this.icon, rssFeedUrl: this.rssFeedUrl, decode: this.decode, loopTag: this.loopTag }
                })
                instance.$mount();
                this.channelObj = instance;
                this.loading = false;
            },
            chanceChannel: function () {
                this.$router.push(this.name);
            },
            activeView: function (from, to) {
                console.log("activeView")
                if(to == this.name){
                    this.active = true;
                    console.log("active", this.name);
                    EventBus.$emit('activeChannelObj', this.channelObj);
                }else{
                    this.active = false;
                }
            }
        },
        mounted: function () {
            this.mount();
            EventBus.$on('badgeUpdate-' + this.name, function (count) {
                this.badge = count;
            });
            EventBus.$on('doneLoading-' + this.name, function () {
                this.loading = false;
            });
            EventBus.$on('activeChannel', function (from, to) {
                this.activeView(from, to);
            }.bind(this));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.active {
    background-color:wheat;
}
</style>
