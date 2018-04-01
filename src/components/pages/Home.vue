<template>
	<div class="container">
	    <div class="jumbotron jumbotron">
			<div class="container">
				<h1 class="display-4">Welcommen to Live rrs feed!</h1>
				<p class="lead">yesy eys yes </p>
			</div>
		</div>
		<div class="btn-group btn-group-lg" role="group" aria-label="Menu">
			<button type="button" class="btn btn-primary" v-on:click="Login">Login</button>
            <button type="button" class="btn btn-secondary" v-on:click="Register">Register</button>
			<button type="button" class="btn btn-secondary" v-on:click="Create">Create</button>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
            	test: "test"
            }
        },
        methods: {
        	Login: function () {
        		this.$router.push('Login');
        	},
        	Register: function () {
        		this.$router.push('Register');
        	},
            Create: function () {
                this.$router.push('Create');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
