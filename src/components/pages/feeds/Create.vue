<template>
    <div class="container">
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div v-if="stage == 1">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="rssUrl">rssUrl</label>
                        <input type="text" class="form-control" id="rssUrl" placeholder="http://" v-model="stage1.rssUrl">
                        <small id="emailHelp" class="form-text text-muted">The rrs feeds url</small>
                    </div>
                    <div class="form-group">
                        <label for="Name">Name</label>
                        <input type="text" class="form-control" id="Name" placeholder="eks.." v-model="stage1.name">
                    </div>
                    <div class="form-group">
                        <label for="Image">Image</label>
                        <input type="text" class="form-control" id="Image" placeholder="eks.." v-model="stage1.Image">
                    </div>
                    <div class="form-group">
                        <label for="Image">Parent channel</label>
                        <input type="text" class="form-control" id="Image" placeholder="eks.." v-model="stage1.ParentChannel">
                    </div>
                    <button type="submit" class="btn btn-primary" @click="NextStep()">Next Step</button>
                </div>
                <div class="col-md-6">
                </div>
            </div>
        </div>
        <div v-if="stage == 2">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="loopTag">loopTag</label>
                        <input type="text" class="form-control" id="loopTag" placeholder="<item>" v-model="stage2.loopTag">
                    </div>
                    <div class="form-group">
                        <label for="image">image</label>
                        <input type="text" class="form-control" id="image" placeholder="<image>" v-model="stage2.image">
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="attr" id="tag" value="tag" v-model="stage2.attr" checked>
                        <label class="form-check-label" for="tag">
                            tag
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="attr" id="attr" value="attr" v-model="stage2.attr">
                        <label class="form-check-label" for="attr">
                            attr
                        </label>
                    </div>
                    <div class="form-group" v-if="stage2.attr == 'attr'">
                        <label for="attrTag">attr name</label>
                        <input type="text" class="form-control" id="attrTag" placeholder="src" v-model="stage2.attrTag">
                    </div>
                    <div class="form-group">
                        <label for="title">title</label>
                        <input type="text" class="form-control" id="title" placeholder="<title>" v-model="stage2.title">
                    </div>
                    <div class="form-group">
                        <label for="link">link</label>
                        <input type="text" class="form-control" id="link" placeholder="<link>" v-model="stage2.link">
                    </div>
                    <div class="form-group">
                        <label for="Date">Date</label>
                        <input type="text" class="form-control" id="Date" placeholder="<Date>" v-model="stage2.Date">
                    </div>
                    <button type="submit" class="btn btn-primary" v-if="stage2.valid" @click="NextStep()">Next Step</button>
                    <button type="submit" class="btn btn-primary" @click="Test()">test</button>
                </div>
                <div class="col-md-6">
                    <section>
                        <h1>Show Case</h1>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">demo output</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" v-model="stage2.demo"></textarea>
                        </div>
                    </section>
                    <section>
                        <h1 v-if="errorInfo">Error info</h1>
                        <div class="alert alert-Info" v-if="errorInfo">
                            <p>{{ errorInfo }}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XmlPaster, BaseUrl  } from '../../fun/event-bus.js';
