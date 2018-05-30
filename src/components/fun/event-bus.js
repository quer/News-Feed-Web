import Vue from 'vue';
export const EventBus = new Vue();
export const XmlPaster = {
	getNodeValue: function (baseXmlObj, type) {
		if(type == "image"){
			for (var i = 0; i < baseXmlObj.length; i++) {
				var value = baseXmlObj[i].childNodes[0].nodeValue;
				if((/(gif|jpg|jpeg|tiff|png)/).test(value)){					
					return value;
				}
			}
			return "";
		}else{
			return baseXmlObj[0].childNodes[0].nodeValue;
		}
	},
	GetElementsByTagNames: function(baseXmlObj, path){
        path = path.split(" ");
        var seachXmlObj = baseXmlObj;
        for (var i = 0; i < path.length; i++) {
            seachXmlObj = seachXmlObj.getElementsByTagName(path[i]);
            if(i != path.length - 1){
                seachXmlObj = seachXmlObj[0];
            }
        }
        return seachXmlObj;
    },
    GetHtmlTagFromXmlObj: function(baseXmlObj, path, attrTag, type){
    	var html = this.getNodeValue(baseXmlObj, type);
    	var $obj = $(html);
    	var $patchObj = $obj.find(path);
    	if(attrTag == null){
    		return $patchObj.html();
    	}else{
    		return $patchObj.attr(attrTag+"");
    	}

    },
    GetStaticValueFromXmlTreePath: function(baseXmlObj, path, attrTag, type) {
    	var xmlSplitType = path.split(" | ");
    	var jqueryParts = (xmlSplitType.length > 1)? xmlSplitType[1] : null;
    	//debugger;
    	var currentXmlObj = this.GetElementsByTagNames(baseXmlObj, xmlSplitType[0]);
    	if(jqueryParts != null){
    		return this.GetHtmlTagFromXmlObj(currentXmlObj, jqueryParts, attrTag, type);
    	}else{
    		if(attrTag != null){
    			return currentXmlObj[0].getAttribute(attrTag+"");
    		}else{
	    		return this.getNodeValue(currentXmlObj, type);
    		}
    	}
    }
};
export const BaseUrl = 'stojier.dk';
export const BaseFeedUrlTag = 'f/';
export const RrsData = {
    
    decodeRssData: function (urlData, channel, LasatFetchDateTime) {
        var dateObject = { currentFetch: null, dateLastFetch: LasatFetchDateTime }
        var rrsData = [];
        var parser = new DOMParser();
        var xmlDom = parser.parseFromString(urlData, "text/xml");
        var loops = XmlPaster.GetElementsByTagNames(xmlDom, channel.loopTag, 'loops');
        for (var i = 0; i < loops.length; i++) {
            var loopItem = loops[i];
            var title = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, channel.decode.title.fieldValue+"", channel.decode.title.attrTag, 'title');
            var image = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, channel.decode.image.fieldValue+"", channel.decode.image.attrTag, 'image');
            var link = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, channel.decode.link.fieldValue+"", channel.decode.link.attrTag, 'link');
            var DateObj = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, channel.decode.DateFiled.fieldValue+"", channel.decode.DateFiled.attrTag, 'DateObj');

            if(this.isDateNew(DateObj, dateObject)){
                rrsData.push({
                    image: image,
                    text: title,
                    link: link,
                    DateObj: DateObj
                })
            }
        }
        return {rrsData: rrsData, lastFetchData: dateObject.currentFetch}
    },
    lastData: function (DateObj, dateObject) {
        if(dateObject.currentFetch != null){
            if(dateObject.currentFetch < DateObj){
                dateObject.currentFetch = DateObj;
            }
        }else{
            dateObject.currentFetch = DateObj;
        }
    },
    isDateNew: function (DateObj, dateObject) {
        if(dateObject.dateLastFetch != null){
            var date = new Date(DateObj);
            if(dateObject.dateLastFetch < date){
                this.lastData(date, dateObject);
                return true;
            }
        }else{
            this.lastData(new Date(DateObj), dateObject);
            return true;
        }
        return false;
    },
}