<template>
    <div class="container">
        <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div v-if="!loggingIn">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="credentials.username">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="credentials.password">
            </div>
            <button type="submit" class="btn btn-primary" @click="submit()">Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            error: '',
            credentials: {
                username: '',
                password: ''
            },
            loggingIn: false
        }
    },
    methods: {
        submit: function () {
            this.credentials.password = hex_sha512(this.credentials.password);
            this.$http.post('http://localhost/News-Feed/api/login.php', {username: this.credentials.username, password: this.credentials.password}, {emulateJSON:true}).then(response => {
                this.credentials = {
                    username: '',
                    password: ''
                };
                if(response.data.success == 1){
                    this.loggingIn = true;
                }else if(response.data.success == 0){
                    this.error = "Username or Password is wong";
                }else if(response.data.success == 2){
                    this.error = "Somefing whent wong";
                }else{
                    this.error = "This is realy bad!";
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>