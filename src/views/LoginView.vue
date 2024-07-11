<template>
    <div class="about">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">Login</h1>
        </div>
      </div>
  
      <section class="section">
        <div class="container">
            <div class="column">
                <div class="column is-4 is-offset-4">

                    <div class="notification is-danger" v-if="errors.length">
                        <p 
                            v-for="error in errors"
                            v-bind:key="error"
                        >
                            {{ error }}
                        </p>

                    </div>

                    <form v-on:submit.prvent="submitForm">
                        <div class="field">
                            <label>Email</label>
                            <div class="control">
                                <input type="email" class="input" v-model="username">
                            </div>
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <div class="control">
                                <input type="password" class="input" v-model="password">
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <button class="button is-info mt-3">Login</button>
                            </div>
                        </div>
                    </form>

                    <hr>

                    or <router-link to="signup">Sign Up Here</router-link>
                </div>
            </div>
        </div>
      </section>
    </div>
</template>
<script> 
import axios from 'axios';

export default {
    data() {
        return {
            username: "",
            password: "",
            errors:[],
        }
    },
    methods: {
        submitForm() {
            console.log('submitForm')

            axios.defaults.headers.common['Authorization'] = ""

            localStorage.removeItem('token')

            this.errors = []

            if (this.username === '') {
                this.errors.push("Email Field Is Missing!")
            }
            if (this.password === '') {
                this.errors.push("Password Field Is Missing!")
            }

            if (!this.errors.length) {
                const formData = {
                    username : this.username,
                    password : this.password
                }

                axios
                    .post('api/v1/token/login/', formData)
                    .then(response => {

                        const token = response.data.auth_token

                        this.$store.commit('setToken', token)

                        axios.defaults.headers.common['Authorization'] = "Token " + token

                        localStorage.setItem('token', token)

                        this.$router.push('/dashboard/mypage')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push (`${property}: ${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))

                        } else if (error.message) {
                            this.error.push('Something Went Wrong, Please Try Again..')

                            console.log(JSON.stringify(error))
                        }
                    })

            }
        }
    }
}
</script>