<template>
    <li class="nav-item">
        <a class="nav-link" v-on:click="chanceChannel()" href="#">{{ name }}</a>
    </li>
</template>

<script>
    import { EventBus } from '../fun/event-bus.js';
    export default {
        name: 'subChannelsMenu',
        props: ['name', 'mainLink', 'link'],
        data () {
            return {
                index: 0,

            }
        },
        methods: {
            chanceChannel: function () {
                EventBus.$emit('route-chance', this.mainLink + "/" + this.link);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
