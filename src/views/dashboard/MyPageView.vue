<template>
    <div class="about">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">My Page</h1>
        </div>
      </div>
  
      <section class="section">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h2 class="subtitle is-size-3">Your Active Courses</h2>
          </div>
          <div 
            class="column is-3"
            v-for="course in courses"
            v-bind:key="course.id"
            >
            <CourseCardView :course="course" />

          </div>
        </div>

        <hr>

        <button @click="logout()" class="button is-danger">Logout</button>
      </section>
    </div>
</template>

<script>
import axios from 'axios';
import CourseCardView from '@/components/CourseCardView.vue';

export default {
  data() {
    return {
      courses: []
    }
  },

  components: {
    CourseCardView
  },

  mounted() {
      document.title = 'My Page | IStudy'

      axios
      .get('/api/v1/activities/get_active_courses/')
      .then(response => {
        console.log(response)

        this.courses = response.data
      })
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
  