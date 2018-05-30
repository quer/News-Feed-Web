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
                url: BaseFeedUrlTag + this.mainLink + "/" + this.link
            }
        },
        methods: {
            chanceChannel: function () {
                event.preventDefault();
                EventBus.$emit('route-chance', this.url);
            }
        },
        computed: {
            active () {
                return this.$store.getters.channelActiveSecondStatus(this.url);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