export default {
    name: 'Create',
    data () {
        return {
            error: '',
            stage: 1,
            stage1: {
                rssUrl: "https://www.dr.dk/nyheder/service/feeds/allenyheder",
                name:"test",
                Image:"https://digitalt.tv/wp-content/uploads/2017/10/dr1logo.png",
                ParentChannel: null
            },
            stage2: {
                loopTag: 'item',
                image: 'DR:XmlImageArticle DR:ImageUri620x349',
                title: 'title',
                demo: '',
                valid: false,
                attr: 'tag',
                attrTag: 'src',
                link: 'link',
                Date: 'pubDate',

            },
            urlFetchData: '',
            validTest: {
                imageResult: [],
                titleResult: [],
                urlResult: [],
                dataResult: []
            },
            errorInfo: ''
        }
    },
    methods: {
        NextStep: function () {
            if(this.stage == 1){
                if(this.stage1.rssUrl == "" || this.stage1.name == ""){
                    this.error = "fill all fields";
                }else{
                    this.$http.get(BaseUrl + "/api/rrsfeed.php?link=" + encodeURIComponent(this.stage1.rssUrl)).then(response => {
                        //console.log(response.bodyText);
                        this.urlFetchData = response.bodyText;
                        this.stage = 2;
                    });
                }
            }else if(this.stage == 2){
                if (this.stage2.valid) {
                    var ObjToSend = {
                        loopTag: this.stage2.loopTag,
                        image: {tag: this.stage2.image, attr:null, attrTag: null},
                        title: {tag: this.stage2.title, attr:this.stage2.attr, attrTag: this.stage2.attrTag},
                        link: {tag: this.stage2.link, attr:null, attrTag: null},
                        Date: {tag: this.stage2.Date, attr:null, attrTag: null},
                        rssUrl: this.stage1.rssUrl,
                        name: this.stage1.name,
                        mainImage: this.stage1.Image,
                        parentChannel: this.stage1.ParentChannel
                    }
                    this.$http.post(BaseUrl+"/api/addRrsfeed.php", {data:JSON.stringify(ObjToSend)}, {emulateJSON:true}).then(response => {
                        if(response.data.success){
                            EventBus.$emit('forceUpdateChannels');
                        }
                    });
                }
            }
        },
        Test: function () {
            var demo = "";
            var parser = new DOMParser();
            var xmlDom = parser.parseFromString(this.urlFetchData, "text/xml");
            var loops = XmlPaster.GetElementsByTagNames(xmlDom, this.stage2.loopTag, 'loops');
            for (var i = 0; i < loops.length; i++) {
                var loopItem = loops[i];
                if(i == 13){
                    console.log(loopItem);
                }
                var title = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.stage2.title, null, 'title');
                var image = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.stage2.image, this.stage2.attr == 'attr'? this.stage2.attrTag : null, 'image');
                var link = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.stage2.link, null, 'link');
                var DateObj = XmlPaster.GetStaticValueFromXmlTreePath(loopItem, this.stage2.Date, null, 'DateObj');
                this.validTest.imageResult.push(image);
                this.validTest.titleResult.push(title);
                this.validTest.urlResult.push(link);
                this.validTest.dataResult.push(DateObj);
                demo += "{";
                demo += "title: " + title + ", \n";
                demo += "image: " + image + ", \n";
                demo += "link: " + link + ", \n";
                demo += "Date: " + DateObj + " \n";

                demo += "}\n";
            }
            this.stage2.demo = demo;
            this.IsValid();
        },
        IsValid: function () {
            this.errorInfo = "";
            var testObj;
            for (var i = 0; i < this.validTest.imageResult.length; i++) {
                testObj = this.validTest.imageResult[i];
                if(!(/(gif|jpg|jpeg|tiff|png)/).test(testObj)){
                    this.errorInfo += "not image: " + testObj + " \n";
                }
                if(!(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(testObj)){
                    this.errorInfo += "not image from url: " + testObj + " \n";
                }
            }
            for (var i = 0; i < this.validTest.titleResult.length; i++) {
                testObj = this.validTest.titleResult[i];
                if(testObj == ""){
                    this.errorInfo += "A title is emtry \n";
                }
            }
            for (var i = 0; i < this.validTest.urlResult.length; i++) {
                testObj = this.validTest.urlResult[i];
                if(!(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(testObj)){
                    this.errorInfo += "Not Url: " + testObj + " \n";
                }
            }
            for (var i = 0; i < this.validTest.dataResult.length; i++) {
                testObj = this.validTest.dataResult[i];
                var date = new Date(testObj);
                if(date.getDate() == "" || date.getMonth() == "" || date.getFullYear() == "" || date.getHours() == "" || date.getHours() == ""){
                    this.errorInfo += "is not a date: " + testObj + " --||-- " + date.getDate()+ "-" +date.getMonth()+ "-" +date.getFullYear()+ "-" +date.getHours()+ "-" +date.getHours() + " \n";
                }
            }
            if(this.errorInfo == ""){
                this.stage2.valid = true;
            }else{
                this.stage2.valid = false;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>