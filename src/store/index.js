import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '../components/fun/event-bus.js';
Vue.use(Vuex)
var	GetterChannel = (state, url) => {
	var channelNames = url;
	if(typeof url === 'string' || url instanceof String){
		channelNames = GetterChannelsFromUrl(url);
	}
	if(channelNames.main != null){
		var channelObjMain,
			channelObjSecond,
			channelObjThird;
		for (var i = 0; i < state.channels.length; i++) {
			channelObjMain = state.channels[i];
			if(channelObjMain.name == channelNames.main){
				if (channelNames.second != null) {
					for (var j = 0; j < channelObjMain.childFeeds.length; j++) {
						channelObjSecond = channelObjMain.childFeeds[j];
						if(channelObjSecond.name == channelNames.second){
							if(channelNames.third != null){
								for (var k = 0; k < channelObjSecond.length; k++) {
									channelObjThird = channelObjSecond[k];
									if(channelObjThird.name == channelNames.third){
										return channelObjThird;
									}
								}
							}else{
								return channelObjSecond;
							}
						}
					}
				}else{
					return channelObjMain;
				}
			}
		}
	}
	return null;
};
var GetterChannelsFromUrl = (url) => {
	var channelNames = url.split("/");
	var track = (channelNames[0] == "f")? true : false;
	var main = channelNames[1] && track? channelNames[1] : null; 
	var second = channelNames[2] && track? channelNames[2] : null; 
	var third = channelNames[3] && track? channelNames[3] : null; 
	return {main, second, third};
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
export default new Vuex.Store({
	state: {
		channels: [], //{ "name": "", "icon": "","rssFeedUrl": "","decode": {},"loopTag": "item","convertImage": "1","childFeeds": [ ...self]} and {LastFetchDateTime: null, feedItem: []} if have feed 
		channelsLoopQue: {
			isRuning: false,
			main: { list: [], loopTime: 6000 },
			second: { list: [], loopTime: 12000 },
			third: { list: [], loopTime: 24000 }
		},
		activeChannel: {
			main: null,
			second: null,
			third: null
		}
	},
	getters: {
		channels: (state) => {
			return state.channels;
		},
		channel: (state) => (channelName) => {
			return GetterChannel(state, channelName);
		},
		LastFetchDateTime: (state, getters) => (channelName)  => {
			var feed = getters.ChannelFeed(channelName);
			if(feed != null){
				return feed.LastFetchDateTime;
			}
			return null;
		},
		ChannelFeed: (state) => (channelName) => {
			var channel = GetterChannel(state, channelName);
			return channel != null && channel.feedItem? channel.feedItem : null;
		},
		ActiveMainChannel: (state, getters) => {
			if(state.activeChannel.main == null){
				return null;
			}else{
				return getters.channel({main: state.activeChannel.main, second : null, third : null});
			}
		},
		ActiveChannelFeed: (state, getters) => {
			if(state.activeChannel == null){
				return null;
			}else{
				return getters.ChannelFeed(state.activeChannel);
			}
		},
		ActiveChannelconvertImage: (state, getters) => {
			if(state.activeChannel == null){
				return false;
			}else{
				var channelObj = getters.channel(state.activeChannel);
				if (channelObj != null) {
					return channelObj.convertImage == "1"? true : false; 
				}
				return false;
			}
		},
		channelLoadingStatus: (state, getters)  => (channelName) => {
			var channelObj = getters.channel(channelName);
			if (channelObj != null) {
				return channelObj.loading? channelObj.loading : true; 
			}
			return true;
		},
		channelActiveMainStatus: (state, getters)  => (channelName) => {
			if(state.activeChannel.main == null){
				return false;
			}else{
				var channelNames = GetterChannelsFromUrl(channelName);
				if (channelNames != null) {
					return channelNames.main == state.activeChannel.main; 
				}
				return false;
			}
		},
		channelActiveSecondStatus: (state, getters)  => (channelName) => {
			if(state.activeChannel.main == null && state.activeChannel.second == null){
				return false;
			}else{
				var channelNames = GetterChannelsFromUrl(channelName);
				if (channelNames != null) {
					return channelNames.main == state.activeChannel.main && channelNames.second == state.activeChannel.second; 
				}
				return false;
			}
		},

		ActiveMainChannelName: (state, getters) => {
			var mainActiveChannel = getters.ActiveMainChannel;
			return mainActiveChannel != null? mainActiveChannel.name : ""; 
		},
		ActiveMainChannelChildFeeds: (state, getters) => {
			var mainActiveChannel = getters.ActiveMainChannel;
			return mainActiveChannel != null? mainActiveChannel.childFeeds : []; 
		},
		//loop
		GetLoopTime: (state) => {
			var returnObj = {
				main: state.channelsLoopQue.main.loopTime,
				second: state.channelsLoopQue.second.loopTime,
				third: state.channelsLoopQue.third.loopTime
			}
			return returnObj;
		},
		GetMainLoopIndexs: (state) => {
			return state.channelsLoopQue.main.list.length;
		},
		GetLoopObjectForMain: (state, getters) => (index) => {
			var name = state.channelsLoopQue.main.list[index];
			if(!name){
				return null;
			}
			return {name: name, channel: getters.channel(name)};
		},
		GetSecondLoopIndexs: (state) => {
			return state.channelsLoopQue.second.list.length;
		},
		GetLoopObjectForSecond: (state, getters) => (index) => {
			var name = state.channelsLoopQue.second.list[index];
			if(!name){
				return null;
			}
			return {name: name, channel: getters.channel(name)};
		},
		GetThirdLoopIndexs: (state) => {
			return state.channelsLoopQue.third.list.length;
		},
		GetLoopObjectForThird: (state, getters) => (index) => {
			var name = state.channelsLoopQue.third.list[index];
			if(!name){
				return null;
			}
			return {name: name, channel: getters.channel(name)};
		}
	},
	mutations: {
		addChannels: function (state, channels) {
			state.channels = channels;
			for (var i = 0; i < channels.length; i++) {
                state.channelsLoopQue.main.list.push("f/"+channels[i].name);
                for (var j = 0; j < channels[i].childFeeds.length; j++) {
                    state.channelsLoopQue.second.list.push("f/" + channels[i].name + "/" + channels[i].childFeeds[j].name);
                    for (var k = 0; k < channels[i].childFeeds[j].childFeeds.length; k++) {
                        state.channelsLoopQue.third.list.push("f/" + channels[i].name + "/" + channels[i].childFeeds[j].name + "/" + channels[i].childFeeds[j].childFeeds[k].name);
                    }
                }
            }
			state.channelsLoopQue.main.list = shuffle(state.channelsLoopQue.main.list);
			state.channelsLoopQue.second.list = shuffle(state.channelsLoopQue.second.list);
			state.channelsLoopQue.third.list = shuffle(state.channelsLoopQue.third.list);
		},
		updateChannel: function(state, feedData){
			var channel = GetterChannel(state, feedData.name); 
			if(channel != null){
				if(!channel.feedItem){
					channel.feedItem = feedData.feedData.rrsData;
					channel.LastFetchDateTime = feedData.feedData.lastFetchData;
					channel.loading = false;
				}else{
					channel.LastFetchDateTime = feedData.feedData.lastFetchData;
					for (var i = 0; i < feedData.feedData.rrsData.length; i++) {
						channel.feedItem.push(feedData.feedData.rrsData[i]);
					}
					channel.badge = feedData.feedData.rrsData.length;
				}
			}else{
				console.error("channel do not exist!: " + feedData.name);
			}
		},
		setActiveChannel: function (state, channelName) {
			var channelNames = GetterChannelsFromUrl(channelName);
			state.activeChannel = channelNames;
		}
	}
});