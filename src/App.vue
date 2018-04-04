<template>
    <div id="app">
        <app-navbar/>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { EventBus } from './components/fun/event-bus.js';

export default {
    name: 'App',

    components: {
        'app-navbar': Navbar
    },
    methods: {
        activeView: function (to, from) {
            console.log("activeView", this.fromPathToName(from.path), this.fromPathToName(to.path))
            EventBus.$emit('activeChannel', this.fromPathToName(from.path), this.fromPathToName(to.path));
        },
        fromPathToName:function (name) {
            while(name.charAt(0) === '/')
            {
                name = name.substr(1);
            }
            return name;
        }
    },
    watch: {
        '$route': 'activeView'
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
    .roomListLogo {
        width: 70px;
        height: 70px;
        padding: 10px 0 10px 10px;
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
