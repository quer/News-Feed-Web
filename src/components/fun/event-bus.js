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
    		return $patchObj.attr(attrTag);
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
    			return currentXmlObj[0].getAttribute(attrTag);
    		}else{
	    		return this.getNodeValue(currentXmlObj, type);
    		}
    	}
    }
}