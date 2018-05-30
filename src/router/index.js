import Vue from 'vue'
import Router from 'vue-router'
//Feeds
import FeedsHome from '@/components/pages/feeds/Home'
import FeedsChannels from '@/components/pages/feeds/Channels'
import FeedsCreate from '@/components/pages/feeds/Create'
//main
import Login from '@/components/pages/Login'
import forside from '@/components/pages/forside'
//user


Vue.use(Router)

export default new Router({
    //mode: "history",
    routes: [
        {
            path: '/',
            name: 'forside',
            component: forside   
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/f',
            name: 'f',
            component: FeedsHome
        },
        {
            path: '/f/Create',
            name: 'Create',
            component: FeedsCreate
        },
        {
            path: '/f/*',
            name: 'Channels',
            component: FeedsChannels
            
        },
        {
            path: '/f/*/*',
            name: 'SubChannels',
            component: FeedsChannels
        }
    ]
})
