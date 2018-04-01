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
                    <div class="form-group">
                        <label for="title">title</label>
                        <input type="text" class="form-control" id="title" placeholder="<title>" v-model="stage2.title">
                    </div>
                    <button type="submit" class="btn btn-primary" v-if="stage2.valid" @click="NextStep()">Next Step</button><button type="submit" class="btn btn-primary" @click="Test()">test</button>
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
                        <h1>WWF</h1>
                        <p>The World Wide Fund for Nature (WWF) is....</p>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Create',
    data () {
        return {
            error: '',
            stage: 1,
            stage1: {
                rssUrl: "http://localhost/News-Feed/api/rrsfeed",
                name:"test"
            },
            stage2: {
                loopTag: 'item',
                image: 'DR:XmlImageArticle DR:ImageUri620x349',
                title: 'title',
                demo: '',
                valid: false
            },
            urlFetchData: ''
        }
    },
    methods: {
        NextStep: function () {
            if(this.stage == 1){
                if(this.stage1.rssUrl == "" || this.stage1.name == ""){
                    this.error = "fill all fields";
                }else{
                    this.$http.get(this.stage1.rssUrl).then(response => {
                        console.log(response.bodyText);
                        this.urlFetchData = response.bodyText;
                        this.stage = 2;
                    });
                }
            }
        },
        Test: function () {
            var demo = "";
            var dom = $(this.urlFetchData);
            var loops = dom.find(this.stage2.loopTag);
            for (var i = 0; i < loops.length; i++) {
                if(i == 0){
                    console.log(loops[i]);
                }
                var loopItem = $(loops[i]);
                demo += "{";
                demo += "title: " + loopItem.find(this.stage2.title).text()+ ", ";
                demo += "image: " + loopItem.find(this.stage2.image).text()+ "";
                demo += "}\n";
            }
            this.stage2.demo = demo;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>