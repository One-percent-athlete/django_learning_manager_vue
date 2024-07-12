<template>
    <div class="courses">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">{{ course.title }}</h1>
          <h2 class="subtitle">{{ course.short_description }}</h2>
        </div>
      </div>

        <section class="section">
            <div class="container">
                <div class="columns content">
                  <div class="column is-2">
                    <h2>Table of contents</h2>

                    <ul>
                      <li><a href="#">Introduction</a></li>
                      <li><a href="#">Get Started</a></li>
                      <li><a href="#">Part 1</a></li>
                      <li><a href="#">Part 2</a></li>
                      <li><a href="#">Summary</a></li>
                    </ul>

                  </div>
                  
                  <div class="column is-10">
                    <template v-if="$store.state.user.isAuthenticated">
                      <h2>Introduction</h2>
                      <p>{{ course.long_description }}</p>
                    </template>
                    <template v-else>
                      <h2>Access Denied..</h2>
                      <p>You Need To <router-link to="/login">Login</router-link> Or
                        <router-link to="/signup">Sign Up</router-link></p>
                        <p><router-link to="/">Home</router-link></p>
                    </template>
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
          course: []
      }
    },
    mounted() {
      const slug = this.$route.params.slug
      axios
          .get(`/api/v1/courses/${slug}/`)
          .then(response => {
              this.course = response.data
          })
    }
}

</script>