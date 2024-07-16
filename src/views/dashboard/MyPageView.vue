<template>
    <div class="about">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">My Page</h1>
        </div>
      </div>
  
      <section class="section">
        <button @click="logout()" class="button is-danger">Logout</button>
      </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    mounted() {
        document.title = 'My Page | IStudy'
    },
    methods: {
        async logout() {

          await axios
          .post('/api/v1/token/logout')
          .then(response => {
            console.log('logout')
          })

          axios.defaults.headers.common['Authorization'] = ""

          localStorage.removeItem('token')

          this.$store.commit('removeToken')

          this.$router.push('/')
        }
    }
}
</script>
  