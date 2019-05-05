<template>
    <li class="nav-item">
        <a  :class="active? 'nav-link active' : 'nav-link'" v-on:click="chanceChannel($event)" href="#">{{ name }}</a>
    </li>
</template>

<script>
    import { EventBus, BaseFeedUrlTag } from '../../../../fun/event-bus.js';
    export default {
        name: 'subChannelsMenu',
        props: ['name', 'mainLink', 'link'],
        data () {
            return {
            }
        },
        methods: {
            chanceChannel: function () {
                event.preventDefault();
                EventBus.$emit('route-chance', BaseFeedUrlTag + this.mainLink + "/" + this.link);
            }
        },
        computed: {
            active () {
                return this.$store.getters.channelActiveSecondStatus(BaseFeedUrlTag + this.mainLink + "/" + this.link);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
